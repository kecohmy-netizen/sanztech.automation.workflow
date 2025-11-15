# 🔧 Fix Netlify Build Error

## ❌ Error
```
Failed Due To Plugin Error
Build script returned non-zero exit code: 2
```

## ✅ Solution

### Issue
- Project guna **pnpm**, tapi `netlify.toml` guna **npm**
- Node version mungkin tidak match

### Fix Applied

1. **Updated `netlify.toml`**:
   - Changed `npm run build` → `pnpm build`
   - Set NODE_VERSION = "20" (Next.js 15 requires Node 20)
   - Set PNPM_VERSION = "10"

2. **Files dalam `public` folder**:
   - ✅ `public/privacy-policy.html`
   - ✅ `public/terms-of-service.html`

## 🚀 Deploy Steps

### 1. Commit & Push
```bash
cd D:\New202\Biolinks
git add netlify.toml public/privacy-policy.html public/terms-of-service.html
git commit -m "Fix: Update Netlify config for pnpm and Node 20"
git push origin main
```

### 2. Check Netlify Dashboard
- Tunggu auto-deploy (2-3 minit)
- Check build logs jika masih fail
- Verify deployment success

### 3. Test URLs
- `https://sanzflow.netlify.app/privacy-policy`
- `https://sanzflow.netlify.app/terms-of-service`

## 🔍 Jika Masih Fail

### Check Build Logs
1. Pergi ke Netlify Dashboard
2. Click pada failed deployment
3. Check build logs untuk specific error
4. Common issues:
   - Missing dependencies
   - TypeScript errors
   - Build timeout
   - Memory issues

### Alternative: Manual Build Test
```bash
cd D:\New202\Biolinks
pnpm install
pnpm build
```

Jika build success locally, masalah mungkin dengan Netlify environment.

---

**Updated Config**: pnpm + Node 20 untuk Next.js 15! ✅

