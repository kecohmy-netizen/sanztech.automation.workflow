# 🎥 TikTok API Setup Guide

Complete guide untuk setup TikTok Content Posting API untuk auto-upload videos.

## 📋 Prerequisites

1. **TikTok Business Account** (bukan personal account)
2. **Verified domain** (bio.sanztech.online ✅)
3. **Privacy Policy & Terms of Service** (dah ada ✅)

## 🚀 Step-by-Step Setup

### 1. Create TikTok Developer Account

1. Go to: https://developers.tiktok.com/
2. Click **"Register"** atau **"Log in"**
3. Login dengan TikTok Business account
4. Complete profile information

### 2. Create New App

1. Go to **"My Apps"** → **"Create an app"**
2. Fill in app details:
   - **App Name**: SanzTech Automation
   - **App Description**: Workflow automation platform for content creators
   - **Category**: Social Media Management
   - **Platform**: Web

### 3. Configure App Settings

#### Basic Information
- **App Icon**: Upload logo (512x512px)
- **Website URL**: https://bio.sanztech.online
- **Privacy Policy URL**: https://bio.sanztech.online/privacy
- **Terms of Service URL**: https://bio.sanztech.online/terms

#### Redirect URIs
Add callback URL:
```
https://bio.sanztech.online/tiktok/callback
```

### 4. Request API Permissions

Go to **"Products"** tab and enable:
- ✅ **Login Kit** (for authentication)
- ✅ **Content Posting API** (for video upload)

Required scopes:
- `user.info.basic` - Get user profile
- `video.upload` - Upload videos
- `video.publish` - Publish videos

### 5. Domain Verification

1. Go to **"Settings"** → **"Domain Verification"**
2. Add domain: `bio.sanztech.online`
3. Download verification file atau copy verification code
4. Upload file ke: `https://bio.sanztech.online/.well-known/tiktok-developers-site-verification.txt`
5. Click **"Verify"**

**Note**: Verification file dah ada dalam project! ✅

### 6. Get API Credentials

1. Go to **"Basic Info"** tab
2. Copy credentials:
   - **Client Key** (App ID)
   - **Client Secret**

### 7. Configure Environment Variables

Create `.env` file (copy from `.env.example`):

```bash
# TikTok API
VITE_TIKTOK_CLIENT_KEY=awxxxxxxxxxx
VITE_TIKTOK_CLIENT_SECRET=xxxxxxxxxxxxxxxx
VITE_TIKTOK_REDIRECT_URI=https://bio.sanztech.online/tiktok/callback
```

### 8. Submit for Review

1. Go to **"Submit for Review"** tab
2. Fill in review form:
   - **Use Case**: Content automation for creators
   - **Demo Video**: Record screen showing upload flow
   - **Test Account**: Provide test TikTok account
3. Submit application
4. Wait for approval (usually 3-7 days)

## 🧪 Testing (Development Mode)

Before approval, you can test with:
- Your own TikTok account
- Up to 5 test accounts you add in developer portal

### Add Test Users
1. Go to **"Test Users"** tab
2. Add TikTok usernames
3. They can test the app before public release

## 💻 Usage

### 1. Start Development Server

```bash
npm run dev
```

### 2. Access Upload Page

Navigate to: http://localhost:5173/tiktok-upload

### 3. Connect TikTok Account

1. Click **"Connect TikTok Account"**
2. Login with TikTok
3. Authorize permissions
4. You'll be redirected back with access token

### 4. Upload Video

1. Select video file (MP4, MOV, WEBM)
2. Enter title (required)
3. Add description with hashtags
4. Configure privacy & settings
5. Click **"Upload to TikTok"**

## 📊 API Limits

### Development Mode (Before Approval)
- **Rate Limit**: 100 requests/day
- **Video Upload**: 5 videos/day per user
- **Test Users**: Up to 5 accounts

### Production Mode (After Approval)
- **Rate Limit**: 10,000 requests/day
- **Video Upload**: 50 videos/day per user
- **Users**: Unlimited

## 🎬 Video Requirements

- **Format**: MP4, MOV, WEBM
- **Size**: Max 4GB
- **Duration**: 3 seconds - 10 minutes
- **Resolution**: Minimum 720p (1080p recommended)
- **Aspect Ratio**: 9:16 (vertical) recommended
- **Frame Rate**: 23-60 FPS
- **Bitrate**: 16 Mbps or higher

## 🔧 Troubleshooting

### Error: "Invalid Client Key"
- Check `.env` file has correct credentials
- Restart dev server after changing env vars

### Error: "Redirect URI Mismatch"
- Verify callback URL in TikTok Developer Portal matches exactly
- Must be HTTPS in production

### Error: "Insufficient Permissions"
- Check app has Content Posting API enabled
- Verify scopes include `video.upload` and `video.publish`

### Error: "Video Upload Failed"
- Check video meets requirements (size, format, duration)
- Verify access token is valid (not expired)

### Domain Verification Failed
- Ensure verification file is accessible
- Check file content matches exactly (no extra spaces/newlines)
- Wait 5-10 minutes for DNS propagation

## 🔐 Security Best Practices

1. **Never commit `.env` file** to git
2. **Rotate secrets regularly** (every 90 days)
3. **Use HTTPS only** in production
4. **Validate file uploads** on client & server
5. **Store access tokens securely** (encrypted)

## 📚 Resources

- **TikTok Developer Docs**: https://developers.tiktok.com/doc/
- **Content Posting API**: https://developers.tiktok.com/doc/content-posting-api-get-started/
- **API Reference**: https://developers.tiktok.com/doc/content-posting-api-reference/
- **Community Forum**: https://developers.tiktok.com/community/

## 🎯 Next Steps

After setup complete:

1. ✅ Test upload dengan test account
2. ✅ Submit app for review
3. ✅ Wait for approval
4. ✅ Go live with production credentials
5. ✅ Monitor API usage & limits

## 💡 Pro Tips

- **Schedule uploads** during peak hours (9-11 AM, 7-10 PM)
- **Use trending hashtags** for better reach
- **Optimize thumbnails** (first frame matters!)
- **Test different content types** (A/B testing)
- **Monitor analytics** to improve performance

---

Need help? Contact: support@sanztech.online
