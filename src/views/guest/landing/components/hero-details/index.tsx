import React, { FC, Fragment } from 'react';
import { Box, Button } from '@mui/material';
import { AnimatedText } from 'components/common/animated-text';
import { useNavigate } from 'react-router';
import { uuid } from 'utils/functions';

const HeroDetails: FC = () => {
	const navigate = useNavigate();

	const textArray: { text: string; delay: number }[] = [
		{ text: 'Automate your social media posts!', delay: 0.1 },
		{ text: 'Content provided by machine learning algoritm.', delay: 0.5 },
		{ text: 'Grow your followers, likes, and appreciation.', delay: 0.3 },
	];

	return (
		<Box
			sx={{
				maxWidth: { md: '500px', xs: '400px' },
				px: 2,
				minWidth: '300px',
				height: { lg: '100%', xs: 'auto' },
				display: 'flex',
				flexDirection: 'column',
				pt: { md: '50px', xs: '50px' },
				gap: 2,
				alignItems: { lg: 'start', xs: 'center' },
			}}
		>
			{textArray?.map((txtItem, _index) => (
				<Fragment key={`animated-text-${uuid()}`}>
					<AnimatedText
						sx={{
							': first-letter': { fontSize: { xs: '24px', md: '38px' } },
							fontSize: { xs: '22px', md: '32px' },
							textAlign: { xs: 'center', lg: 'start' },
						}}
						delay={txtItem?.delay}
					>
						{' '}
						{txtItem?.text}{' '}
					</AnimatedText>
				</Fragment>
			))}
			<Button
				sx={{ mt: '50px', fontSize: '24px', mb: { xs: '100px', lg: 0 } }}
				onClick={(): void => navigate('/sign-up')}
			>
				Get started
			</Button>
		</Box>
	);
};

export default HeroDetails;
