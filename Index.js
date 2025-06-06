const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/webhook', (req, res) => {
  let body = req.body;
  console.log('🔔 Received webhook:');
  console.dir(body, { depth: null });

  if (body.object === 'page') {
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN";
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log('✅ WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
