/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				Nunito: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				Maconda: ["'Macondo'", 'cursive'],
				'Source-code': ["'Source Code Pro'", 'monospace'],
			},
			animation: {
				float1: 'float 5s ease-in-out infinite',
				float2: 'float 6s ease-in-out infinite',
				float3: 'float 7s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-15px)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
};
