import { Box, BoxProps, Link, LinkProps, Typography, TypographyProps, styled } from '@mui/material';
import { FC } from 'react';

const SocialsWrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	flexWrap: 'wrap',
	width: '100%',
	borderTop: `3px solid ${theme.palette.common.white}`,
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
	},
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
	},
	gap: 3,
	padding: '12px',
	mx: 3,
}));

const SocialIconWrapper: FC<BoxProps> = styled(Box as FC<BoxProps>)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

const ClickableText: FC<TypographyProps> = styled(Typography)(({ theme }) => ({
	color: theme.palette.common.white,
	cursor: 'pointer',
	fontSize: '1rem',
}));

const StyledIconButton: FC<LinkProps> = styled(Link as FC<LinkProps>)(({ theme }) => ({
	color: '#fff',
	width: '40px',
	height: '40px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '50%',
	transition: 'all 0.3s ease-in-out',
	':hover': {
		backgroundColor: '#fff',
		color: `${theme.palette.primary.dark}`,
		elevation: 2,
	},
}));

export { SocialsWrapper, ClickableText, StyledIconButton, SocialIconWrapper };
