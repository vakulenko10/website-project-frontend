/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Background Colors
        bg1: '#BAA291', 
        bg2: '#A08873',
        bg3: '#5B0101',
        bg4: '#A5A29B',
        bg5: '#F8F8F8',

        // Text Colors
        text1: '#FFFFFF',
        text2: '#DEDEDE',
        text3: '#5B0101',
        text4: 'rgba(222, 222, 222, 0.6)', // Make sure to use this correctly in Tailwind classes
        text5: '#745D46',
        text6: '#D5A005',
        text7: '#000000',

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
        color10: '#5A3E24',
      },
      fontFamily: {
        // Custom Fonts with fallbacks
        sans: ['Montserrat', 'Arial', 'sans-serif'],
        serif: ['Bricolage Grotesque', 'Georgia', 'serif'],
        display: ['Miniver', 'cursive'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }], // Extra small
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // Small
        base: ['1rem', { lineHeight: '1.5rem' }], // Regular
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // Large
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // Extra large
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 2x large
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 3x large
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 4x large
        '5xl': ['3rem', { lineHeight: '1' }], // 5x large
        '6xl': ['3.75rem', { lineHeight: '1' }], // 6x large
      },
      fontWeight: {
        thin: 100,
        extraLight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
        black: 900,
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        ultraWide: '0.15em', // Custom ultra-wide spacing
      },
      lineHeight: {
        // Custom line heights based on your design specifications
        tight: '1.1',
        relaxed: '1.4',
        loose: '1.75',
        ultraLoose: '2.0', // Ultra loose for large headers or display text
        extraTight: '1',   // For compact blocks or titles
        standard: '1.5',   // General body text line-height
      },
      screens: {
        // Custom breakpoints based on common screen sizes
        'xsm': '500px',
        sm: '640px',  // Small devices (portrait tablets and large phones)
        md: '768px',  // Medium devices (landscape tablets)
        lg: '1024px', // Large devices (laptops/desktops)
        xl: '1280px', // Extra large devices (large desktops)
        '2xl': '1536px', // 2X large devices (larger screens)
      },
    },
  },
  plugins: [],
};
