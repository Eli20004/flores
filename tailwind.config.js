/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sunshine: '#F5BD22',
        butter: '#FFF2B8',
        cream: '#FFFBF0',
        sage: '#82937B',
        forest: '#334432',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
      boxShadow: {
        flower: '0 22px 45px rgba(105, 84, 26, 0.17)',
      },
    },
  },
  plugins: [],
}
