import { Grid, GridProps, styled } from '@mui/material';
import { FC } from 'react';

export const BackgroundContainer: FC<GridProps> = styled(Grid)(({ theme }) => ({
	background: `rgba(0, 0, 0, .5)
		 url(https://storage.googleapis.com/sbdcloud/1687520520850-people-addicted-social-media-glitch.png)`,
	backgroundBlendMode: 'darken',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	[theme.breakpoints.up('md')]: {
		display: 'flex',
	},
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
	display: 'flex',
	flexDirection: 'column-reverse',
}));
