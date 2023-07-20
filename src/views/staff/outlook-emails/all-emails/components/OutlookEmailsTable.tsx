import React, { FC, useEffect, useMemo } from 'react';
import { Button } from '@mui/material';
import CustomTable, { IColumn } from 'components/common/table';
import useOutlook from 'hooks/fetch-hooks/use-outlook';

const tableColumns: IColumn[] = [
	{
		key: 'email',
		label: 'email',
		width: '25%',
		align: 'left',
	},
	{
		key: '_id',
		label: 'id',
		width: '15%',
		align: 'left',
	},
	{
		key: 'password',
		label: 'password',
		width: '25%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '15%',
		align: 'left',
	},
];

const OutlookEmailsTable: FC = () => {
	const { data, getOutlookAction, loading, deleteOutlookAction } = useOutlook();

	useEffect(() => {
		getOutlookAction();
		// eslint-disable-next-line
	}, []);

	console.log('dash data outlook', data);

	const rows = useMemo(() => {
		const myData =
			data &&
			data?.accounts?.map((account) => ({
				...account,
				actions: (
					<Button  onClick={(): void => deleteOutlookAction(account?._id)}>
						Delete
					</Button>
				),
			}));
		return myData;
		// eslint-disable-next-line
	}, [data?.accounts]);

	return (
		<CustomTable
			pagination
			loading={loading}
			data={{ rows, columns: tableColumns }}
			noContentMessage='There is no content yet'
		/>
	);
};

export default OutlookEmailsTable;
