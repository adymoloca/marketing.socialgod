import { FC } from 'react';
import { Box } from '@mui/material';
import HeroSection from 'components/common/hero-section';
import StaticContent, { DataPropType } from 'components/common/static-content';
import { useTranslation } from 'react-i18next';
import Footer from 'components/common/footer';
import termsOfService from './data/terms-of-service.json';
import LandingHeader from '../../../components/landing/header';
// data ending as *_arr_item should be threathed as item of an array, replace 'arr' with the index + 1

const TermsOfService: FC = (): JSX.Element => {
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
				<HeroSection title={t('terms_of_service.title')} />
				<StaticContent data={termsOfService as DataPropType} />
			</Box>
			<Footer />
		</Box>
	);
};

export default TermsOfService;
