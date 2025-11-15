# 📱 WhatsApp & Telegram Integration Guide

## Overview
Guide ni untuk integrate WhatsApp Business API dan Telegram Bot dengan Maya automation system kau.

---

## 🟢 WhatsApp Integration

### Option 1: WhatsApp Business API (Official - Recommended)

#### Requirements:
- Meta Business Account
- WhatsApp Business Account
- Verified phone number
- Facebook Developer Account

#### Setup Steps:

**1. Create Meta Business Account**
```
1. Go to: https://business.facebook.com/
2. Create Business Account
3. Verify your business
```

**2. Setup WhatsApp Business API**
```
1. Go to: https://developers.facebook.com/
2. Create New App
3. Select "Business" type
4. Add WhatsApp product
5. Get Phone Number ID & Access Token
```

**3. Configure Webhook**
```javascript
// In your backend (Node.js/Express example)
const express = require('express');
const app = express();

// Webhook verification
app.get('/webhook/whatsapp', (req, res) => {
  const VERIFY_TOKEN = 'your_verify_token';
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receive messages
app.post('/webhook/whatsapp', (req, res) => {
  const body = req.body;
  
  if (body.object === 'whatsapp_business_account') {
    body.entry.forEach(entry => {
      const changes = entry.changes[0];
      const value = changes.value;
      
      if (value.messages) {
        const message = value.messages[0];
        const from = message.from;
        const text = message.text.body;
        
        // Process message dengan Maya
        processMayaMessage(from, text);
      }
    });
    
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
```

**4. Send Messages**
```javascript
const axios = require('axios');

async function sendWhatsAppMessage(to, message) {
  const PHONE_NUMBER_ID = 'your_phone_number_id';
  const ACCESS_TOKEN = 'your_access_token';
  
  const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
  
  const data = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: {
      body: message
    }
  };
  
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Usage
sendWhatsAppMessage('60123456789', 'Hello from Maya!');
```

**5. Update Maya Service**
```typescript
// src/services/mayaPhoneService.ts

async setupWhatsApp(config: {
  phoneNumberId: string;
  accessToken: string;
  webhookVerifyToken: string;
}): Promise<void> {
  // Save config
  localStorage.setItem('whatsapp_config', JSON.stringify(config));
  
  console.log('✅ WhatsApp configured');
}

async sendWhatsApp(phoneNumber: string, message: string): Promise<PhoneMessage> {
  const config = JSON.parse(localStorage.getItem('whatsapp_config') || '{}');
  
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${config.phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: message }
      })
    }
  );
  
  return await response.json();
}
```

---

### Option 2: Twilio WhatsApp API (Easier Setup)

#### Requirements:
- Twilio Account
- Credit card for verification
- Phone number

#### Setup Steps:

**1. Create Twilio Account**
```
1. Go to: https://www.twilio.com/
2. Sign up for free trial
3. Get $15 free credit
```

**2. Setup WhatsApp Sandbox**
```
1. Go to: Console > Messaging > Try it out > Send a WhatsApp message
2. Follow instructions to join sandbox
3. Get your Twilio number
```

**3. Install Twilio SDK**
```bash
npm install twilio
```

**4. Send Messages**
```javascript
const twilio = require('twilio');

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

async function sendWhatsAppMessage(to, message) {
  try {
    const msg = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: `whatsapp:${to}`,
      body: message
    });
    
    console.log('Message sent:', msg.sid);
    return msg;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
sendWhatsAppMessage('+60123456789', 'Hello from Maya!');
```

**5. Setup Webhook**
```javascript
app.post('/webhook/twilio-whatsapp', (req, res) => {
  const from = req.body.From.replace('whatsapp:', '');
  const message = req.body.Body;
  
  // Process dengan Maya
  processMayaMessage(from, message);
  
  res.sendStatus(200);
});
```

---

## 💬 Telegram Integration

### Setup Telegram Bot

#### Requirements:
- Telegram account
- BotFather access

#### Setup Steps:

**1. Create Bot with BotFather**
```
1. Open Telegram
2. Search for @BotFather
3. Send: /newbot
4. Follow instructions
5. Get your Bot Token
```

**2. Install Telegram Bot SDK**
```bash
npm install node-telegram-bot-api
```

**3. Create Bot Service**
```javascript
const TelegramBot = require('node-telegram-bot-api');

const token = 'your_bot_token';
const bot = new TelegramBot(token, { polling: true });

// Receive messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  console.log(`Received: ${text} from ${chatId}`);
  
  // Process dengan Maya
  const response = processMayaMessage(chatId, text);
  
  // Send response
  bot.sendMessage(chatId, response);
});

// Send message
async function sendTelegramMessage(chatId, message) {
  try {
    await bot.sendMessage(chatId, message);
    console.log('Message sent to:', chatId);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to Maya! How can I help you?');
});

bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  const status = getMayaStatus();
  bot.sendMessage(chatId, status);
});
```

**4. Setup Webhook (Production)**
```javascript
const express = require('express');
const app = express();

const TELEGRAM_TOKEN = 'your_bot_token';
const WEBHOOK_URL = 'https://your-domain.com/webhook/telegram';

// Set webhook
fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: WEBHOOK_URL })
});

// Receive updates
app.post('/webhook/telegram', (req, res) => {
  const update = req.body;
  
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    
    // Process dengan Maya
    const response = processMayaMessage(chatId, text);
    
    // Send response
    sendTelegramMessage(chatId, response);
  }
  
  res.sendStatus(200);
});
```

