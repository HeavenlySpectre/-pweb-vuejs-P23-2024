/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		aspectRatio: {
		  'book': '7/10',
		},
	  },
	},
	plugins: [],
  }
  