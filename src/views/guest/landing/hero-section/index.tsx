import React from 'react';
import { Box, Typography } from '@mui/material';
import HeroDetails from '../components/hero-details';

const LandingHeroSection:React.FC = ():JSX.Element => (
	<>
		<Typography
			variant='h1'
			sx={{ mt: { xs: 2, md: 6 }, mb: { xs: 4, md: 0 }, fontSize: { xs: '2rem', md: '4rem', lg: '6rem' } }}
		>
			Social god Application
		</Typography>
		<Box
			sx={{
				maxWidth: '1200px',
				width: '100%',
				height: 'auto',
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'flex-end',
				justifyContent: { lg: 'space-between', xs: 'center' },
				mb: { md: '100px', xs: '10px' },
			}}
		>
			<Box
				component='img'
				src='https://storage.googleapis.com/sbdcloud/1687328181193-world-social.svg'
				alt='test'
				sx={{
					minWidth: '250px',
					minHeight: '250px',
					width: { md: '500px', xs: 'auto' },
					height: { md: '400px', xs: 'auto' },
					maxWidth: { md: '500px', xs: '100%' },
					maxHeight: { md: '500px', xs: '350px' },
					mb: { xs: 0, lg: '100px' },
				}}
			/>
			<HeroDetails />
		</Box>
	</>
);

export default LandingHeroSection;
