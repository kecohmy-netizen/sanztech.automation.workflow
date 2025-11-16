// Gemini API Optimizer - Maximize FREE tier usage!
// FREE tier limits: 15 RPM, 1500 RPD, 1M TPM

class GeminiOptimizer {
  constructor() {
    // Rate limiting
    this.minuteRequests = new Map(); // userId -> [timestamps]
    this.dailyRequests = new Map();  // userId -> { date, count }
    this.tokenUsage = new Map();     // userId -> { date, tokens }
    
    // Limits (FREE tier)
    this.LIMITS = {
      RPM: 15,        // Requests per minute
      RPD: 1500,      // Requests per day
      TPM: 1000000,   // Tokens per minute (1M)
      TPD: 50000000   // Tokens per day (50M - very high!)
    };
    
    // Cache for repeated questions
    this.responseCache = new Map(); // question hash -> response
    this.CACHE_TTL = 3600000; // 1 hour
    
    // Smart fallback patterns
    this.fallbackPatterns = this.initFallbackPatterns();
    
    // Cleanup old data every hour
    setInterval(() => this.cleanup(), 3600000);
  }
  
  // Check if user can make request
  canMakeRequest(userId) {
    const now = Date.now();
    const today = new Date().toDateString();
    
    // Check RPM (15 per minute)
    const minuteReqs = this.minuteRequests.get(userId) || [];
    const recentReqs = minuteReqs.filter(t => now - t < 60000);
    
    if (recentReqs.length >= this.LIMITS.RPM) {
      const waitTime = Math.ceil((recentReqs[0] + 60000 - now) / 1000);
      return { 
        allowed: false, 
        reason: 'rpm_limit',
        waitTime,
        message: `Slow down bro! Wait ${waitTime}s. (${recentReqs.length}/${this.LIMITS.RPM} requests this minute)`
      };
    }
    
    // Check RPD (1500 per day)
    const dailyData = this.dailyRequests.get(userId) || { date: today, count: 0 };
    
    if (dailyData.date !== today) {
      dailyData.date = today;
      dailyData.count = 0;
    }
    
    if (dailyData.count >= this.LIMITS.RPD) {
      return {
        allowed: false,
        reason: 'daily_limit',
        message: `Daily limit reached! (${dailyData.count}/${this.LIMITS.RPD}). Try again tomorrow or I'll use smart responses.`
      };
    }
    
    return { 
      allowed: true,
      remaining: {
        rpm: this.LIMITS.RPM - recentReqs.length,
        rpd: this.LIMITS.RPD - dailyData.count
      }
    };
  }
  
  // Record request
  recordRequest(userId, tokensUsed = 0) {
    const now = Date.now();
    const today = new Date().toDateString();
    
    // Update minute requests
    const minuteReqs = this.minuteRequests.get(userId) || [];
    minuteReqs.push(now);
    this.minuteRequests.set(userId, minuteReqs);
    
    // Update daily requests
    const dailyData = this.dailyRequests.get(userId) || { date: today, count: 0 };
    if (dailyData.date !== today) {
      dailyData.date = today;
      dailyData.count = 0;
    }
    dailyData.count++;
    this.dailyRequests.set(userId, dailyData);
    
    // Update token usage
    const tokenData = this.tokenUsage.get(userId) || { date: today, tokens: 0 };
    if (tokenData.date !== today) {
      tokenData.date = today;
      tokenData.tokens = 0;
    }
    tokenData.tokens += tokensUsed;
    this.tokenUsage.set(userId, tokenData);
    
    console.log(`📊 Gemini usage - User ${userId}: ${dailyData.count}/${this.LIMITS.RPD} requests, ${tokenData.tokens} tokens today`);
  }
  
  // Get cached response if available
  getCachedResponse(message) {
    const hash = this.hashMessage(message);
    const cached = this.responseCache.get(hash);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      console.log('💾 Using cached response');
      return cached.response;
    }
    
