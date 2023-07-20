import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';
import { IValueEdit, IValuesProps } from 'views/staff/staff-admins/admin-form';

export interface IAdmin {
	email: string;
	permissions: string[];
	role: string;
	_id: string;
	blocked: boolean;
}

async function addAdmins(params: IValuesProps): Promise<{ admin: IAdmin }> {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...other } = params;
		const sendData = encryptData(other);
		const res = await requestAdmin.post('/staff/admins', sendData);
		const decriptedData = decryptData(res);
		return { admin: decriptedData?.admin || {} };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to add admin.');
	}
}
async function updateAdmin(params: IValueEdit, adminId: string): Promise<{ message: string }> {
	try {
		const sendData = encryptData(params);
		const res = await requestAdmin.patch(`/staff/admins/${adminId}`, sendData);
		return { message: res?.data?.message || 'Admins successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to update admin.');
	}
}

async function blockAdmin(params: boolean, adminId: string): Promise<{ message: string }> {
	try {
		const sendData = encryptData({ blocked: !params });
		const res = await requestAdmin.patch(`/staff/admins/${adminId}`, sendData);
		return { message: res?.data?.message || `Admins successfully ${params ? 'blocked' : 'unblocked'}!` };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to block admin.');
	}
}

async function getAdminsAll(): Promise<IAdmin[]> {
	try {
		const res = await requestAdmin.get('/staff/admins');
		const data = decryptData(res) as { admins: IAdmin[] };
		return data?.admins || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get admin.');
	}
}

async function getPermissionsAll(): Promise<string[]> {
	try {
		const res = await requestAdmin.get('/permissions');
		const data = decryptData(res) as { permissions: string[] };
		return data?.permissions || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get admin permissions.');
	}
}

async function getAdminOne(adminId: string): Promise<IAdmin[]> {
	try {
		const res = await requestAdmin.get(`/staff/admins/${adminId}`);
		const decryptedData = decryptData(res);
		const data = decryptedData as { admin: IAdmin[] };
		return data?.admin || {};
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get admin data.');
	}
}

export { addAdmins, getAdminsAll, updateAdmin, getAdminOne, blockAdmin, getPermissionsAll };
