/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        red: {
          600: "#ef4444",
        },
        blue: {
          600: "#3b82f6",
        },
        green: {
          600: "#10b981",
        },
        yellow: {
          600: "#f59e0b",
        },
        purple: {
          600: "#9333ea",
        },
        rose: {
          600: "#f43f5e",
        },
        emerald: {
          600: "#10b981",
        },
        gray: {
          600: "#4b5563",
        },
      },
    },
  },
  plugins: [],
};
