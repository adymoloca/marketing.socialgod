import React, { FC, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { Flex, Heading } from 'components/common';
import CustomTable, { IColumn } from 'components/common/table';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useFlows, { IFlow } from 'hooks/fetch-hooks/use-flow';
import { useAppSelector } from 'store/hooks';
import AddFlow, { IAdd } from '../add-flow';
import EditFlow, { IEdit } from '../edit-flow';
import FlowsContext from '../flows-context';

const tableColumns: IColumn[] = [
	{
		key: 'name',
		label: 'name',
		width: '75%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '25%',
		align: 'center',
	},
];

const getAddFlow = (props: IAdd): JSX.Element => <AddFlow {...props} />;
const getEditFlow = (props: IEdit): JSX.Element => <EditFlow {...props} />;

const AllFlows: FC = () => {
	const [type, setType] = useState('Add_flow');
	const [flowId, setFlowId] = useState('');
	const { t } = useTranslation();
	const serviceId = useAppSelector((state) => state?.utils?.serviceId);
	const platform = useAppSelector((state) => state?.utils?.platform);
	const {
		loadingFlows,
		loadingFlow,
		data: flows,
		postFlow,
		update,
		deleteFlow,
	} = useFlows<IFlow[]>(platform, [platform]);

	const handleEdit = (fId: string): void => {
		setFlowId(fId);
		setType('Edit_flow');
	};

	const rows = useMemo(() => {
		const myData = flows?.map((flow) => ({
			...flow,
			actions: (
				<Box key={flow._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
					<EditIcon onClick={(): void => handleEdit(flow._id)} />
					<DeleteIcon onClick={(): void => deleteFlow(flow._id, platform)} />
				</Box>
			),
		}));
		return myData;
		// eslint-disable-next-line
	}, [flows]);

	const flowsContext = useMemo(() => ({ postFlow, update, loadingFlow }), [postFlow, update, loadingFlow]);
	const formAddProps: IAdd = { serviceId, platform, setType };
	const formEditProps: IEdit = { ...formAddProps, flowId };

	return (
		<Flex justifyCenter>
			<FlowsContext.Provider value={flowsContext}>
				{type === 'Add_flow'
					? serviceId && platform && getAddFlow(formAddProps)
					: serviceId && platform && getEditFlow(formEditProps)}
			</FlowsContext.Provider>
			<Heading>{t('all_flows')}</Heading>
			<CustomTable
				pagination
				loading={loadingFlows}
				data={{ rows, columns: tableColumns }}
				noContentMessage='There is no content yet'
			/>
		</Flex>
	);
};

export default AllFlows;
