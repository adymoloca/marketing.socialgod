import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const ReviewsSlideshowContainer: FC<BoxProps> = styled(Box)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	width: theme.spacing(200),
	justifyContent: 'center',
	overflow: 'hidden',
	height: theme.spacing(60),
	'&::after': {
		position: 'absolute',
		height: theme.spacing(60),
		width: '30px',
		backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0) 0%, white 100%)',
		right: '0px',
		content: '\'\'',
		zIndex: 1
	},
	'&::before': {
		position: 'absolute',
		height: theme.spacing(60),
		width: '30px',
		backgroundImage: 'linear-gradient(to left, rgba(255,255,255,0) 0%, white 100%)',
		left: '0px',
		content: '\'\'',
		zIndex: 1
	},
}));

export { ReviewsSlideshowContainer };