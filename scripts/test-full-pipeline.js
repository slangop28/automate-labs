import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const API_KEY = process.env.VITE_HOSTINGER_MAIL_API_KEY;
const MAILBOX_ID = process.env.VITE_HOSTINGER_MAILBOX_ID;
const SENDER_EMAIL = 'hello@smartvyapari.online';

async function testFullAuditSubmission(testRecipientEmail) {
  if (!API_KEY || !MAILBOX_ID) {
    console.error('Missing API credentials in environment.');
    return;
  }

  console.log(`\n--- Testing Full Audit Booking Pipeline for: ${testRecipientEmail} ---`);
  
  const lead = {
    name: 'Test Prospect',
    email: testRecipientEmail,
    company: 'Test Company',
    phone: '+91 9999999999',
    message: 'Testing custom WhatsApp and lead routing automation pipeline.',
    source: 'Website Contact Form (Automated Test)',
    submitted_at: new Date().toISOString()
  };

  // 1. Send Customer Confirmation Email via Hostinger Agentic Mail API
  console.log(`1. Sending Auto-Reply to Customer (${lead.email})...`);
  const customerRes = await fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      to: [lead.email],
      displayName: 'SmartVyapari Automation',
      subject: 'Your AI Operations Audit Request Received — SmartVyapari',
      html: `
        <div style="font-family: sans-serif; padding: 24px; background: #FAF7F2; color: #1E1A17;">
          <div style="max-width: 560px; background: #fff; padding: 28px; border-radius: 12px; margin: 0 auto; border: 1px solid #EBE5DF;">
            <div style="background: #C85A32; color: #FAF7F2; display: inline-block; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 13px;">SmartVyapari</div>
            <h2 style="margin-top: 16px;">We received your audit request for ${lead.company}</h2>
            <p>Hi ${lead.name},</p>
            <p>Thank you for requesting a free 30-minute AI operations audit with SmartVyapari.</p>
            <div style="background: #FAF7F2; border-left: 3px solid #C85A32; padding: 12px 16px; margin: 16px 0; font-size: 14px;">
              <strong>Submitted Bottleneck:</strong><br/>"${lead.message}"
            </div>
            <p>We will calculate your estimated savings and follow up from <strong>${SENDER_EMAIL}</strong> within 1 business day.</p>
            <hr style="border: none; border-top: 1px solid #EBE5DF; margin: 20px 0;" />
            <p style="font-size: 12px; color: #8A817C;">SmartVyapari · Rajhans Belliza, Surat, Gujarat, India<br/><em>"We don't sell AI slop. We build systems that save revenue."</em></p>
          </div>
        </div>
      `,
      text: `Hi ${lead.name},\n\nWe received your audit request. We will follow up from ${SENDER_EMAIL} within 1 business day.`
    })
  });

  console.log('Customer Email Send Status:', customerRes.status, customerRes.status === 204 ? '✅ SUCCESS (Delivered!)' : '❌ FAILED');
}

testFullAuditSubmission(process.argv[2] || 'hello@smartvyapari.online');
