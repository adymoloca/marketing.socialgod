import React from 'react';
import { IAdmin } from 'hooks/fetch-hooks/use-admins/index.actions';
import { stateSetter } from 'utils/types/state';
import { IValueEdit, IValuesProps } from '../admin-form';

interface AdminContextType<V = IAdmin[]> {
	postAdmin: (params: IValuesProps) => void;
	update: (params: IValueEdit, adminId: string) => void;
	setter: stateSetter<V>;
	loadingAdmin: string | undefined;
	loadingPermissions: boolean;
}

const AdminContext = React.createContext<AdminContextType>({
	postAdmin: () => {},
	update: () => {},
	setter: () => {},
	loadingAdmin: '',
	loadingPermissions: false,
});

export default AdminContext;
