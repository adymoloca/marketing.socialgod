import { AxiosError } from 'axios';
import { requestAdmin } from '../../../utils/config/axios/index';
import { decryptData, encryptData } from '../../../utils/functions/decript/index';
import { IReport } from '.';

async function fetchReports(): Promise<IReport[] | string> {
	try {
		const res = await requestAdmin.get('reports');
		const data = decryptData(res);
		return data.reviews;
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get reports.');
	}
}

async function postReport(params: IReport): Promise<string> {
	try {
		const encData = encryptData(params);
		const res = await requestAdmin.post('reports', encData);
		const data = decryptData(res);
		return data?.message || 'Successfully post reports!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to post report.');
	}
}

export { fetchReports, postReport };
