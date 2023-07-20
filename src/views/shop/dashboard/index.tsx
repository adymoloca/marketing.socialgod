import Heading from 'components/common/heading';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardShop: FC = () => {
	const { t } = useTranslation();

	return <Heading>{t('dashboard')}</Heading>;
};

export default DashboardShop;
