import { AxiosError } from 'axios';
import { requestAdmin } from '../../../utils/config/axios/index';
import { decryptData, encryptData } from '../../../utils/functions/decript/index';
import { IContact } from '.';

async function fetchContact(): Promise<IContact[] | string> {
	try {
		const res = await requestAdmin.get('contacts');
		const data = decryptData(res);
		return data.reviews;
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get contacts.');
	}
}

async function postContact(params: IContact): Promise<string> {
	try {
		const encData = encryptData(params);
		const res = await requestAdmin.post('cotnacts', encData);
		const data = decryptData(res);
		return data?.message || 'Successfully post contacts!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to post review.');
	}
}

export { fetchContact, postContact };
