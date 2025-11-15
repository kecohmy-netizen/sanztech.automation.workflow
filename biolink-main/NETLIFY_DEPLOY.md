# Netlify Deployment Guide

## Cara Deploy ke Netlify

### Option 1: Deploy melalui Netlify Dashboard (Recommended)

1. **Push code ke GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Login ke Netlify**
   - Pergi ke https://app.netlify.com
   - Login dengan GitHub/GitLab/Bitbucket

3. **Add New Site**
   - Klik "Add new site" → "Import an existing project"
   - Pilih repository anda
   - Netlify akan auto-detect Next.js

4. **Build Settings** (Auto-configured dengan netlify.toml):
   - **Build command:** `pnpm build`
   - **Publish directory:** `.next`
   - **Base directory:** (kosongkan)

5. **Environment Variables** (jika ada):
   - Site settings → Environment variables
   - Tambah variables yang diperlukan (contoh: API keys, etc.)

6. **Deploy**
   - Klik "Deploy site"
   - Tunggu build selesai
   - Site akan live!

### Option 2: Deploy dengan Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Drag & Drop (Quick Test)

1. **Build locally**
   ```bash
   pnpm build
   ```

2. **Drag folder `.next` ke Netlify Drop**
   - Pergi ke https://app.netlify.com/drop
   - Drag folder `.next`

**Note:** Option 3 tidak recommended untuk production, guna Option 1 atau 2.

## Build Settings Summary

- **Framework:** Next.js 15
- **Build command:** `pnpm build`
- **Publish directory:** `.next`
- **Node version:** 20
- **Package manager:** pnpm

## Troubleshooting

### Build fails?
- Check Node version (perlu 20)
- Check pnpm version (perlu 10)
- Check build logs dalam Netlify dashboard

### Images tidak load?
- Pastikan `next.config.ts` ada remotePatterns untuk external images
- Check image URLs dalam code

### Sound files tidak load?
- Pastikan files dalam `public/sounds/` dah commit ke git
- Check file paths dalam code

## Post-Deployment

1. **Custom Domain** (optional)
   - Site settings → Domain management
   - Add custom domain

2. **Environment Variables**
   - Tambah production environment variables jika perlu

3. **Analytics** (optional)
   - Enable Netlify Analytics untuk track visitors

