import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';

const AllBlogs: FC = (): JSX.Element => (
	<Flex justifyCenter>
		<Box sx={{ width: '80%' }}>
			<Heading>all blogs</Heading>
		</Box>
	</Flex>
);

export default AllBlogs;
