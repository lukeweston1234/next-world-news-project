/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./*/*.html",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
    },
    extend: {
      colors: {
        colors: {
          "header-purple": "#6D5F6D",
          "navbar-purple": "#F5F0F6",
          "gradient-purple": "#AD96AF",
        },
      },
    },
  },
  plugins: [],
  important: true,
};
