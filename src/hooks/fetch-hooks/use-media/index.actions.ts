import { AxiosError } from 'axios';
import { requestAdmin } from '../../../utils/config/axios/index';
import { decryptData } from '../../../utils/functions/decript/index';
import { MediaItem } from '.';

async function fetchMedias(): Promise<MediaItem[] | string> {
	try {
		const res = await requestAdmin.get('medias');
		const data = decryptData(res);
		return data.medias;
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get media.');
	}
}

async function fetchMedia(_id: string): Promise<MediaItem | string> {
	try {
		const res = await requestAdmin.get(`medias/${_id}`);
		const data = decryptData(res);
		return data;
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get media.');
	}
}

async function postMedia(params: File): Promise<string> {
	try {
		const formData = new FormData();
		formData.append('file', params);
		await requestAdmin.post('medias', formData);
		return 'Successfully added media!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data.error || 'Failed to post media.');
	}
}

export { fetchMedias, fetchMedia, postMedia };
