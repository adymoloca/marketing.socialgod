import { useCallback, useState } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import { getCredentials } from './index.actions';

export interface ICredentials {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

export interface IResponse {
	credentials: ICredentials;
}

export interface CredentialsReturnType {
	getCredentialsData: () => void;
	data: ICredentials;
	loading: boolean;
}

const InitialData: ICredentials = {
	firstName: '',
	lastName: '',
	username: '',
	password: '',
};

function useCredentials(): CredentialsReturnType {
	const [data, setData] = useState<ICredentials>(InitialData);
	const [[credentialsLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const getCredentialsData = useCallback(
		async () => {
			try {
				toggleLoadGet(true);
				const response = await getCredentials();
				if (typeof response !== 'string') {
					setData(response);
				}
			} catch (message) {
				console.log(message);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[toggleLoadGet]
	);

	return { data: data as ICredentials, getCredentialsData, loading: credentialsLoading };
}

export default useCredentials;
