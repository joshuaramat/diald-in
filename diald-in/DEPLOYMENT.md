# Diald In Barber Studio - Deployment Guide

## 🚀 Vercel Deployment Setup

This project is configured for deployment on Vercel with optimized settings for performance and SEO.

### Prerequisites

- Node.js >=18.17.1
- Git repository
- Vercel account

### Quick Deploy to Vercel

#### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

#### Option 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect Astro framework
5. Click "Deploy"

### Environment Configuration

The project is configured with:
- **Framework**: Astro (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.17.1 (specified in `.nvmrc`)

### Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain: `dialdinbarberstudio.com`
4. Configure DNS records as instructed by Vercel

### Performance Optimizations

The deployment includes:
- ✅ Static asset caching (1 year)
- ✅ Image optimization via Sharp
- ✅ CSS/JS minification
- ✅ Font optimization
- ✅ SEO-friendly URLs

### Build Process

The build process includes:
1. Image optimization (`npm run optimize-images`)
2. Font copying (`npm run copy-fonts`)
3. Astro build (`astro build`)
4. Post-build optimizations (`npm run post-build`)

### Monitoring & Analytics

Consider adding:
- Vercel Analytics
- Google Analytics
- Core Web Vitals monitoring

### Troubleshooting

**Node.js Version Issues:**
- Ensure local Node.js is >=18.17.1
- Check `.nvmrc` file is present
- Vercel will use the specified Node.js version

**Build Failures:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify image paths and assets exist

### Production Checklist

- [ ] Update site URL in `astro.config.mjs`
- [ ] Configure custom domain
- [ ] Set up SSL certificate (automatic with Vercel)
- [ ] Test all pages and functionality
- [ ] Verify SEO meta tags
- [ ] Check mobile responsiveness
- [ ] Test booking links and external integrations
- [ ] Monitor Core Web Vitals

### Support

For deployment issues:
- Check Vercel documentation
- Review build logs
- Ensure all environment variables are set 