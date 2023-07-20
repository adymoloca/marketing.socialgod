import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';
import { IProduct } from './index';

async function getProducts(service: string): Promise<IProduct[] | string> {
	try {
		const res = await requestAdmin.get(`services/${service}/products`);
		const data = decryptData(res);
		return data.products;
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get products');
	}
}

async function deleteProduct(id?: string): Promise<string> {
	try {
		const res = await requestAdmin.delete(`products/${id}`);
		const data = res?.data?.message;
		return data || [];
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to delete product');
	}
}

async function postProduct(params: IProduct, service: string): Promise<IProduct> {
	try {
		const encData = encryptData(params);
		const res = await requestAdmin.post(`services/${service}/products`, encData);
		const data = decryptData(res);
		return data?.products || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to post product');
	}
}

async function patchProduct(params: IProduct): Promise<string> {
	try {
		const { _id, ...others } = params;
		const encData = encryptData(others);
		await requestAdmin.patch(`products/${_id}`, encData);
		return 'Products succesfully updated';
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to patch products');
	}
}

export { postProduct, getProducts, patchProduct, deleteProduct };
