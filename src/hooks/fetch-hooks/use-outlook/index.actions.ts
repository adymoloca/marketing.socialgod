import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';

export interface AccountObject {
	email: string;
	password: string;
}
export interface AddOutlookParams {
	accounts: AccountObject[];
}

export interface ResponseAccountObject {
	_id: string;
	email: string;
	password: string;
}
export interface GetOutlookResponse {
	accounts: ResponseAccountObject[];
}

async function addOutlookEmails(params: AddOutlookParams): Promise<{ message: string } | string> {
	try {
		const encData = encryptData(params);
		const res = await requestAdmin.post('outlook/accounts', encData);
		const data = decryptData(res);
		return { message: data?.message ? data?.message : 'Accounts successfully added!' };
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to add outlook.');
	}
}

async function getOutlookAccounts(): Promise<GetOutlookResponse | string> {
	try {
		const res = await requestAdmin.get('outlook/accounts');
		const data = decryptData(res);
		return data || ({} as GetOutlookResponse);
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to load outlook.');
	}
}

async function deleteOutlookAccounts(id: string): Promise<string> {
	try {
		const res = await requestAdmin.delete(`outlook/accounts/${id}`);
		const data = res?.data?.message;
		return data || 'Succefuly deleted outlook!';
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete outlook.');
	}
}

export { addOutlookEmails, getOutlookAccounts, deleteOutlookAccounts };
