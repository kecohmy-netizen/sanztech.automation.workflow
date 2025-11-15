# 🚀 TikTok API - Quick Start

## ⚡ 5-Minute Setup

### 1. Get TikTok Credentials
```
1. Go to: https://developers.tiktok.com/
2. Create app
3. Copy Client Key & Client Secret
```

### 2. Configure Environment
```bash
# Create .env file
cp .env.example .env

# Edit .env and add:
VITE_TIKTOK_CLIENT_KEY=your_client_key
VITE_TIKTOK_CLIENT_SECRET=your_client_secret
VITE_TIKTOK_REDIRECT_URI=https://bio.sanztech.online/tiktok/callback
```

### 3. Start Server
```bash
npm run dev
```

### 4. Test Upload
```
1. Open: http://localhost:5173/tiktok-upload
2. Click "Connect TikTok Account"
3. Authorize app
4. Upload video!
```

## 📁 Files Created

```
src/
├── services/
│   └── tiktokService.ts          # TikTok API integration
├── pages/
│   ├── TikTokUpload.tsx          # Upload UI
│   └── TikTokCallback.tsx        # OAuth callback
└── App.tsx                        # Routes added

.env.example                       # Environment template
TIKTOK_API_SETUP.md               # Full setup guide
```

## 🎯 Features

✅ OAuth 2.0 authentication
✅ Video upload with metadata
✅ Privacy settings (Public/Friends/Private)
✅ Disable comments/duet/stitch
✅ Real-time upload status
✅ File validation (size, format)
✅ Beautiful black & gold UI

## 🎬 Video Requirements

- Format: MP4, MOV, WEBM
- Max size: 4GB
- Duration: 3s - 10min
- Resolution: 720p+ (1080p recommended)
- Aspect ratio: 9:16 (vertical)

## 🔗 Routes

- `/tiktok-upload` - Upload page (protected)
- `/tiktok/callback` - OAuth callback (public)

## 📊 API Limits

**Development**: 5 videos/day
**Production**: 50 videos/day (after approval)

## 🆘 Need Help?

Read full guide: `TIKTOK_API_SETUP.md`

---

**Status**: ✅ Ready to use!
**Domain**: bio.sanztech.online
**Verified**: ✅ Yes
