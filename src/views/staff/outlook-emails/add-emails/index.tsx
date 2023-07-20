import { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import AddoutlookForm from './conponents/AddOutlookForm';

const AddOutlookEmails: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{t('add_outlook_emails')}</Heading>
				<AddoutlookForm />
			</Box>
		</Flex>
	);
};

export default AddOutlookEmails;
