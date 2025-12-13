/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F66B04",
        secondary: "#451805",
        paysparq: "#FFF7E9",
        text: "#FFFFFF",
      },
      fontSize: {
        dynamic: "var(--font-size-dynamic)",
      },
    },
  },
  plugins: [],
};
