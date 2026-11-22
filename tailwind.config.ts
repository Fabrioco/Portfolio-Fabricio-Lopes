import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--background)", bg2: "var(--background-secondary)",
        surface: "var(--surface)", elevated: "var(--surface-elevated)", highlight: "var(--surface-highlight)",
        line: "var(--border)", "line-strong": "var(--border-strong)",
        ink: "var(--text-primary)", sub: "var(--text-secondary)", muted: "var(--text-muted)",
        accent: "var(--accent)", "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1200px" },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        micro: "180ms",
        reveal: "600ms",
        choreo: "850ms",
      },
    },
  },
  plugins: [],
};
export default config;
