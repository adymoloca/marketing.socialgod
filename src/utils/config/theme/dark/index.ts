import { Theme, ThemeOptions, createTheme } from '@mui/material';

const darkTheme = (common: Omit<ThemeOptions, 'palette'>): Theme =>
	createTheme({
		...common,
		palette: {
			mode: 'dark',
			primary: {
				main: '#E70042',
			},
			secondary: {
				main: '#009D78',
			},
			common: {
				black: '#2B2934',
				white: '#F6FAF8',
			},
			background: {
				default: '#FFFFFF',
				paper: '#F6FAF8',
			},
			text: {
				primary: '#2B2934',
			},
		},
	});

export default darkTheme;
