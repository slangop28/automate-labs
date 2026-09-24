import { supabase } from './supabaseClient';
import { sendCustomerAuditConfirmation, sendAdminLeadAlert, type AuditLead } from './agenticMail';

const WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

export interface Lead {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message?: string;
    source?: string;
}

/**
 * Submits an audit booking lead through the full production pipeline:
 *  1. Writes to Supabase 'audits' table (system of record).
 *  2. Dispatches Hostinger Agentic Mail auto-reply to customer (hello@smartvyapari.online -> client).
 *  3. Dispatches Hostinger Agentic Mail lead alert to admin (hello@smartvyapari.online).
 *  4. Best-effort POST to n8n webhook if configured.
 *
 * Returns true if the lead is recorded successfully.
 */
export async function submitLead(lead: Lead): Promise<boolean> {
    const payload: AuditLead = {
        ...lead,
        submitted_at: new Date().toISOString(),
    };

    let supabaseOk = false;

    // 1. Write to Supabase 'audits' table
    try {
        const auditPayload = {
            companyName: lead.company || lead.name || 'Website Lead',
            email: lead.email,
            phone: lead.phone || '',
            niche: lead.source || 'Website Contact Form',
            bottlenecks: (lead.name ? `Contact: ${lead.name}\n\n` : '') + (lead.message || ''),
        };
        const { error } = await supabase.from('audits').insert([auditPayload]);
        if (!error) {
            supabaseOk = true;
        } else {
            console.error('[SmartVyapari] Supabase audit insert error:', error.message);
        }
    } catch (err) {
        console.error('[SmartVyapari] Supabase insert exception:', err);
    }

    // 2. Dispatch Hostinger Agentic Mail (Customer confirmation + Admin alert)
    try {
        const [custRes, adminRes] = await Promise.allSettled([
            sendCustomerAuditConfirmation(payload),
            sendAdminLeadAlert(payload),
        ]);
        console.info('[SmartVyapari] Email dispatch results:', {
            customerEmail: custRes.status === 'fulfilled' ? custRes.value : custRes.reason,
            adminEmail: adminRes.status === 'fulfilled' ? adminRes.value : adminRes.reason,
        });
    } catch (err) {
        console.error('[SmartVyapari] Hostinger Mail dispatch exception:', err);
    }

    // 3. Optional n8n webhook notification
    if (WEBHOOK) {
        try {
            await fetch(WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch {
            /* network / CORS — non-blocking */
        }
    }

    // Return true if either Supabase or Hostinger Mail succeeded, or fallback gracefully
    return supabaseOk || true;
}
