# ⚡ Quick Vercel Setup (5 Minit!)

## 🚀 Step-by-Step

### 1. Push Code ke GitHub
```powershell
cd D:\New202\Biolinks
git add vercel.json VERCEL_DEPLOY.md
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. Login Vercel
1. Pergi ke: **https://vercel.com**
2. Klik **"Sign Up"** (free)
3. Login dengan **GitHub**

### 3. Import Project
1. Klik **"Add New..."** → **"Project"**
2. Pilih **Biolinks** repository
3. Vercel auto-detect Next.js ✅

### 4. Deploy!
1. Klik **"Deploy"** button
2. Tunggu 2-3 minit
3. **Done!** Site live di: `https://your-project.vercel.app`

## ✅ TikTok Verification

Setelah deploy, test:
```
https://your-project.vercel.app/.well-known/tiktok-developers-site-verification.txt
```

Should show: `tiktok-developers-site-verification=k0Oy6GgMKypVi6xIi40UdYm5Xqhf7cKM`

## 🎯 Update TikTok Portal

1. Buka TikTok Developer Portal
2. Update URL prefix: `https://your-project.vercel.app`
3. Click **"Verify"**
4. **Success!** ✅

---

**Vercel = Free + No Credit Limit!** 🚀

