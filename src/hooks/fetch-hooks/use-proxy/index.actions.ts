import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { ISendData } from 'views/staff/proxy/add-proxy/proxi-form';
import { decryptData, encryptData } from 'utils/functions/decript';
import { IProxy } from '.';

async function addProxies(params: ISendData): Promise<string> {
	try {
		const encData = encryptData(params);
		const encryptedRes = await requestAdmin.post('proxies', encData);
		const data = decryptData(encryptedRes);
		return data?.message || 'Proxies successfully added!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to add proxy.');
	}
}

async function getProxy(): Promise<IProxy[] | string> {
	try {
		const encryptedRes = await requestAdmin.get('proxies');
		const data = decryptData(encryptedRes) as { proxies: IProxy[] };
		return data?.proxies || ([] as IProxy[]);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get proxies.');
	}
}

async function getProxyById(id: string): Promise<IProxy | string> {
	try {
		const res = await requestAdmin.get(`proxies/${id}`);
		const data = decryptData(res) as { proxy: IProxy };
		return data?.proxy || ({} as IProxy);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get proxy.');
	}
}

export { addProxies, getProxy, getProxyById };
