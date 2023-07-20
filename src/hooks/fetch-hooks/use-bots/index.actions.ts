import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData } from 'utils/functions/decript';
import { AllBotsResponse, BotResponse } from './index.interfaces';

async function getBots(): Promise<AllBotsResponse | string> {
	try {
		const res = await requestAdmin.get('bots');
		const data = decryptData(res);
		return data || ({} as AllBotsResponse);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get bots.');
	}
}

async function getBotsById(params: string): Promise<BotResponse | string> {
	try {
		const res = await requestAdmin.get(`bots/${params}`);
		const data = decryptData(res);
		return data || ({} as BotResponse);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get bot.');
	}
}

export { getBots, getBotsById };
