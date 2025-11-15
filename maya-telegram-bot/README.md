# 🤖 Maya Telegram Bot

AI Assistant untuk automation workflow - communicate dengan Maya dari Telegram!

---

## 🚀 Quick Setup (5 Minit!)

### Step 1: Create Telegram Bot

1. **Open Telegram** dan search `@BotFather`
2. **Send command**: `/newbot`
3. **Follow instructions**:
   - Bot name: `Maya Automation Bot`
   - Username: `MayaAutomationBot` (or any available)
4. **Copy Bot Token** yang BotFather bagi

### Step 2: Install Dependencies

```bash
cd maya-telegram-bot
npm install
```

### Step 3: Configure Bot

1. **Copy `.env.example`** to `.env`:
```bash
copy .env.example .env
```

2. **Edit `.env`** dan paste bot token kau:
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
PORT=3000
```

### Step 4: Run Bot

```bash
npm start
```

Atau untuk development (auto-reload):
```bash
npm run dev
```

### Step 5: Test Bot

1. **Open Telegram**
2. **Search** for your bot username
3. **Click "Start"**
4. **Send**: `/status`

Done! 🎉

---

## 💬 Available Commands

### System Commands
```
/start       - Welcome message & setup
/status      - Check system status
/help        - Show all commands
```

### Analytics Commands
```
/analytics   - View today's stats
/linkbio     - Link bio performance
/workflows   - Manage workflows
```

### Automation Commands
```
start automation  - Start all workflows
stop automation   - Stop all workflows
/create          - Create new workflow
/optimize        - Optimize system
```

### Natural Language
You can also chat naturally:
```
"How's my automation?"
"Show me today's revenue"
"What's the status?"
"Give me analytics"
```

---

## 📊 Example Conversations

### Check Status
```
You: /status

Maya: 📊 Maya System Status

✅ Automation: Running
⚡ Active workflows: 12
📈 Tasks completed today: 156
🎯 Success rate: 98.5%
💰 Revenue today: RM 567

All systems operational! 🚀
```

### View Analytics
```
You: /analytics

Maya: 📊 Today's Analytics

👁️ Views: 1,234 (↗️ +15%)
🖱️ Clicks: 189 (↗️ +8%)
✅ Conversions: 23
💰 Revenue: RM 567 (↗️ +22%)

📈 This Week
Total Revenue: RM 4,490
Conversions: 85

Great performance! 🎉
```

### Link Performance
```
You: /linkbio

Maya: 🔗 Link Bio Performance

👕 Collection Baju Budak
   RM 1,250 | 320 clicks
   
🚀 Template Automation
   RM 2,400 | 180 clicks
   
📱 TikTok Aku
   890 clicks
```

---

## 🛠️ Customization

### Add New Commands

Edit `index.js` and add to `getMayaResponse()`:

```javascript
function getMayaResponse(message) {
  const msg = message.toLowerCase();
  
  // Your new command
  if (msg.includes('/mycommand')) {
    return 'Your response here';
  }
  
  // ... rest of code
}
```

### Connect to Real Data

Replace mock data with real API calls:

```javascript
// Example: Get real status from your API
async function getMayaResponse(message) {
  if (message.includes('/status')) {
    const response = await fetch('http://localhost:5173/api/status');
    const data = await response.json();
    return formatStatusMessage(data);
  }
}
```

---

## 🚀 Deployment

### Option 1: Heroku (Free)

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create maya-telegram-bot

# Set environment variables
heroku config:set TELEGRAM_BOT_TOKEN=your_token

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### Option 2: Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up

# Set environment variables in Railway dashboard
```

### Option 3: VPS (DigitalOcean, AWS, etc.)

```bash
# SSH to server
ssh user@your-server

# Clone repo
git clone your-repo
cd maya-telegram-bot

# Install dependencies
npm install

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start index.js --name maya-bot

# Save PM2 config
pm2 save
pm2 startup
```

---

## 🔐 Security

### Best Practices

1. **Never commit `.env`** to git
2. **Use environment variables** for secrets
3. **Validate user input**
4. **Rate limit** commands
5. **Log all activities**

### Add to `.gitignore`

```
node_modules/
.env
*.log
```

---

## 📝 Environment Variables

```env
# Required
TELEGRAM_BOT_TOKEN=your_bot_token

# Optional
PORT=3000
NODE_ENV=production
WEBHOOK_URL=https://your-domain.com/webhook

# API Endpoints (if connecting to backend)
API_BASE_URL=http://localhost:5173/api
API_KEY=your_api_key
```

---

## 🐛 Troubleshooting

### Bot not responding?

1. **Check token** in `.env`
2. **Verify bot is running**: `npm start`
3. **Check logs** for errors
4. **Test with** `/start` command

### Polling error?

```bash
# Stop all node processes
pkill node

# Restart bot
npm start
```

### Can't find bot?

1. **Check username** with @BotFather
2. **Make sure bot is public** (not private)
3. **Search exact username** in Telegram

---

## 📊 Monitoring

### Check Bot Status

```bash
# View logs
npm start

# Or with PM2
pm2 logs maya-bot

# Check status
pm2 status
```

### Health Check

```bash
# Local
curl http://localhost:3000/health

# Production
curl https://your-domain.com/health
```

---

## 🎯 Features

- ✅ Natural language processing
- ✅ Command handling
- ✅ Real-time responses
- ✅ System status monitoring
- ✅ Analytics tracking
- ✅ Workflow management
- ✅ Error handling
- ✅ Graceful shutdown
- ✅ Health check endpoint

---

## 📚 Resources

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)

---

## 🤝 Support

Need help?
- Check logs: `npm start`
- Test commands: `/help`
- Contact: support@sanztech.online

---

## 📄 License

MIT License - Free to use and modify!

---

*Built by Adamsanz - Mind Hustler of KL*
*sanztech.online*
