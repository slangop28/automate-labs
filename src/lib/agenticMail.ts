export interface AuditLead {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message?: string;
    source?: string;
    submitted_at?: string;
}

const API_KEY = (import.meta.env.VITE_HOSTINGER_MAIL_API_KEY as string) || 'c28c9500491e60a49b77c4bce9805f20640f8b6449c5e6faff8fea46501b0843';
const MAILBOX_ID = (import.meta.env.VITE_HOSTINGER_MAILBOX_ID as string) || 'ACe5aaa94104a63f283033e1e3f097';
const SENDER_EMAIL = (import.meta.env.VITE_HOSTINGER_SENDER_EMAIL as string) || 'hello@smartvyapari.online';
const API_BASE_URL = 'https://api.mail.hostinger.com/api/v1';

/**
 * Sends an email via Hostinger Agentic Mail API
 */
async function sendHostingerEmail({
    to,
    subject,
    html,
    text,
    displayName = 'SmartVyapari',
}: {
    to: string[];
    subject: string;
    html: string;
    text: string;
    displayName?: string;
}): Promise<boolean> {
    if (!API_KEY || !MAILBOX_ID) {
        console.warn('[SmartVyapari Mail] Agentic Mail API credentials not configured in environment.');
        return false;
    }

    console.info(`[SmartVyapari Mail] Dispatching email to ${to.join(', ')} via Hostinger Agentic Mail...`);

    try {
        const response = await fetch(`${API_BASE_URL}/mailboxes/${MAILBOX_ID}/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                to,
                displayName,
                subject,
                html,
                text,
            }),
        });

        if (response.status === 204 || response.ok) {
            return true;
        } else {
            const errData = await response.text();
            console.error('[SmartVyapari Mail] Error sending email via Hostinger API:', response.status, errData);
            return false;
        }
    } catch (err) {
        console.error('[SmartVyapari Mail] Network exception while sending email:', err);
        return false;
    }
}

/**
 * Dispatches a branded auto-reply email to the customer who booked the audit.
 */
export async function sendCustomerAuditConfirmation(lead: AuditLead): Promise<boolean> {
    const customerName = lead.name || 'there';
    const companyText = lead.company ? ` for ${lead.company}` : '';
    const messageContext = lead.message ? `<blockquote style="border-left: 3px solid #C85A32; padding-left: 12px; margin: 16px 0; color: #554E4A; font-style: italic;">"${lead.message}"</blockquote>` : '';

    const subject = `Your AI Operations Audit Request Received — SmartVyapari`;

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; color: #1E1A17; margin: 0; padding: 24px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 16px; border: 1px solid #EBE5DF; overflow: hidden; padding: 36px;">
                    <!-- Header -->
                    <tr>
                        <td>
                            <div style="display: inline-block; background-color: #C85A32; color: #FAF7F2; font-weight: bold; font-size: 14px; padding: 6px 14px; border-radius: 8px; margin-bottom: 20px;">
                                SmartVyapari
                            </div>
                            <h1 style="font-size: 24px; font-weight: 700; color: #1E1A17; margin: 0 0 12px 0;">
                                We received your audit request${companyText}
                            </h1>
                            <p style="font-size: 15px; line-height: 1.6; color: #554E4A; margin: 0 0 20px 0;">
                                Hi ${customerName},<br><br>
                                Thank you for reaching out to <strong>SmartVyapari</strong>. We have received your request for a free 30-minute AI operations audit.
                            </p>
                        </td>
                    </tr>

                    <!-- What happens next box -->
                    <tr>
                        <td style="background-color: #FAF7F2; border-radius: 12px; padding: 20px; margin: 16px 0;">
                            <h3 style="font-size: 15px; font-weight: 600; color: #C85A32; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                What happens next:
                            </h3>
                            <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.7; color: #1E1A17;">
                                <li><strong>Workflow Diagnosis:</strong> We review the operational bottleneck you submitted${messageContext}</li>
                                <li><strong>ROI Estimation:</strong> We calculate estimated hours and revenue saved by automating it with custom AI systems.</li>
                                <li><strong>Audit Call Scheduling:</strong> Our engineering team will follow up from <a href="mailto:${SENDER_EMAIL}" style="color: #C85A32; text-decoration: none; font-weight: 600;">${SENDER_EMAIL}</a> within 1 business day with direct scheduling times.</li>
                            </ol>
                        </td>
                    </tr>

                    <!-- Positioning & Contact -->
                    <tr>
                        <td style="padding-top: 24px;">
                            <p style="font-size: 14px; line-height: 1.6; color: #554E4A; margin: 0 0 16px 0;">
                                Need immediate assistance or have more details to share? Simply reply directly to this email or reach us on Instagram <a href="https://instagram.com/iamatul_28" style="color: #C85A32; text-decoration: none;">@iamatul_28</a>.
                            </p>
                            <hr style="border: none; border-top: 1px solid #EBE5DF; margin: 24px 0;" />
                            <p style="font-size: 13px; color: #8A817C; margin: 0; line-height: 1.5;">
                                <strong>SmartVyapari</strong> · Rajhans Belliza, Surat, Gujarat, India<br>
                                <em>"We don't sell AI slop. We build systems that save revenue."</em>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    const text = `Hi ${customerName},

Thank you for reaching out to SmartVyapari. We received your request for a free 30-minute AI operations audit${companyText}.

What happens next:
1. Workflow Diagnosis: We review your submitted bottleneck: "${lead.message || 'General Automation'}".
2. ROI Estimation: We calculate estimated hours and revenue saved by automating it.
3. Call Scheduling: We will reply from ${SENDER_EMAIL} within 1 business day with calendar options.

Best regards,
The SmartVyapari Team
Rajhans Belliza, Surat, Gujarat, India
"We don't sell AI slop. We build systems that save revenue."
`;

    return sendHostingerEmail({
        to: [lead.email],
        subject,
        html,
        text,
        displayName: 'SmartVyapari Automation',
    });
}

/**
 * Dispatches an instant lead alert to the admin team (hello@smartvyapari.online).
 */
export async function sendAdminLeadAlert(lead: AuditLead): Promise<boolean> {
    const subject = `🔥 New Audit Booking: ${lead.name || 'New Prospect'} (${lead.company || 'No Company'})`;

    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #1E1A17; padding: 20px; background-color: #F8F8F8;">
    <div style="max-width: 600px; background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #ddd;">
        <h2 style="color: #C85A32; margin-top: 0;">New Website Audit Booking</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px; font-weight: bold; width: 120px; border-bottom: 1px solid #eee;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${lead.phone}">${lead.phone || 'N/A'}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Source:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.source || 'Website Form'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Submitted:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.submitted_at || new Date().toISOString()}</td></tr>
        </table>
        <h3 style="margin-top: 16px; font-size: 14px; text-transform: uppercase; color: #666;">Process / Bottleneck:</h3>
        <div style="background: #FAF7F2; padding: 12px; border-radius: 8px; font-size: 14px; line-height: 1.5;">
            ${lead.message || 'No description provided.'}
        </div>
    </div>
</body>
</html>
    `;

    const text = `New Audit Booking Received:
Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company || 'N/A'}
Phone: ${lead.phone || 'N/A'}
Message: ${lead.message || 'N/A'}
Submitted at: ${lead.submitted_at || new Date().toISOString()}
`;

    return sendHostingerEmail({
        to: [SENDER_EMAIL],
        subject,
        html,
        text,
        displayName: 'SmartVyapari Lead Capture',
    });
}
