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
        'b-black': '#111111',
        'b-white': '#FFFFFF',
        'b-off': '#F9F8F6',
        'b-orange': '#E05C00',
        'b-mid': '#888885',
        'b-light': '#D8D6D2',
        'b-rule': '#EBEBEB',
        'b-charcoal': '#1A1A1A',
      },
      fontFamily: {
        'display': ['var(--font-playfair)', 'Georgia', 'serif'],
        'body': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-dm-mono)', 'monospace'],
      },
      letterSpacing: {
        'widest2': '0.2em',
        'widest3': '0.25em',
      },
    },
  },
  plugins: [],
}

export default config
