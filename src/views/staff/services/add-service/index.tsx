import React from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import AddServiceForm from './service-form';

const AddServices = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{t('add_service')}</Heading>
				<AddServiceForm />
			</Box>
		</Flex>
	);
};

export default AddServices;