**5. Update Maya Service**
```typescript
// src/services/mayaPhoneService.ts

async setupTelegram(config: {
  botToken: string;
  webhookUrl?: string;
}): Promise<void> {
  // Save config
  localStorage.setItem('telegram_config', JSON.stringify(config));
  
  // Set webhook if provided
  if (config.webhookUrl) {
    await fetch(`https://api.telegram.org/bot${config.botToken}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: config.webhookUrl })
    });
  }
  
  console.log('✅ Telegram configured');
}

async sendTelegram(chatId: string, message: string): Promise<PhoneMessage> {
  const config = JSON.parse(localStorage.getItem('telegram_config') || '{}');
  
  const response = await fetch(
    `https://api.telegram.org/bot${config.botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    }
  );
  
  return await response.json();
}
```

---

## 🔗 Integration with Maya

### Backend Setup (Node.js/Express)

**1. Create Backend Server**
```bash
mkdir maya-backend
cd maya-backend
npm init -y
npm install express body-parser axios node-telegram-bot-api twilio
```

**2. Create Server**
```javascript
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Config
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;

// Telegram Bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Twilio Client
const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);

// Maya Message Processor
function processMayaMessage(platform, from, message) {
  // Your Maya AI logic here
  const response = `Maya received: ${message}`;
  return response;
}

// Telegram Webhook
app.post('/webhook/telegram', (req, res) => {
  const update = req.body;
  
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    
    const response = processMayaMessage('telegram', chatId, text);
    bot.sendMessage(chatId, response);
  }
  
  res.sendStatus(200);
});

// WhatsApp Webhook (Twilio)
app.post('/webhook/whatsapp', (req, res) => {
  const from = req.body.From.replace('whatsapp:', '');
  const message = req.body.Body;
  
  const response = processMayaMessage('whatsapp', from, message);
  
  twilioClient.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${from}`,
    body: response
  });
  
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Maya backend running on port ${PORT}`);
});
```

**3. Deploy Backend**
```bash
# Using Heroku
heroku create maya-backend
git push heroku main

# Or using Railway
railway init
railway up

# Or using Vercel
vercel deploy
```

---

## 🚀 Quick Start (Easiest Way)

### Using Twilio + Telegram

**1. Setup Twilio WhatsApp**
```bash
# Sign up: https://www.twilio.com/
# Get credentials from console
# Join sandbox: Console > Messaging > Try WhatsApp
```

**2. Setup Telegram Bot**
```bash
# Talk to @BotFather on Telegram
# Send: /newbot
# Get bot token
```

**3. Create Simple Backend**
```javascript
// index.js
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const twilio = require('twilio');

const app = express();
app.use(express.json());

// Config
const bot = new TelegramBot('YOUR_TELEGRAM_TOKEN', { polling: true });
const twilioClient = twilio('YOUR_TWILIO_SID', 'YOUR_TWILIO_TOKEN');

// Maya AI Response
function getMayaResponse(message) {
  // Simple responses
  if (message.includes('status')) {
    return '✅ All systems running!';
  }
  if (message.includes('help')) {
    return 'Commands: status, analytics, workflows';
  }
  return 'Hi! I\'m Maya. How can I help?';
}

// Telegram
bot.on('message', (msg) => {
  const response = getMayaResponse(msg.text);
  bot.sendMessage(msg.chat.id, response);
});

// WhatsApp
app.post('/whatsapp', (req, res) => {
  const from = req.body.From.replace('whatsapp:', '');
  const response = getMayaResponse(req.body.Body);
  
  twilioClient.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${from}`,
    body: response
  });
  
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Maya running on port 3000'));
```

**4. Run**
```bash
node index.js
```

---

## 📝 Environment Variables

Create `.env` file:
```env
# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# WhatsApp Business API (if using)
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_VERIFY_TOKEN=your_verify_token

# Server
PORT=3000
WEBHOOK_URL=https://your-domain.com
```

---

## 🔐 Security Best Practices

1. **Never commit tokens** to git
2. **Use environment variables** for secrets
3. **Validate webhook signatures**
4. **Use HTTPS** for webhooks
5. **Rate limit** API calls
6. **Sanitize user input**

---

## 💰 Costs

### WhatsApp Business API
- Free tier: 1,000 conversations/month
- After: ~$0.005 - $0.09 per conversation

### Twilio WhatsApp
- Free trial: $15 credit
- After: $0.005 per message

### Telegram
- **100% FREE** - No limits!

---

## 🎯 Recommended Approach

**For Testing:**
- Use Telegram (free & easy)
- Use Twilio WhatsApp Sandbox (free trial)

**For Production:**
- Telegram for power users
- WhatsApp Business API for mainstream users
- Twilio WhatsApp for quick setup

---

## 📞 Support

Need help? Check:
- Telegram Bot API: https://core.telegram.org/bots/api
- Twilio Docs: https://www.twilio.com/docs/whatsapp
- WhatsApp Business API: https://developers.facebook.com/docs/whatsapp

---

*Built by Adamsanz - Mind Hustler of KL*
*sanztech.online*
