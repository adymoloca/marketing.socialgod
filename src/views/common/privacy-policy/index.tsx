import { Box } from '@mui/material';
import HeroSection from 'components/common/hero-section';
import StaticContent, { DataPropType } from 'components/common/static-content';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import privacyPolicy from './data/privacy-policy.json';
import LandingHeader from '../../../components/landing/header';
import Footer from '../../../components/common/footer';

const PrivacyPolicy: FC = () => {
	const { t } = useTranslation();

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				overflowY: 'auto',
			}}>
			<LandingHeader />
			<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 7 }}>
				<HeroSection title={t('privacy_policy.title')} />
				<StaticContent data={privacyPolicy as DataPropType} />
			</Box>
			<Footer />
		</Box>
	);
};

export default PrivacyPolicy;
