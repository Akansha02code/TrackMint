/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        base: {
          50: '#f7f8fb',
          100: '#eef1f7',
          200: '#dce3f1',
          300: '#c2cfe8',
          400: '#93afd8',
          500: '#6b90c5',
          600: '#4d73aa',
          700: '#3f5e8b',
          800: '#364f72',
          900: '#2e415d',
          950: '#152338',
        },
        mint: {
          50: '#eafff7',
          100: '#ccffee',
          200: '#9ffcdc',
          300: '#65f4c4',
          400: '#31e2ac',
          500: '#16c495',
          600: '#0fa277',
          700: '#118060',
          800: '#13654d',
          900: '#12533f',
          950: '#052f22',
        },
        peach: {
          50: '#fff4ed',
          100: '#ffe6d6',
          200: '#ffccb0',
          300: '#ffab7e',
          400: '#ff7f42',
          500: '#ff5f18',
          600: '#f14806',
          700: '#c23506',
          800: '#9a2c0d',
          900: '#7c270f',
          950: '#431005',
        },
      },
      boxShadow: {
        glass:
          '0 1px 0 0 rgba(255,255,255,0.4) inset, 0 18px 40px rgba(10, 20, 40, 0.12)',
        card: '0 10px 25px rgba(10, 20, 40, 0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
