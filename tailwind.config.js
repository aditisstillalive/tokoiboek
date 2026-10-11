/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fafafa',
        foreground: '#1a1a1a',
        primary: {
          DEFAULT: '#1a1a1a',
          hover: '#333333',
        },
        accent: '#e85d2c',
        border: '#e5e5e5',
        muted: '#f5f5f5',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}