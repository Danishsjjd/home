/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				accent: "var(--accent)",
				"accent-blue": "var(--accent-blue)",
				"accent-green": "var(--accent-green)",
				dark: "var(--dark)",
				lightBlack: "#999",
				"neutral-darkest": "var(--neutral-darkest)",
				"neutral-darker": "var(--neutral-darker)",
				"neutral-grey": "var(--neutral-grey)",
				"neutral-lighter": "var(--neutral-lighter)",
				"neutral-lightest": "var(--neutral-lightest)",
				"secondary-darkest": "var(--secondary-darkest)",
				"secondary-darker": "var(--secondary-darker)",
				"secondary-normal": "var(--secondary-normal)",
				"secondary-lighter": "var(--secondary-lighter)",
				"secondary-lightest": "var(--secondary-lightest)",
				"accent-red": "var(--accent-red)",
				"accent-yellow": "var(--accent-yellow)",
				"accent-green": "var(--accent-green)",
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
};
