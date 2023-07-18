/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			boxShadow: {
				neumorphism: ' 20px 20px 60px #cdd0d4, -20px -20px 60px #ffffff',
			},
			keyframes: {
				orbit: {
					'0%': {
						transform: 'translateY(-25%) rotate(-45deg)',
						opacity: 1,
					},
				},
			},
			animation: {
				orbit: 'orbit 0.8s both ease-in',
			},
		},
	},
	plugins: [],
};
