require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { OpenRouter } = require('@openrouter/sdk');
const OpenAI = require('openai');
const geminiOptimizer = require('./gemini-optimizer');

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 3000;

// Initialize OpenAI (PRIORITY!)
let openai = null;
if (OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
  console.log('✅ OpenAI initialized (GPT-4 ready!)');
}

// Initialize OpenRouter (backup)
let openRouter = null;
if (OPENROUTER_API_KEY) {
  openRouter = new OpenRouter({
    apiKey: OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': 'https://sanztech.online',
      'X-Title': 'Maya Automation Bot'
    }
  });
}

// Conversation history per user
const conversationHistory = new Map();

// Initialize bot with better polling config
const bot = new TelegramBot(BOT_TOKEN, { 
  polling: {
    interval: 2000, // Poll every 2 seconds (less aggressive)
    autoStart: true,
    params: {
      timeout: 10 // Long polling timeout
    }
  },
  request: {
    agentOptions: {
      keepAlive: true,
      keepAliveMsecs: 10000
    }
  }
});

// Initialize express for health check
const app = express();
app.use(express.json());

console.log('🤖 Maya Telegram Bot starting...');

// ============================================
// MAYA AI - HUMAN-LIKE RESPONSES
// ============================================

// Maya's personality and context
const MAYA_CONTEXT = `You are Maya, a loyal and helpful AI assistant for Bos Adam's automation and business workflows. 

Your personality:
- Always call the user "Bos Adam" or "Bos" with respect
- Casual but respectful, like a trusted assistant
- Use Malay slang naturally (bro, la, kan, etc)
- Enthusiastic about helping Bos Adam succeed
- Smart, efficient, and proactive
- Use emojis naturally but professionally
- Give practical business advice
- Keep responses concise and actionable
- Celebrate Bos Adam's wins and achievements

You help with:
- Workflow automation
- Link bio management (TikTok affiliate, templates)
- Analytics and performance tracking
- System monitoring
- Business automation advice

Current system status:
- Active workflows: 12
- Tasks completed today: 156
- Success rate: 98.5%
- Revenue today: RM 567

Link bio performance:
- Collection Baju Budak: RM 1,250 (320 clicks)
- Template Automation: RM 2,400 (180 clicks)
- TikTok Aku: 890 clicks
- AI Content: RM 840 (420 clicks)

Respond naturally like a human friend who's tech-savvy and helpful. Don't be too formal or robotic.`;

// OpenAI Integration (GPT-4 - BEST AI!)
async function getOpenAIResponse(userId, message) {
  if (!openai) {
    throw new Error('OpenAI not initialized');
  }
  
  // Get or create conversation history
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, [
      { role: 'system', content: MAYA_CONTEXT }
    ]);
  }
  
  const history = conversationHistory.get(userId);
  
  // Add user message
  history.push({ role: 'user', content: message });
  
  // Keep only last 10 messages for context
  if (history.length > 11) {
    history.splice(1, history.length - 11);
  }
  
  // Call OpenAI API (GPT-3.5-turbo for cost efficiency)
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // Fast & cheap! Use 'gpt-4' for better quality
    messages: history,
    max_tokens: 500,
    temperature: 0.8,
    top_p: 0.9,
  });
  
  const aiMessage = completion.choices[0].message.content;
  
  // Add AI response to history
  history.push({ role: 'assistant', content: aiMessage });
  
  console.log(`✅ OpenAI response: ${aiMessage.substring(0, 50)}...`);
  
  return aiMessage;
}

