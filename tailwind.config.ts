import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0F5EFF",
        "primary-dark": "#0A49C4",
        secondary: "#F97316",
        "secondary-dark": "#EA580C",
        dark: "#111827",
        light: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E5E7EB",
        success: "#16A34A",
        danger: "#DC2626",
      },

      fontFamily: {
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },

      borderRadius: {
        xl: "18px",
        "2xl": "22px",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(15,23,42,.08)",
        hover: "0 20px 45px rgba(15,23,42,.12)",
      },

      backgroundImage: {
        hero: "linear-gradient(135deg,#0F5EFF,#2196F3)",
        orange: "linear-gradient(135deg,#F97316,#EA580C)",
      },
    },
  },

  plugins: [],
};

export default config;
