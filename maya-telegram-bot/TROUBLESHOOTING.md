# Maya Telegram Bot - Troubleshooting Guide

## ECONNRESET / EFATAL Error

This error occurs when the bot loses connection to Telegram servers. Here's how to fix it:

### Quick Fixes

1. **Check your internet connection**
   - Make sure you have stable internet
   - Try pinging telegram.org: `ping telegram.org`

2. **Restart the bot**
   ```bash
   # Stop the bot (Ctrl+C)
   # Then restart
   npm start
   ```

3. **Check if Telegram is blocked**
   - Some networks/countries block Telegram
   - Try using a VPN if needed

4. **Verify your bot token**
   - Make sure TELEGRAM_BOT_TOKEN in .env is correct
   - Get it from @BotFather on Telegram

### Advanced Solutions

#### Option 1: Use Webhook Instead of Polling (Recommended for Production)

Webhooks are more reliable than polling:

1. Deploy your bot to a public server (Vercel, Railway, etc.)
2. Set WEBHOOK_URL in .env
3. Use webhook mode:
   ```bash
   node index-webhook.js
   ```

#### Option 2: Adjust Polling Settings

The bot now has better polling configuration:
- Polls every 2 seconds (less aggressive)
- Auto-reconnects on network errors
- Keeps connections alive

#### Option 3: Use a Proxy

If Telegram is blocked in your region:

```javascript
const bot = new TelegramBot(BOT_TOKEN, { 
  polling: true,
  request: {
    proxy: 'http://your-proxy:port'
  }
});
```

### Monitoring

The bot now includes:
- Auto-recovery from network errors
- Connection monitoring (warns if no activity for 30s)
- Better error logging

### Still Having Issues?

1. Check bot logs for specific error messages
2. Verify firewall isn't blocking port 443 (Telegram API)
3. Try running on a different network
4. Consider using webhook mode for production

## Other Common Issues

### Bot Not Responding

- Check if bot is running: `ps aux | grep node`
- Verify bot token is correct
- Make sure you started the bot with /start command

### Voice Messages Not Working

- Requires GEMINI_API_KEY in .env
- Get free API key from: https://makersuite.google.com/app/apikey

### Rate Limiting

- Gemini API: 10 requests per minute per user
- Bot will automatically use fallback responses if rate limited
