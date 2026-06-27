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
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
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
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
        'dot-grid-dark': 'radial-gradient(circle, #27272a 1px, transparent 1px)',
        'grid-light': `linear-gradient(to right, #e4e4e7 1px, transparent 1px),
                       linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)`,
        'grid-dark': `linear-gradient(to right, #27272a 1px, transparent 1px),
                      linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
      },
      backgroundSize: {
        'dot-sm': '24px 24px',
        'dot-md': '32px 32px',
        'grid-sm': '32px 32px',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.2)',
        'glow-cyan-sm': '0 0 20px rgba(34, 211, 238, 0.15)',
        'glow-violet': '0 0 40px rgba(167, 139, 250, 0.2)',
        'glow-navy': '0 0 40px rgba(8, 145, 178, 0.2)',
        'glow-blue': '0 0 40px rgba(34, 211, 238, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
