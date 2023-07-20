import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import { capitalize } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import ChangePasswordForm from './change-password-form';

const ChangeAdminPassword: FC = () => {
	const { t } = useTranslation();

	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{capitalize(t('change_password'))}</Heading>
				<ChangePasswordForm />
			</Box>
		</Flex>
	);
};

export default ChangeAdminPassword;
