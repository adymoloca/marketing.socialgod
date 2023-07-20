import { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import GoogleAccountForm from './components/GoogleAccountForm';

const CreateGoogleAccount: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{t('create_google_accounts')}</Heading>
				<GoogleAccountForm />
			</Box>
		</Flex>
	);
};

export default CreateGoogleAccount;
