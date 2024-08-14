/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          50: 'var(--primary-50)',
          25: 'var(--primary-25)',
          10: 'var(--primary-10)',
          5: 'var(--primary-5)',
          dark: '#171718',
        },
        darkblue: {
          DEFAULT: '#212532',
        },
        bluegray: {
          DEFAULT: '#30424A',
          50: '#98A1A5',
          25: '#CBCFD1',
          15: '#B3B5B5',
          10: '#EBEDED',
          secondary: '#BED2DB',
        },
        blue: {
          DEFAULT: '#1C97CA',
          75: '#55B1D7',
          50: '#8DCBE5',
          25: '#C6E5F1',
        },
      },
      textColor: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          darkgray: '#212532',
          iron: '#CBCFD1',
        },
        bluegray: {
          DEFAULT: '#30424A',
          light: '#98A1A5',
          haze: '#EBEDED',
          secondary: '#BED2DB',
        },
        blue: {
          DEFAULT: '#1C97CA',
          light: '#8DCBE5',
        },
      },
    },
  },
  plugins: [],
}
