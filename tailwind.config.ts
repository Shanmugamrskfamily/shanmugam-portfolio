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
        display: ['var(--font-display)', 'Orbitron', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'force-pulse': 'forcePulse 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
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
        forcePulse: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 8px rgba(91,200,245,0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 24px rgba(91,200,245,0.65)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        /* Light mode: subtle dot texture */
        'sand-light': 'radial-gradient(circle, rgba(29,78,216,0.045) 1px, transparent 1px)',
        /* Dark mode: single-layer star field base (multi-layer added inline) */
        'stars-dark': 'radial-gradient(circle, rgba(255,255,255,0.65) 1px, transparent 1px)',
        /* Legacy */
        'dot-grid': 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
        'dot-grid-dark': 'radial-gradient(circle, rgba(91,200,245,0.18) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(91, 200, 245, 0.22)',
        'glow-cyan-sm': '0 0 16px rgba(91, 200, 245, 0.16)',
        'glow-blue': '0 0 40px rgba(29, 78, 216, 0.2)',
        'glow-navy': '0 0 40px rgba(29, 78, 216, 0.2)',
        'sw-card': '0 0 0 1px rgba(91, 200, 245, 0.14), 0 0 20px rgba(91, 200, 245, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
