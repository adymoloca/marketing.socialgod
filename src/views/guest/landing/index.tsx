import { Box } from '@mui/material';
import LandingHeader from 'components/landing/header';
import { FC } from 'react';
import Footer from 'components/common/footer';
import LandingHeroSection from './hero-section';
import GetStartedSection from './get-started-section';
import Newsletter from './newsletter';
import PartnersSlideshow from './partners-slideshow';
import FeedBackModal from '../sign-up/components/FeedBackModal';
import ReviewsSlideshow from './reviews-slideshow';

const Landing: FC = () => (
	<Box
		sx={{
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
			overflowY: 'auto',
		}}
	>
		<FeedBackModal />
		<LandingHeader />
		<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }} id='ceva'>
			<LandingHeroSection />
			<Newsletter />
			<GetStartedSection />
			<PartnersSlideshow />
			<ReviewsSlideshow/>
		</Box>
		<Footer />
	</Box>
);

export default Landing;
