import type { Config } from 'tailwindcss';

// Styling lives in CSS modules and the tokens in src/app/globals.css.
// Tailwind stays installed but unused; this config keeps its content scan scoped.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};

export default config;
