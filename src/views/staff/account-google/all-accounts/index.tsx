import { FC } from 'react';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import GoogleEmailsTable from './components/GoogleEmailsTable';

const GoogleAccounts: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex justifyCenter>
			<Heading>{t('google_accounts')}</Heading>
			<GoogleEmailsTable />
		</Flex>
	);
};

export default GoogleAccounts;
