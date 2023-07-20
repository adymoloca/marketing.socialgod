import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

export const AuthWraper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	width: '100%',
	[theme.breakpoints.up('md')]: {
		margin: '0 32px',
	},
	[theme.breakpoints.down('md')]: {
		margin: '0 16px',
	},
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}));
