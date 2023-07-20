import React, { FC, useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { Flex } from 'components/common';
import useFlows, { IFlow } from 'hooks/fetch-hooks/use-flow';
import FlowForm from '../flow-form';
import SetterContext from '../flows-context/setter';

export interface IEdit {
	serviceId: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	flowId: string;
	platform: string;
}

const EditFlow: FC<IEdit> = ({ serviceId, flowId, setType, platform }) => {
	const { setter: setFlows } = useContext(SetterContext);
	const { getFlow, data: flow } = useFlows<IFlow>(platform, undefined, setFlows);

	useEffect(() => {
		getFlow(flowId);
		// eslint-disable-next-line
	}, [flowId]);

	const myFlo = Array.isArray(flow) ? [...flow] : [flow];

	return (
		<Flex justifyCenter>
			<Box sx={{ width: '100%' }}>
				<FlowForm type='Edit_flow' myFlow={myFlo} serviceId={serviceId} setType={setType} platform={platform} />
			</Box>
		</Flex>
	);
};

export default EditFlow;
