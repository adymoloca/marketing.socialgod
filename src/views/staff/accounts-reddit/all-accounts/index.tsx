import { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';

const RedditAccounts: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{t('reddit_accounts')}</Heading>
			</Box>
		</Flex>
	);
};

export default RedditAccounts;
