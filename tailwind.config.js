import {nextui} from "@nextui-org/react";


/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				primaryTheme: {
					100: "#00bcd4",
					200: "#47c4d9",
					300: "#67cbde",
					400: "#81d3e2",
					500: "#99dae7",
					600: "#afe2ec",
					700: "#3498db",
				},
				darkTheme: {
					100: "#121212",
					200: "#282828",
					300: "#3f3f3f",
					400: "#575757",
					500: "#717171",
					600: "#8b8b8b",
					700: "#E4E4E7",
				},
			},
		},
	},
	darkMode: ["class"],
	plugins: [nextui(), require("tailwindcss-animate")],
};