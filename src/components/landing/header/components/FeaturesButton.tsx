import React, { useState } from 'react';
import { Button, ButtonProps, Icon } from '@mui/material';
import { useNavigate } from 'react-router';

interface AnimatedButtonProps extends ButtonProps {
	pulse?: boolean;
}

const FeaturesButton: React.FC<AnimatedButtonProps> = ({ pulse = false, children, ...props }) => {
	const [isPulsing, setPulsing] = useState(pulse);
	const navigate = useNavigate();

	const handleMouseEnter = (): void => {
		setPulsing(true);
	};

	const handleMouseLeave = (): void => {
		setPulsing(true);
	};

	const pulseStyles = {
		animation: 'pulseEffect 1.5s ease-in-out infinite',
		'@keyframes pulseEffect': {
			'0%': {
				transform: 'scale(1)',
				boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
			},
			'50%': {
				transform: 'scale(1.1)',
				boxShadow: '0 0 20px rgba(0, 0, 0, 1)',
			},
			'100%': {
				transform: 'scale(1)',
				boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
			},
		},
	};

	return (
		<Button
			onClick={(): void => navigate('/coming-soon-features')}
			{...props}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			sx={{
				':hover': {
					border: '1px solid',
					borderColor: 'primary.main',
					color: 'primary.main', // Set text color to white
					backgroundColor: 'white',
				},
				...(isPulsing ? pulseStyles : {}),
				border: '1px solid',
				borderColor: 'white',
				color: 'white', // Set text color to white
				backgroundColor: 'primary.main', // Set button color to primary
			}}
			startIcon={<Icon>code</Icon>} // Icon suggestive of development
		>
			{children}
		</Button>
	);
};

FeaturesButton.defaultProps = {
	pulse: false,
};

export default FeaturesButton;
