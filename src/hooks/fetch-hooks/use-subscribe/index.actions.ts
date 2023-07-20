import { AxiosError } from 'axios';
import { request } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';

export interface ISubscribe {
	email: string;
	categories: string[];
}

async function subscribe(params: ISubscribe): Promise<{ message: string }> {
	try {
		const sendData = encryptData(params);
		const res = await request.post('guests/newsletter/subscribe', sendData);
		return { message: res?.data?.message || 'Newsletter successfully added!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to post newsletter.');
	}
}
async function unsubscribe(id: string): Promise<{ message: string }> {
	try {
		const res = await request.patch(`guests/newsletter${id}`);
		return { message: res?.data?.message || 'Successfully unsubscribe!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to unsubscribe.');
	}
}

async function getCategoriesAll(): Promise<string[]> {
	try {
		const res = await request.get('guests/newsletter/categories');
		const decryptedData = decryptData(res);
		const data = decryptedData as { categories: string[] };
		return data?.categories || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get categories.');
	}
}
export { subscribe, getCategoriesAll, unsubscribe };
