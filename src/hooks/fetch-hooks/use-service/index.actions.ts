import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';
import { IParams, IService } from '.';

async function addServices({ services, onFinish }: IParams): Promise<{ service: IService }> {
	try {
		const sendData = encryptData(services);
		const res = await requestAdmin.post('services', sendData);
		const data = decryptData(res);
		onFinish();
		return { service: data?.service || 'Services successfully added!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to add service.');
	}
}

async function removeService(serviceId: string): Promise<{ message: string }> {
	try {
		const res = await requestAdmin.delete(`services/${serviceId}`);
		return { message: res?.data?.message || 'Service successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete partner.');
	}
}
async function updateService({ services, onFinish }: IParams, serviceId: string): Promise<{ message: string }> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { platform, ...other } = services;
	try {
		const sendData = encryptData(other);
		const res = await requestAdmin.patch(`services/${serviceId}`, sendData);
		onFinish();
		return { message: res?.data?.message || 'Service successfully updated!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Service to update partner.');
	}
}

async function getServicesAll(): Promise<IService[]> {
	try {
		const res = await requestAdmin.get('services');
		const decryptedData = decryptData(res);
		const data = decryptedData as { services: IService[] };
		return data?.services || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get services.');
	}
}

async function getServiceOne(serviceId: string): Promise<{ service: IService }> {
	try {
		const res = await requestAdmin.get(`services/${serviceId}`);
		const decryptedData = decryptData(res);
		const data = decryptedData as { service: IService };
		return { service: data?.service } || {};
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get services.');
	}
}

export { addServices, removeService, getServicesAll, getServiceOne, updateService };
