import { ThemeOptions } from '@mui/material';
import SansCaptionRegular from '../../../../assets/fonts/PTSansCaption-Regular.ttf';

const common: Omit<ThemeOptions, 'palette'> = {
	typography: {
		fontFamily: 'PT Sans Caption, sans-serif',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
                @font-face {
                    font-family: 'sans-caption';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('PT Sans Caption'),
                        local('PTSansCaption-Regular'),
                        url(${SansCaptionRegular}) format('ttf');
                    unicodeRange: 
                        U+0000-00FF, U+0131, U+0152-0153,
                        U+02BB-02BC, U+02C6, U+02DA, U+02DC,
                        U+2000-206F, U+2074, U+20AC, U+2122,
                        U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }
            `,
		},
		MuiButton: {
			defaultProps: {
				size: 'small',
				disableRipple: true,
				disableElevation: true,
				variant: 'contained',
			},
		},
		MuiFilledInput: {
			defaultProps: {
				margin: 'dense',
			},
		},
		MuiFormControl: {
			defaultProps: {
				margin: 'dense',
			},
		},
		MuiFormHelperText: {
			defaultProps: {
				margin: 'dense',
			},
		},
		MuiIconButton: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiInputBase: {
			defaultProps: {
				margin: 'dense',
				size: 'small',
			},
		},
		MuiInputLabel: {
			defaultProps: {
				margin: 'dense',
			},
		},
		MuiListItem: {
			defaultProps: {
				dense: true,
			},
		},
		MuiOutlinedInput: {
			defaultProps: {
				margin: 'dense',
			},
		},
		MuiFab: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiTable: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
				margin: 'dense',
				size: 'small',
			},
		},
		MuiToolbar: {
			defaultProps: {
				variant: 'dense',
			},
		},
	},
	shape: {
		borderRadius: 10,
	},
};

export default common;
