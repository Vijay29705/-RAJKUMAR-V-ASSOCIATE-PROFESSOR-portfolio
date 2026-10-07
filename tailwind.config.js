/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--white)',
        },
        secondary: {
          DEFAULT: 'var(--gray-800)',
          foreground: 'var(--white)',
        },
        accent: {
          DEFAULT: '#d2ad46',
          soft: '#e5c86e',
          dark: '#a8622f',
        },
        gray: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#111317',
        },
      },
      borderRadius: {
        lg: 'var(--border-radius)',
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)',
        card: 'var(--shadow)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}