import { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import AddGoogleForm from './components/AddGoogleForm';

const CreateGoogleAccount: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{t('add_google_accounts')}</Heading>
				<AddGoogleForm />
			</Box>
		</Flex>
	);
};

export default CreateGoogleAccount;
