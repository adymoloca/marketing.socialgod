import { AxiosError } from 'axios';
import { requestAdmin, requestGuests } from '../../../utils/config/axios/index';
import { decryptData, encryptData } from '../../../utils/functions/decript/index';
import { IReview } from '.';

async function fetchReviews(requestType: 'admin' | 'guest'): Promise<IReview[] | string> {
	try {
		const res =  requestType === 'admin' ? await requestAdmin.get('reviews') : await requestGuests.get('reviews');
		const data = decryptData(res);
		return data.reviews;
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get reviews.');
	}
}

async function deleteReview(id: string): Promise<string> {
	try {
		const res = await requestAdmin.delete(`reviews/${id}`);
		const data = res?.data?.message;
		return data || [];
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete review.');
	}
}

async function postReview(params: IReview): Promise<string> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, ...others } = params;
	try {
		const encData = encryptData(others);
		const res = await requestAdmin.post('reviews', encData);
		const data = decryptData(res);
		return data?.message || 'Successfully updated review!';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to post review.');
	}
}

async function patchReview(params: IReview): Promise<{ message: string } | string> {
	const { content, rating, ...others } = params;
	console.log({ others });
	try {
		const encData = encryptData({ content, rating });
		await requestAdmin.patch(`reviews/${params._id}`, encData);
		return { message: 'Reviews successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to patch reviews.');
	}
}

export { fetchReviews, deleteReview, postReview, patchReview };
