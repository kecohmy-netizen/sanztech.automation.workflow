# 🤖 Setup Gemini AI untuk Maya

## Kenapa Gemini?
- ✅ **100% FREE** - No credit card needed!
- ✅ **Powerful** - Same level as GPT-3.5
- ✅ **Fast** - Quick responses
- ✅ **Generous limits** - 60 requests per minute

---

## 🚀 Get Gemini API Key (2 Minit!)

### Step 1: Go to Google AI Studio
```
https://makersuite.google.com/app/apikey
```

### Step 2: Sign in
- Use your Google account
- No payment info needed!

### Step 3: Create API Key
1. Click **"Get API Key"** or **"Create API Key"**
2. Select **"Create API key in new project"**
3. Copy your API key

### Step 4: Add to .env
```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Step 5: Restart Bot
```bash
# Stop current bot (Ctrl+C)
npm start
```

---

## 🎯 Test Maya

Send messages to your bot:

```
You: Hey Maya, how's everything?

Maya: Hey bro! Everything's running smooth! 
Your automation is doing great - 12 workflows 
active and RM 567 revenue today. Pretty solid! 
Need me to check anything specific? 😊
```

---

## 💬 Maya's Personality

With Gemini, Maya will:
- Chat naturally like a friend
- Use Malay slang (bro, la, kan)
- Remember conversation context
- Give personalized advice
- Be enthusiastic and helpful
- Respond like a human, not a robot

---

## 🔄 Fallback System

Maya has 3 levels:

1. **Gemini AI** (Primary) - Natural conversations
2. **OpenRouter** (Optional) - GPT-4, Claude when you topup
3. **Smart Responses** (Fallback) - Pre-programmed responses

If Gemini fails, automatically falls back to smart responses!

---

## 💰 Upgrade to OpenRouter (Later)

When you want GPT-4 or Claude:

### Step 1: Get OpenRouter Key
```
https://openrouter.ai/keys
```

### Step 2: Add to .env
```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
```

### Step 3: Topup Credits
- Minimum: $5
- GPT-3.5: $0.002 per 1K tokens
- GPT-4: $0.03 per 1K tokens
- Claude: $0.008 per 1K tokens

---

## 🎨 Customize Maya's Personality

Edit `MAYA_CONTEXT` in `index.js`:

```javascript
const MAYA_CONTEXT = `You are Maya...

Your personality:
- [Add your custom traits]
- [Adjust tone and style]
- [Add specific knowledge]
`;
```

---

## 📊 API Limits

### Gemini (FREE)
- 60 requests per minute
- 1,500 requests per day
- More than enough for personal use!

### OpenRouter (Paid)
- No rate limits
- Pay per use
- Access to GPT-4, Claude, etc.

---

## 🐛 Troubleshooting

### "API key not valid"
1. Check if key is correct in `.env`
2. Make sure no extra spaces
3. Restart bot

### "Quota exceeded"
- Wait 1 minute (rate limit)
- Or upgrade to OpenRouter

### Bot not responding naturally
1. Check if `GEMINI_API_KEY` is set
2. Look at console for errors
3. Bot will fallback to smart responses if Gemini fails

---

## 🎯 Example Conversations

### Natural Chat
```
You: Bro, macam mana automation aku hari ni?

Maya: Weh, smooth je bro! Semua workflows running 
nicely. Dah complete 156 tasks today, revenue pun 
dah RM 567. Your Collection Baju Budak tu memang 
hot - RM 1,250 already! Keep it up la 🔥
```

### Technical Questions
```
You: Can you optimize my TikTok posting schedule?

Maya: Good idea! Based on your analytics, I see 
your posts get 40% more engagement between 7-9pm. 
Want me to adjust your auto-post timing to hit 
those peak hours? Could boost your clicks significantly!
```

### Casual Check-in
```
You: Everything okay?

Maya: Yeah bro, all good! Your automation is 
humming along nicely. 12 workflows active, no 
errors, and you're making money while you chill 😎 
Need anything specific or just checking in?
```

---

## 🚀 Ready!

1. ✅ Get Gemini API key
2. ✅ Add to `.env`
3. ✅ Restart bot
4. ✅ Chat naturally with Maya!

Maya sekarang macam human, bukan robot! 🎉

---

*Built by Adamsanz - Mind Hustler of KL*
*sanztech.online*