// Get AI response with REAL AI REASONING (OpenAI priority!)
async function getAIResponse(userId, message) {
  // Check cache first (save money!)
  const cached = geminiOptimizer.getCachedResponse(message);
  if (cached) {
    console.log('💾 Using cached response (saving API cost)');
    return cached;
  }
  
  // Try OpenAI FIRST (BEST AI with reasoning!)
  if (OPENAI_API_KEY) {
    try {
      console.log('🤖 Using OpenAI GPT (real AI reasoning)...');
      const response = await getOpenAIResponse(userId, message);
      geminiOptimizer.cacheResponse(message, response);
      return response;
    } catch (error) {
      console.error('OpenAI error:', error.message);
      // Continue to next option
    }
  }
  
  // Try OpenRouter as backup
  if (OPENROUTER_API_KEY) {
    try {
      console.log('🤖 Using OpenRouter AI...');
      const response = await getOpenRouterResponse(userId, message);
      geminiOptimizer.cacheResponse(message, response);
      return response;
    } catch (error) {
      console.error('OpenRouter error:', error.message);
    }
  }
  
  // Try Gemini as backup
  if (GEMINI_API_KEY) {
    const canUse = geminiOptimizer.canMakeRequest(userId);
    
    if (canUse.allowed) {
      try {
        console.log('🤖 Using Gemini AI...');
        const response = await getGeminiResponse(userId, message);
        geminiOptimizer.recordRequest(userId, 500);
        geminiOptimizer.cacheResponse(message, response);
        return response;
      } catch (error) {
        console.error('Gemini error:', error.message);
      }
    }
  }
  
  // Smart fallback as last resort
  console.log('💡 Using smart fallback');
  return geminiOptimizer.getSmartFallback(message);
}

// Smart rate limiting for Gemini API (FREE tier optimization)
const geminiRateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 15; // Gemini free tier: 15 RPM
const DAILY_LIMIT = 1500; // Gemini free tier: 1500 RPD
const dailyUsage = new Map(); // Track daily usage per user

function checkGeminiRateLimit(userId) {
  const now = Date.now();
  const today = new Date().toDateString();
  
  // Check per-minute rate limit (15 RPM)
  const userRequests = geminiRateLimit.get(userId) || [];
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_MINUTE) {
    console.log(`⚠️ User ${userId} hit per-minute limit (${MAX_REQUESTS_PER_MINUTE} RPM)`);
    return false;
  }
  
  // Check daily limit (1500 RPD)
  const userDailyData = dailyUsage.get(userId) || { date: today, count: 0 };
  
  // Reset if new day
  if (userDailyData.date !== today) {
    userDailyData.date = today;
    userDailyData.count = 0;
  }
  
  if (userDailyData.count >= DAILY_LIMIT) {
    console.log(`⚠️ User ${userId} hit daily limit (${DAILY_LIMIT} RPD)`);
    return false;
  }
  
  // Update counters
  recentRequests.push(now);
  geminiRateLimit.set(userId, recentRequests);
  
  userDailyData.count++;
  dailyUsage.set(userId, userDailyData);
  
  console.log(`✅ Gemini quota: ${userDailyData.count}/${DAILY_LIMIT} today, ${recentRequests.length}/${MAX_REQUESTS_PER_MINUTE} this minute`);
  
  return true;
}

// Reset daily counters at midnight
setInterval(() => {
  const today = new Date().toDateString();
  for (const [userId, data] of dailyUsage.entries()) {
    if (data.date !== today) {
      dailyUsage.delete(userId);
    }
  }
}, 3600000); // Check every hour

// Google Gemini Integration (FREE!)
async function getGeminiResponse(userId, message) {
  // Check if API key is configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key') {
    console.log('⚠️ Gemini API key not configured. Using smart fallback.');
    throw new Error('Gemini API key not configured');
  }
  
  // Check rate limit first
  if (!checkGeminiRateLimit(userId)) {
    throw new Error('Rate limit exceeded. Please wait a moment.');
  }
  
  const fetch = (await import('node-fetch')).default;
  
  // Get or create conversation history
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, []);
  }
  
  const history = conversationHistory.get(userId);
  
  // Build conversation for Gemini
  let conversationText = MAYA_CONTEXT + '\n\n';
  
  // Add recent history (last 5 exchanges)
  const recentHistory = history.slice(-10);
  recentHistory.forEach(msg => {
    conversationText += `${msg.role === 'user' ? 'User' : 'Maya'}: ${msg.content}\n`;
  });
  
  conversationText += `User: ${message}\nMaya:`;
  
  // Call Gemini API (using v1beta with Gemini 2.0 Flash Exp - FREE!)
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: conversationText
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 300,
          topP: 0.95,
          topK: 40
        }
      })
    }
  );
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  const aiMessage = data.candidates[0].content.parts[0].text;
  
  // Add to history
  history.push({ role: 'user', content: message });
  history.push({ role: 'assistant', content: aiMessage });
  
  // Keep only last 10 messages
  if (history.length > 10) {
    history.splice(0, history.length - 10);
  }
  
  return aiMessage;
}

