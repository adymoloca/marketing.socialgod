import React, { FC, useEffect, useMemo } from 'react';
import useProxy from 'hooks/fetch-hooks/use-proxy';
import CustomTable, { IColumn } from 'components/common/table';
import { capitalize } from 'utils/functions';

const tableColumns: IColumn[] = [
	{
		key: 'username',
		label: 'user_name',
		width: '15%',
		align: 'left',
	},
	{
		key: 'platform',
		label: 'platform',
		width: '10%',
		align: 'left',
	},
	{
		key: 'available',
		label: 'available',
		width: '10%',
		align: 'left',
	},
	{
		key: 'host',
		label: 'host',
		width: '25%',
		align: 'left',
	},
	{
		key: 'city',
		label: 'city',
		width: '15%',
		align: 'left',
	},
	{
		key: 'country',
		label: 'country',
		width: '15%',
		align: 'left',
	},
];

const AllProxyTable: FC = () => {
	const { loading, getProxies, data } = useProxy();

	useEffect(() => {
		getProxies();
		// eslint-disable-next-line
	}, []);

	const rows = useMemo(() => {
		const myData =
			data &&
			data?.map((proxy) => ({
				...proxy,
				available: proxy?.available ? 'Yes' : 'No',
				city: proxy?.city?.length > 0 ? `${capitalize(proxy?.city)}` : 'Unknown',
			}));
		return myData;
		// eslint-disable-next-line
	}, [data]);

	return (
		<CustomTable
			pagination
			loading={loading}
			data={{ rows, columns: tableColumns }}
			noContentMessage='There is no content yet'
		/>
	);
};

export default AllProxyTable;
