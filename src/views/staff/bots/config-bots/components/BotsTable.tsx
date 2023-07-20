import React, { FC, useEffect, useMemo } from 'react';
import CustomTable, { IColumn } from 'components/common/table';
import useBotsActions from 'hooks/fetch-hooks/use-bots';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { ifIsArray } from 'utils/functions';
import { Config } from 'hooks/fetch-hooks/use-bots/index.interfaces';

const tableColumns: IColumn[] = [
	{
		key: '_id',
		label: 'id',
		width: '20%',
		align: 'left',
	},
	{
		key: 'name',
		label: 'name',
		width: '15%',
		align: 'left',
	},
	{
		key: 'language',
		label: 'language',
		width: '5%',
		align: 'left',
	},
	{
		key: 'username',
		label: 'user_name',
		width: '25%',
		align: 'left',
	},
	{
		key: 'assignedProxies',
		label: 'proxies',
		width: '15%',
		align: 'left',
	},
	{
		key: 'config',
		label: 'config',
		width: '15%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '15%',
		align: 'left',
	},
];

const BotsTable: FC = () => {
	const { getAllBots, loading, dataAll } = useBotsActions();

	const navigate = useNavigate();

	const handleNavigate = (id: string): void => {
		navigate(`/staff/config-bots/${id}`, { state: { id } });
	};

	useEffect(() => {
		getAllBots();
		// eslint-disable-next-line
	}, []);

	const rows = useMemo(() => {
		const myData = ifIsArray<Config>(dataAll?.bots).map((bot) => ({
			...bot,
			name: bot?.credentials?.firstName
				? `${bot?.credentials?.firstName} ${bot?.credentials?.lastName}`
				: 'no-set',
			username: bot?.credentials?.username ? bot?.credentials?.username : 'no-set',
			config: bot?.browserConfigs?.length > 0 ? bot?.browserConfigs?.length : 'None',
			assignedProxies: bot?.assignedProxies?.length > 0 ? bot?.assignedProxies?.length : 'None',
			actions: (
				<Button variant='outlined' onClick={(): void => handleNavigate(bot?._id)}>
					{' '}
					Config{' '}
				</Button>
			),
		}));
		return myData;
		// eslint-disable-next-line
	}, [dataAll]);

	return (
		<CustomTable
			pagination
			loading={loading}
			data={{ rows, columns: tableColumns }}
			noContentMessage='There is no content yet'
		/>
	);
};

export default BotsTable;
