import styled from '@emotion/styled';

export const SliderContainer = styled('div')
(() => ({
	position: 'relative',
	width: '100vw',
	height: '200px',
	boxShadow: '0 12px 14px -2px #0001', 
	display :'flex',
	alignItems: 'center',
	overflow: 'hidden',
	marginBottom :'100px',
	'::after': {
		position: 'absolute',
		right: '0px',
		content: '\'\'',
		width: '200px',
		height: '100%',
	},
	'::before': {
		position: 'absolute',
		left: '0px',
		content: '\'\'',
		width: '200px',
		height: '100%',
	},
}));