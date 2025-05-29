# 🚀 Vercel Deployment Guide

## Quick Deployment Steps

### 1. **Complete Required Updates**
Before deploying, update these critical items:

```bash
# Update phone number in SEO config
# Edit: src/utils/seo.ts
export const PHONE_NUMBER = "+1 (YOUR-REAL-NUMBER)";

# Add hero background image
# Place your image in: public/images/hero/hero-background.jpg

# Add OG image for social sharing
# Place your image in: public/images/diald-in-og-image.jpg

# Add favicon
# Place your favicon in: public/favicon.ico
```

### 2. **Test Build Locally**
```bash
npm run build
npm run preview
```

### 3. **Deploy to Vercel**

#### Option A: GitHub Integration (Recommended)
1. Push your code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Astro and configure build settings
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 4. **Configure Custom Domain**
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `dialdinbarberstudio.com`
4. Follow DNS configuration instructions
5. Verify SSL certificate is active

### 5. **Post-Deployment Checklist**
- [ ] Test all pages load correctly
- [ ] Verify booking link works
- [ ] Check shop redirect to DAKRI Hair
- [ ] Test mobile responsiveness
- [ ] Verify contact information is correct

## Current Configuration

Your site is already configured with:
- ✅ **Vercel.json** - Optimized caching and redirects
- ✅ **Node.js 18.17.1** - Specified in .nvmrc
- ✅ **Production Astro config** - Site URL ready
- ✅ **Privacy Policy** - Legal compliance
- ✅ **Simplified shop flow** - Direct to DAKRI Hair

## Environment Variables (if needed)
If you add analytics or other services later:
```bash
# In Vercel dashboard → Settings → Environment Variables
GOOGLE_ANALYTICS_ID=your_ga_id
```

## Support
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Astro Deployment**: [docs.astro.build/en/guides/deploy/vercel/](https://docs.astro.build/en/guides/deploy/vercel/)

---

**🎯 Your site is production-ready!** The main requirements are updating the phone number and adding images, then you can deploy immediately. 