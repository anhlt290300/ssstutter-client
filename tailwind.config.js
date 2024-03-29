/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warning: "rgb(197 12 12 / 1)",
        secondary: "rgb( 255 255 255 /1)",
        "primary-300": "#00000080",
        "primary-100": "#0000004d",
        "primary-50": "#0000001a",
        "buttonSlide": "#e5e7eb",
        "primary-500": "#000",
      },
      animation: {
        moveLoadingSkeleton: "moveLoadingSkeleton 1.5s infinite ease-in-out ",
      },
      keyframes: {
        moveLoadingSkeleton: {
          "0%": {
            left: "0",
          },
          "100%": {
            left: "100%",
          },
        },
      },
    },
    screens: {
      sm: "641px",
      md: "769px",
      lg: "1025px",
      xl: "1281px",
      "2xl": "1537px",
    },
  },
  plugins: [],
};
