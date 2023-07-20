import { AxiosError } from 'axios';
import { requestAdmin, requestGuests } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';

export interface IPartner {
	name: string;
	logo: string;
	link: string;
	_id: string;
}
export interface IPartnersValueProps {
	name: string;
	logo: string;
	link: string;
}

async function addPartners(params: IPartnersValueProps): Promise<{ partner: IPartner; message: string }> {
	try {
		const sendData = encryptData(params);
		const res = await requestAdmin.post('partners', sendData);
		const decriptedData = decryptData(res);
		return { partner: decriptedData?.partner || {}, message: 'Successfully added partner!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to post partner.');
	}
}
async function updatePartner(params: IPartnersValueProps, partnerId: string): Promise<{ message: string }> {
	try {
		const sendData = encryptData(params);
		const res = await requestAdmin.patch(`partners/${partnerId}`, sendData);
		return { message: res?.data?.message || 'Partners successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to update partner.');
	}
}

async function removePartner(partnerId: string): Promise<{ message: string }> {
	try {
		const res = await requestAdmin.delete(`partners/${partnerId}`);
		return { message: res?.data?.message || 'Partners successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete partner.');
	}
}

async function getPartnersAll(requestFor: 'guest' | 'admin'): Promise<IPartner[]> {
	const requestMethod = requestFor === 'guest' ? requestGuests : requestAdmin;
	try {
		const res = await requestMethod.get('partners');
		const data = decryptData(res) as { partners: IPartner[] };
		return data?.partners || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get partners.');
	}
}

async function getPartnerOne(partnerId: string): Promise<IPartner> {
	try {
		const res = await requestAdmin.get(`partners/${partnerId}`);
		const decryptedData = decryptData(res);
		const data = decryptedData as { partner: IPartner };
		return data?.partner || {};
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get partner.');
	}
}

export { addPartners, getPartnersAll, updatePartner, getPartnerOne, removePartner };
