require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3000;

console.log('🤖 Maya Telegram Bot starting (Resilient Mode)...');

// Initialize bot with VERY conservative polling
let bot;
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

function createBot() {
  if (bot) {
    try {
      bot.stopPolling();
    } catch (e) {
      // Ignore errors when stopping
    }
  }

  bot = new TelegramBot(BOT_TOKEN, { 
    polling: {
      interval: 3000, // Poll every 3 seconds (very conservative)
      autoStart: false, // Manual start for better control
      params: {
        timeout: 20 // Longer timeout
      }
    },
    request: {
      agentOptions: {
        keepAlive: true,
        keepAliveMsecs: 30000,
        timeout: 30000
      },
      family: 4 // Force IPv4 (sometimes helps)
    },
    filepath: false // Disable file downloads initially
  });

  setupBotHandlers();
  
  // Start polling with error handling
  bot.startPolling()
    .then(() => {
      console.log('✅ Polling started successfully!');
      isConnected = true;
      reconnectAttempts = 0;
    })
    .catch((error) => {
      console.error('❌ Failed to start polling:', error.message);
      handleReconnect();
    });

  // Handle polling errors
  bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error.code, error.message);
    
    if (error.code === 'EFATAL' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
      console.log('🔄 Network error detected. Will attempt reconnect...');
      isConnected = false;
      handleReconnect();
    }
  });

  return bot;
}

function handleReconnect() {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error(`❌ Max reconnect attempts (${MAX_RECONNECT_ATTEMPTS}) reached.`);
    console.log('💡 Please check:');
    console.log('   1. Your internet connection');
    console.log('   2. If Telegram is accessible in your region');
    console.log('   3. Your bot token is correct');
    console.log('\n   Restart the bot to try again.');
    return;
  }

  reconnectAttempts++;
  const delay = Math.min(5000 * reconnectAttempts, 30000); // Max 30s delay
  
  console.log(`⏳ Reconnecting in ${delay/1000}s (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
  
  setTimeout(() => {
    console.log('🔄 Attempting to reconnect...');
    createBot();
  }, delay);
}

function setupBotHandlers() {
  // Handle /start command
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'there';
    
    bot.sendMessage(chatId, `👋 Hi ${firstName}! Maya bot is running!\n\nSend me a message to test.`);
  });

  // Handle all messages
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if (!text || text.startsWith('/start')) return;
    
    console.log(`📨 Message from ${msg.from.first_name}: ${text}`);
    
    // Simple echo for testing
    bot.sendMessage(chatId, `Got your message: "${text}"\n\n✅ Bot is working!`);
  });
}

// Initialize express for health check
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: isConnected ? 'connected' : 'disconnected',
    bot: 'Maya Telegram Bot (Resilient)',
    uptime: process.uptime(),
    reconnectAttempts,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: isConnected ? 'ok' : 'degraded',
    connected: isConnected
  });
});

app.listen(PORT, () => {
  console.log(`📡 Server listening on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}`);
});

// Create and start bot
createBot();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Maya bot...');
  if (bot) {
    bot.stopPolling();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down Maya bot...');
  if (bot) {
    bot.stopPolling();
  }
  process.exit(0);
});
