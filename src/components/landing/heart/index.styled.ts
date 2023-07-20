import { styled } from '@mui/material';

export const HeartContainer = styled('div')(() => ({
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

export const HeartSvg = styled('svg')(() => ({
	'@keyframes like': {
		'0%': {
			strokeDashoffset: 54,
			fill: '#CCC',
		},
		'70%': {
			strokeDashoffset: 0,
			fill: '#CCC',
		},
		'100%': {
			strokeDashoffset: 0,
			fill: '#F06',
		},
	},
	'@keyframes unlike': {
		'0%': {
			strokeDashoffset: 0,
			fill: '#F06',
		},
		'30%': {
			strokeDashoffset: 0,
			fill: '#CCC',
		},
		'100%': {
			strokeDashoffset: 54,
			fill: '#CCC',
		},
	},
	'@keyframes beat': {
		'0%': {
			transform: 'scale(1, 1)',
		},
		'50%': {
			transform: 'scale(0.9, 0.9)',
		},
		'100%': {
			transform: 'scale(1, 1)',
		},
	},
	width: 100,
	stroke: '#F06',
	fill: '#CCC',
	strokeDasharray: 54,
	strokeDashoffset: 54,
	animation: `2s ease-in 1s forwards like,
            0.8s linear 2s 2 forwards beat,
            2s ease-out 4s forwards unlike`,
	animationIterationCount: 'infinite',
}));
