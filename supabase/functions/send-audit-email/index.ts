// Supabase Edge Function: send-audit-email
// Triggered on database webhook (INSERT on public.audits) or invoked via REST API

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const HOSTINGER_API_KEY = Deno.env.get('HOSTINGER_MAIL_API_KEY') || 'c28c9500491e60a49b77c4bce9805f20640f8b6449c5e6faff8fea46501b0843';
const HOSTINGER_MAILBOX_ID = Deno.env.get('HOSTINGER_MAILBOX_ID') || 'ACe5aaa94104a63f283033e1e3f097';
const SENDER_EMAIL = 'hello@smartvyapari.online';

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            },
        });
    }

    try {
        const body = await req.json();
        // Support both direct payload or Supabase database webhook record payload
        const record = body.record || body;

        const customerEmail = record.email;
        const customerName = record.companyName || 'Valued Partner';
        const message = record.bottlenecks || record.message || 'General Operations Audit';

        if (!customerEmail) {
            return new Response(JSON.stringify({ error: 'No recipient email provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 1. Send Auto-Reply to Customer
        const customerHtml = `
            <div style="font-family: sans-serif; padding: 24px; background: #FAF7F2; color: #1E1A17;">
                <div style="max-width: 560px; background: #fff; padding: 28px; border-radius: 12px; margin: 0 auto; border: 1px solid #EBE5DF;">
                    <div style="background: #C85A32; color: #FAF7F2; display: inline-block; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 13px;">SmartVyapari</div>
                    <h2 style="margin-top: 16px;">We received your AI audit request</h2>
                    <p style="line-height: 1.6; color: #554E4A;">Hi ${customerName},</p>
                    <p style="line-height: 1.6; color: #554E4A;">Thank you for requesting a free 30-minute AI operations audit with SmartVyapari. We have received your submission and are analyzing the bottlenecks you described.</p>
                    <div style="background: #FAF7F2; border-left: 3px solid #C85A32; padding: 12px 16px; margin: 16px 0; font-size: 14px; color: #1E1A17;">
                        <strong>Submitted Bottleneck:</strong><br/>"${message}"
                    </div>
                    <p style="line-height: 1.6; color: #554E4A;">We will calculate your estimated hour & revenue savings and follow up from <strong>${SENDER_EMAIL}</strong> within 1 business day with direct scheduling options.</p>
                    <hr style="border: none; border-top: 1px solid #EBE5DF; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #8A817C;">SmartVyapari · Rajhans Belliza, Surat, Gujarat, India<br/><em>"We don't sell AI slop. We build systems that save revenue."</em></p>
                </div>
            </div>
        `;

        await fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${HOSTINGER_MAILBOX_ID}/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HOSTINGER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: [customerEmail],
                displayName: 'SmartVyapari',
                subject: 'Your AI Operations Audit Request Received — SmartVyapari',
                html: customerHtml,
                text: `Hi ${customerName},\n\nWe received your AI audit request for SmartVyapari. We will follow up from ${SENDER_EMAIL} within 1 business day.`,
            }),
        });

        // 2. Send Admin Alert to hello@smartvyapari.online
        await fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${HOSTINGER_MAILBOX_ID}/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HOSTINGER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: [SENDER_EMAIL],
                displayName: 'SmartVyapari Leads',
                subject: `🔥 New Lead: ${customerName} (${customerEmail})`,
                html: `<h3>New Lead Received</h3><p><strong>Name/Company:</strong> ${customerName}</p><p><strong>Email:</strong> ${customerEmail}</p><p><strong>Details:</strong> ${message}</p>`,
                text: `New lead from ${customerName} (${customerEmail}): ${message}`,
            }),
        });

        return new Response(JSON.stringify({ success: true, message: 'Emails dispatched successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
});
