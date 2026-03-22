/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          elevated: 'var(--color-bg-elevated)',
        },
        border: 'var(--color-border)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          light: 'var(--color-accent-light)',
        },
        warning: 'var(--color-warning)',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 var(--color-border)',
        'brutal-hover': '6px 6px 0 0 var(--color-accent)',
        'brutal-active': '2px 2px 0 0 var(--color-accent)',
      },
    },
  },
  plugins: [],
}
