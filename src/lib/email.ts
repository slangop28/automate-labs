import { supabase } from './supabaseClient';

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
 * Submits a lead through both paths:
 *  1. Best-effort write to Supabase (system of record).
 *  2. POST to the n8n webhook (primary) — n8n notifies Atul + auto-replies to the lead.
 *
 * Returns true on success. In demo mode (no webhook configured) it resolves
 * optimistically so the form is usable before n8n is wired — see VITE_N8N_WEBHOOK_URL.
 */
export async function submitLead(lead: Lead): Promise<boolean> {
    const payload = { ...lead, submitted_at: new Date().toISOString() };
    let ok = false;

    try {
        const { error } = await supabase.from('contacts').insert([payload]);
        if (!error) ok = true;
    } catch {
        /* table may not exist yet — the webhook is the primary path */
    }

    if (WEBHOOK) {
        try {
            const res = await fetch(WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) ok = true;
        } catch {
            /* network / CORS — fall through to the return below */
        }
        return ok;
    }

    // Demo mode: no webhook configured yet.
    console.info('[Automate Labs] Lead captured (demo mode — set VITE_N8N_WEBHOOK_URL to send email):', payload);
    return true;
}
