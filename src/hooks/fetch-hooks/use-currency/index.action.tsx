import { decryptData, encryptData } from 'utils/functions/decript';
import { requestAdmin } from 'utils/config/axios';
import { AxiosError } from 'axios';
import { IStock } from './index';

async function patchStocks(params: { rates: IStock[] }): Promise<{ message: string } | string> {
	try {
		const encData = encryptData(params);
		await requestAdmin.patch('stocks', encData);
		return { message: 'Stocks successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to patch stocks.');
	}
}

async function fetchStocks(): Promise<IStock[] | string> {
	try {
		const res = await requestAdmin.get('stocks');
		const data = decryptData(res);
		return data?.stocks.rates || ([] as IStock[]);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to fetch stocks.');
	}
}

export { fetchStocks, patchStocks };
