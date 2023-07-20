import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';
import { SentBots } from '.';

async function addBot(params: SentBots): Promise<{ message: string } | string> {
	try {
		const encData = encryptData(params);
		const res = await requestAdmin.post('bots', encData);
		const data = decryptData(res);
		return { message: data?.message || 'Bots successfully added!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to add bot.');
	}
}

export { addBot };
