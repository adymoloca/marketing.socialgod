import { useCallback, useEffect, useState } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import { deleteProduct, getProducts as fetchProducts, patchProduct, postProduct } from './index.actions';

export interface IProduct {
	_id?: string;
	name: string;
	icon: Icon;
	price: string;
	path: string;
}
interface Icon {
	source: string;
	name: string;
}
export interface ProductReturnType {
	data: IProduct[] | IProduct | null;
	loading: boolean;
	addProduct: (product: IProduct) => void;
	getProducts: () => void;
	updateProduct: (product: IProduct) => void;
	removeProduct: (id: string) => void;
}
function useProducts(service: string): ProductReturnType {
	const [data, setData] = useState<IProduct[] | IProduct | null>(null);
	const [[loading], toggleLoading] = useLoaders<[boolean]>(false);
	const updateProduct = useCallback(
		async (product: IProduct) => {
			try {
				toggleLoading(0);
				await patchProduct(product);
				setData((prev) => {
					if ((prev as IProduct[])?.length) {
						const temp = [...(prev as IProduct[])];
						const faqIndex = temp.findIndex((el) => el._id === product._id);
						temp.splice(faqIndex, 1, product);
						return temp;
					}
					return [product];
				});
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(0);
			}
		},
		// eslint-disable-next-line
		[setData]
	);
	const addProduct = useCallback(
		async (product: IProduct) => {
			try {
				toggleLoading(0);
				const response = await postProduct(product, service);
				setData(response);
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(0);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading, service]
	);
	const removeProduct = useCallback(
		async (id?: string) => {
			try {
				toggleLoading(2, id);
				await deleteProduct(id);
				setData((prev) => {
					if ((prev as IProduct[])?.length) {
						const temp = [...(prev as IProduct[])];
						const reviewIndex = temp.findIndex((el) => el._id === id);
						if (reviewIndex !== -1) {
							temp.splice(reviewIndex, 1);
						}
						return temp;
					}
					return [];
				});
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(2);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);
	const getProducts = useCallback(
		async () => {
			try {
				toggleLoading(0);
				const response = await fetchProducts(service);
				if (typeof response !== 'string') {
					setData(response);
				}
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(0);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);
	useEffect(() => {
		!!service && getProducts();
		// eslint-disable-next-line
	}, [service, getProducts]);
	return {
		data,
		loading,
		getProducts,
		addProduct,
		updateProduct,
		removeProduct,
	};
}
export default useProducts;
