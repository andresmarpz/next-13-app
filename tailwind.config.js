/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			transitionProperty: {
				border: "border"
			}
		},
  },
  plugins: [require("tailwindcss-animate")],
}