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
        gold: {
          DEFAULT: '#d4a017',
          dark: '#b8880f',
        },
        bg: {
          DEFAULT: '#0a0a0a',
          card: '#141414',
          hover: '#1a1a1a',
        },
        border: {
          DEFAULT: '#2a2a2a',
        },
        muted: '#888888',
        success: '#4caf50',
        danger: '#f44336',
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
