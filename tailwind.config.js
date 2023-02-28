/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			inset: {
				100: "100%",
			},
			boxShadow: {
				hardShadow:
					"0px 0px 2px rgb(0 0 0 / 17%), 0px 2px 2px rgb(19 19 19 / 20%)",
				bulk: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
			},

			padding: {
				120: "120px",
			},
			colors: {
				"theme-color": "#361CC1",
				"theme-color-2": "#FE7A7B",
				"row-regular": "#fff",
				"row-odd": "#EDF2F4",
				"row-header": "#2B2D42",
				white: "#fff",
				primary: "#006f85",
			},
		},
	},

	plugins: [],
};
