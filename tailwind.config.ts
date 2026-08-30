import type { Config } from "tailwindcss";

// ---------------------------------------------------------------------------
// PALESTRA design tokens
// Source of truth: Figma reference (Home / Vault / Detail / Generator /
// Dashboard / Learn / Toolkit). Keep this file as the single place color,
// type, and radius decisions live — components should never hardcode hex
// values, they should reference these tokens.
// ---------------------------------------------------------------------------

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F4F1E9",
          soft: "#EFEAE0",
        },
        sand: {
          DEFAULT: "#E4D9C0",
        },
        stone: {
          DEFAULT: "#B2A488",
        },
        charcoal: {
          DEFAULT: "#17150F",
          soft: "#211E17",
        },
        olive: {
          DEFAULT: "#3B4430",
        },
        bronze: {
          DEFAULT: "#9C7A47",
        },
        terracotta: {
          DEFAULT: "#B5563A",
          dark: "#98452E",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "3px",
        md: "6px",
      },
      maxWidth: {
        wrap: "1180px",
      },
      letterSpacing: {
        widest2: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
