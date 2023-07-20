import { useCallback, useState } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import useLocalStorage from '../../use-local-storage';
import { BrowserConfig, IResponseGetBrowserConfig } from '../use-bots/index.interfaces';
import { getBrowserConfigsFunction, postBrowserConfig, postProxyConfig } from './index.actions';

export interface ProxiesReturnType {
	message: string;
	postBrowser: (params: BrowserConfig) => void;
	postProxy: (id: string, params: string[]) => void;
	loading: boolean;
	getBrowserConfigs: () => void;
	data: IResponseGetBrowserConfig;
}

function useConfig(): ProxiesReturnType {
	const [message, setMessage] = useLocalStorage<string>('');
	const [[configLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const [data, setData] = useState<IResponseGetBrowserConfig>();
	const { success, error } = useNotificationsContext();
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleL = (): void => toggleLoading(0);

	const postBrowser = useCallback(
		async (params: BrowserConfig) => {
			try {
				toggleL();
				const response = await postBrowserConfig(params);
				if (typeof response === 'string') {
					success(response);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
				error('Could not create browser config');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	const postProxy = useCallback(
		async (id: string, params: string[]) => {
			try {
				toggleL();
				const response = await postProxyConfig(id, params);
				if (typeof response === 'string') {
					success(response);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
				error('Could not create proxis config');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	const getBrowserConfigs = useCallback(
		async () => {
			try {
				toggleLoadGet(true);
				const response = await getBrowserConfigsFunction();
				if (typeof response !== 'string') {
					setData(response);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[toggleLoadGet]
	);

	return {
		message: message as string,
		postProxy,
		postBrowser,
		getBrowserConfigs,
		data: data as IResponseGetBrowserConfig,
		loading: configLoading,
	};
}

export default useConfig;
