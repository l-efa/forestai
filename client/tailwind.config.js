/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#0c5332", // primary green
          700: "#047857", // gradient start
          500: "#10b981", // gradient mid / emerald-500
          400: "#34d399", // gradient end / emerald-400
          300: "#6ee7b7", // light accent
        },
        surface: {
          black: "#000000", // page background
          dark: "#0a0a0b", // card outer
          card: "#1c1c1e", // card / input background
          knob: "#d4d4d4", // switch knob bottom
          active: "rgba(16,185,129,0.1)", // active sidebar item bg
          border: "rgba(255,255,255,0.15)", // subtle borders
          divider: "rgba(255,255,255,0.10)", // faint borders / separators
        },
        content: {
          primary: "#ffffff", // main text
          bright: "rgba(255,255,255,0.90)", // strong text
          soft: "rgba(255,255,255,0.85)", // body text
          secondary: "rgba(255,255,255,0.70)", // secondary text
          muted: "rgba(255,255,255,0.40)", // hints, labels
          faint: "rgba(255,255,255,0.30)", // placeholders, dividers
        },
        avatar: {},
        accent: "#F59E0B", // highlights/warnings
        lime: "#fdff6e", // yellow accent
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
        card: ["Manrope", "Inter", "ui-sans-serif", "system-ui"],
      },
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "32px",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.1)",
        button: "0 1px 3px rgba(0,0,0,0.1)",
        cardGlow:
          "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -12px 26px rgba(0,0,0,0.72), 0 18px 40px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.45)",
        cardDrop: "0 14px 35px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        greenGradient:
          "linear-gradient(90deg, rgba(4,120,87,0.95) 0%, rgba(16,185,129,1) 55%, rgba(52,211,153,0.95) 100%)",
        darkGloss:
          "radial-gradient(ellipse at center, rgba(28,28,30,0.98) 0%, rgba(10,10,11,0.99) 60%, rgba(5,5,6,1) 100%)",
        "avatar-green": "linear-gradient(135deg, #047857, #34d399)",
        "avatar-blue": "linear-gradient(135deg, #1d4ed8, #60a5fa)",
        "avatar-purple": "linear-gradient(135deg, #6d28d9, #a78bfa)",
        "avatar-pink": "linear-gradient(135deg, #be185d, #f472b6)",
        "avatar-red": "linear-gradient(135deg, #b91c1c, #f87171)",
        "avatar-orange": "linear-gradient(135deg, #c2410c, #fb923c)",
        "avatar-yellow": "linear-gradient(135deg, #a16207, #facc15)",
        "avatar-teal": "linear-gradient(135deg, #0f766e, #2dd4bf)",
      },
    },
  },
  plugins: [],
};
