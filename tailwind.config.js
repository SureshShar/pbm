/** @type {import('tailwindcss').Config} */

export default {
  // content: [],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      // padding: "1rem",
    },
    screens: {
      xs: "450px", // @media (min-width: 450px) { ... }
      sm: "575px", // @media (min-width: 576px) { ... }
      md: "768px", // @media (min-width: 768px) { ... }
      lg: "992px", // @media (min-width: 992px) { ... }
      xl: "1200px", // @media (min-width: 1200px) { ... }
      "2xl": "1400px", // @media (min-width: 1400px) { ... }
    },
    extend: {
      colors: {
        "primary": "#006272",
        "primary-1": "#0092AA",
        "primary-2": "#00EFD8",
        secondary: "#FFF601",
        tertiary: "#FF6700",

        // For dark theme
        "bgblack": "#121723",
        "black-L1": "#171C28",
        "black-L2": "#1D2430",
        "black-L3": "#353943",
        "black-L4": "#788293",
        "black-L5": "#959CB1",

        // For white theme
        "bglight": "#FCFCFC",
        "white-D1": "#E3E8EF",
        "white-D2": "#F0F2F9",
        current: "currentColor", // (i.e. take color same with text color)
        transparent: "transparent", // (i.e. take color as background)

        "primary": "#006272",
        "primary-0": "#006272",
        "primary-1": "#0092AA",
        "primary-2": "#00EFD8",
        secondary: "#FFF601",
        tertiary: "#FF6700",

        // For dark theme
        "black-0": "#121723",
        "black-1": "#171C28",
        "black-2": "#1D2430",
        "black-3": "#353943",
        "black-4": "#788293",
        "black-5": "#959CB1",

        // For white theme
        "white-0": "#FCFCFC",
        "white-1": "#E3E8EF",
        "white-2": "#F0F2F9",
      },
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
    },
  },
  plugins: [],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
};
