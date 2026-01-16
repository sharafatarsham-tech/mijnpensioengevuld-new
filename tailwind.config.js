/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          // Primary - Warm Golden Orange (premium, trustworthy)
          primary: "#e67e22",
          "primary-dark": "#d35400",
          "primary-light": "#f39c12",
          
          // Accent - Teal (trust, stability, financial)
          accent: "#16a085",
          "accent-light": "#1abc9c",
          
          // Neutrals
          navy: "#2c3e50",
          text: "#34495e",
          muted: "#7f8c8d",
          
          // Backgrounds
          warm: "#fdf8f3",
          cool: "#f8fafc",
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "warm": "0 4px 20px -2px rgba(230, 126, 34, 0.15)",
        "lift": "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
