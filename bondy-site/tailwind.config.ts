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
        'b-orange': '#D4770A',
        'b-mid': '#888885',
        'b-light': '#D8D6D2',
        'b-rule': '#EBEBEB',
        'b-charcoal': '#1A1A1A',
        // Stone system — light pages
        'b-stone': '#F0EBE3',
        'b-stone-alt': '#E8E0D5',
        'b-stone-text': '#1A1614',
        'b-stone-mid': '#7D7268',
        'b-stone-light': '#C0B5AA',
        'b-stone-rule': '#D4CAC0',
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
