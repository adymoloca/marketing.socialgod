import { Box, BoxProps, ButtonProps, Typography, TypographyProps, styled } from '@mui/material';
import { ButtonSG } from 'components/common';
import { FC } from 'react';

const IconBackground: FC<BoxProps> = styled(Box)(({ theme }) => ({
	backgroundColor: '#E1E4FF',
	width: theme.spacing(8),
	height: theme.spacing(8),
	borderRadius: theme.shape.borderRadius,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
}));

const SignUpButton: FC<ButtonProps> = styled(ButtonSG)(({ theme }) => ({
	width: theme.spacing(34),
	height: theme.spacing(7),
	borderRadius: theme.shape.borderRadius,
	fontWeight: 'bold',
	gap: 20,
	textTransform: 'none',
	fontSize: theme.typography.h6.fontSize,
	boxShadow: `0px 0px 15px ${theme.palette.primary.main}`,
	transition: 'transform 0.3s ease',
	'&:hover': {
		transform: 'scale(0.95)',
		backgroundColor: theme.palette.primary.main,
		boxShadow: `0px 0px 15px ${theme.palette.primary.main}`,
	},
}));

const GreyText: FC<TypographyProps> = styled(Typography)(({ theme }) => ({
	color: '#7A7D9C',
	fontSize: theme.typography.fontSize
}));

export { IconBackground, SignUpButton, GreyText };
