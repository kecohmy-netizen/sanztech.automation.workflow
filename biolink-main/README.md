# Biolinks - Privacy Policy Page

Static Privacy Policy page untuk TikTok API compliance.

## 📁 Files

- `privacy-policy.html` - Privacy Policy page
- `netlify.toml` - Netlify deployment configuration

## 🚀 Deploy ke Netlify

### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Method 2: Netlify Dashboard

1. Pergi ke [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect dengan GitHub/GitLab/Bitbucket
4. Select folder `Biolinks`
5. Build settings:
   - Build command: (kosong)
   - Publish directory: `.` (current directory)
6. Click "Deploy site"

### Method 3: Drag & Drop

1. Pergi ke [Netlify Drop](https://app.netlify.com/drop)
2. Drag folder `Biolinks` ke browser
3. Netlify akan auto-deploy

## 🔗 URLs

Selepas deploy, Privacy Policy akan available di:
- `https://your-site.netlify.app/privacy-policy`
- `https://your-site.netlify.app/privacy-policy.html`

## 📝 Update Privacy Policy URL

Selepas deploy, update URL dalam TikTok Developer Portal:
1. Login ke [TikTok for Developers](https://developers.tiktok.com/)
2. Pergi ke App Settings
3. Add Privacy Policy URL: `https://your-site.netlify.app/privacy-policy`

## ✅ Compliance Checklist

- [x] Privacy Policy page created
- [x] Netlify configuration ready
- [ ] Deploy to Netlify
- [ ] Add Privacy Policy URL to TikTok Developer Portal
- [ ] Test URL accessibility

