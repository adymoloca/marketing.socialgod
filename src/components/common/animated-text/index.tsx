import { Typography, TypographyProps, styled } from '@mui/material';
import { FC } from 'react';

interface AnimatedTextProps extends TypographyProps {
	delay?: number;
}

export const AnimatedText: FC<AnimatedTextProps> = styled(Typography as FC<AnimatedTextProps>, {
	shouldForwardProp: (prop: string) => prop !== 'delay',
})(({ theme, delay }) => ({
	fontSize: theme.typography.fontSize,
	paddingBottom: theme.spacing(0.5),
	fontWeight: theme.typography.fontWeightBold,
	width: '100%',
	height: 'auto',
	color: theme.palette.text.primary,
	'@keyframes bounce': {
	  '0%': { transform: 'translateY(-5px)' },
	  '50%': { transform: 'translateY(10px)' },
	  '100%': { transform: 'translateY(-5px)' },
	},
	animation: `3s bounce ${delay && delay !== 0 ? `${delay}s` : ''} infinite ease-in-out`,
	':first-letter': {
	  fontSize: theme.typography.fontSize * 1.18,
	  color: theme.palette.primary.main,
	},
}));
