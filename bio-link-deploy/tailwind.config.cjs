module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdfcf7",
          100: "#faf7ed",
          200: "#f5efd3",
          300: "#ede0a7",
          400: "#e0c874",
          500: "#d4a855",
          600: "#c9a961",
          700: "#b8944f",
          800: "#9a7a3f",
          900: "#7d6333",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
