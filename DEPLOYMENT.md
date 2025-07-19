# Deployment Guide - AI Innovation Client Portal

This guide will walk you through deploying your AI Innovation client portal to various platforms.

## 🚀 Quick Start - GitHub Pages

### 1. Prepare Your Repository

1. **Create a GitHub repository** (if you haven't already)
2. **Push your code** to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI Innovation Client Portal"
   git branch -M main
   git remote add origin https://github.com/yourusername/ainnovation-client-portal.git
   git push -u origin main
   ```

### 2. Configure Environment Variables

1. **Create a `.env` file** in your project root:
   ```env
   REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_clerk_key
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_key
   ```

2. **Update the homepage URL** in `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/ainnovation-client-portal"
   }
   ```

### 3. Deploy to GitHub Pages

1. **Install gh-pages** (already included in package.json):
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Build and deploy**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Set "Source" to "Deploy from a branch"
   - Select "gh-pages" branch
   - Click "Save"

4. **Your site will be available at**: `https://yourusername.github.io/ainnovation-client-portal`

## 🔧 Alternative Deployment Options

### Netlify

1. **Connect your GitHub repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
3. **Add environment variables** in Netlify dashboard
4. **Deploy automatically** on every push

### Vercel

1. **Import your project** to Vercel
2. **Configure build settings**:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
3. **Add environment variables** in Vercel dashboard
4. **Deploy automatically** on every push

### AWS S3 + CloudFront

1. **Create an S3 bucket** for static hosting
2. **Upload the build folder**:
   ```bash
   npm run build
   aws s3 sync build/ s3://your-bucket-name
   ```
3. **Configure CloudFront** for CDN and HTTPS
4. **Set up automatic deployment** with GitHub Actions

## 🔐 Environment Variables Setup

### Clerk.dev Setup

1. **Create a Clerk account** at [clerk.dev](https://clerk.dev)
2. **Create a new application**
3. **Get your publishable key** from the dashboard
4. **Configure authentication settings**:
   - Allowed origins: Add your domain
   - Redirect URLs: Add your success/error URLs

### Stripe Setup

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. **Get your publishable key** from the dashboard
3. **Set up webhook endpoints** (for production)
4. **Configure products** in Stripe dashboard (optional)

## 🎨 Custom Domain Setup

### GitHub Pages with Custom Domain

1. **Add a CNAME file** in the `public` folder:
   ```
   yourdomain.com
   ```

2. **Configure DNS**:
   - Add CNAME record: `yourdomain.com` → `yourusername.github.io`
   - Add A record: `@` → `185.199.108.153`

3. **Update homepage** in `package.json`:
   ```json
   {
     "homepage": "https://yourdomain.com"
   }
   ```

4. **Redeploy**:
   ```bash
   npm run deploy
   ```

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      env:
        REACT_APP_CLERK_PUBLISHABLE_KEY: ${{ secrets.CLERK_PUBLISHABLE_KEY }}
        REACT_APP_STRIPE_PUBLISHABLE_KEY: ${{ secrets.STRIPE_PUBLISHABLE_KEY }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**:
   - Check environment variables are set
   - Ensure all dependencies are installed
   - Check for syntax errors in code

2. **Authentication not working**:
   - Verify Clerk publishable key is correct
   - Check allowed origins in Clerk dashboard
   - Ensure HTTPS is enabled (required for Clerk)

3. **Payments not working**:
   - Verify Stripe publishable key is correct
   - Check Stripe webhook configuration
   - Ensure you're using test keys for development

4. **Styling issues**:
   - Clear browser cache
   - Check Tailwind CSS is building correctly
   - Verify custom CSS classes are applied

### Performance Optimization

1. **Enable compression** on your hosting platform
2. **Use CDN** for static assets
3. **Optimize images** before uploading
4. **Enable caching** headers

## 📞 Support

If you encounter issues:

1. **Check the browser console** for errors
2. **Review the deployment logs**
3. **Verify environment variables** are set correctly
4. **Contact support** with specific error messages

## 🔄 Updates and Maintenance

### Regular Updates

1. **Keep dependencies updated**:
   ```bash
   npm update
   npm audit fix
   ```

2. **Test locally** before deploying:
   ```bash
   npm start
   ```

3. **Deploy updates**:
   ```bash
   npm run deploy
   ```

### Monitoring

1. **Set up error tracking** (e.g., Sentry)
2. **Monitor performance** with tools like Lighthouse
3. **Track user analytics** with Google Analytics
4. **Monitor Stripe webhooks** for payment issues

## 🎯 Next Steps

After deployment:

1. **Test all functionality** on the live site
2. **Configure custom domain** (if desired)
3. **Set up monitoring and analytics**
4. **Create backup and recovery procedures**
5. **Document maintenance procedures** 