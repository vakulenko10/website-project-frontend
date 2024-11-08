/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Background Colors
        bg1: '#BAA291',  // Example color, replace with your own
        bg2: '#A08873',
        bg3: '#5B0101',
        bg4: '#A5A29B',
        bg5: '#F8F8F8',

        // Text Colors
        text1: '#FFFFFF',
        text2: '#DEDEDE',
        text3: '#5B0101',
        text4: 'rgba(222, 222, 222, 0.6)',
        text5: '#745D46',
        text6: '#D5A005', 
        text7: '#000000', 
        text8: '#5B0101',


        // Additional Colors
        color1: '#A5A29B',
        color2: '#A08873',
        color3: '#BAA291',
        color4: '#727372',
        color5: '#5B0101',
        color6: '#745D46',
        color7: '#CAC9C4',
        color8: '#710102',
        color9: '#C4C1AE',
        color10: '#745D46',
        color11: '#5A3E24',
        color12: '#745D46',
      },
      fontFamily: {
        // Custom Fonts
        sans: ['Montserrat', 'sans-serif'],
        serif: ['EB Garamond', 'serif'],
        display: ['Miniver', 'cursive'],
      },
    },
  },
  plugins: [],
}

