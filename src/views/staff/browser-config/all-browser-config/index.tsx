import { FC, useEffect, useMemo } from 'react';
import CustomTable, { IColumn } from 'components/common/table';
import useConfig from 'hooks/fetch-hooks/use-config';
import { Typography } from '@mui/material';

const tableColumns: IColumn[] = [
	{
		key: 'device',
		label: 'device',
		width: '10%',
		align: 'left',
	},
	{
		key: 'os',
		label: 'os',
		width: '15%',
		align: 'left',
	},
	{
		key: 'path',
		label: 'path',
		width: '25%',
		align: 'left',
	},
	{
		key: 'userAgent',
		label: 'user_agent',
		width: '25%',
		align: 'left',
	},
	{
		key: 'arguments',
		label: 'arguments',
		width: '10%',
		align: 'left',
	},
	{
		key: 'viewPort',
		label: 'view_port',
		width: '10%',
		align: 'left',
	},
];
const AllBrowserConfig: FC = () => {
	const { data, getBrowserConfigs, loading } = useConfig();

	useEffect(() => {
		getBrowserConfigs();
	}, [getBrowserConfigs]);

	const rows = useMemo(() => {
		const myData =
			data &&
			data?.browserConfigs?.map((config) => ({
				...config,
				arguments: config?.args?.length ? config?.args?.length : 'No args',
				viewPort: <Typography>{`${config?.viewPort?.width} X ${config?.viewPort?.height}`}</Typography>,
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

export default AllBrowserConfig;
