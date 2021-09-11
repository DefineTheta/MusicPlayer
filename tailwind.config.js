module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				fontSize: {
					medium: ['0.9375rem', '1.275rem'],
				},
				black: {
					darkest: '#181818',
					dark: '#121212',
					DEFAULT: '#000',
					light: '#282828',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
