import React, { FC } from 'react';
import { Flex } from 'components/common';
import AddProxyForm from './proxi-form';
import { ISetter } from '..';

const AddProxy: FC<ISetter> = (setter) => {
	const { tabValue, setTabValue } = setter;

	return (
		<Flex width='80%'>
			<AddProxyForm tabValue={tabValue} setTabValue={setTabValue} />
		</Flex>
	);
};

export default AddProxy;
