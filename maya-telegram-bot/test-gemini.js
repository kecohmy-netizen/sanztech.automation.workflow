require('dotenv').config();

async function testGeminiAPI() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    return;
  }
  
  console.log('🧪 Testing Gemini API...');
  console.log(`📝 API Key: ${GEMINI_API_KEY.substring(0, 10)}...`);
  
  try {
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Say "Hello! API is working!" in a friendly way.'
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 100
          }
        })
      }
    );
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ API Error:', data.error.message);
      console.error('\n💡 Solution:');
      console.error('1. Get new API key: https://aistudio.google.com/app/apikey');
      console.error('2. Update .env file with new key');
      console.error('3. Run this test again');
      return;
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    console.log('✅ API is working!');
    console.log('🤖 Response:', aiResponse);
    console.log('\n✨ Your bot is ready to use!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\n💡 Check your internet connection and API key');
  }
}

testGeminiAPI();
