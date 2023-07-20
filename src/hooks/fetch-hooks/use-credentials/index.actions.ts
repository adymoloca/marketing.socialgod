import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData } from 'utils/functions/decript';
import { ICredentials } from '.';

async function getCredentials(): Promise<ICredentials | string> {
	try {
		const res = await requestAdmin.get('credentials');
		const data = decryptData(res);
		return data?.credentials || ({} as ICredentials);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get credetials.');
	}
}

export { getCredentials };
