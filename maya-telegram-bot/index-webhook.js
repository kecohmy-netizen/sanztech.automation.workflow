require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL; // e.g., https://your-domain.com/webhook

// Initialize bot WITHOUT polling (webhook mode)
const bot = new TelegramBot(BOT_TOKEN);

// Initialize express
const app = express();
app.use(express.json());

console.log('🤖 Maya Telegram Bot starting in WEBHOOK mode...');

// Set webhook
if (WEBHOOK_URL) {
  bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`)
    .then(() => {
      console.log('✅ Webhook set successfully!');
      console.log(`📡 Webhook URL: ${WEBHOOK_URL}/bot${BOT_TOKEN}`);
    })
    .catch((error) => {
      console.error('❌ Failed to set webhook:', error.message);
    });
}

// Webhook endpoint
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    mode: 'webhook',
    bot: 'Maya Telegram Bot',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Import all bot handlers from main file
// (You can copy the bot.on() handlers here or require them)

app.listen(PORT, () => {
  console.log(`✅ Maya Telegram Bot is running in WEBHOOK mode!`);
  console.log(`📡 Server listening on port ${PORT}`);
  console.log(`\n💡 Make sure your WEBHOOK_URL is publicly accessible!`);
});
