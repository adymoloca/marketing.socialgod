import React, { FC } from 'react';
import { Typography, TypographyProps, styled } from '@mui/material';
import { keyframes } from '@mui/system';

interface TextProps extends TypographyProps {
	children: React.ReactNode;
	fontSize?: 'small' | 'medium' | 'large' | undefined;
	animate?: boolean;
}

const shakeKeyframes = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`;

const AnimatedTypography = styled(Typography)<{ animate: boolean }>(({ theme, animate }) => ({
	fontFamily: 'PT Sans Caption, sans-serif',
	color: theme.palette.primary.main,
	animation: animate ? `${shakeKeyframes} 0.5s ease-in-out infinite` : 'none',
}));

const AnimatedText: FC<TextProps> = ({ children, fontSize, animate = false, ...typographyProps }) => (
	<AnimatedTypography animate={animate} variant='body1' fontSize={fontSize} {...typographyProps}>
		{children}
	</AnimatedTypography>
);

AnimatedText.defaultProps = {
	fontSize: undefined,
	animate: false,
};

export default AnimatedText;
