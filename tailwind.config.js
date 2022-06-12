/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js, jsx, ts, tsx}'],
	theme: {
		extend: {
			animation: {
				float: 'float 5s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-15px)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
		},
		fontFamily: {
			Maconda: ["'Macondo'", 'cursive'],
			'Source-code': ["'Source Code Pro'", 'monospace'],
			Exo: ["'Exo 2'", 'sans - serif'],
		},
	},
	plugins: [],
};
