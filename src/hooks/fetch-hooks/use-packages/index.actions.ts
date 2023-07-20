import { AxiosError } from 'axios';
import { requestAdmin, requestClient } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';
import { IPackageDiscount, IPackagePrice, IResponsePackage } from 'utils/interfaces/packages';

export interface ISentPackage {
	name: string;
	description: string;
	tokens: number;
	initialPrice: IPackagePrice;
	discount?: IPackageDiscount;
}

async function createTokenPackage(params: ISentPackage): Promise<{ message: string } | string> {
	try {
		const sentData = encryptData(params);
		const encryptedRes = await requestAdmin.post('packages', sentData);
		const data = decryptData(encryptedRes);
		return { message: data?.message || 'Package successfully created!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to create package.');
	}
}

async function getTokenPackage(params: 'admin' | 'client'): Promise<IResponsePackage[] | string> {
	const requestFor = params === 'admin' ? requestAdmin : requestClient;
	try {
		const encryptedRes = await requestFor.get('packages');
		const data = decryptData(encryptedRes);
		return data?.packages || ([] as IResponsePackage[]);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get packages.');
	}
}

async function getTokenPackageById(params: 'admin' | 'client', packageId: string): Promise<IResponsePackage | string> {
	const requestFor = params === 'admin' ? requestAdmin : requestClient;
	try {
		const encryptedRes = await requestFor.get(`packages/${packageId}`);
		const data = decryptData(encryptedRes);
		console.log(data);
		return data?.package || ({} as IResponsePackage);
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get token package.');
	}
}

export { createTokenPackage, getTokenPackage, getTokenPackageById };
