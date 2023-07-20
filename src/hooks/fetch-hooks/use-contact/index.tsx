import { useCallback, useState, useEffect } from 'react';
import { useNotificationsContext } from 'hooks/use-notifications';
import { useLoaders } from '../../use-loaders/index';
import { fetchContact } from './index.actions';

export interface IContact {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface UseContactReturnType {
	data: IContact[] | null;
	loading: boolean;
	getContacts: () => void;
	postContact: (contact: IContact) => void;
}

function useContact(): UseContactReturnType {
	const [data, setData] = useState<IContact[] | null>(null);
	const [[loading], toggleLoading] = useLoaders<[boolean]>(false);
	const { success, error } = useNotificationsContext();
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const postContact = useCallback(
		async (review: IContact) => {
			try {
				toggleLoading(1);
				const response = await postContact(review);
				if (typeof response === 'string') {
					success('Contact posted succesfully!');
				}
				setData((prev) => {
					if (prev) {
						const temp = [...prev];
						temp.push(review);
						return temp;
					}
					return [review];
				});
			} catch (e) {
				console.error(e);
				error("Couldn't post contact");
			} finally {
				toggleLoading(1);
				// await getReviews();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading, error, success]
	);

	const getContacts = useCallback(async () => {
		try {
			toggleLoadGet(true);
			const response = await fetchContact();
			if (typeof response !== 'string') {
				setData(response);
			}
		} catch (e) {
			console.error(e);
			error('Failed to get the contacts.');
		} finally {
			toggleLoadGet(false);
		}
	}, [setData, toggleLoadGet, error]);

	useEffect(() => {
		getContacts();
	}, [getContacts]);

	return {
		data,
		loading,
		getContacts,
		postContact,
	};
}

export default useContact;
