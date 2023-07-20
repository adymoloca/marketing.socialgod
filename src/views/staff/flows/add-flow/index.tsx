import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Flex } from 'components/common';
import FlowForm from '../flow-form';

export interface IAdd {
	serviceId: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	platform: string;
}
const AddFlow: FC<IAdd> = ({ serviceId, setType, platform }) => {
	const flow = [{ _id: '', name: '', typeDescriptions: [] }];
	return (
		<Flex justifyCenter>
			<Box sx={{ width: '100%' }}>
				<FlowForm type='Add_flow' myFlow={flow} serviceId={serviceId} setType={setType} platform={platform} />
			</Box>
		</Flex>
	);
};

export default AddFlow;
