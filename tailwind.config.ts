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
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['var(--font-display)', 'Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        clay: {
          primary: '#6c63ff',
          secondary: '#ff6b6b',
          accent: '#ffd93d',
          teal: '#4ecdc4',
        },
      },
      borderRadius: {
        clay: '24px',
        'clay-sm': '16px',
        'clay-lg': '32px',
      },
      animation: {
        'blob-float': 'blob-float 9s ease-in-out infinite',
        'blob-float-b': 'blob-float-b 11s ease-in-out infinite',
        'blob-float-c': 'blob-float 13s ease-in-out infinite 4s',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite 2s',
        'spin-slow': 'spin-slow 14s linear infinite',
        cursor: 'cursor-blink 1s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.455,0.03,0.515,0.955) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        'blob-float': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(24px,-20px) scale(1.06)' },
          '66%': { transform: 'translate(-14px,12px) scale(0.96)' },
        },
        'blob-float-b': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(-20px,22px) scale(0.95)' },
          '66%': { transform: 'translate(18px,-12px) scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.75)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(108,99,255,0.55)' },
          '70%': { boxShadow: '0 0 0 14px rgba(108,99,255,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(108,99,255,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'dot-subtle': 'radial-gradient(circle, rgba(108,99,255,0.08) 1px, transparent 1px)',
      },
      boxShadow: {
        clay: '0 8px 0 0 rgba(108,99,255,0.18), 0 14px 32px rgba(108,99,255,0.13)',
        'clay-sm': '0 5px 0 0 rgba(108,99,255,0.2), 0 8px 20px rgba(108,99,255,0.12)',
        'clay-lg': '0 12px 0 0 rgba(108,99,255,0.16), 0 22px 48px rgba(108,99,255,0.13)',
        'clay-hover': '0 18px 0 0 rgba(108,99,255,0.22), 0 28px 60px rgba(108,99,255,0.18)',
        'clay-dark': '0 8px 0 0 rgba(139,131,255,0.36), 0 16px 38px rgba(139,131,255,0.22)',
      },
    },
  },
  plugins: [],
};

export default config;
