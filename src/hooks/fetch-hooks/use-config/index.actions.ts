import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';
import { BrowserConfig, IResponseGetBrowserConfig } from '../use-bots/index.interfaces';

async function postBrowserConfig(params: BrowserConfig): Promise<string> {
	try {
		const encData = encryptData(params);
		const res = await requestAdmin.post('browser-configs', encData);
		const data = decryptData(res);
		return data?.message || 'Successfully updates bot browser config!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to update browser config.');
	}
}

async function postProxyConfig(id: string, params: string[]): Promise<string> {
	try {
		const res = await requestAdmin.post(`bots/${id}/configs`, { asignedProxies: params });
		const data = res?.data;
		return data || 'Successfully updates bot proxies config!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to update proxies config.');
	}
}

async function getBrowserConfigsFunction(): Promise<IResponseGetBrowserConfig | string> {
	try {
		const res = await requestAdmin.get('browser-configs');
		const data = decryptData(res);
		return data || ({} as IResponseGetBrowserConfig);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get browser config.');
	}
}

export { postBrowserConfig, postProxyConfig, getBrowserConfigsFunction };
