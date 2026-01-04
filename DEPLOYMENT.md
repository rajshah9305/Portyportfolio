# Deployment Guide

This guide covers deploying the Raj Shah Portfolio to various hosting platforms.

## Pre-Deployment Checklist

- [ ] Update content in `src/data/portfolio.js`
- [ ] Test build locally: `npm run build`
- [ ] Verify all links work
- [ ] Check responsive design on multiple devices
- [ ] Test accessibility with screen readers
- [ ] Optimize images (compress, convert to WebP if needed)
- [ ] Update meta tags in `index.html`
- [ ] Set up environment variables
- [ ] Test production build: `npm run preview`

## Vercel (Recommended)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rajshah9305/Portyportfolio)

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Netlify

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rajshah9305/Portyportfolio)

### Manual Deployment

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/Portyportfolio/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root

## Cloudflare Pages

1. **Connect Repository**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your GitHub repository

2. **Build Configuration**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

3. **Environment Variables**
   - Add any required environment variables

4. **Deploy**
   - Click "Save and Deploy"

## Custom Server (VPS/Dedicated)

### Using Nginx

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload dist folder to server**
   ```bash
   scp -r dist/* user@server:/var/www/rajshah.dev/
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name rajshah.dev www.rajshah.dev;
       
       root /var/www/rajshah.dev;
       index index.html;
       
       # Gzip compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
       
       # Security headers
       add_header X-Frame-Options "DENY" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header Referrer-Policy "strict-origin-when-cross-origin" always;
       
       # Cache static assets
       location /assets/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # SPA fallback
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d rajshah.dev -d www.rajshah.dev
   ```

## Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **Build and run**
   ```bash
   docker build -t rajshah-portfolio .
   docker run -p 80:80 rajshah-portfolio
   ```

## Environment Variables

For production, set these environment variables:

```bash
VITE_SITE_URL=https://rajshah.dev
VITE_SITE_NAME=Raj Shah Portfolio
VITE_CONTACT_EMAIL=rajshah9305@gmail.com
```

## Post-Deployment

1. **Verify Deployment**
   - Check all pages load correctly
   - Test all links and navigation
   - Verify images load
   - Test contact forms/email links

2. **Performance Testing**
   - Run Lighthouse audit
   - Check PageSpeed Insights
   - Test on WebPageTest

3. **SEO Verification**
   - Submit sitemap to Google Search Console
   - Verify robots.txt is accessible
   - Check meta tags with SEO tools

4. **Monitoring**
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Configure error tracking (Sentry)
   - Set up analytics (Google Analytics, Plausible)

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Refresh

Ensure your hosting platform is configured for SPA routing (see platform-specific configs above).

### Assets Not Loading

Check the `base` path in `vite.config.js` matches your deployment URL structure.

### Slow Load Times

- Enable gzip/brotli compression
- Optimize images
- Use CDN for assets
- Enable HTTP/2

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Contact platform support
- Email: rajshah9305@gmail.com
