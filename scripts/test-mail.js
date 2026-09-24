import 'dotenv/config';

const API_KEY = process.env.VITE_HOSTINGER_MAIL_API_KEY;
const MAILBOX_ID = process.env.VITE_HOSTINGER_MAILBOX_ID;

async function testSend() {
  if (!API_KEY || !MAILBOX_ID) {
    console.error('Missing VITE_HOSTINGER_MAIL_API_KEY or VITE_HOSTINGER_MAILBOX_ID in environment.');
    process.exit(1);
  }

  console.log('Sending test email via Hostinger Agentic Mail API...');
  try {
    const res = await fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        to: ['hello@smartvyapari.online'],
        displayName: 'SmartVyapari Automation',
        subject: '✅ SmartVyapari Auto-Responder System Verified',
        html: '<div style="font-family: sans-serif; padding: 20px;"><h2 style="color: #C85A32;">Auto-Responder Live</h2><p>Your Hostinger Agentic Mail API integration is active and verified for <strong>hello@smartvyapari.online</strong>.</p></div>',
        text: 'Your Hostinger Agentic Mail API integration is active and verified for hello@smartvyapari.online.',
      }),
    });

    console.log('HTTP Status:', res.status);
    if (res.status === 204 || res.ok) {
      console.log('SUCCESS: Email sent and stored in INBOX.Sent!');
    } else {
      const body = await res.text();
      console.error('API Error Response:', body);
    }
  } catch (err) {
    console.error('Network Error:', err);
  }
}

testSend();
