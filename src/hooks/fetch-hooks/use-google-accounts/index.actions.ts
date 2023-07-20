import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';

export interface CreateGoogleAccountData {
	accounts: number;
	time: number;
	names: string;
}

export interface AccountObject {
	email: string;
	password: string;
}
export interface ResponseAccountObject {
	_id: string;
	email: string;
	password: string;
}
export interface AddGoogleAccountsParams {
	accounts: AccountObject[];
}

export interface GetGoogleAccountsResponse {
	accounts: ResponseAccountObject[];
}

async function createGoogleAccounts(params: CreateGoogleAccountData): Promise<{ message: string } | string> {
	try {
		const encData = encryptData(params);
		const encryptedRes = await requestAdmin.post('auth', encData);
		const data = decryptData(encryptedRes);
		const message = data?.message as string;
		return { message: message || 'Successfully requested to create Accounts!' };
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to create account.');
	}
}

async function addGoogleAccounts(params: AddGoogleAccountsParams): Promise<{ message: string } | string> {
	try {
		const encData = encryptData(params);
		const encryptedRes = await requestAdmin.post('gmail/accounts', encData);
		const data = decryptData(encryptedRes);
		const message = data?.message as string;
		return { message: message || 'Accounts successfully added!' };
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to add account.');
	}
}

async function getGoogleAccounts(): Promise<GetGoogleAccountsResponse | string> {
	try {
		const res = await requestAdmin.get('gmail/accounts');
		const data = decryptData(res);
		return data || ({} as GetGoogleAccountsResponse);
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get accounts.');
	}
}

async function deleteGoogleAccounts(id: string): Promise<string> {
	try {
		const res = await requestAdmin.delete(`gmail/accounts/${id}`);
		const data = res?.data?.message;
		return data || 'Succefuly deleted gmail!';
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete account.');
	}
}

export { createGoogleAccounts, addGoogleAccounts, getGoogleAccounts, deleteGoogleAccounts };
