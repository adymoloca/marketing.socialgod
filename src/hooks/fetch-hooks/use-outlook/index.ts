import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import {
	AddOutlookParams,
	GetOutlookResponse,
	addOutlookEmails,
	deleteOutlookAccounts,
	getOutlookAccounts,
} from './index.actions';

export interface OutlookReturnType {
	message: string;
	loading: boolean;
	addOutlookAction: (data: AddOutlookParams, onSuccess: () => void) => void;
	getOutlookAction: () => void;
	data: GetOutlookResponse;
	setData: Dispatch<SetStateAction<GetOutlookResponse>>;
	deleteOutlookAction: (id: string) => void;
	setMessage: Dispatch<SetStateAction<string>>;
}

function useOutlook(): OutlookReturnType {
	const [message, setMessage] = useState<string>('');
	const [data, setData] = useState<GetOutlookResponse>({} as GetOutlookResponse);
	const [[outlookLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleL = (): void => toggleLoading(0);
	const { success, error } = useNotificationsContext();

	const addOutlookAction = useCallback(
		async (d: AddOutlookParams, onSuccess: () => void) => {
			try {
				toggleL();
				const response = await addOutlookEmails(d);
				if (typeof response !== 'string') {
					setMessage(response?.message);
					success(response?.message);
					onSuccess();
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

	const getOutlookAction = useCallback(
		async () => {
			toggleLoadGet(true);
			try {
				const response = await getOutlookAccounts();
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

	const deleteOutlookAction = useCallback(
		async (id: string) => {
			try {
				toggleL();
				const response = await deleteOutlookAccounts(id);
				if (typeof response === 'string') {
					updateAfterDelete(id);
					setMessage(response);
					success(response);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
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
		loading: outlookLoading,
		addOutlookAction,
		data: data as GetOutlookResponse,
		setMessage,
		setData,
		getOutlookAction,
		deleteOutlookAction,
	};
}

export default useOutlook;
