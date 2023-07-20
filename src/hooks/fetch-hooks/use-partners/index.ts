import { useCallback, useEffect, useState } from 'react';
import { stateSetter } from 'utils/types/state';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import {
	addPartners,
	getPartnersAll,
	getPartnerOne,
	updatePartner,
	IPartner,
	removePartner,
	IPartnersValueProps,
} from './index.actions';

export interface PartnersReturnType<T extends IPartner | IPartner[]> {
	postPartner: (params: IPartnersValueProps) => void;
	update: (params: IPartnersValueProps, partnerId: string) => void;
	getPartners: (requestFor: 'admin' | 'guest') => void;
	getPartner: (partnerId: string) => void;
	deletePartner: (partnerId: string) => void;
	data: T;
	setData: stateSetter<T>;
	loadingPartners: boolean;
	loadingPartner: string;
}

function usePartners<T extends IPartner | IPartner[], V = IPartner[]>(
	setter: stateSetter<V> | undefined = undefined,
	getPartnersOnRender: boolean | undefined = undefined
): PartnersReturnType<T> {
	const [data, setData] = useState<T | null>(null);
	const [[loadingPartners, loadingPartner], toggleLoading] = useLoaders<[boolean, string]>(false, '');
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleLoadPartner = (val: string | undefined = undefined): void => toggleLoading(1, val);
	const { success, error } = useNotificationsContext();

	const getPartners = useCallback(
		async (requestFor: 'admin' | 'guest') => {
			try {
				toggleLoadGet(true);
				const response = await getPartnersAll(requestFor);
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

	const getPartner = useCallback(
		async (partnerId: string) => {
			try {
				toggleLoadPartner(partnerId);
				const response = await getPartnerOne(partnerId);
				if (typeof response !== 'string') {
					setData(response as T);
				}
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadPartner();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const deletePartner = useCallback(
		async (partnerId: string) => {
			try {
				toggleLoadPartner(partnerId);
				const res = await removePartner(partnerId);
				success(res?.message);
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as IPartner[]).filter((partner) => partner._id !== partnerId);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Partner deleted successfully.');
			} catch (message) {
				console.error(message);
				error('Partner deleted failed.');
			} finally {
				toggleLoadPartner();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const postPartner = useCallback(
		async (params: IPartnersValueProps) => {
			try {
				toggleLoadPartner('post-update-partner');
				const res = await addPartners(params);
				success(res?.message);
				setData((prev) => {
					if (prev !== null) {
						const temp = [...(prev as IPartner[])];
						temp?.push(res.partner);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Partner added successfully.');
			} catch (message) {
				console.error(message);
				error('Could not add partner');
			} finally {
				toggleLoadPartner();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const update = useCallback(
		async (params: IPartnersValueProps, partnerId: string) => {
			try {
				toggleLoadPartner('post-update-partner');
				const res = await updatePartner(params, partnerId);
				success(res?.message);
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as IPartner[]).map((partner) =>
							partner._id === partnerId ? { ...partner, ...params } : partner
						);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Partner updated successfully.');
			} catch (message) {
				console.error(message);
				error('Could not update partner');
			} finally {
				toggleLoadPartner();
			}
		},
		// eslint-disable-next-line
		[setData]
	);
	useEffect(() => {
		if (getPartnersOnRender) {
			getPartners('admin');
		}
		// eslint-disable-next-line
	}, [getPartnersOnRender]);

	return {
		data: data || ([] as IPartner[] as T),
		setData: setData as stateSetter<T>,
		postPartner,
		getPartners,
		getPartner,
		update,
		deletePartner,
		loadingPartners,
		loadingPartner,
	};
}

export default usePartners;
