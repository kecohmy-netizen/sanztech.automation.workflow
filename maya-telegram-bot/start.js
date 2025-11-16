// Startup script with better error handling
require('dotenv').config();

// Check required environment variables
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('❌ ERROR: TELEGRAM_BOT_TOKEN not found in .env file!');
  console.log('\n📝 Please create a .env file with:');
  console.log('TELEGRAM_BOT_TOKEN=your_bot_token_here');
  console.log('\nGet your token from @BotFather on Telegram');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('🚀 Starting Maya Telegram Bot...\n');

// Start the main bot
try {
  require('./index.js');
} catch (error) {
  console.error('❌ Failed to start bot:', error.message);
  console.log('\n💡 Troubleshooting tips:');
  console.log('1. Check your internet connection');
  console.log('2. Verify your bot token is correct');
  console.log('3. Try restarting your router');
  console.log('4. Check if Telegram is accessible in your region');
  console.log('\nSee TROUBLESHOOTING.md for more help');
  process.exit(1);
}