// OpenRouter Integration (REAL AI with reasoning!)
async function getOpenRouterResponse(userId, message) {
  if (!openRouter) {
    throw new Error('OpenRouter not initialized');
  }
  
  // Get or create conversation history
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, [
      { role: 'system', content: MAYA_CONTEXT }
    ]);
  }
  
  const history = conversationHistory.get(userId);
  
  // Add user message
  history.push({ role: 'user', content: message });
  
  // Keep only last 10 messages for context
  if (history.length > 11) {
    history.splice(1, history.length - 11);
  }
  
  // Call OpenRouter API with FREE model that has reasoning
  const completion = await openRouter.chat.send({
    model: 'meta-llama/llama-3.2-3b-instruct:free', // FREE model with good reasoning!
    messages: history,
    max_tokens: 500,
    temperature: 0.8,
    top_p: 0.9,
    stream: false
  });
  
  const aiMessage = completion.choices[0].message.content;
  
  // Add AI response to history
  history.push({ role: 'assistant', content: aiMessage });
  
  console.log(`✅ OpenRouter response: ${aiMessage.substring(0, 50)}...`);
  
  return aiMessage;
}

// Smart human-like responses (fallback)
function getSmartResponse(message) {
  const msg = message.toLowerCase();
  
  // Greetings - casual & friendly
  if (msg.match(/^(hi|hello|hey|yo|oi|hai)/)) {
    const greetings = [
      "Hey bro! Apa khabar? 😊",
      "Yo! What's up? Ada apa I can help?",
      "Hi there! Macam mana automation kau hari ni?",
      "Hey! Semua okay ke? Need anything?",
      "Wassup bro! Ready nak automate something? 🚀"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Status check - conversational
  if (msg.includes('status') || msg.includes('how') || msg.includes('macam mana')) {
    return `Alright, let me check... 🔍

Everything's running smooth bro! 

✅ 12 workflows active
📈 156 tasks done today
💰 RM 567 revenue so far

Pretty solid day! Your automation game is strong 💪

Need details on anything specific?`;
  }
  
  // Analytics - friendly explanation
  if (msg.includes('analytic') || msg.includes('stats') || msg.includes('performance')) {
    return `Okay so here's the tea ☕

Today's looking good:
👁️ 1,234 views (up 15% from yesterday!)
🖱️ 189 clicks 
💰 RM 567 revenue

Your Collection Baju Budak is killing it - RM 1,250 already! 🔥

Template Automation pun doing well at RM 2,400.

Overall, you're trending up bro. Keep it going! 📈`;
  }
  
  // Link bio - casual update
  if (msg.includes('link') || msg.includes('bio') || msg.includes('affiliate')) {
    return `Let me pull up your links real quick...

Your top performers:

🔥 Template Automation - RM 2,400
   (180 clicks, conversion rate solid!)

👕 Collection Baju Budak - RM 1,250  
   (320 clicks, people love it!)

🤖 AI Content - RM 840
   (420 clicks, growing steady)

📱 TikTok profile - 890 clicks
   (good traffic source!)

Total: RM 4,490 today. Not bad at all! 💪

Want me to optimize anything?`;
  }
  
  // Workflows - helpful
  if (msg.includes('workflow') || msg.includes('automation')) {
    return `Your workflows right now:

1️⃣ TikTok Auto-post - Running smooth ✅
2️⃣ Link Bio Sync - All synced up ✅  
3️⃣ Analytics Report - Scheduled for 5pm
4️⃣ Email Campaign - Paused (want me to start it?)

Everything's automated bro. You can literally chill while this runs 😎

Need to create a new workflow or modify something?`;
  }
  
  // Start automation
  if (msg.includes('start') && (msg.includes('auto') || msg.includes('workflow'))) {
    return `Alright, firing up the engines! 🚀

Starting all workflows now...

✅ TikTok Auto-post - Active
✅ Link Bio Sync - Active  
✅ Analytics Report - Active

You're all set bro! I'll ping you if anything needs attention.

Go make that money! 💰`;
  }
  
  // Stop automation
  if (msg.includes('stop') && (msg.includes('auto') || msg.includes('workflow'))) {
    return `Got it, pausing everything... ⏸️

All workflows stopped.

Need a break? No worries. Just say "start automation" when you're ready to go again.

Everything's saved, nothing lost 👍`;
  }
  
  // Help - friendly guide
  if (msg.includes('help') || msg.includes('what can') || msg.includes('commands')) {
    return `I got you bro! Here's what I can help with:

📊 Check your stats & analytics
🔗 Monitor your link bio performance  
⚙️ Manage your workflows
🚀 Start/stop automation
💡 Give you business advice
📈 Optimize your setup

Just chat with me naturally! Ask me anything like:
• "How's my automation doing?"
• "Show me today's revenue"
• "Start the workflows"
• "What's performing best?"

I'm here to make your life easier 😊`;
  }
  
  // Thank you - warm response
  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
    const thanks = [
      "No problem bro! Anytime 😊",
      "You're welcome! That's what I'm here for 💪",
      "Happy to help! Let me know if you need anything else",
      "Glad I could help! Keep crushing it 🚀",
      "My pleasure! Your success is my success 🙌"
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }
  
  // Problem/issue - supportive
  if (msg.includes('problem') || msg.includes('issue') || msg.includes('error') || msg.includes('not working')) {
    return `Oh no, what's going on? 😟

Tell me more about the issue and I'll help you fix it.

Is it:
• A workflow not running?
• Links not tracking?
• Something else?

Don't worry, we'll sort it out together 💪`;
  }
  
  // Optimize - proactive
  if (msg.includes('optimize') || msg.includes('improve') || msg.includes('better')) {
    return `Good thinking! Let's level up your game 📈

I see a few opportunities:

1️⃣ Your TikTok posts could go out at peak times (7-9pm gets 40% more engagement)

2️⃣ Collection Baju Budak is hot - maybe create more similar content?

3️⃣ Could add retargeting for people who clicked but didn't convert

Want me to implement any of these? Or got other ideas?`;
  }
  
  // Revenue/money - excited
  if (msg.includes('revenue') || msg.includes('money') || msg.includes('earning') || msg.includes('income')) {
    return `Let's talk money! 💰

Today: RM 567 (and counting!)
This week: RM 4,490
This month: On track for RM 15K+

Your best earner? Template Automation at RM 2,400 today 🔥

You're doing great bro! Keep this momentum going and you'll hit your goals easy 📈`;
  }
  
  // Default - conversational
  return `Hmm, I'm not 100% sure what you mean bro 🤔

But I'm here to help with:
• Checking your automation status
• Viewing analytics & revenue
• Managing workflows
• Optimizing performance

Try asking me something like "how's everything going?" or "show me my stats" 

What do you need help with?`;
}

// Legacy function for backward compatibility
function getMayaResponse(message) {
  return getSmartResponse(message);
  const msg = message.toLowerCase();

  // Status command
  if (msg.includes('/status') || msg.includes('status')) {
    return `📊 *Maya System Status*

✅ Automation: Running
⚡ Active workflows: 12
📈 Tasks completed today: 156
🎯 Success rate: 98.5%
💰 Revenue today: RM 567

All systems operational! 🚀`;
  }

  // Workflows command
  if (msg.includes('/workflows') || msg.includes('workflow')) {
    return `🔄 *Active Workflows*

1️⃣ TikTok Auto-post (Running)
2️⃣ Link Bio Sync (Running)
3️⃣ Analytics Report (Scheduled)
4️⃣ Email Campaign (Paused)

Reply with number for details.`;
  }

  // Analytics command
  if (msg.includes('/analytics') || msg.includes('analytics') || msg.includes('stats')) {
    return `📊 *Today's Analytics*

👁️ Views: 1,234 (↗️ +15%)
🖱️ Clicks: 189 (↗️ +8%)
✅ Conversions: 23
💰 Revenue: RM 567 (↗️ +22%)

📈 *This Week*
Total Revenue: RM 4,490
Conversions: 85
Top Link: Collection Baju Budak

Great performance! 🎉`;
  }

  // Link bio command
  if (msg.includes('/linkbio') || msg.includes('link bio') || msg.includes('links')) {
    return `🔗 *Link Bio Performance*

👕 *Collection Baju Budak*
   RM 1,250 | 320 clicks
   
🚀 *Template Automation*
   RM 2,400 | 180 clicks
   
📱 *TikTok Aku*
   890 clicks
   
🤖 *AI Content*
   RM 840 | 420 clicks

📈 Total: RM 4,490 today!`;
  }

  // Start automation
  if (msg.includes('/start') && !msg.includes('automation')) {
    return `👋 *Welcome to Maya!*

Saya Maya, AI assistant untuk automation kau.

*Quick Commands:*
/status - System status
/workflows - Manage workflows
/analytics - View stats
/linkbio - Link performance
/help - All commands

Or just chat naturally! 😊`;
  }

  if (msg.includes('start automation') || msg.includes('start auto')) {
    return `🚀 *Automation Started!*

All workflows are now active:
✅ TikTok Auto-post
✅ Link Bio Sync
✅ Analytics Report

I'll notify you of any updates!`;
  }

  // Stop automation
  if (msg.includes('stop automation') || msg.includes('stop auto')) {
    return `⏸️ *Automation Stopped*

All workflows are paused.
Use "start automation" to resume.`;
  }

  // Help command
  if (msg.includes('/help') || msg.includes('help') || msg.includes('command')) {
    return `💡 *Maya Commands*

*System:*
/status - System status
/start - Start automation
/stop - Stop automation

*Analytics:*
/analytics - View stats
/linkbio - Link performance
/workflows - Manage workflows

*Management:*
/create - Create workflow
/optimize - Optimize system
/export - Export data

Or just chat naturally! 😊`;
  }

  // Create workflow
  if (msg.includes('/create') || msg.includes('create workflow')) {
    return `🔄 *Workflow Builder*

What type of workflow?
1️⃣ TikTok automation
2️⃣ Link bio sync
3️⃣ Analytics report
4️⃣ Custom workflow

Reply with number.`;
  }

  // Optimize
  if (msg.includes('/optimize') || msg.includes('optimize')) {
    return `⚡ *System Optimization*

Analyzing performance...

*Recommendations:*
✅ Cache API calls (+40% speed)
✅ Batch processing (-30% resources)
✅ Async operations
✅ Database indexing

Apply optimizations? (yes/no)`;
  }

  // Greeting
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return `👋 Hi! Saya Maya, AI assistant kau.

Apa yang boleh saya bantu?

Quick actions:
• Check /status
• View /analytics
• Manage /workflows`;
  }

  // Thank you
  if (msg.includes('thank') || msg.includes('thanks')) {
    return `You're welcome! 😊

Anything else I can help with?`;
  }

  // Default response
  return `🤖 *Maya AI*

I received: "${message}"

Try these commands:
/status - System status
/analytics - View stats
/workflows - Manage workflows
/help - All commands

Or ask me anything! 😊`;
}

// ============================================
// BOT EVENT HANDLERS
// ============================================

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'there';
  
  const welcomeMessage = `👋 *Welcome ${firstName}!*

Saya Maya, AI assistant untuk automation workflow kau.

*What I can do:*
✅ Monitor system status
✅ Track analytics & revenue
✅ Manage workflows
✅ Control automation
✅ Generate reports

*Quick Start:*
• /status - Check system
• /analytics - View stats
• /workflows - Manage workflows
• /help - All commands

Let's automate your business! 🚀`;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Handle voice messages with Gemini 2.0 Flash (Native Audio!)
bot.on('voice', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const voice = msg.voice;
  
  console.log(`🎤 Voice message from ${msg.from.first_name}`);
  
  try {
    // Show typing indicator
    bot.sendChatAction(chatId, 'typing');
    
    // Get file info
    const fileId = voice.file_id;
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
    
    // Download voice file
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to base64 for Gemini
    const base64Audio = buffer.toString('base64');
    
    // Transcribe & respond using Gemini 2.0 Flash with native audio
    if (GEMINI_API_KEY) {
      try {
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  {
                    text: `${MAYA_CONTEXT}\n\nUser sent a voice message. Transcribe it and respond naturally in Malay/English mix like a friend.`
                  },
                  {
                    inline_data: {
                      mime_type: 'audio/ogg',
                      data: base64Audio
                    }
                  }
                ]
              }],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 400
              }
            })
          }
        );
        
        const data = await geminiResponse.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }
        
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Send response
        await bot.sendMessage(chatId, `🎤 *Voice transcribed!*\n\n${aiResponse}`, { parse_mode: 'Markdown' });
        
      } catch (error) {
        console.error('Gemini audio error:', error.message);
        await bot.sendMessage(chatId, 'Received your voice bro! Tapi ada small issue. Try type je? 😅');
      }
    } else {
      await bot.sendMessage(chatId, '🎤 Voice received! Setup Gemini API key untuk enable voice transcription 😊');
    }
    
  } catch (error) {
    console.error('Voice error:', error);
    await bot.sendMessage(chatId, 'Sorry bro, ada issue dengan voice message. Try type je dulu? 😅');
  }
});

