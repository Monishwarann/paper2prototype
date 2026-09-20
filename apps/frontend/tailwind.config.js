/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1e1b4b",
          foreground: "#e0e7ff",
        },
        dark: {
          900: "#090d16",
          800: "#111827",
          700: "#1f2937",
          600: "#374151",
        },
        brand: {
          accent: "#38bdf8",
          emerald: "#10b981",
          purple: "#a855f7",
          amber: "#f59e0b",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      }
    },
  },
  plugins: [],
}
