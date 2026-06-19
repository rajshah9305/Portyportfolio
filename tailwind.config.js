/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs':  '375px',  // small phones (iPhone SE, Galaxy A)
      'sm':  '640px',  // large phones / small tablets
      'md':  '768px',  // tablets
      'lg':  '1024px', // small laptops
      'xl':  '1280px', // desktops
      '2xl': '1536px', // large desktops
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        border: 'rgb(var(--color-border) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark:    'rgb(var(--color-primary-dark) / <alpha-value>)',
          light:   'rgb(var(--color-primary-light) / <alpha-value>)',
        },
      },
      transitionTimingFunction: {
        'out-expo':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'in-out-circ':  'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      animation: {
        'fadeIn':  'fadeIn  600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'slideUp': 'slideUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      // Fluid container padding
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xs:  '1.25rem',
          sm:  '1.5rem',
          md:  '2rem',
          lg:  '3rem',
          xl:  '4rem',
          '2xl': '5rem',
        },
      },
    },
  },
  plugins: [],
};
