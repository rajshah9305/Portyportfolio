# Code Quality Standards

This document outlines the code quality standards and best practices for the Raj Shah Portfolio project.

## Architecture Overview

### Project Structure
```
src/
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── data/            # Static data and configuration
├── styles/          # Global styles and utilities
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
└── index.css        # Global styles and design tokens
```

### Component Organization

#### Component File Structure
```jsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import { Icon } from 'lucide-react';
import { useCustomHook } from '../hooks/useCustomHook';

// 2. Component Definition
export const ComponentName = ({ prop1, prop2, ...props }) => {
  // 3. Hooks (in order: state, effects, custom hooks)
  const [state, setState] = useState(initialValue);
  const customValue = useCustomHook();
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 4. Event Handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 5. Derived Values
  const computedValue = useMemo(() => {
    return expensiveComputation(state);
  }, [state]);
  
  // 6. Early Returns
  if (!data) return null;
  
  // 7. Render
  return (
    <div className="component-wrapper">
      {/* JSX */}
    </div>
  );
};
```

## React Best Practices

### 1. Component Design

#### Single Responsibility
```jsx
// ❌ Bad: Component does too much
const UserProfile = () => {
  // Fetches data, handles auth, renders UI, manages forms
};

// ✅ Good: Separate concerns
const UserProfile = () => {
  const user = useUser();
  return <UserProfileView user={user} />;
};
```

#### Composition Over Inheritance
```jsx
// ✅ Good: Use composition
const Card = ({ children, ...props }) => (
  <div className="card" {...props}>
    {children}
  </div>
);

const ServiceCard = ({ service }) => (
  <Card>
    <CardHeader title={service.title} />
    <CardBody content={service.description} />
  </Card>
);
```

### 2. Props

#### Destructuring
```jsx
// ✅ Good: Destructure props
const Button = ({ children, onClick, variant = 'primary' }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

#### Prop Types (or TypeScript)
```jsx
// With PropTypes
import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
```

### 3. State Management

#### Local State
```jsx
// ✅ Good: Keep state close to where it's used
const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

#### Derived State
```jsx
// ❌ Bad: Storing derived state
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0);

// ✅ Good: Calculate derived values
const [items, setItems] = useState([]);
const itemCount = items.length;
```

### 4. Effects

#### Dependency Arrays
```jsx
// ✅ Good: Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ Bad: Missing dependencies
useEffect(() => {
  fetchData(userId);
}, []); // userId is missing
```

#### Cleanup
```jsx
// ✅ Good: Clean up side effects
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

### 5. Performance

#### Memoization
```jsx
// Expensive component
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive render */}</div>;
});

// Expensive calculation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Stable callback
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## Code Style

### 1. Naming Conventions

#### Components
```jsx
// PascalCase for components
const UserProfile = () => {};
const ServiceCard = () => {};
```

#### Functions
```jsx
// camelCase for functions
const handleClick = () => {};
const fetchUserData = async () => {};
```

#### Constants
```jsx
// UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
```

#### Boolean Variables
```jsx
// Use is/has/should prefix
const isLoading = true;
const hasError = false;
const shouldRender = true;
```

### 2. File Naming

```
// Components: PascalCase
Button.jsx
ServiceCard.jsx
Navigation.jsx

// Hooks: camelCase with 'use' prefix
useDecrypt.js
useScrollProgress.js

// Utilities: camelCase
formatDate.js
validateEmail.js

// Data: camelCase
portfolio.js
config.js
```

### 3. Formatting

#### Indentation
- Use 2 spaces for indentation
- Consistent across all files

#### Line Length
- Maximum 100 characters per line
- Break long lines logically

#### Spacing
```jsx
// ✅ Good: Consistent spacing
const Component = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);
  
  return (
    <div className="wrapper">
      <Child prop={state} />
    </div>
  );
};
```

## CSS/Tailwind Best Practices

### 1. Class Organization

```jsx
// Order: layout → spacing → typography → colors → effects
<div className="
  flex items-center justify-between
  px-6 py-4 gap-4
  text-lg font-bold
  bg-white text-zinc-900
  hover:bg-zinc-50 transition-colors
">
```

### 2. Custom Classes

```css
/* Use @layer for custom utilities */
@layer components {
  .card {
    @apply border border-zinc-200 bg-white p-8;
    @apply transition-all duration-300;
    @apply hover:border-orange-600 hover:shadow-lg;
  }
}
```

### 3. Responsive Design

```jsx
// Mobile-first approach
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

## Accessibility

### 1. Semantic HTML

```jsx
// ✅ Good: Use semantic elements
<nav>
  <ul>
    <li><a href="#services">Services</a></li>
  </ul>
</nav>

// ❌ Bad: Generic divs
<div>
  <div>
    <div><a href="#services">Services</a></div>
  </div>
</div>
```

### 2. ARIA Labels

```jsx
// For interactive elements without text
<button 
  onClick={handleClick}
  aria-label="Close modal"
>
  <X size={24} />
</button>

// For dynamic content
<div 
  role="status" 
  aria-live="polite"
>
  {statusMessage}
</div>
```

### 3. Keyboard Navigation

```jsx
// Ensure keyboard accessibility
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</button>
```

## Error Handling

### 1. Try-Catch

```jsx
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
```

### 2. Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Testing

### 1. Component Testing

```jsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  screen.getByText('Click me').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 2. Hook Testing

```jsx
import { renderHook } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});
```

## Documentation

### 1. Component Documentation

```jsx
/**
 * Button component with multiple variants
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {'primary'|'secondary'} props.variant - Button style variant
 * @param {React.ComponentType} props.icon - Optional icon component
 * @returns {React.ReactElement} Button element
 * 
 * @example
 * <Button onClick={handleClick} variant="primary" icon={Mail}>
 *   Contact Me
 * </Button>
 */
export const Button = ({ children, onClick, variant, icon: Icon }) => {
  // Implementation
};
```

### 2. Complex Logic

```jsx
// Document non-obvious logic
const calculateDiscount = (price, quantity) => {
  // Apply bulk discount: 10% for 10+ items, 20% for 50+ items
  if (quantity >= 50) return price * 0.8;
  if (quantity >= 10) return price * 0.9;
  return price;
};
```

## Git Practices

### 1. Commit Messages

```bash
# Format: Type: Brief description
Add: Service modal component
Fix: Mobile menu scroll locking
Update: Button accessibility
Refactor: Extract custom hooks
```

### 2. Branch Naming

```bash
feature/service-modal
fix/mobile-menu-scroll
update/button-accessibility
refactor/custom-hooks
```

## Code Review Checklist

- [ ] Code follows style guide
- [ ] Components are properly structured
- [ ] Props are validated
- [ ] Accessibility requirements met
- [ ] Performance optimizations applied
- [ ] Error handling implemented
- [ ] Tests written (if applicable)
- [ ] Documentation updated
- [ ] No console.logs in production code
- [ ] Build passes without warnings

## Tools

### Linting
```bash
# ESLint for JavaScript
npm run lint

# Prettier for formatting
npm run format
```

### Type Checking
```bash
# If using TypeScript
npm run type-check
```

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

## Support

For code quality questions:
- Review this guide
- Check React documentation
- Ask in pull request comments
- Email: rajshah9305@gmail.com
