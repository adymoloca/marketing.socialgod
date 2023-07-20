import React, { FC, useEffect, useMemo } from 'react';
import { Button } from '@mui/material';
import CustomTable, { IColumn } from 'components/common/table';
import useGoogleAccounts from 'hooks/fetch-hooks/use-google-accounts';

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

const GoogleEmailsTable: FC = () => {
	const { getGoogleAction, data, loading, deleteGoogleAction } = useGoogleAccounts();

	useEffect(() => {
		getGoogleAction();
		// eslint-disable-next-line
	}, []);

	const rows = useMemo(() => {
		const myData =
			data &&
			data?.accounts?.map((account) => ({
				...account,
				actions: (
					<Button  onClick={(): void => deleteGoogleAction(account?._id)}>
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

export default GoogleEmailsTable;
