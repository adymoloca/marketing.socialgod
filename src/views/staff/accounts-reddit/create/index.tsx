import { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import RedditAccountForm from './components/RedditAccountsForm';

const CreateRedditAccount: FC = () => {
	const { t } = useTranslation();

	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{t('add_reddit_account')}</Heading>
				<RedditAccountForm />
			</Box>
		</Flex>
	);
};

export default CreateRedditAccount;
