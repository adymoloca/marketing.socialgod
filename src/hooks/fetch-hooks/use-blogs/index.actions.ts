import { AxiosError } from 'axios';
import { requestAdmin } from '../../../utils/config/axios/index';
import { decryptData, encryptData } from '../../../utils/functions/decript/index';
import { IBlog } from '.';

async function fetchBlogs(): Promise<IBlog[] | string> {
	try {
		const res = await requestAdmin.get('blogs');
		const data = decryptData(res);
		return data.blogs || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get blogs.');
	}
}

async function fetchBlog(id: string): Promise<IBlog | string> {
	try {
		const res = await requestAdmin.get(`blogs/${id}`);
		const data = decryptData(res);
		return data.blog || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get blog.');
	}
}

async function deleteBlog(id: string): Promise<string> {
	try {
		await requestAdmin.delete(`blogs/${id}`);
		return 'Successfully deleted blog!';
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete blog.');
	}
}

async function postBlog(params: IBlog): Promise<string> {
	try {
		const encData = encryptData(params);
		await requestAdmin.post('blogs', encData);
		return 'Successfully added blog!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data.error || 'Failed to post blog.');
	}
}

async function patchBlog(params: IBlog, id: string): Promise<string> {
	try {
		const encData = encryptData(params);
		await requestAdmin.patch(`faq/${id}`, encData);
		return 'Successfully updated blog!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data.error || 'Failed to patch blog.');
	}
}

export { fetchBlog, fetchBlogs, patchBlog, deleteBlog, postBlog };