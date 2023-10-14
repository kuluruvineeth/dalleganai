/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import daisyui from "daisyui";
module.exports = {
  content: ["./src/**/*.{js,ts,tsx,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
      },
      colors: {
        neutral: colors.slate,
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        text: "text 10s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "baclground-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "baclground-position": "right center",
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    darkTheme: "light",
  },
  variants: {
    extend: {},
  },
};
