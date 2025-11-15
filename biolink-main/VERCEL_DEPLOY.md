# 🚀 Deploy ke Vercel (Alternatif Netlify)

## ✅ Kelebihan Vercel
- **Free tier** untuk Next.js projects
- **Auto-deploy** dari GitHub
- **Fast CDN** global
- **No credit limit** untuk personal projects
- **Perfect untuk Next.js** (made by Vercel team)

## 📋 Prerequisites
1. GitHub account (code mesti dalam GitHub repo)
2. Vercel account (free)

## 🚀 Setup Steps

### Step 1: Push Code ke GitHub (jika belum)

```powershell
cd D:\New202\Biolinks
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Login ke Vercel

1. Pergi ke https://vercel.com
2. Klik **"Sign Up"** atau **"Login"**
3. Login dengan **GitHub** account (recommended)

### Step 3: Import Project

1. Klik **"Add New..."** → **"Project"**
2. Pilih **GitHub repository** (Biolinks project)
3. Vercel akan auto-detect Next.js

### Step 4: Configure Project

**Build Settings** (auto-detected):
- **Framework Preset:** Next.js ✅
- **Root Directory:** `./` (default)
- **Build Command:** `pnpm build` (auto)
- **Output Directory:** `.next` (auto)
- **Install Command:** `pnpm install` (auto)

**Environment Variables** (jika ada):
- Add any `.env` variables di Vercel dashboard

### Step 5: Deploy!

1. Klik **"Deploy"**
2. Tunggu 2-3 minit untuk build
3. Site akan live di: `https://your-project-name.vercel.app`

## ✅ Verification File Setup

Vercel akan automatically serve files dari `public` folder, termasuk:
- `public/.well-known/tiktok-developers-site-verification.txt` ✅
- `public/tiktok-developers-site-verification.txt` ✅

**URLs akan accessible:**
- `https://your-project-name.vercel.app/.well-known/tiktok-developers-site-verification.txt`
- `https://your-project-name.vercel.app/tiktok-developers-site-verification.txt`

## 🔧 Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add custom domain: `sanzflow.com` (atau domain lain)
3. Follow DNS setup instructions
4. Update TikTok verification dengan domain baru

## 📝 Files Created

1. **`vercel.json`** - Vercel configuration
   - Rewrites untuk privacy/terms pages
   - Headers untuk `.well-known` folder
   - TikTok verification file redirects

2. **`scripts/copy-well-known.js`** - Post-build script
   - Copy `.well-known` folder ke `.next` output
   - Works dengan Vercel juga

## ✅ After Deploy

1. **Test verification file:**
   ```
   https://your-project-name.vercel.app/.well-known/tiktok-developers-site-verification.txt
   ```
   Should show: `tiktok-developers-site-verification=k0Oy6GgMKypVi6xIi40UdYm5Xqhf7cKM`

2. **Update TikTok Developer Portal:**
   - URL prefix: `https://your-project-name.vercel.app`
   - Click "Verify"

3. **Success!** ✅

## 🔍 Troubleshooting

### Build fails?
- Check Vercel build logs
- Verify `package.json` scripts
- Check Node.js version (Vercel auto-detects)

### File tidak accessible?
- Verify file dalam `public/.well-known/` folder
- Check `vercel.json` rewrites
- Wait beberapa minit untuk cache clear

### Custom domain?
- DNS propagation boleh ambil 24-48 jam
- Use Vercel's DNS atau external DNS provider

---

**Vercel = Free + Fast + Perfect untuk Next.js!** 🚀

