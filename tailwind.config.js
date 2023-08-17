/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans'],
      },
      colors: {
        'custom-dark-blue': '#3C50E0',
        'custom-light-blue': '#068FFF',
        'custom-light': '#EEEEEE',
        'custom-light-two': '#e9ecef',
        'custom-light-gray': '#F1F5F9'
      },
      animation: {
        slideToRight: 'slideToRight 0.5s cubic-bezier(0.77,0.2,0.05,1.0)',
      },
      keyframes: {
        slideToRight: {
          '0%': { left: '-100%', right: '100%' },
          '100%': { left: '0', right: '10' },
        },
      },
    },
    screens: {
      'xs': '480px', // Custom breakpoint for extra-small screens
      'sm': '640px', // Custom breakpoint for small screens
      'md': '768px', // Custom breakpoint for medium screens
      'lg': '1024px', // Custom breakpoint for large screens
      'xl': '1280px', // Custom breakpoint for extra-large screens
      '2xl': '1536px', // Custom breakpoint for 2 extra-large screens
      'custom-breakpoint': '2020px',
    },
  },
  plugins: [],
}

