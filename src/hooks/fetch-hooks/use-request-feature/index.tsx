import { useCallback, useState, useEffect } from 'react';
import { useNotificationsContext } from 'hooks/use-notifications';
import { useLoaders } from '../../use-loaders/index';
import { fetchFeatureRequest } from './index.actions';

export interface IFeatureRequest {
	title: string;
	description: string;
}

export interface UseFeatureRequestReturnType {
	data: IFeatureRequest[] | null;
	loading: boolean;
	getFeatureRequest: () => void;
	postFeatureRequest: (feature: IFeatureRequest) => void;
}

function useFeatureRequest(): UseFeatureRequestReturnType {
	const [data, setData] = useState<IFeatureRequest[] | null>(null);
	const [[loading], toggleLoading] = useLoaders<[boolean]>(false);
	const { success, error } = useNotificationsContext();
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const postFeatureRequest = useCallback(
		async (featureRequest: IFeatureRequest) => {
			try {
				toggleLoading(1);
				const response = await postFeatureRequest(featureRequest);
				if (typeof response === 'string') {
					success('Contact posted succesfully!');
				}
				setData((prev) => {
					if (prev) {
						const temp = [...prev];
						temp.push(featureRequest);
						return temp;
					}
					return [featureRequest];
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

	const getFeatureRequest = useCallback(async () => {
		try {
			toggleLoadGet(true);
			const response = await fetchFeatureRequest();
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
		getFeatureRequest();
	}, [getFeatureRequest]);

	return {
		data,
		loading,
		getFeatureRequest,
		postFeatureRequest,
	};
}

export default useFeatureRequest;
