import { useCallback, useEffect, useState } from 'react';
import { useNotificationsContext } from 'hooks/use-notifications';
import { useLoaders } from '../../use-loaders/index';
import { deleteFaq, fetchFaqs, patchFaq, postFaq } from './index.actions';

export interface FaqItem {
	_id?: string;
	index: number;
	updatedAt?: string;
	question: string;
	answer: string;
	attachment?: File | string;
}

export interface UseFaqReturnType {
	data: FaqItem[] | null;
	loading: {
		add: boolean;
		get: boolean;
		id: string;
	};
	getFaqs: () => void;
	addFaq: (faq: FaqItem) => void;
	updateFaq: (faq: FaqItem) => void;
	removeFaq: (id: string) => void;
}

function useFaq(): UseFaqReturnType {
	const [data, setData] = useState<FaqItem[] | null>(null);
	const [[loadingGet, loadingAdd, loadingId], toggleLoading] = useLoaders<[boolean, boolean, string]>(
		false,
		false,
		''
	);
	const { success, error } = useNotificationsContext();
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const getFaqs = useCallback(async () => {
		try {
			toggleLoadGet(true);
			const response = await fetchFaqs();
			if (typeof response !== 'string') {
				setData(response);
			}
		} catch (e) {
			console.error(e);
		} finally {
			toggleLoadGet(false);
		}
	}, [setData, toggleLoadGet]);

	const addFaq = useCallback(
		async (faq: FaqItem) => {
			try {
				toggleLoading(1);
				const res = await postFaq(faq);
				if (typeof res !== 'string') {
					success(res?.message);
				}
				setData((prev) => {
					if (prev) {
						const temp = [...prev];
						temp.push(faq);
						return temp;
					}
					return [faq];
				});
			} catch (e) {
				console.error(e);
				error("Couldn't add faq");
			} finally {
				toggleLoading(1);
				await getFaqs();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	const updateFaq = useCallback(
		async (faq: FaqItem) => {
			try {
				toggleLoading(1);
				const res = await patchFaq(faq);
				if (typeof res !== 'string') {
					success(res?.message);
				}
				setData((prev) => {
					if (prev?.length) {
						const temp = [...prev];
						const faqIndex = temp.findIndex((el) => el._id === faq._id);
						temp.splice(faqIndex, 1, faq);
						return temp;
					}
					return [faq];
				});
			} catch (e) {
				console.error(e);
				error("Couldn't update faq");
			} finally {
				toggleLoading(1);
				await getFaqs();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	const removeFaq = useCallback(
		async (id: string) => {
			try {
				toggleLoading(2, id);
				const res = await deleteFaq(id);
				if (typeof res !== 'string') {
					success(res?.message);
				}
				setData((prev) => {
					if (prev?.length) {
						const temp = [...prev];
						const faqIndex = temp.findIndex((el) => el._id === id);
						if (faqIndex !== -1) {
							temp.splice(faqIndex, 1);
						}
						return temp;
					}
					return [];
				});
			} catch (e) {
				console.error(e);
				error("Couldn't remove faq");
			} finally {
				toggleLoading(2);
				await getFaqs();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	useEffect(() => {
		getFaqs();
	}, [getFaqs]);

	return {
		data,
		loading: {
			get: loadingGet,
			add: loadingAdd,
			id: loadingId,
		},
		getFaqs,
		addFaq,
		updateFaq,
		removeFaq,
	};
}

export default useFaq;
