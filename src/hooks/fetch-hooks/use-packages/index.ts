import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { IResponsePackage } from 'utils/interfaces/packages';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import { ISentPackage, createTokenPackage, getTokenPackage, getTokenPackageById } from './index.actions';

export interface PackagesReturnType {
	message: string;
	postPackage: (params: ISentPackage) => void;
	loading: boolean;
	setMessage: Dispatch<SetStateAction<string>>;
	data: IResponsePackage[];
	dataId: IResponsePackage;
	setData: Dispatch<SetStateAction<IResponsePackage[]>>;
	setDataId: Dispatch<SetStateAction<IResponsePackage>>;
	getPackage: (params: 'admin' | 'client') => void;
	getPackageById: (params: 'admin' | 'client', packageId: string) => void;
}

function usePackages(): PackagesReturnType {
	const [message, setMessage] = useState<string>('');
	const [[packagesLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const [data, setData] = useState<IResponsePackage[]>([]);
	const [dataId, setDataId] = useState<IResponsePackage>({} as IResponsePackage);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleL = (): void => toggleLoading(0);
	const { success, error } = useNotificationsContext();

	const postPackage = useCallback(
		async (params: ISentPackage) => {
			try {
				toggleL();
				const response = await createTokenPackage(params);
				if (typeof response !== 'string') {
					setMessage(response?.message);
					success(response?.message);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
				error("Couldn't create the package!");
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	const getPackage = useCallback(
		async (params: 'admin' | 'client') => {
			try {
				toggleLoadGet(true);
				const response = await getTokenPackage(params);
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
		[setMessage, toggleLoadGet]
	);

	const getPackageById = useCallback(
		async (params: 'admin' | 'client', packageId: string) => {
			try {
				toggleL();
				const response = await getTokenPackageById(params, packageId);
				if (typeof response !== 'string') {
					setDataId(response);
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
		data: data as IResponsePackage[],
		dataId: dataId as IResponsePackage,
		setData,
		getPackageById,
		setDataId,
		getPackage,
		postPackage,
		setMessage,
		loading: packagesLoading,
	};
}

export default usePackages;
