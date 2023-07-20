import { FC } from 'react';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import OutlookEmailsTable from './components/OutlookEmailsTable';

const AllOutlookEmails: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex justifyCenter>
			<Heading>{t('all_outlook_emails')}</Heading>
			<OutlookEmailsTable />
		</Flex>
	);
};

export default AllOutlookEmails;
