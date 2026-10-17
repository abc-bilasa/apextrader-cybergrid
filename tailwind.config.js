/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'cyber-glow': '0 0 15px rgba(6, 182, 212, 0.3)',
        'cyber-level': '0 10px 15px -3px rgba(6, 182, 212, 0.2)',
      },
      colors: {
        cyber: {
          dark: '#030712',
          elevated: '#0f172a',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(6, 182, 212, 0.2)',
          cyan: '#06b6d4',
          neon: '#22d3ee',
          green: '#10b981',
          rose: '#f43f5e',
        },
      },
    },
  },
  plugins: [],
};
