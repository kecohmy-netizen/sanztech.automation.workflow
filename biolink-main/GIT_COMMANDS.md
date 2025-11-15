# 🔧 Git Commands untuk Deploy

## Run commands ini dalam terminal baru:

```bash
cd D:\New202\Biolinks

# Stage files
git add public/privacy-policy.html public/terms-of-service.html netlify.toml

# Commit
git commit -m "Fix 404: Move HTML files to public folder for Next.js"

# Push
git push origin main
```

## Atau run satu-satu:

```bash
cd D:\New202\Biolinks
git add public/privacy-policy.html
git add public/terms-of-service.html
git add netlify.toml
git commit -m "Fix 404: Move HTML files to public folder for Next.js"
git push origin main
```

## Selepas Push

1. Check Netlify dashboard
2. Tunggu deploy selesai (2-3 minit)
3. Test URLs:
   - https://sanzflow.netlify.app/privacy-policy
   - https://sanzflow.netlify.app/terms-of-service

## Files yang akan di-deploy

- ✅ `public/privacy-policy.html`
- ✅ `public/terms-of-service.html`
- ✅ `netlify.toml` (updated config)

---

**Note**: Jika terminal ada issue, buka terminal baru dan run commands di atas.