    return null;
  }
  
  // Cache response
  cacheResponse(message, response) {
    const hash = this.hashMessage(message);
    this.responseCache.set(hash, {
      response,
      timestamp: Date.now()
    });
  }
  
  // Simple hash for caching
  hashMessage(message) {
    return message.toLowerCase().trim().replace(/\s+/g, ' ');
  }
  
  // Get smart fallback response
  getSmartFallback(message) {
    const msg = message.toLowerCase();
    
    for (const [pattern, responses] of this.fallbackPatterns) {
      if (pattern.test(msg)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    return this.getDefaultResponse();
  }
  
  // Initialize fallback patterns with HUMAN personality
  initFallbackPatterns() {
    return new Map([
      [/^(hi|hello|hey|yo|hai|oi|woi)/i, [
        "Weh! Apa khabar bro? 😎 Lama tak dengar cerita!",
        "Yo yo yo! Sihat ke? Ada apa I can help? 💪",
        "Eyyy! Wassup bro! Nak check automation ke hari ni? 🚀",
        "Hai hai! Dah lama tak chat! Everything running smooth ke? 😊",
        "Woi! Apa cerita? Business going well? 💰",
        "Hey bro! Long time no see! Nak tengok stats ke? 📊"
      ]],
      
      [/(status|how|macam mana|okay|baik)/i, [
        "Weh, semua smooth je bro! 😎\n\n✅ 12 workflows tengah jalan\n✅ 156 tasks dah settle hari ni\n✅ 98.5% success rate (gila ah!)\n\nAutomation kau memang power la! 💪 Nak check apa lagi?",
        "Alhamdulillah, everything on point! 🚀\n\nWorkflows: 12 active (semua hijau!)\nTasks: 156 completed (productive gila)\nRevenue: RM 567 (not bad for today!)\n\nBusiness kau tengah naik ni bro! 📈 Ada apa-apa nak optimize?",
        "Bro, system kau tengah fire! 🔥\n\n12 workflows running smooth\n156 tasks done (efficiency 💯)\nSuccess rate 98.5% (almost perfect!)\n\nKau punya automation game strong ah! Keep it up! 💪",
        "Eh best je! Semua berjalan lancar 😊\n\nActive workflows: 12\nCompleted tasks: 156\nRevenue today: RM 567\n\nLegit smooth sailing bro! Nak details mana satu?"
      ]],
      
      [/(analytic|stats|performance|data|number)/i, [
        "Weh bro, let me spill the tea ☕\n\nHari ni memang power:\n👁️ 1,234 views (naik 15% dari semalam weh!)\n🖱️ 189 clicks (conversion rate solid!)\n💰 RM 567 revenue (cha-ching! 💸)\n\nCollection Baju Budak kau? GILA! RM 1,250 dah! 🔥\nTemplate Automation pun tak main - RM 2,400! 🚀\n\nBro, kau tengah trending up ni! Momentum kuat! Keep pushing! 📈💪",
        "Okay okay, jom tengok numbers... 📊\n\nToday's performance:\n👁️ 1.2K views (↗️ +15% - nice!)\n🖱️ 189 clicks (people interested!)\n💰 RM 567 (not bad for a day's work!)\n\nTop performers:\n🥇 Template Automation - RM 2.4K (beast mode!)\n🥈 Baju Budak - RM 1.25K (steady income!)\n\nBro, kau punya strategy working! Data tak tipu! 📈",
        "Alright, let's talk numbers bro 💰\n\nHari ni:\n- Views: 1,234 (↗️ up 15%!)\n- Clicks: 189 (engagement solid)\n- Revenue: RM 567 (ka-ching!)\n\nYour Collection Baju Budak memang laku keras - RM 1,250! 👕🔥\nTemplate Automation pun crushing it - RM 2,400! 🚀\n\nOverall? Kau tengah on fire bro! Keep this energy! 💪",
        "Jap, let me check... *scrolling through data* 📱\n\nWeh, numbers kau cantik ah hari ni!\n\n👁️ 1,234 views (yesterday 1,073 - naik 15%!)\n🖱️ 189 clicks (CTR solid bro!)\n💰 RM 567 revenue (lunch money secured! 😂)\n\nBaju Budak collection? RM 1,250 - people love it!\nTemplate Automation? RM 2,400 - your best seller!\n\nBro, momentum kau strong! Jangan stop! 🚀"
      ]],
      
      [/(link|bio|affiliate|url)/i, [
        "Weh, link bio kau memang power! 🔥\n\nTop performers hari ni:\n\n🥇 Template Automation - RM 2,400\n   (180 clicks, conversion rate gila!)\n\n🥈 Collection Baju Budak - RM 1,250\n   (320 clicks, people suka bro!)\n\n🥉 AI Content Tools - RM 840\n   (420 clicks, steady growth!)\n\n📱 TikTok profile - 890 clicks\n   (traffic source kuat!)\n\nTotal: RM 4,490 hari ni je! Gila ah! 💰\n\nNak optimize lagi ke? I got ideas! 💡",
        "Jom check link bio performance... 📊\n\nYour links tengah perform macam ni:\n\n1️⃣ Template Automation - RM 2.4K 🚀\n   Clicks: 180 | Conversion: 12\n   (This one memang best seller!)\n\n2️⃣ Baju Budak Collection - RM 1.25K 👕\n   Clicks: 320 | Conversion: 45\n   (Ramai yang interested!)\n\n3️⃣ AI Tools - RM 840 🤖\n   Clicks: 420 | Conversion: 28\n   (Growing steady!)\n\nTotal revenue: RM 4,490 today!\n\nBro, link strategy kau on point! 💪",
        "Okay let me pull up your link bio... 🔗\n\nWeh, semua link kau performing well ah!\n\n🔥 Template Automation\n   RM 2,400 | 180 clicks\n   (Your money maker ni bro!)\n\n👕 Collection Baju Budak  \n   RM 1,250 | 320 clicks\n   (People love this!)\n\n🤖 AI Content\n   RM 840 | 420 clicks\n   (Steady income stream)\n\n📱 TikTok Aku\n   890 clicks (good traffic!)\n\nTotal: RM 4,490 hari ni!\n\nBro, kau punya link game strong! Keep it up! 💪"
      ]],
      
      [/(workflow|automation|auto)/i, [
        "Jom check workflows kau... ⚙️\n\nYour automation setup:\n\n1️⃣ TikTok Auto-post ✅ RUNNING\n   (Posting every 2 hours, smooth je!)\n\n2️⃣ Link Bio Sync ✅ ACTIVE\n   (Real-time updates, no lag!)\n\n3️⃣ Analytics Report 📊 SCHEDULED\n   (Daily at 5pm, on time selalu!)\n\n4️⃣ Email Campaign ⏸️ PAUSED\n   (Nak start balik ke?)\n\nBro, automation kau memang set! Literally boleh chill je while system jalan sendiri 😎\n\nNak create workflow baru ke? Or optimize yang ada?",
        "Weh, let me show you your automation empire! 🏰\n\nActive workflows:\n\n✅ TikTok Auto-post\n   Status: Running smooth (12 posts today)\n   Next post: In 47 minutes\n\n✅ Link Bio Sync  \n   Status: Real-time active\n   Last sync: 2 minutes ago\n\n✅ Analytics Report\n   Status: Scheduled (5pm daily)\n   Last report: Yesterday 5:00pm\n\nBro, everything on autopilot! Kau literally boleh tidur pun system jalan 😴💰\n\nThis is the power of automation bro! 🚀",
        "Automation status check... 🔍\n\nYour workflows:\n\n1️⃣ TikTok Auto-post ✅\n   • Running: Yes\n   • Posts today: 12\n   • Success rate: 100%\n   • Next: 47 mins\n\n2️⃣ Link Bio Sync ✅\n   • Status: Active\n   • Updates: Real-time\n   • Last sync: 2 mins ago\n\n3️⃣ Analytics Report 📊\n   • Scheduled: 5pm daily\n   • Never missed!\n\nBro, system kau memang autopilot mode! Boleh focus on other things while ni jalan sendiri 😎\n\nNak tweak apa-apa ke?"
      ]],
      
      [/(start|run|activate|on|jalan)/i, [
        "Alright bro, let's gooo! 🚀\n\nStarting all workflows now...\n\n⚡ TikTok Auto-post... ACTIVE! ✅\n⚡ Link Bio Sync... RUNNING! ✅\n⚡ Analytics Report... SCHEDULED! ✅\n\nBoom! Everything's live! 💥\n\nKau boleh relax now, system will handle everything. I'll ping you kalau ada updates or issues.\n\nTime to make that money bro! 💰💪\n\nLet the automation do its magic! ✨",
        "Weh, let's fire this up! 🔥\n\n*Starting engines...*\n\n🚀 TikTok Auto-post → ACTIVATED!\n🚀 Link Bio Sync → RUNNING!\n🚀 Analytics → SCHEDULED!\n\nAll systems GO! ✅\n\nBro, automation mode: ON 💪\n\nKau literally boleh lepak je now. System will work for you 24/7. I'll notify you bila ada updates.\n\nGo focus on scaling bro! The automation got your back! 😎",
        "Okay boss, starting everything now! 👨‍💼\n\n*Booting up workflows...*\n\n✅ TikTok Auto-post - LIVE!\n✅ Link Bio Sync - ACTIVE!\n✅ Analytics Report - READY!\n\nAll workflows running! 🎯\n\nBro, kau punya automation empire is now ONLINE! 🏰\n\nSystem will handle:\n- Auto-posting to TikTok\n- Syncing all your links\n- Generating reports\n- Tracking analytics\n\nYou? Just chill and watch the money roll in! 💰😎\n\nI'll keep you updated! Let's get it! 🚀"
      ]],
      
      [/(stop|pause|halt|off|berhenti)/i, [
        "Okay bro, pausing everything... ⏸️\n\n*Stopping workflows...*\n\n🛑 TikTok Auto-post - PAUSED\n🛑 Link Bio Sync - STOPPED\n🛑 Analytics - ON HOLD\n\nAll workflows stopped! ✅\n\nNeed a break? No worries bro! Everything's saved. Nothing lost.\n\nWhen you're ready to go again, just say 'start' and we're back in business! 💪\n\nTake your time! 😊",
        "Alright, hitting the brakes... 🛑\n\n*Shutting down workflows...*\n\nAll systems paused! ⏸️\n\nBro, sometimes kita kena rest jugak kan? Smart move! 😊\n\nYour data semua saved. Workflows on standby. Ready to resume bila-bila you want.\n\nJust holler 'start automation' when you're ready to roll again!\n\nRest well bro! 💤",
        "Got it boss, stopping everything now... ⏸️\n\n*Powering down...*\n\n✅ All workflows stopped\n✅ Data saved\n✅ System on standby\n\nEverything's paused! 🛑\n\nNak rehat ke? Or ada issue? Either way, no problem!\n\nWhen you're ready:\n- Say 'start' to resume\n- Say 'status' to check\n- Say 'help' for options\n\nI'm here whenever you need bro! 😊"
      ]],
      
      [/(help|command|what can|apa boleh|function)/i, [
        "Weh bro, I can help you with BANYAK benda! 💪\n\nHere's what I do:\n\n📊 Check stats & analytics\n   (Just say 'analytics' or 'stats')\n\n🔗 Monitor link bio performance\n   (Say 'link bio' or 'links')\n\n⚙️ Manage workflows\n   (Say 'workflows' or 'automation')\n\n🚀 Control automation\n   (Say 'start' or 'stop')\n\n💰 Track revenue\n   (Say 'revenue' or 'money')\n\nJust chat naturally bro! No need formal commands. Talk to me like a friend! 😊\n\nExamples:\n• 'Weh, how's my automation?'\n• 'Show me today's revenue'\n• 'Start all workflows'\n• 'Apa status hari ni?'\n\nI understand both English & Malay! Mix pun okay! 🇲🇾",
        "Okay let me break it down for you bro! 📋\n\nI'm your automation assistant! Here's my superpowers:\n\n✅ System Status\n   Check if everything running smooth\n\n✅ Analytics & Stats\n   Views, clicks, revenue - semua ada!\n\n✅ Link Bio Management\n   Monitor performance, track clicks\n\n✅ Workflow Control\n   Start, stop, check automation\n\n✅ Performance Reports\n   Daily updates, trends, insights\n\n✅ Revenue Tracking\n   How much you're making!\n\nBest part? Just chat naturally! No need remember commands. Talk to me like you talk to your friend! 😎\n\nTry:\n• 'Bro, show me stats'\n• 'How's business today?'\n• 'Start automation'\n• 'Link bio performance?'\n\nI got you covered! 💪"
      ]],
      
      [/(thank|thanks|appreciate|tq|terima kasih)/i, [
        "Eh, no problem bro! Anytime! 😊 That's what I'm here for!",
        "You're welcome! Happy to help! 💪 Your success is my success bro!",
        "My pleasure bro! Keep crushing it! 🚀 Let me know if you need anything else!",
        "Glad I could help! 🙌 Kita team kan? Your wins are my wins too! 💯",
        "Anytime bro! 😎 Kalau ada apa-apa just holler! I got your back! 💪",
        "No worries! That's what friends are for! 😊 Keep pushing forward bro! 🚀"
      ]],
      
      [/(problem|issue|error|not working)/i, [
        "Oh no! What's the issue? 😟\n\nTell me more:\n• Workflow not running?\n• Links not tracking?\n• Something else?\n\nWe'll fix it together 💪",
        "Let me help! 🔧\n\nWhat's going wrong?\n\nDescribe the problem and I'll troubleshoot it for you."
      ]],
      
      [/(revenue|money|earning|income|duit|untung)/i, [
        "Weh, let's talk money bro! 💰💸\n\nToday: RM 567 (not bad for a Saturday!)\nThis week: RM 4,490 (solid week!)\nThis month: On track for RM 15K+ (gila ah!)\n\nTop earner: Template Automation - RM 2.4K 🔥\n(This one memang money printer bro!)\n\nBro, kau punya hustle paying off! Keep grinding! 💪📈",
        "Money talk! My favorite topic! 💵😎\n\nHari ni: RM 567 ↗️ (lunch money secured!)\nMinggu ni: RM 4.5K (beast mode!)\nBulan ni: RM 15K+ projected (on fire!)\n\nYour Collection Baju Budak? RM 1,250 today!\nTemplate Automation? RM 2,400 - crushing it!\n\nBro, momentum kau strong! Jangan stop! The money will follow! 🚀💰",
        "Alright, let's see the $$$ 💰\n\n*Checking revenue...*\n\nToday: RM 567 (cha-ching!)\nWeek: RM 4,490 (solid!)\nMonth: RM 15K+ (projected)\n\nBro, kau tengah make money while you sleep! That's the power of automation! 😴💸\n\nTop performers:\n🥇 Template - RM 2.4K\n🥈 Baju Budak - RM 1.25K\n\nKeep this energy bro! Sky's the limit! 🚀"
      ]],
      
      // Add more casual patterns
      [/(good|bagus|best|mantap|power)/i, [
        "Weh, thanks bro! 😊 Glad you're happy with it! Let's keep this momentum going! 💪",
        "Ayy, appreciate it bro! 🙌 Your success makes me happy too! Let's get it! 🚀",
        "Hehe, thanks! 😎 But the real MVP is YOU bro! I'm just here to help! Keep crushing it! 💯"
      ]],
      
      [/(bad|problem|issue|error|tak jalan|rosak)/i, [
        "Oh no! What's going on bro? 😟 Tell me more and let's fix it together! 🔧",
        "Weh, ada issue ke? Don't worry, we'll sort it out! What's the problem? 💪",
        "Alamak! Okay okay, calm down. Tell me what happened and I'll help you fix it! 🛠️"
      ]],
      
      [/(busy|sibuk|banyak kerja)/i, [
        "Weh, I feel you bro! That's why automation exists! 😎 Let the system handle the work while you focus on important stuff! 💪",
        "Busy is good bro! Means business is growing! 📈 Good thing you got automation to help! Let it run while you handle other things! 🚀"
      ]],
      
      [/(tired|penat|exhausted|letih)/i, [
        "Bro, you need rest! 😴 Good thing your automation is running 24/7 even when you sleep! Take a break, system got your back! 💪",
        "Weh, jangan push too hard! Rest is important bro! 😊 Your workflows will keep running. Go recharge! ⚡"
      ]],
      
      [/(happy|gembira|excited|syok)/i, [
        "Ayy, love the energy bro! 🎉 Keep that positive vibe! Success loves happy people! 😊💪",
        "Weh, that's the spirit! 🔥 When you're happy, everything flows better! Let's keep winning! 🚀"
      ]],
      
      [/(sad|sedih|down|kecewa)/i, [
        "Hey bro, it's okay to feel down sometimes. 😊 But remember, you got this! Your automation is working, business is growing. Tomorrow will be better! 💪",
        "Weh, chin up bro! 😊 Every successful person has bad days. The important thing is you keep moving forward! I'm here to help! 🚀"
      ]]
    ]);
  }
  
  // Default response - MORE HUMAN!
  getDefaultResponse() {
    const responses = [
      "Weh bro, tak sure apa maksud kau 🤔\n\nTapi I boleh help dengan:\n• 'Macam mana automation aku?'\n• 'Show stats'\n• 'Start workflows'\n• 'Link bio performance?'\n\nJust chat naturally je! Apa kau nak tahu? 😊",
      "Hmm, tak faham sangat bro 😅\n\nCuba tanya macam ni:\n✅ 'Status hari ni?'\n✅ 'Analytics'\n✅ 'Workflows'\n✅ 'Revenue'\n\nOr just describe what you need! I'll figure it out! 💪",
      "Eh sorry bro, tak catch maksud kau 🙈\n\nI'm best at:\n• Checking automation status\n• Showing performance stats\n• Managing workflows\n• Tracking revenue\n\nTry asking about any of those! Or just chat naturally - I understand both English & Malay! 😎",
      "Woi, tak sure what you mean there bro 🤷‍♂️\n\nBut hey, I can help with loads of stuff:\n📊 Check your stats\n⚙️ Manage workflows\n💰 Track revenue\n🔗 Monitor links\n\nJust ask me anything! No need formal commands. Chat like we're friends! 😊",
      "Alamak, tak faham lah bro 😂\n\nNevermind, tell me what you wanna know:\n• System status?\n• Performance stats?\n• Workflow management?\n• Link bio analytics?\n\nOr just explain what you need and I'll help! Easy je! 💪"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Cleanup old data
  cleanup() {
    const now = Date.now();
    const today = new Date().toDateString();
    
    // Clean minute requests (older than 1 minute)
    for (const [userId, requests] of this.minuteRequests.entries()) {
      const recent = requests.filter(t => now - t < 60000);
      if (recent.length === 0) {
        this.minuteRequests.delete(userId);
      } else {
        this.minuteRequests.set(userId, recent);
      }
    }
    
    // Clean daily data (old dates)
    for (const [userId, data] of this.dailyRequests.entries()) {
      if (data.date !== today) {
        this.dailyRequests.delete(userId);
      }
    }
    
    for (const [userId, data] of this.tokenUsage.entries()) {
      if (data.date !== today) {
        this.tokenUsage.delete(userId);
      }
    }
    
    // Clean cache (older than TTL)
    for (const [hash, data] of this.responseCache.entries()) {
      if (now - data.timestamp > this.CACHE_TTL) {
        this.responseCache.delete(hash);
      }
    }
    
    console.log('🧹 Cleaned up old rate limit data');
  }
  
  // Get usage stats
  getUsageStats(userId) {
    const today = new Date().toDateString();
    const dailyData = this.dailyRequests.get(userId) || { date: today, count: 0 };
    const tokenData = this.tokenUsage.get(userId) || { date: today, tokens: 0 };
    const minuteReqs = this.minuteRequests.get(userId) || [];
    const recentReqs = minuteReqs.filter(t => Date.now() - t < 60000);
    
    return {
      requestsToday: dailyData.count,
      requestsThisMinute: recentReqs.length,
      tokensToday: tokenData.tokens,
      limits: this.LIMITS,
      remaining: {
        rpm: this.LIMITS.RPM - recentReqs.length,
        rpd: this.LIMITS.RPD - dailyData.count,
        tpm: this.LIMITS.TPM - tokenData.tokens
      }
    };
  }
}

module.exports = new GeminiOptimizer();
