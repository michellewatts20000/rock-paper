/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#4ABDAC', // Original color
          600: '#43A79B',
          700: '#3B8D85',
          800: '#34746E',
          900: '#2D5A57',
        },
        secondary: {
          500: '#FC4A1A', // Original color
          600: '#D93F18',
          700: '#B63615',
          800: '#922C12',
          900: '#70220F',
        },
        supernova: {
          500: '#F7B733', // Original color
          600: '#D7A22E',
          700: '#B89228',
          800: '#987221',
          900: '#786318',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
