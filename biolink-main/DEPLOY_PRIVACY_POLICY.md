# 🚀 Deploy Privacy Policy ke Netlify

## Quick Deploy

### Method 1: Netlify CLI (Recommended)

```bash
# Install Netlify CLI (jika belum)
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
cd D:\New202\Biolinks
netlify deploy --prod --dir .
```

### Method 2: Netlify Dashboard

1. Pergi ke: https://app.netlify.com
2. Pilih project **sanzflow** (atau create new project)
3. Pergi ke **Deploys** tab
4. Drag folder `D:\New202\Biolinks` ke **Deploy manually** section
5. Netlify akan auto-deploy

### Method 3: Connect dengan GitHub

Jika repo `kecohmy-netizen/biolink` dah connect dengan Netlify:

1. Push `privacy-policy.html` ke GitHub:
```bash
cd D:\New202\Biolinks
git add privacy-policy.html netlify.toml
git commit -m "Add Privacy Policy page for TikTok API compliance"
git push origin main
```

2. Netlify akan auto-deploy dari GitHub

## 📍 URL Selepas Deploy

Privacy Policy akan available di:
- `https://sanzflow.netlify.app/privacy-policy`
- `https://sanzflow.netlify.app/privacy-policy.html`

## ✅ Update TikTok Developer Portal

Selepas deploy, update Privacy Policy URL:

1. Login ke: https://developers.tiktok.com/
2. Pergi ke **App Settings**
3. Add Privacy Policy URL: `https://sanzflow.netlify.app/privacy-policy`
4. Save

## 🧪 Test

1. Buka: `https://sanzflow.netlify.app/privacy-policy`
2. Verify page loads correctly
3. Check semua sections visible
4. Test mobile responsive

