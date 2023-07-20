import React, { FC, useContext, useMemo, useState } from 'react';
import CustomTable, { IColumn } from 'components/common/table';
import { Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useAdmins from 'hooks/fetch-hooks/use-admins';
import { IAdmin } from 'hooks/fetch-hooks/use-admins/index.actions';
import HttpsIcon from '@mui/icons-material/Https';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import { AuthContext } from 'utils/context/auth';
import { Flex } from 'components/common';
import AdminForm from '../admin-form';
import MemberContext from '../admins-context';

const tableColumns: IColumn[] = [
	{
		key: 'email',
		label: 'email',
		width: '25%',
		align: 'left',
	},
	{
		key: 'role',
		label: 'role',
		width: '25%',
		align: 'left',
	},
	{
		key: 'permissions',
		label: 'permissions',
		width: '25%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '25%',
		align: 'center',
	},
];

const getBlockButtonIcon = (isBlocked: boolean): JSX.Element =>
	isBlocked ? <NoEncryptionGmailerrorredIcon color='secondary' /> : <HttpsIcon color='primary' />;

const AllAdmins: FC = () => {
	const {
		loadingAdmins,
		loadingAdmin,
		loadingPermissions,
		data: admins,
		setData: setAdmins,
		postAdmin,
		update,
		block,
	} = useAdmins<IAdmin[]>(undefined, true);
	const { user } = useContext(AuthContext);
	const [type, setType] = useState('Add_Admin');
	const [adminId, setAdminId] = useState('');

	const handleEdit = (aId: string): void => {
		setAdminId(aId);
		setType('Edit_Admin');
	};

	const rows = useMemo(() => {
		const myData =
			admins &&
			admins?.map((admin) => {
				const { permissions, ...other } = admin;
				const array = permissions.map((item, i) => (i === permissions.length - 1 ? item : `${item}, `));
				const adminTable = { ...other, permissions: array };
				const adminFinal = admin?.permissions?.length > 1 ? adminTable : admin;
				return {
					...adminFinal,
					actions: (
						<Box
							key={admin?._id}
							sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
							{admin.email !== user.email && (
								<>
									<EditIcon onClick={(): void => handleEdit(admin?._id)} />
									<Tooltip title='Block' onClick={(): void => block(admin.blocked, admin._id)}>
										<IconButton>
											{loadingAdmin === admin._id ? (
												<CircularProgress size={20} />
											) : (
												getBlockButtonIcon(admin.blocked)
											)}
										</IconButton>
									</Tooltip>
								</>
							)}
						</Box>
					),
				};
			});
		return myData;
		// eslint-disable-next-line
	}, [admins, loadingAdmin]);

	const memberContext = useMemo(
		() => ({ postAdmin, update, setter: setAdmins, loadingAdmin, loadingPermissions }),
		[postAdmin, update, setAdmins, loadingAdmin, loadingPermissions]
	);

	return (
		<>
			<MemberContext.Provider value={memberContext}>
				<Flex justifyCenter sx={{ marginBottom: '30px' }}>
					{type === 'Add_Admin' ? (
						<AdminForm type='Add_Admin' />
					) : (
						<AdminForm type='Edit_Admin' adminId={adminId} setType={setType} />
					)}
				</Flex>
			</MemberContext.Provider>
			<CustomTable
				pagination
				loading={loadingAdmins}
				data={{ rows, columns: tableColumns }}
				noContentMessage='There is no content yet'
			/>
		</>
	);
};

export default AllAdmins;
