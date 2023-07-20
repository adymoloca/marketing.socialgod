import { styled } from '@mui/material';

export const SliderItem = styled('li')
(() => ({
	width :'200px',
	fontSize : '3rem',
	display :'flex',
	justifyContent : 'center',
	alignItems: 'center',
	margin: '0 25px',
	padding: '0px',
	height: '80px',
	cursor: 'pointer',
	':hover': {
		backgroundColor: 'rgba(233, 233, 233, 0.5)'
	}
}));