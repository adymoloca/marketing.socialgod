import { AxiosError } from 'axios';
import { requestAdmin } from '../../../utils/config/axios/index';
import { decryptData, encryptData } from '../../../utils/functions/decript/index';
import { IFeatureRequest } from '.';

async function fetchFeatureRequest(): Promise<IFeatureRequest[] | string> {
	try {
		const res = await requestAdmin.get('features');
		const data = decryptData(res);
		return data.reviews;
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get requested features.');
	}
}

async function postFeatureRequest(params: IFeatureRequest): Promise<string> {
	try {
		const encData = encryptData(params);
		const res = await requestAdmin.post('features', encData);
		const data = decryptData(res);
		return data?.message || 'Successfully submitted your request!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to submit your request!');
	}
}

export { fetchFeatureRequest, postFeatureRequest };
