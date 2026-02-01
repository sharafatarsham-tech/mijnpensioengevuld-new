/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Lexend voor headings - corporate, trustworthy
        heading: ["var(--font-lexend)", "system-ui", "sans-serif"],
        // Source Sans 3 voor body - professional, readable
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        // Default sans
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          // Primary - Trust Teal (professional, financial trust)
          primary: "#0F766E",
          "primary-dark": "#115E59",
          "primary-light": "#14B8A6",
          
          // Secondary - Sky Blue (action, CTA)
          secondary: "#0369A1",
          "secondary-light": "#0EA5E9",
          
          // Accent - Warm Orange (warmth, energy - preserved)
          accent: "#EA580C",
          "accent-light": "#F97316",
          
          // Neutrals
          navy: "#0F172A",
          text: "#134E4A",
          muted: "#64748B",
          
          // Backgrounds
          warm: "#F0FDFA",
          cool: "#F8FAFC",
          teal: "#CCFBF1",
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "warm": "0 4px 20px -2px rgba(15, 118, 110, 0.15)",
        "lift": "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
        "teal": "0 4px 20px -2px rgba(20, 184, 166, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
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
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionDuration: {
        "DEFAULT": "200ms",
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
      },
    },
  },
  plugins: [],
};
