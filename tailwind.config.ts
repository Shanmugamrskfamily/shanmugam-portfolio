import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c2d3ff',
          300: '#a0b8ff',
          400: '#7d9bff',
          500: '#5a7eef',
          600: '#3a5fd6',
          700: '#2a4ab8',
          800: '#1F3864',
          900: '#162952',
          950: '#0d1a3a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
        'dot-grid-dark': 'radial-gradient(circle, #1e293b 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '24px 24px',
        'dot-md': '32px 32px',
      },
      boxShadow: {
        'glow-navy': '0 0 40px rgba(31, 56, 100, 0.25)',
        'glow-blue': '0 0 40px rgba(74, 123, 247, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
