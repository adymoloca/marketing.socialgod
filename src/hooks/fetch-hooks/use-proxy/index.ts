import { useCallback, useState } from 'react';
import { ISendData } from 'views/staff/proxy/add-proxy/proxi-form';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import { addProxies, getProxy, getProxyById } from './index.actions';

export interface IProxy {
	available: boolean;
	platform: string;
	_id: string;
	proxy: string;
	username: string;
	password: string;
	host: string;
	port: string;
	country?: string;
	state?: string;
	city: string;
	phonePrefix?: string;
}

export interface ProxiesReturnType {
	message: string;
	setMessage: (newValue: string) => void;
	postProxies: (params: ISendData) => void;
	getProxies: () => void;
	data: IProxy[];
	getProxyId: (id: string) => void;
	proxyData: IProxy;
	loading: boolean;
}

function useProxies(): ProxiesReturnType {
	const [message, setMessage] = useState<string>('');
	const [data, setData] = useState<IProxy[]>([]);
	const [proxyData, setProxyData] = useState<IProxy>();
	const [[proxyLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleL = (): void => toggleLoading(0);
	const { success, error } = useNotificationsContext();

	const postProxies = useCallback(
		async (params: ISendData) => {
			try {
				toggleL();
				const response = await addProxies(params);
				if (typeof response === 'string') {
					setMessage(response);
					success(response);
				}
			} catch (err) {
				console.log('error: ...', err);
				error('Could not add proxy');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	const getProxies = useCallback(
		async () => {
			toggleLoadGet(true);
			try {
				const response = await getProxy();
				if (typeof response !== 'string') {
					setData(response);
				}
			} catch (errorMessage) {
				console.log(message);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[toggleLoadGet]
	);

	const getProxyId = useCallback(
		async (id: string) => {
			try {
				toggleL();
				const response = await getProxyById(id);
				if (typeof response !== 'string') {
					setProxyData(response);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);
	return {
		message: message as string,
		data: data as IProxy[],
		proxyData: proxyData as IProxy,
		getProxyId,
		postProxies,
		getProxies,
		loading: proxyLoading,
		setMessage,
	};
}

export default useProxies;
