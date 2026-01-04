# Quick Start Guide

Get the Raj Shah Portfolio up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Modern web browser

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/rajshah9305/Portyportfolio.git
cd Portyportfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

## Customization

### 1. Update Personal Information

Edit `src/data/portfolio.js`:

```javascript
export const PORTFOLIO_DATA = {
  profile: {
    name: "YOUR NAME",
    title: "YOUR TITLE",
    email: "your.email@example.com",
    // ... update other fields
  },
  // ... update services, projects, experience
};
```

### 2. Update Meta Tags

Edit `index.html`:

```html
<title>Your Name — Your Title</title>
<meta name="description" content="Your description" />
<meta property="og:title" content="Your Name" />
<!-- ... update other meta tags -->
```

### 3. Update Colors (Optional)

Edit `src/index.css`:

```css
:root {
  --color-primary: 234 88 12; /* Change primary color */
  /* ... other color variables */
}
```

### 4. Add Your Projects

In `src/data/portfolio.js`, update the `projects` array:

```javascript
projects: [
  {
    id: "01",
    title: "YOUR PROJECT",
    category: "CATEGORY",
    tech: ["Tech1", "Tech2", "Tech3"],
    description: "Project description",
    link: "https://github.com/yourusername/project",
    stat: "KEY METRIC",
    icon: Cpu, // Choose from lucide-react icons
    image: "https://your-image-url.com/image.jpg"
  },
  // ... more projects
]
```

## Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The production files will be in the `dist/` directory.

## Deploy

### Vercel (Easiest)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run deploy
```

## Common Tasks

### Update Content
1. Edit `src/data/portfolio.js`
2. Save and see changes in dev server

### Add New Component
1. Create file in `src/components/`
2. Export from `src/components/index.js`
3. Import in `App.jsx`

### Change Fonts
1. Update Google Fonts import in `src/index.css`
2. Update font family in Tailwind config

### Add Analytics
1. Add tracking code to `index.html`
2. Or use environment variables in `.env`

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styles Not Updating
```bash
# Restart dev server
# Press Ctrl+C, then npm run dev
```

## Next Steps

1. ✅ Customize content
2. ✅ Test on mobile devices
3. ✅ Run build command
4. ✅ Deploy to hosting platform
5. ✅ Set up custom domain
6. ✅ Submit to search engines

## Resources

- [Full Documentation](README.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Performance Guide](PERFORMANCE.md)
- [Code Quality Guide](CODE_QUALITY.md)

## Support

- Email: rajshah9305@gmail.com
- GitHub Issues: [Create Issue](https://github.com/rajshah9305/Portyportfolio/issues)
- LinkedIn: [rajshah9305](https://linkedin.com/in/rajshah9305)

---

**Ready to launch?** Follow the deployment guide and go live! 🚀
