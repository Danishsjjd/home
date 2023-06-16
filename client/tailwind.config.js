/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-blue": "hsl(var(--accent-blue) / <alpha-value>)",
        dark: "hsl(var(--dark) / <alpha-value>)",
        lightBlack: "#999",
        "neutral-darkest": "hsl(var(--neutral-darkest) / <alpha-value>)",
        "neutral-darker": "hsl(var(--neutral-darker) / <alpha-value>)",
        "neutral-grey": "hsl(var(--neutral-grey) / <alpha-value>)",
        "neutral-lighter": "hsl(var(--neutral-lighter) / <alpha-value>)",
        "neutral-lightest": "hsl(var(--neutral-lightest) / <alpha-value>)",
        "secondary-darkest": "hsl(var(--secondary-darkest) / <alpha-value>)",
        "secondary-darker": "hsl(var(--secondary-darker) / <alpha-value>)",
        "secondary-normal": "hsl(var(--secondary-normal) / <alpha-value>)",
        "secondary-lighter": "hsl(var(--secondary-lighter) / <alpha-value>)",
        "secondary-lightest": "hsl(var(--secondary-lightest) / <alpha-value>)",
        "accent-red": "hsl(var(--accent-red) / <alpha-value>)",
        "accent-yellow": "hsl(var(--accent-yellow) / <alpha-value>)",
        "accent-green": "hsl(var(--accent-green) / <alpha-value>)",
      },
      boxShadow: {
        light: "0 7px 25px rgba(0,0,0,.08)",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        myTheme: {
          primary: "#e9672b",
          secondary: "#ef8c5f",
        },
      },
    ],
    base: false,
    utils: true,
    logs: true,
  },
}
