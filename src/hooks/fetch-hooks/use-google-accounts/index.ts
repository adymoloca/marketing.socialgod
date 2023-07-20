import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import {
	AddGoogleAccountsParams,
	CreateGoogleAccountData,
	GetGoogleAccountsResponse,
	addGoogleAccounts,
	createGoogleAccounts,
	deleteGoogleAccounts,
	getGoogleAccounts,
} from './index.actions';

export interface GoogleAccountsReturnType {
	message: string;
	loading: boolean;
	createGoogleAccountsAction: (data: CreateGoogleAccountData, onSuccess?: () => void) => void;
	addGoogleAccountsAction: (data: AddGoogleAccountsParams, onSuccess: () => void) => void;
	getGoogleAction: () => void;
	data: GetGoogleAccountsResponse;
	setData: Dispatch<SetStateAction<GetGoogleAccountsResponse>>;
	deleteGoogleAction: (id: string) => void;
	setMessage: Dispatch<SetStateAction<string>>;
}

function useGoogleAccounts(): GoogleAccountsReturnType {
	const [message, setMessage] = useState<string>('');
	const [data, setData] = useState<GetGoogleAccountsResponse>({} as GetGoogleAccountsResponse);
	const [[accountsLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const { success, error } = useNotificationsContext();
	const toggleL = (): void => toggleLoading(0);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const createGoogleAccountsAction = useCallback(
		async (d: CreateGoogleAccountData, onSuccess?: () => void) => {
			try {
				toggleL();
				const response = await createGoogleAccounts(d);
				if (typeof response === 'string') {
					success(response);
					setMessage(response);
					onSuccess && onSuccess();
				}
			} catch (errorMessage) {
				console.log(errorMessage);
				error('Could not create account!');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	const addGoogleAccountsAction = useCallback(
		async (d: AddGoogleAccountsParams, onSuccess: () => void) => {
			try {
				toggleL();
				const response = await addGoogleAccounts(d);
				if (typeof response !== 'string') {
					success(response?.message);
					setMessage(response?.message);
					onSuccess();
				}
			} catch (errorMessage) {
				console.error(errorMessage);
				error('Could not add account!');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	const getGoogleAction = useCallback(
		async () => {
			try {
				toggleLoadGet(true);
				const response = await getGoogleAccounts();
				if (typeof response !== 'string') {
					setData(response);
				}
			} catch (errorMessage) {
				console.log(errorMessage);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoadGet]
	);

	const updateAfterDelete = (accountId: string): void => {
		const interestIndex = data?.accounts?.findIndex((el) => el?._id === accountId);
		const temp = [...(data?.accounts || [])];
		temp?.splice(interestIndex, 1);
		setData({ accounts: temp });
	};

	const deleteGoogleAction = useCallback(
		async (id: string) => {
			try {
				toggleL();
				const response = await deleteGoogleAccounts(id);
				if (typeof response === 'string') {
					updateAfterDelete(id);
					success(response);
				}
			} catch (errorMessage) {
				console.log(errorMessage);
				error('Could not delete account!');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setData, updateAfterDelete]
	);

	return {
		message,
		loading: accountsLoading,
		data: data as GetGoogleAccountsResponse,
		deleteGoogleAction,
		setData,
		setMessage,
		getGoogleAction,
		createGoogleAccountsAction,
		addGoogleAccountsAction,
	};
}

export default useGoogleAccounts;
