import { useEffect, useCallback, useState } from 'react';
import { useNotificationsContext } from 'hooks/use-notifications';
import { stateSetter } from 'utils/types/state';
import { useLoaders } from 'hooks/use-loaders';
import { addServices, getServiceOne, getServicesAll, removeService, updateService } from './index.actions';

export interface IService {
	_id: string;
	platform: string;
	icon: {
		name: string;
		source: string;
	};
}
export interface IParams {
	services: { platform: string; icon: { name: string; source: string } };
	onFinish: () => void;
}

export interface IParamsUpdate {
	services: { platform: string; icon: { name: string; source: string } };
	serviceId: string;
	onFinish: () => void;
}

export interface ServicesReturnType<T extends IService | IService[]> {
	postServices: (params: IParams) => void;
	update: (params: IParams, serviceId: string) => void;
	deleteService: (serviceId: string) => void;
	getService: (serviceId: string) => void;
	getServices: () => void;
	setData: stateSetter<T>;
	data: T;
	loadingServices: boolean;
	loadingService: string;
}

function useServices<T extends IService | IService[], V = IService[]>(
	setter: stateSetter<V> | undefined = undefined
): ServicesReturnType<T> {
	const [data, setData] = useState<T | null>(null);
	const [[loadingServices, loadingService], toggleLoading] = useLoaders<[boolean, string]>(false, '');
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleLoadService = (val: string | undefined = undefined): void => toggleLoading(1, val);
	const { success, error } = useNotificationsContext();

	const getService = useCallback(
		async (serviceId: string) => {
			try {
				toggleLoadService(serviceId);
				const response = await getServiceOne(serviceId);
				if (typeof response !== 'string') {
					setData(response.service as T);
				}
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadService();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const update = useCallback(
		async (params: IParams, serviceId: string) => {
			try {
				toggleLoadService('post-update-service');
				const res = await updateService(params, serviceId);
				success(res?.message);
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as IService[]).map((service) =>
							service._id === serviceId ? { ...service, ...params.services } : service
						);
						return temp as T;
					}
					return prev;
				});
				success('Service updated successfully.');
			} catch (message) {
				console.log(message);
				error('Could not update service');
			} finally {
				toggleLoadService();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const postServices = useCallback(
		async (params: IParams) => {
			try {
				toggleLoadService('post-update-service');
				const res = await addServices(params);
				setData((prev) => {
					if (prev !== null) {
						const temp = [...(prev as IService[])];
						temp?.push(res.service);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Post service successfully.');
			} catch (message) {
				console.log(message);
				error('Post service failed.');
			} finally {
				toggleLoadService();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const deleteService = useCallback(
		async (serviceId: string) => {
			try {
				toggleLoadService(`delete-${serviceId}`);
				const res = await removeService(serviceId);
				success(res?.message);
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as IService[]).filter((service) => service._id !== serviceId);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Service deleted successfully.');
			} catch (message) {
				console.error(message);
				error('Service deleted failed.');
			} finally {
				toggleLoadService();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const getServices = useCallback(
		async () => {
			try {
				toggleLoadGet(true);
				const response = await getServicesAll();
				if (typeof setter === 'function') setter(response as V);
				else setData(response as T);
			} catch (message) {
				console.log(message);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoadGet]
	);
	useEffect(() => {
		getServices();
		// eslint-disable-next-line
	}, []);
	return {
		data: data || ([] as IService[] as T),
		update,
		getService,
		setData: setData as stateSetter<T>,
		postServices,
		getServices,
		deleteService,
		loadingServices,
		loadingService,
	};
}

export default useServices;
