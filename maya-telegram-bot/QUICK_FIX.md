# Quick Fix for ECONNRESET Error

## The Problem
Your bot is getting `ECONNRESET` errors when trying to connect to Telegram servers. This is usually a network connectivity issue.

## Solution Options (Try in Order)

### Option 1: Use Resilient Mode (Recommended)
This version has automatic reconnection and better error handling:

```bash
# Stop current bot (Ctrl+C if running)
# Then start resilient mode:
npm run start:resilient
```

This mode will:
- ✅ Automatically reconnect on network errors
- ✅ Use conservative polling (less aggressive)
- ✅ Retry up to 5 times with increasing delays
- ✅ Show clear status messages

### Option 2: Check Your Network

1. **Test Telegram connectivity:**
   ```bash
   ping api.telegram.org
   ```

2. **Check if port 443 is open:**
   ```bash
   Test-NetConnection -ComputerName api.telegram.org -Port 443
   ```

3. **Try a different network** (mobile hotspot, different WiFi)

### Option 3: Verify Bot Token

1. Open Telegram and search for `@BotFather`
2. Send `/mybots`
3. Select your bot
4. Go to "API Token" and copy it
5. Update your `.env` file:
   ```
   TELEGRAM_BOT_TOKEN=your_correct_token_here
   ```

### Option 4: Use a VPN

If Telegram is blocked or restricted in your region:
1. Connect to a VPN
2. Restart the bot

### Option 5: Deploy to Cloud (Production Solution)

For production, use webhook mode on a cloud service:

**Free Options:**
- Railway.app
- Render.com
- Fly.io
- Vercel (with serverless functions)

**Steps:**
1. Deploy your bot to one of these services
2. Set `WEBHOOK_URL` in environment variables
3. Use: `npm run start:webhook`

## Testing the Fix

Once the bot starts successfully, you should see:
```
✅ Polling started successfully!
📡 Server listening on port 3000
```

Test it:
1. Open Telegram
2. Search for your bot (@MayaAutomationBot)
3. Send `/start`
4. Send any message

## Still Not Working?

### Check the logs:
```bash
# If using resilient mode, check:
curl http://localhost:3000
```

You should see:
```json
{
  "status": "connected",
  "bot": "Maya Telegram Bot (Resilient)",
  ...
}
```

### Common Issues:

**"Max reconnect attempts reached"**
- Your network can't reach Telegram servers
- Try VPN or different network

**"Polling error: 401 Unauthorized"**
- Bot token is wrong
- Get correct token from @BotFather

**"Polling error: 409 Conflict"**
- Bot is running in multiple places
- Stop all instances and start only one

## Need More Help?

See `TROUBLESHOOTING.md` for detailed solutions.

## Summary of Available Modes

```bash
npm start                  # Standard mode with validation
npm run start:polling      # Direct polling mode
npm run start:resilient    # Auto-reconnect mode (best for unstable networks)
npm run start:webhook      # Webhook mode (best for production)
```

Choose the mode that fits your situation!
