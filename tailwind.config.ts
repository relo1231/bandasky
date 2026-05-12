import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#1e6fff',
          dark: '#1458d6',
          light: '#60a5fa',
        },
        bg: {
          DEFAULT: '#050d1a',
          card: '#0a1628',
          hover: '#0f1e38',
        },
        border: {
          DEFAULT: '#1a2a45',
        },
        muted: '#6b7fa3',
        success: '#22c55e',
        danger: '#ef4444',
      },
      fontFamily: {
        heading: ['var(--font-oswald)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
