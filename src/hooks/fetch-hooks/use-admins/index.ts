import { useCallback, useEffect, useState } from 'react';
import { IValueEdit, IValuesProps } from 'views/staff/staff-admins/admin-form';
import { stateSetter } from 'utils/types/state';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import {
	addAdmins,
	getAdminsAll,
	getAdminOne,
	updateAdmin,
	IAdmin,
	getPermissionsAll,
	blockAdmin,
} from './index.actions';

export interface IUpdate {
	email: string;
	permissions: string[];
	password: string;
	confirmPassword: string;
}

export interface AdminsReturnType<T extends IAdmin | IAdmin[]> {
	postAdmin: (params: IValuesProps) => void;
	update: (params: IValueEdit, adminId: string) => void;
	getAdmins: () => void;
	getPermissions: () => void;
	getAdmin: (adminId: string) => void;
	block: (params: boolean, adminId: string) => void;
	data: T;
	setData: stateSetter<T>;
	allPermissions: string[];
	loadingAdmins: boolean;
	loadingAdmin: string;
	loadingPermissions: boolean;
}

function useAdmins<T extends IAdmin | IAdmin[], V = IAdmin[]>(
	setter: stateSetter<V> | undefined = undefined,
	getAdminsOnRender: boolean | undefined = undefined
): AdminsReturnType<T> {
	const [data, setData] = useState<T | null>(null);
	const [permissions, setPermissions] = useState<string[]>([]);
	const [[loadingAdmins, loadingAdmin, loadingPermissions], toggleLoading] = useLoaders<[boolean, string, boolean]>(
		false,
		'',
		false
	);
	const toggleLoadAdmins = (val: boolean | undefined = undefined): void => toggleLoading(0, val);
	const toggleLoadAdmin = (val: string | undefined = undefined): void => toggleLoading(1, val);
	const { success, error } = useNotificationsContext();

	const getAdmins = useCallback(
		async () => {
			try {
				toggleLoadAdmins(true);
				const response = await getAdminsAll();
				const callbackNeeded =
					typeof setter === 'function'
						? (): void => setter(response as V)
						: (): void => setData(response as T);
				callbackNeeded();
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadAdmins(false);
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const getAdmin = useCallback(
		async (adminId: string) => {
			try {
				toggleLoadAdmin(adminId);
				const response = await getAdminOne(adminId);
				setData(response as T);
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadAdmin('');
			}
		},
		// eslint-disable-next-line
		[setData]
	);
	const getPermissions = useCallback(
		async () => {
			try {
				toggleLoading(2, true);
				const response = await getPermissionsAll();
				setPermissions(response as string[]);
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoading(2, false);
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const block = useCallback(
		async (params: boolean, adminId: string) => {
			try {
				toggleLoadAdmin(adminId);
				await blockAdmin(params, adminId);
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as IAdmin[]).map((admin) =>
							admin._id === adminId ? { ...admin, blocked: !params } : admin
						);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Admin blocked successfully.');
			} catch (message) {
				console.error(message);
				error('Admin blocked failed.');
			} finally {
				toggleLoadAdmin();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const postAdmin = useCallback(
		async (params: IValuesProps) => {
			try {
				toggleLoadAdmin('post-update-admin');
				const response = await addAdmins(params);
				setter &&
					setter((prev) => {
						if (prev !== null) {
							const temp = [...(prev as IAdmin[])];
							temp?.push(response.admin);
							return temp as V;
						}
						return prev;
					});
				success('Admin added successfully.');
			} catch (message) {
				console.error(message);
				error('Admin added failed.');
			} finally {
				toggleLoadAdmin();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const update = useCallback(
		async (params: IValueEdit, adminId: string) => {
			try {
				toggleLoadAdmin('post-update-admin');
				await updateAdmin(params, adminId);
				setter &&
					setter((prev) => {
						if (prev !== null) {
							const temp = (prev as IAdmin[])?.map((admin) =>
								admin._id === adminId ? { ...admin, ...params } : admin
							);
							return temp as V;
						}
						return [] as unknown as V;
					});
				success('Admin updated successfully.');
			} catch (message) {
				console.error(message);
				error('Admin updated failed.');
			} finally {
				toggleLoadAdmin();
			}
		},
		// eslint-disable-next-line
		[setData]
	);
	useEffect(() => {
		if (getAdminsOnRender) {
			getAdmins();
		}
		// eslint-disable-next-line
	}, [getAdminsOnRender]);

	return {
		data: data || ([] as IAdmin[] as T),
		setData: setData as stateSetter<T>,
		postAdmin,
		getAdmins,
		getAdmin,
		update,
		block,
		getPermissions,
		allPermissions: permissions as string[],
		loadingAdmins,
		loadingAdmin,
		loadingPermissions,
	};
}

export default useAdmins;
