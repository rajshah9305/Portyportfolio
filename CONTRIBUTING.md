# Contributing to Raj Shah Portfolio

Thank you for your interest in contributing! While this is a personal portfolio project, I welcome suggestions, bug reports, and improvements.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and device information

### Suggesting Enhancements

For feature suggestions:
- Explain the use case
- Describe the proposed solution
- Consider alternatives
- Note any potential drawbacks

### Code Contributions

1. **Fork the repository**
   ```bash
   git clone https://github.com/rajshah9305/Portyportfolio.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Include screenshots for UI changes

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic only

### Component Structure

```jsx
import React from 'react';
import { Icon } from 'lucide-react';

export const ComponentName = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = useState(null);
  
  // Event handlers
  const handleClick = () => {
    // Logic here
  };
  
  // Render
  return (
    <div className="component-class">
      {/* JSX here */}
    </div>
  );
};
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Use custom CSS variables for consistency
- Avoid inline styles unless dynamic

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios

### Performance

- Lazy load images and components
- Use React.memo for expensive components
- Avoid unnecessary re-renders
- Optimize animations with will-change
- Keep bundle size minimal

## Testing

Before submitting:
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Check responsive breakpoints
- Verify accessibility
- Run the build command

```bash
npm run build
```

## Commit Message Format

Use clear, descriptive commit messages:

```
Type: Brief description

Detailed explanation (if needed)
```

Types:
- `Add:` New feature or component
- `Fix:` Bug fix
- `Update:` Modify existing feature
- `Remove:` Delete code or feature
- `Refactor:` Code restructuring
- `Docs:` Documentation changes
- `Style:` Formatting, no code change
- `Perf:` Performance improvement

Examples:
```
Add: Service modal component with detailed information
Fix: Mobile menu scroll locking issue
Update: Button component with better accessibility
Refactor: Extract hooks into separate files
```

## Questions?

Feel free to reach out:
- Email: rajshah9305@gmail.com
- GitHub Issues: [Create an issue](https://github.com/rajshah9305/Portyportfolio/issues)
- LinkedIn: [rajshah9305](https://linkedin.com/in/rajshah9305)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
