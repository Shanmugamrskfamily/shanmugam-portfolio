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
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'tron-pulse': 'tronPulse 3s ease-in-out infinite',
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
        tronPulse: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 8px rgba(0,229,255,0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 20px rgba(0,229,255,0.6)' },
        },
      },
      backgroundImage: {
        /* Light mode: subtle blue grid */
        'grid-light': [
          'linear-gradient(to right, rgba(0,119,170,0.08) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(0,119,170,0.08) 1px, transparent 1px)',
        ].join(', '),
        /* Dark mode: Tron cyan grid */
        'grid-dark': [
          'linear-gradient(to right, rgba(0,229,255,0.07) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(0,229,255,0.07) 1px, transparent 1px)',
        ].join(', '),
        /* Legacy dot patterns */
        'dot-grid': 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
        'dot-grid-dark': 'radial-gradient(circle, rgba(0,229,255,0.18) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(0, 229, 255, 0.2)',
        'glow-cyan-sm': '0 0 16px rgba(0, 229, 255, 0.15)',
        'glow-blue': '0 0 40px rgba(0, 119, 170, 0.2)',
        'glow-navy': '0 0 40px rgba(0, 119, 170, 0.2)',
        'tron-card': '0 0 0 1px rgba(0, 229, 255, 0.12), 0 0 20px rgba(0, 229, 255, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
