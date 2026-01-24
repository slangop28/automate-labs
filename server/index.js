const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
    const { name, email, message, company, phone } = req.body;

    console.log('--- New Contact Submission ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Company:', company);
    console.log('Phone:', phone);
    console.log('Message:', message);
    console.log('------------------------------');

    // Simulate database delay
    setTimeout(() => {
        if (name && email && message) {
            res.status(200).json({ success: true, message: 'Submission received' });
        } else {
            res.status(400).json({ success: false, message: 'Missing required fields' });
        }
    }, 1000);
});

app.post('/api/audit', (req, res) => {
    const data = req.body;

    console.log('--- New Audit Request ---');
    console.log('Client:', data.fullName);
    console.log('Company:', data.companyName);
    console.log('Objective:', data.objective);
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('-------------------------');

    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Audit request received' });
    }, 1500);
});

app.post('/api/callback', (req, res) => {
    const data = req.body;
    console.log('--- New Callback Request ---');
    console.log('Name:', data.name);
    console.log('Phone:', data.phone);
    console.log('Query:', data.query);
    console.log('----------------------------');

    setTimeout(() => {
        res.status(200).json({ success: true });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
