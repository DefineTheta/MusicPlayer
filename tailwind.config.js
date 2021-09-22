module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontSize: {
			sm: '0.8rem',
			m: '0.85rem',
		},
		extend: {
			textColor: {
				secondary: 'rgba(255, 255, 255, 0.75)',
			},
			borderColor: {
				faint: 'rgba(255, 255, 255, 0.2)',
			},
			colors: {
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
