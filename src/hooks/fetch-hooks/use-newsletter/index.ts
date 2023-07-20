import { useCallback, useState } from 'react';
import { stateSetter } from 'utils/types/state';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import {
	INewsletter,
	IParams,
	getNewsletterOne,
	getNewslettersAll,
	postNewsletter,
	removeNewsletter,
	sendNewsletter,
	updateNewsletter,
} from './index.actions';

export interface ServicesReturnType<T extends INewsletter | INewsletter[]> {
	addNewsletter: (params: IParams) => void;
	update: (params: IParams, newsletterId: string) => void;
	getNewsletters: (params: 'admin' | 'client') => void;
	getNewsletter: (newsletterId: string) => void;
	send: (newsletterId: string) => void;
	deleteNewsletter: (newsletterId: string) => void;
	setData: stateSetter<T>;
	data: T;
	loadingNewsletters: boolean;
	loadingNewsletter: string;
}

function useNewsletter<T extends INewsletter | INewsletter[], V = INewsletter[]>(
	setter: stateSetter<V> | undefined = undefined
): ServicesReturnType<T> {
	const [data, setData] = useState<T | null>(null);
	const [[loadingNewsletters, loadingNewsletter], toggleLoading] = useLoaders<[boolean, string]>(false, '');
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleLoadNewsletter = (val: string | undefined = undefined): void => toggleLoading(1, val);
	const { success, error } = useNotificationsContext();

	const getNewsletters = useCallback(
		async (params: 'admin' | 'client') => {
			try {
				toggleLoadGet(true);
				const response = await getNewslettersAll(params);
				if (typeof response !== 'string') {
					if (typeof setter === 'function') setter(response as V);
					else setData(response as T);
				}
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoadGet]
	);

	const getNewsletter = useCallback(
		async (newsletterId: string) => {
			try {
				toggleLoadNewsletter(newsletterId);
				const response = await getNewsletterOne(newsletterId);
				if (typeof response !== 'string') {
					setData(response as T);
				}
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadNewsletter('');
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const addNewsletter = useCallback(
		async (params: IParams) => {
			try {
				toggleLoadNewsletter('post-update-newsletter');
				const response = await postNewsletter(params);
				if (typeof response !== 'string') {
					success(response?.message);
				}
				setData((prev) => {
					if (prev !== null) {
						const temp = [...(prev as INewsletter[])];
						temp?.push(response.newsletter);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Newsletter added successfully.');
			} catch (message) {
				console.error(message);
				error("Couldn't add news letter");
			} finally {
				toggleLoadNewsletter();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const deleteNewsletter = useCallback(
		async (newsletterId: string) => {
			try {
				toggleLoadNewsletter(`delete-${newsletterId}`);
				const res = await removeNewsletter(newsletterId);
				if (typeof res !== 'string') {
					success(res?.message);
				}
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as INewsletter[]).filter((newsletter) => newsletter._id !== newsletterId);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Newsletter deleted successfully.');
			} catch (message) {
				console.error(message);
				error("Couldn't delete news letter");
			} finally {
				toggleLoadNewsletter();
			}
		},
		// eslint-disable-next-line
		[setData]
	);
	const send = useCallback(
		async (newsletterId: string) => {
			try {
				toggleLoadNewsletter(`send-${newsletterId}`);
				const response = await sendNewsletter(newsletterId);
				if (typeof response !== 'string') {
					success(response?.message);
				}
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as INewsletter[]).map((partner) =>
							partner._id === newsletterId ? { ...partner, ...response?.newsletter } : partner
						);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Sent newsletter successfully');
			} catch (message) {
				console.error(message);
				error("Couldn't send news letter");
			} finally {
				toggleLoadNewsletter();
			}
		},
		// eslint-disable-next-line
		[setData]
	);
	const update = useCallback(
		async (params: IParams, partnerId: string) => {
			try {
				toggleLoadNewsletter('post-update-newsletter');
				const res = await updateNewsletter(params, partnerId);
				if (typeof res !== 'string') {
					success(res?.message);
				}
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as INewsletter[]).map((partner) =>
							partner._id === partnerId ? { ...partner, ...params } : partner
						);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Newsletter updated successfully.');
			} catch (message) {
				console.error(message);
				error("Couldn't update news letter");
			} finally {
				toggleLoadNewsletter();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	return {
		setData: setData as stateSetter<T>,
		addNewsletter,
		deleteNewsletter,
		getNewsletter,
		send,
		update,
		data: data || ([] as INewsletter[] as T),
		getNewsletters,
		loadingNewsletters,
		loadingNewsletter,
	};
}

export default useNewsletter;
