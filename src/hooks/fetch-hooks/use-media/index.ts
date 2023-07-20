import { useCallback, useEffect, useState } from 'react';
import { useLoaders } from '../../use-loaders/index';
import { fetchMedia, fetchMedias, postMedia } from './index.actions';

export interface MediaItem {
	url: string;
}

export interface UseMediaReturnType {
	data: MediaItem[] | MediaItem | null;
	loading: {
		add: boolean;
		get: boolean;
		id: string;
	};
	getMedias: () => void;
	getMedia: (_id: string) => void;
	addMedia: (media: File) => void;
}

function useMedia(): UseMediaReturnType {
	const [data, setData] = useState<MediaItem[] | MediaItem | null>(null);
	const [[loadingGet, loadingAdd, loadingId], toggleLoading] = useLoaders<[boolean, boolean, string]>(
		false,
		false,
		''
	);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const getMedias = useCallback(async () => {
		try {
			toggleLoadGet(true);
			const response = await fetchMedias();
			if (typeof response !== 'string') {
				setData(response);
			}
		} catch (e) {
			console.error(e);
		} finally {
			toggleLoadGet(false);
		}
	}, [setData, toggleLoadGet]);

	const getMedia = useCallback(
		async (_id: string) => {
			try {
				toggleLoading(0);
				const response = await fetchMedia(_id);
				if (typeof response !== 'string') {
					setData(response);
				}
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(0);
			}
		},
		[setData, toggleLoading]
	);

	const addMedia = useCallback(
		async (media: File) => {
			try {
				toggleLoading(1);
				await postMedia(media);
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(1);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	useEffect(() => {
		getMedias();
	}, [getMedias]);

	return {
		data,
		loading: {
			get: loadingGet,
			add: loadingAdd,
			id: loadingId,
		},
		getMedias,
		getMedia,
		addMedia,
	};
}

export default useMedia;
