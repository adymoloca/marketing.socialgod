import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export const LogoBoxAnimation: FC<BoxProps> = styled(Box)(() => ({
	width: '150px',
	display: 'flex',
	justifyContent: 'center',
	transition: 'all .2s ease-in-out',
	cursor: 'pointer',
	':hover': {
		transform: 'scale(0.95)'
	},
}));
