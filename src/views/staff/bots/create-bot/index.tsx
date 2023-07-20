import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import ParentCreateBot from './ParentCreateBot';

const CreateBot: FC = () => (
	<Flex justifyCenter>
		<Box sx={{ width: '80%' }}>
			<Heading>Create bot</Heading>
			<ParentCreateBot />
		</Box>
	</Flex>
);

export default CreateBot;
