import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const FooterWrapper: FC<BoxProps> = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	flexDirection: 'column',
	position: 'relative',
}));

const ColoredSection: FC<BoxProps> = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.primary.dark,
	minHeight: '400px',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'end',
	alignItems: 'center',
}));

export { FooterWrapper, ColoredSection };
