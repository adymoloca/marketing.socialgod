import { Skeleton } from '@mui/material';
import { IColumn } from '.';

export const loadingCol: IColumn[] = [
	{
		key: 'email',
		label: 'email',
		width: '20%',
		align: 'left',
	},
	{
		key: '_id',
		label: 'id',
		width: '20%',
		align: 'left',
	},
	{
		key: 'password',
		label: 'password',
		width: '20%',
		align: 'left',
	},
	{
		key: 'username',
		label: 'username',
		width: '20%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '15%',
		align: 'left',
	},
];

export const skeletonTable = {
	username: <Skeleton animation='wave' variant='rectangular' width='100%' height={40} />,
	email: <Skeleton animation='wave' variant='rectangular' width='100%' height={40} />,
	_id: <Skeleton animation='wave' variant='rectangular' width='100%' height={40} />,
	password: <Skeleton animation='wave' variant='rectangular' width='100%' height={40} />,
	actions: <Skeleton animation='wave' variant='rectangular' width='100%' height={40} />,
};