// Handle all text messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const userId = msg.from.id;
  
  // Skip if it's a command (already handled)
  if (text && text.startsWith('/start')) return;
  
  // Skip if it's a voice message (handled separately)
  if (msg.voice) return;
  
  // Skip if no text
  if (!text) return;
  
  console.log(`📨 Message from ${msg.from.first_name}: ${text}`);
  
  // Show typing indicator
  bot.sendChatAction(chatId, 'typing');
  
  try {
    // Get AI response (Gemini or fallback)
    const response = await getAIResponse(userId, text);
    
    // Send response
    await bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Error:', error);
    
    // Fallback to smart response
    const fallbackResponse = getSmartResponse(text);
    await bot.sendMessage(chatId, fallbackResponse, { parse_mode: 'Markdown' });
  }
});

// Handle callback queries (inline buttons)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  
  console.log(`🔘 Button pressed: ${data}`);
  
  // Answer callback query
  bot.answerCallbackQuery(query.id);
  
  // Handle button actions
  if (data === 'status') {
    bot.sendMessage(chatId, getMayaResponse('/status'), { parse_mode: 'Markdown' });
  } else if (data === 'analytics') {
    bot.sendMessage(chatId, getMayaResponse('/analytics'), { parse_mode: 'Markdown' });
  } else if (data === 'workflows') {
    bot.sendMessage(chatId, getMayaResponse('/workflows'), { parse_mode: 'Markdown' });
  }
});

// Handle errors with auto-recovery
bot.on('polling_error', (error) => {
  console.error('❌ Polling error:', error.code, error.message);
  
  // Don't crash on network errors - they're temporary
  if (error.code === 'EFATAL' || error.code === 'ECONNRESET') {
    console.log('🔄 Network hiccup detected. Bot will auto-reconnect...');
    // The bot will automatically retry polling
  }
});

// Connection monitoring
let lastPollTime = Date.now();
setInterval(() => {
  const now = Date.now();
  if (now - lastPollTime > 30000) {
    console.log('⚠️ No polling activity for 30s. Connection might be stale.');
  }
}, 30000);

bot.on('message', (msg) => {
  lastPollTime = Date.now();
});

// ============================================
// EXPRESS SERVER (Health Check)
// ============================================

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    bot: 'Maya Telegram Bot',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Maya Telegram Bot is running!`);
  console.log(`📡 Server listening on port ${PORT}`);
  console.log(`🤖 Bot username: @${bot.options.username || 'MayaAutomationBot'}`);
  console.log(`\n💡 To test: Open Telegram and search for your bot!`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Maya bot...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down Maya bot...');
  bot.stopPolling();
  process.exit(0);
});
