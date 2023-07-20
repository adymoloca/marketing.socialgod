import { AxiosError } from 'axios';
import { requestAdmin } from '../../../utils/config/axios/index';
import { FaqItem } from '.';
import { decryptData, encryptData } from '../../../utils/functions/decript/index';

async function fetchFaqs (): Promise<FaqItem[] | string> {
	try {
		const res = await requestAdmin.get('faq');
		const data = decryptData(res);
		return data.faq?.map((el: {
            index?: number,
            _id: string,
            question: string,
            answer: string,
            attachment: string
         }) => {
			const order = el.index; 
			return {
				...el,
				order
			}; 
		}) || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get faqs.');
	}
}

async function deleteFaq(id: string): Promise<{message: string} | string> {
	try {
		const res = await requestAdmin.delete(`faq/${id}`); 
		return {message: res?.data?.message || 'Successfully deleted faq!'};
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete faqs.');
	}
}

async function postFaq(params: FaqItem): Promise<{message :string} | string> {
	const body = {
		question: params.question,
		answer: params.answer,
		index: params.index
	};
	try {
		const encData = encryptData(body);
		const formData = new FormData();
		if(params.attachment){
			formData.append('file', params.attachment);
		}
		formData.append('data', encData.data);
		const response = await requestAdmin.post('faq', formData);
		return {message: response?.data?.message || 'Successfully added faq!'};
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data.error || 'Failed to post faq.');
	}
}

async function patchFaq(params: FaqItem): Promise<{message: string} | string> {
	const body = {
		question: params.question,
		answer: params.answer,
		index: params.index
	};
	try {
		const encData = encryptData(body);
		const formData = new FormData();
		if(params.attachment){
			formData.append('file', params.attachment);
		}
		formData.append('data', encData.data);
		const res = await requestAdmin.patch(`faq/${params._id}`, formData);
		return {message: res?.data?.message || 'Successfully updated faq!'};
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data.error || 'Failed to patch faq.');
	}
}

export { fetchFaqs, postFaq, patchFaq, deleteFaq };