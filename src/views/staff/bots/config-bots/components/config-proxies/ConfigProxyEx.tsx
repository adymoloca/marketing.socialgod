import React, { FC, useMemo } from 'react';
import { Flex } from 'components/common';
import CustomTable, { IColumn } from 'components/common/table';
import { IProxy } from 'hooks/fetch-hooks/use-proxy';
import { Button } from '@mui/material';
import { capitalize, ifIsArray } from 'utils/functions';

const tableColumns: IColumn[] = [
	{
		key: 'platform',
		label: 'platform',
		width: '15%',
		align: 'left',
	},
	{
		key: 'city',
		label: 'city',
		width: '10%',
		align: 'left',
	},
	{
		key: 'country',
		label: 'country',
		width: '10%',
		align: 'left',
	},
	{
		key: 'state',
		label: 'state',
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

interface IProps {
	proxyData: IProxy[];
	loading: boolean;
}

const ConfigProxyEx: FC<IProps> = (props) => {
	const { proxyData, loading } = props;

	const copyContent = async (id: string): Promise<void> => {
		try {
			await navigator.clipboard.writeText(id);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const rows = useMemo(() => {
		const myData = ifIsArray<IProxy>(proxyData).map((el) => ({
			...el,
			platform: el?.platform ? capitalize(el.platform) : '-',
			city: el?.city ? capitalize(el.city) : '---',
			state: el?.state ? capitalize(el.state) : '---',
			country: el?.country ? `${el.country.toUpperCase()}` : '-',
			actions: (
				<Button variant='outlined' onClick={(): Promise<void> => copyContent(el?._id)}>
					Copy
				</Button>
			),
		}));
		return myData;
		// eslint-disable-next-line
	}, [proxyData]);

	return (
		<Flex justifyCenter alignItems='start' sx={{ width: '50%' }}>
			<CustomTable
				pagination
				loading={loading}
				data={{ rows, columns: tableColumns }}
				noContentMessage='There is no content yet'
			/>
		</Flex>
	);
};

export default ConfigProxyEx;
