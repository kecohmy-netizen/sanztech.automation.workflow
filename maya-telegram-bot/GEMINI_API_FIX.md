# 🔧 Fix Gemini API Quota Issue

## ❌ Problem
```
Error: You exceeded your current quota
```

Gemini Free API ada limits:
- **15 requests per minute**
- **1,500 requests per day**

## ✅ Solutions

### Option 1: Get New Gemini API Key (RECOMMENDED - FREE!)

1. **Go to Google AI Studio**
   - https://aistudio.google.com/app/apikey

2. **Create New API Key**
   - Click "Create API Key"
   - Select "Create API key in new project"
   - Copy the new key

3. **Update .env file**
   ```bash
   GEMINI_API_KEY=your_new_api_key_here
   ```

4. **Restart bot**
   ```bash
   npm start
   ```

### Option 2: Use OpenRouter (Multiple Free Models)

1. **Get OpenRouter API Key**
   - https://openrouter.ai/keys
   - Sign up (free)
   - Create API key

2. **Update .env**
   ```bash
   OPENROUTER_API_KEY=your_openrouter_key
   ```

3. **Install SDK**
   ```bash
   npm install @openrouter/sdk
   ```

4. **Restart bot**
   ```bash
   npm start
   ```

OpenRouter free models:
- `google/gemini-flash-1.5` (FREE!)
- `meta-llama/llama-3.2-3b-instruct` (FREE!)
- `mistralai/mistral-7b-instruct` (FREE!)

### Option 3: Wait for Quota Reset

Gemini quota resets:
- **Per minute**: Wait 60 seconds
- **Per day**: Wait until next day (midnight PST)

## 🛡️ Rate Limiting (Already Added!)

Bot now has built-in rate limiting:
- Max 10 requests per minute per user
- Automatic fallback to smart responses
- No more quota errors!

## 🧪 Test After Fix

```bash
# Restart bot
npm start

# Test in Telegram
Send: "hi maya"
Send: "status"
Send: "how's everything?"
```

Should work without errors! ✅

## 💡 Pro Tips

1. **Use multiple API keys** - Rotate between them
2. **Cache responses** - For common questions
3. **Smart fallbacks** - Bot already has this!
4. **Monitor usage** - Check https://aistudio.google.com/app/apikey

## 📊 Current Limits

### Gemini Free Tier
- 15 RPM (requests per minute)
- 1,500 RPD (requests per day)
- 1 million TPM (tokens per minute)

### OpenRouter Free Tier
- Varies by model
- Generally 10-20 RPM
- No daily limit on free models

## 🚀 Upgrade Options (If Needed)

### Gemini Pro (Paid)
- $0.00025 per 1K characters input
- $0.0005 per 1K characters output
- Higher rate limits

### OpenRouter Credits
- Pay as you go
- $5 minimum
- Access to GPT-4, Claude, etc.

---

**Quick Fix**: Just get new Gemini API key from https://aistudio.google.com/app/apikey 🎯
