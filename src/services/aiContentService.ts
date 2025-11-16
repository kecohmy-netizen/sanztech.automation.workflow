// AI Content Generator using FREE Gemini API
// Generate TikTok captions, hashtags, and content ideas

class AIContentService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1/models';
  private model = 'gemini-2.0-flash-exp'; // FREE tier model
  
  // Rate limiting
  private requestCount = 0;
  private lastReset = Date.now();
  private readonly MAX_RPM = 15; // 15 requests per minute (FREE tier)
  
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  // Check rate limit
  private checkRateLimit(): boolean {
    const now = Date.now();
    
    // Reset counter every minute
    if (now - this.lastReset > 60000) {
      this.requestCount = 0;
      this.lastReset = now;
    }
    
    if (this.requestCount >= this.MAX_RPM) {
      console.warn('⚠️ Gemini rate limit reached. Wait a moment...');
      return false;
    }
    
    this.requestCount++;
    return true;
  }

  // Generate content with Gemini
  private async generate(prompt: string, temperature = 0.8): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    if (!this.checkRateLimit()) {
      throw new Error('Rate limit exceeded. Please wait a moment.');
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature,
              maxOutputTokens: 500,
              topP: 0.95,
              topK: 40,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  // ============================================
  // TIKTOK CONTENT GENERATION
  // ============================================

  async generateTikTokCaption(topic: string, style: 'casual' | 'professional' | 'funny' | 'inspiring' = 'casual'): Promise<string> {
    const styleGuides = {
      casual: 'casual, friendly, use emojis naturally',
      professional: 'professional, informative, clear',
      funny: 'humorous, entertaining, witty',
      inspiring: 'motivational, uplifting, powerful',
    };

    const prompt = `Generate a TikTok caption about "${topic}".

Style: ${styleGuides[style]}

Requirements:
- 150-200 characters
- Engaging and attention-grabbing
- Include relevant emojis
- End with a call-to-action
- Natural and conversational

Caption:`;

    return await this.generate(prompt, 0.9);
  }

  async generateHashtags(topic: string, count = 10): Promise<string[]> {
    const prompt = `Generate ${count} relevant TikTok hashtags for content about "${topic}".

Requirements:
- Mix of popular and niche hashtags
- Relevant to the topic
- Include trending hashtags if applicable
- Format: #hashtag (one per line)

Hashtags:`;

    const response = await this.generate(prompt, 0.7);
    
    // Extract hashtags
    const hashtags = response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('#'))
      .map(line => line.replace(/[^#\w]/g, ''))
      .slice(0, count);

    return hashtags;
  }

  async generateContentIdeas(niche: string, count = 5): Promise<Array<{ title: string; description: string }>> {
    const prompt = `Generate ${count} TikTok content ideas for the "${niche}" niche.

For each idea, provide:
1. Catchy title
2. Brief description (1-2 sentences)

Format:
Title: [title]
Description: [description]

Ideas:`;

    const response = await this.generate(prompt, 0.9);
    
    // Parse ideas
    const ideas: Array<{ title: string; description: string }> = [];
    const sections = response.split(/Title:/i).slice(1);

    for (const section of sections) {
      const [titlePart, ...descParts] = section.split(/Description:/i);
      if (titlePart && descParts.length > 0) {
        ideas.push({
          title: titlePart.trim(),
          description: descParts.join('Description:').trim(),
        });
      }
    }

    return ideas.slice(0, count);
  }

  async optimizeCaption(caption: string): Promise<string> {
    const prompt = `Optimize this TikTok caption for better engagement:

"${caption}"

Improvements to make:
- Make it more engaging
- Add relevant emojis
- Improve call-to-action
- Keep it concise (150-200 chars)
- Maintain the original message

Optimized caption:`;

    return await this.generate(prompt, 0.8);
  }

  // ============================================
  // POSTING TIME OPTIMIZATION
  // ============================================

  async suggestPostingTimes(niche: string, timezone = 'Asia/Kuala_Lumpur'): Promise<Array<{ time: string; reason: string }>> {
    const prompt = `Suggest the best 3 times to post TikTok content for the "${niche}" niche in ${timezone} timezone.

For each time, explain why it's optimal.

Format:
Time: [HH:MM]
Reason: [explanation]

Suggestions:`;

    const response = await this.generate(prompt, 0.7);
    
    // Parse suggestions
    const suggestions: Array<{ time: string; reason: string }> = [];
    const sections = response.split(/Time:/i).slice(1);

    for (const section of sections) {
      const [timePart, ...reasonParts] = section.split(/Reason:/i);
      if (timePart && reasonParts.length > 0) {
        suggestions.push({
          time: timePart.trim(),
          reason: reasonParts.join('Reason:').trim(),
        });
      }
    }

    return suggestions.slice(0, 3);
  }

  // ============================================
  // TREND ANALYSIS
  // ============================================

  async analyzeTrend(trend: string): Promise<{ summary: string; opportunities: string[]; tips: string[] }> {
    const prompt = `Analyze this TikTok trend: "${trend}"

Provide:
1. Brief summary (2-3 sentences)
2. 3 content opportunities
3. 3 tips to leverage this trend

Format:
Summary: [summary]

Opportunities:
- [opportunity 1]
- [opportunity 2]
- [opportunity 3]

Tips:
- [tip 1]
- [tip 2]
- [tip 3]

Analysis:`;

    const response = await this.generate(prompt, 0.7);
    
    // Parse response
    const summaryMatch = response.match(/Summary:(.*?)(?=Opportunities:|$)/s);
    const opportunitiesMatch = response.match(/Opportunities:(.*?)(?=Tips:|$)/s);
    const tipsMatch = response.match(/Tips:(.*?)$/s);

    return {
      summary: summaryMatch ? summaryMatch[1].trim() : '',
      opportunities: this.extractListItems(opportunitiesMatch ? opportunitiesMatch[1] : ''),
      tips: this.extractListItems(tipsMatch ? tipsMatch[1] : ''),
    };
  }

  // ============================================
  // COMPETITOR ANALYSIS
  // ============================================

  async analyzeCompetitor(competitorInfo: string): Promise<{ strengths: string[]; weaknesses: string[]; recommendations: string[] }> {
    const prompt = `Analyze this TikTok competitor:

${competitorInfo}

Provide:
1. 3 key strengths
2. 3 potential weaknesses
3. 3 recommendations to compete

Format:
Strengths:
- [strength 1]
- [strength 2]
- [strength 3]

Weaknesses:
- [weakness 1]
- [weakness 2]
- [weakness 3]

Recommendations:
- [recommendation 1]
- [recommendation 2]
- [recommendation 3]

Analysis:`;

    const response = await this.generate(prompt, 0.7);
    
    const strengthsMatch = response.match(/Strengths:(.*?)(?=Weaknesses:|$)/s);
    const weaknessesMatch = response.match(/Weaknesses:(.*?)(?=Recommendations:|$)/s);
    const recommendationsMatch = response.match(/Recommendations:(.*?)$/s);

    return {
      strengths: this.extractListItems(strengthsMatch ? strengthsMatch[1] : ''),
      weaknesses: this.extractListItems(weaknessesMatch ? weaknessesMatch[1] : ''),
      recommendations: this.extractListItems(recommendationsMatch ? recommendationsMatch[1] : ''),
    };
  }

  // ============================================
  // SCRIPT GENERATION
  // ============================================

  async generateVideoScript(topic: string, duration: number = 60): Promise<{ hook: string; body: string; cta: string }> {
    const prompt = `Generate a ${duration}-second TikTok video script about "${topic}".

Structure:
1. Hook (first 3 seconds) - grab attention
2. Body (main content) - deliver value
3. CTA (call-to-action) - engage viewers

Format:
Hook: [attention-grabbing opening]

Body: [main content with key points]

CTA: [call-to-action]

Script:`;

    const response = await this.generate(prompt, 0.8);
    
    const hookMatch = response.match(/Hook:(.*?)(?=Body:|$)/s);
    const bodyMatch = response.match(/Body:(.*?)(?=CTA:|$)/s);
    const ctaMatch = response.match(/CTA:(.*?)$/s);

    return {
      hook: hookMatch ? hookMatch[1].trim() : '',
      body: bodyMatch ? bodyMatch[1].trim() : '',
      cta: ctaMatch ? ctaMatch[1].trim() : '',
    };
  }

  // ============================================
  // HELPERS
  // ============================================

  private extractListItems(text: string): string[] {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-') || line.match(/^\d+\./))
      .map(line => line.replace(/^[-\d.]\s*/, '').trim())
      .filter(line => line.length > 0);
  }

  // Get usage stats
  getUsageStats() {
    return {
      requestsThisMinute: this.requestCount,
      maxRequestsPerMinute: this.MAX_RPM,
      remaining: this.MAX_RPM - this.requestCount,
      resetIn: Math.ceil((60000 - (Date.now() - this.lastReset)) / 1000),
    };
  }
}

export const aiContentService = new AIContentService();
export default aiContentService;
