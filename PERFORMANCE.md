# Performance Optimization Guide

This document outlines the performance optimizations implemented and best practices for maintaining optimal performance.

## Current Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 1.0s
- **FID (First Input Delay)**: < 50ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Implemented Optimizations

### 1. Build Optimizations

#### Code Splitting
```javascript
// Dynamic imports for heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

#### Tree Shaking
- ES modules for better tree shaking
- Unused code automatically removed by Vite

#### Minification
- JavaScript minified with esbuild
- CSS minified and purged with Tailwind
- HTML minified in production build

### 2. Asset Optimization

#### Images
- Use WebP format where supported
- Implement lazy loading
- Proper sizing and compression
- Use `loading="lazy"` attribute

```jsx
<img 
  src="image.webp" 
  alt="Description" 
  loading="lazy"
  width="800"
  height="600"
/>
```

#### Fonts
- Preconnect to Google Fonts
- Use `font-display: swap`
- Subset fonts to include only needed characters

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 3. React Optimizations

#### Memoization
```javascript
// Memoize expensive components
const MemoizedComponent = React.memo(Component);

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

#### Avoid Unnecessary Re-renders
```javascript
// Use proper dependency arrays
useEffect(() => {
  // Effect code
}, [dependency1, dependency2]);

// Avoid inline object/array creation
// ❌ Bad
<Component style={{ margin: 10 }} />

// ✅ Good
const style = { margin: 10 };
<Component style={style} />
```

### 4. Event Listeners

#### Passive Listeners
```javascript
// For scroll and touch events
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('touchmove', handleTouch, { passive: true });
```

#### Debouncing/Throttling
```javascript
// Debounce expensive operations
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);

// Throttle frequent events
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### 5. CSS Optimizations

#### Critical CSS
- Inline critical CSS in `<head>`
- Load non-critical CSS asynchronously

#### Animations
```css
/* Use transform and opacity for animations */
.element {
  will-change: transform;
  transform: translateX(0);
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Avoid animating expensive properties */
/* ❌ Bad */
.element {
  transition: width 300ms;
}

/* ✅ Good */
.element {
  transition: transform 300ms;
}
```

#### Reduce Paint/Layout
```css
/* Use contain for isolated components */
.card {
  contain: layout style paint;
}

/* Use content-visibility for off-screen content */
.section {
  content-visibility: auto;
}
```

### 6. Network Optimizations

#### Resource Hints
```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Prefetch resources for next page -->
<link rel="prefetch" href="/next-page.js">

<!-- Preload critical resources -->
<link rel="preload" href="/critical.css" as="style">
```

#### Compression
- Enable gzip/brotli compression
- Serve compressed assets
- Use CDN for static assets

#### Caching
```nginx
# Cache static assets
location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### 7. JavaScript Optimizations

#### Reduce Bundle Size
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer
```

#### Code Splitting
```javascript
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
```

#### Remove Console Logs
```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
```

## Performance Monitoring

### Tools

1. **Lighthouse**
   ```bash
   npm install -g lighthouse
   lighthouse https://rajshah.dev --view
   ```

2. **WebPageTest**
   - Visit https://www.webpagetest.org
   - Test from multiple locations
   - Analyze waterfall charts

3. **Chrome DevTools**
   - Performance tab for profiling
   - Network tab for resource analysis
   - Coverage tab for unused code

### Metrics to Track

```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Best Practices

### 1. Images
- Use appropriate formats (WebP, AVIF)
- Implement responsive images
- Lazy load below-the-fold images
- Use CDN for image delivery

### 2. Fonts
- Limit font weights and styles
- Use system fonts as fallback
- Implement font-display: swap
- Subset fonts when possible

### 3. Third-Party Scripts
- Load asynchronously
- Use defer attribute
- Consider self-hosting
- Implement consent management

### 4. API Calls
- Implement caching
- Use pagination
- Debounce search inputs
- Show loading states

### 5. State Management
- Keep state minimal
- Avoid deep nesting
- Use context wisely
- Consider state colocation

## Performance Budget

### Target Metrics
- **Total Page Size**: < 500KB
- **JavaScript**: < 200KB
- **CSS**: < 50KB
- **Images**: < 200KB
- **Fonts**: < 50KB

### Monitoring
```json
{
  "budgets": [
    {
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 200
        },
        {
          "resourceType": "stylesheet",
          "budget": 50
        },
        {
          "resourceType": "image",
          "budget": 200
        }
      ]
    }
  ]
}
```

## Testing Performance

### Local Testing
```bash
# Build and analyze
npm run build
npx vite-bundle-visualizer

# Test production build
npm run preview
```

### Automated Testing
```javascript
// lighthouse-ci.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173/'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1 }],
      },
    },
  },
};
```

## Continuous Optimization

### Regular Audits
- Run Lighthouse monthly
- Monitor Core Web Vitals
- Check bundle size on each build
- Review third-party scripts

### Updates
- Keep dependencies updated
- Monitor for security issues
- Test after major updates
- Review performance impact

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)

## Support

For performance issues:
- Profile with Chrome DevTools
- Check Network tab for bottlenecks
- Review React DevTools Profiler
- Email: rajshah9305@gmail.com
