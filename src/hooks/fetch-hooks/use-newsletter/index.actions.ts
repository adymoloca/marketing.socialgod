import { AxiosError } from 'axios';
import { request, requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';

export interface IParams {
	categories: string[];
	subject: string;
	content: string;
}

export interface INewsletter {
	content: string;
	subject: string;
	_id: string;
	categories: string[];
	sent: boolean;
}

async function postNewsletter(params: IParams): Promise<{ newsletter: INewsletter; message: string }> {
	try {
		const sendData = encryptData(params);
		const res = await requestAdmin.post('newsletters', sendData);
		const data = decryptData(res);
		return { newsletter: data?.newsletter || {}, message: 'Newsletter successfully added!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to post newsletter.');
	}
}
async function sendNewsletter(newsletterId: string): Promise<{ newsletter: INewsletter; message: string }> {
	try {
		const res = await requestAdmin.post(`newsletters/${newsletterId}`);
		const data = decryptData(res);
		return { newsletter: data?.newsletter || {}, message: 'Newsletter successfully sent!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to send newsletter.');
	}
}

async function removeNewsletter(newsletterId: string): Promise<{ data: INewsletter; message: string }> {
	try {
		const res = await requestAdmin.delete(`newsletters/${newsletterId}`);
		const data = res?.data as { newsletter: INewsletter };
		return { data: data?.newsletter || {}, message: 'News letter successfully added!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed delete newsletter.');
	}
}

async function updateNewsletter(params: IParams, newsletterId: string): Promise<{ message: string }> {
	try {
		const sendData = encryptData(params);
		const res = await requestAdmin.patch(`newsletters/${newsletterId}`, sendData);
		return { message: res?.data?.message || 'Newsletter successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to update newsletter.');
	}
}
async function getNewsletterOne(newsletterId: string): Promise<INewsletter[]> {
	try {
		const res = await requestAdmin.get(`newsletters/${newsletterId}`);
		const decryptedData = decryptData(res);
		const data = decryptedData as { newsletter: INewsletter[] };
		return data?.newsletter || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get newsletter.');
	}
}

async function getNewslettersAll(params: 'admin' | 'client'): Promise<INewsletter[]> {
	try {
		const methodRequest = params === 'admin' ? requestAdmin : request;
		const res = await methodRequest.get(params === 'admin' ? '/newsletters' : 'guests/newsletters');
		const decryptedData = decryptData(res);
		const data = decryptedData as { newsletters: INewsletter[] };
		return data?.newsletters || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get newsletters.');
	}
}

export { getNewslettersAll, getNewsletterOne, removeNewsletter, updateNewsletter, sendNewsletter, postNewsletter };
