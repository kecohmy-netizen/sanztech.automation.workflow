# 📱 TikTok App Submission Guide

## 📋 Form Fields yang Perlu Diisi

### 1. App Details

#### App Name
```
HQ Agent TikTok
```
*(Max 50 characters - dah 15 characters, OK)*

#### Category
Pilih: **Content & Entertainment** atau **Business Tools**

#### Description
```
HQ Agent TikTok is an AI-powered automation platform for TikTok content creators and affiliate marketers. It provides automated content generation, post scheduling, and publishing capabilities. The platform helps users create engaging TikTok content, manage affiliate product promotions, and automate their social media workflow while complying with TikTok's API guidelines.
```
*(Max 120 characters - adjust jika perlu)*

### 2. URLs

#### Terms of Service URL
```
https://sanzflow.netlify.app/terms-of-service
```
atau
```
https://sanzflow.netlify.app/terms
```

#### Privacy Policy URL
```
https://sanzflow.netlify.app/privacy-policy
```
atau
```
https://sanzflow.netlify.app/privacy
```

### 3. Platforms
✅ **Web** (check ini sahaja untuk sekarang)

### 4. App Review Information

#### Explain how each product and scope works
```
HQ Agent TikTok uses TikTok's Content Posting API to enable users to:

1. **Content Generation**: AI-powered content creation using Google Gemini AI
2. **Post Scheduling**: Automated scheduling of TikTok posts at optimal times
3. **Video Publishing**: Direct upload and publishing to TikTok via API
4. **Account Management**: Secure OAuth 2.0 connection with token management

**Scopes Used:**
- user.info.basic: To identify and authenticate users
- video.upload: To upload videos to TikTok
- video.list: To retrieve user's video list for analytics

**How it works:**
1. User authorizes TikTok account via OAuth 2.0
2. System generates content using AI based on user's affiliate products
3. Content is scheduled for optimal posting times
4. Videos are automatically uploaded and published to TikTok
5. System respects rate limits (5/min) and daily limits (10/day)

**Compliance:**
- All tokens encrypted with AES-256
- Rate limiting enforced automatically
- Daily upload limits respected
- Original content only
- No spam or bot behavior
```

### 5. Demo Video Requirements

#### Video Content (MUST SHOW):
1. **Opening**: Show website/app interface
2. **OAuth Flow**: 
   - Click "Connect TikTok"
   - Show TikTok login page
   - Show authorization screen
   - Show successful connection
3. **Content Generation**:
   - Show AI content generation interface
   - Show generated content preview
4. **Scheduling**:
   - Show post scheduling interface
   - Show scheduled posts list
5. **Publishing**:
   - Show post being published
   - Show confirmation
   - Show published video on TikTok
6. **Analytics**:
   - Show analytics dashboard
   - Show performance metrics

#### Video Requirements:
- **Format**: MP4 or MOV
- **Max Size**: 50MB per file
- **Max Files**: 5 files
- **Duration**: Show complete end-to-end flow
- **Quality**: Clear, visible UI and interactions

#### Tips:
- Record screen dengan clear resolution
- Show actual domain (sanzflow.netlify.app) dalam video
- Demonstrate semua features yang digunakan
- Speak atau add captions untuk explain flow
- Keep video under 5 minutes jika boleh

### 6. Products & Scopes

#### Products to Add:
1. **Content Posting API** (untuk upload videos)
2. **User Information API** (untuk user info)

#### Scopes to Add:
1. `user.info.basic` - Basic user information
2. `video.upload` - Upload videos to TikTok
3. `video.list` - List user's videos

#### How to Add:
1. Click "Add products"
2. Select "Content Posting API"
3. Click "Add scopes"
4. Select scopes listed above
5. Save

## ✅ Pre-Submission Checklist

- [ ] App name filled (HQ Agent TikTok)
- [ ] Category selected
- [ ] Description written (120 chars max)
- [ ] Terms of Service URL added
- [ ] Privacy Policy URL added
- [ ] Platform selected (Web)
- [ ] App review explanation written (1000 chars)
- [ ] Demo video uploaded (showing complete flow)
- [ ] Products added (Content Posting API)
- [ ] Scopes added (user.info.basic, video.upload, video.list)
- [ ] App icon uploaded (1024x1024px, <5MB, PNG/JPG)

## 🎬 Demo Video Script

### Scene 1: Introduction (0:00-0:15)
- Show website: sanzflow.netlify.app
- Show HQ Agent Dashboard
- Explain: "This is HQ Agent TikTok - an automation platform"

### Scene 2: OAuth Connection (0:15-0:45)
- Click "Connect TikTok" button
- Show TikTok login page
- Show authorization screen with scopes
- Show successful connection message
- Explain: "User authorizes TikTok account via OAuth 2.0"

### Scene 3: Content Generation (0:45-1:30)
- Navigate to "TikTok Affiliate" tab
- Click "Generate Affiliate Content"
- Show AI generating content
- Show generated content preview
- Explain: "AI generates engaging TikTok content"

### Scene 4: Scheduling (1:30-2:00)
- Show scheduling interface
- Select posting time
- Show scheduled posts list
- Explain: "Content scheduled for optimal times"

### Scene 5: Publishing (2:00-2:45)
- Show post being published
- Show upload progress
- Show confirmation message
- Open TikTok and show published video
- Explain: "Video automatically published to TikTok"

### Scene 6: Analytics (2:45-3:00)
- Show analytics dashboard
- Show published posts count
- Show scheduled posts
- Explain: "Track performance and analytics"

## 🚀 After Submission

1. **Wait for Review**: Usually 3-7 business days
2. **Check Status**: Monitor in Developer Portal
3. **Respond to Feedback**: If rejected, address issues and resubmit
4. **Go Live**: Once approved, switch from sandbox to production

## 📝 Notes

- **Sandbox Mode**: Use sandbox untuk testing sebelum submit
- **Domain Match**: Video domain mesti match dengan website URL
- **All Features**: Must demonstrate semua products dan scopes
- **Clear UI**: Video mesti show clear user interface
- **No Spam**: Emphasize compliance dengan TikTok guidelines

---

**Good luck dengan submission!** 🎯

