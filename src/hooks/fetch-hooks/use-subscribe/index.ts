import { useCallback, useEffect, useState } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import { ISubscribe, getCategoriesAll, subscribe, unsubscribe } from './index.actions';

export interface SubscribeReturnType {
	sendSubscribe: (params: ISubscribe) => void;
	unsubscribeGuest: (id: string, onFinish: () => void) => void;
	loadingSubscribe: boolean;
	loadingCategories: boolean;
	loadingUnsubscribe: string;
	categories: string[];
}

function useSubscribe(): SubscribeReturnType {
	const [[loadingSubscribe, loadingUnsubscribe, loadingCategories], toggleLoading] = useLoaders<
		[boolean, string, boolean]
	>(false, '', false);
	const [categories, setCategories] = useState<string[]>([]);
	const toggleLoadSubscribe = (val: boolean | undefined = undefined): void => toggleLoading(0, val);
	const toggleLoadUnsubscribe = (val: string | undefined = undefined): void => toggleLoading(1, val);
	const { success, error } = useNotificationsContext();

	const sendSubscribe = useCallback(
		async (params: ISubscribe) => {
			try {
				toggleLoadSubscribe(true);
				const res = await subscribe(params);
				if (typeof res !== 'string') {
					success(res?.message);
				}
			} catch (message) {
				console.error(message);
				error('Could not subscribe');
			} finally {
				toggleLoadSubscribe(false);
			}
		},
		// eslint-disable-next-line
		[]
	);

	const unsubscribeGuest = useCallback(
		async (id: string, onFinish: () => void) => {
			try {
				toggleLoadUnsubscribe('unsubscribe');
				const res = await unsubscribe(id);
				if (typeof res !== 'string') {
					success(res?.message);
				}
				onFinish();
			} catch (message) {
				console.error(message);
				error('Could not unsubscribe');
			} finally {
				toggleLoadUnsubscribe('');
			}
		},
		// eslint-disable-next-line
		[]
	);

	const getCategories = useCallback(
		async () => {
			try {
				toggleLoading(2, true);
				const response = await getCategoriesAll();
				if (typeof response !== 'string') {
					setCategories(response);
				}
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoading(2, false);
			}
		},
		// eslint-disable-next-line
		[]
	);
	useEffect(() => {
		getCategories();
		// eslint-disable-next-line
	}, []);
	return { sendSubscribe, loadingSubscribe, loadingCategories, loadingUnsubscribe, categories, unsubscribeGuest };
}

export default useSubscribe;
