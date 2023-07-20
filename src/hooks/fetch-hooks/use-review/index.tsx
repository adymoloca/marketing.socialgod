import { useCallback, useState, useEffect } from 'react';
import { useNotificationsContext } from 'hooks/use-notifications';
import { useLoaders } from '../../use-loaders/index';
import { deleteReview, fetchReviews, patchReview, postReview } from './index.action';

export interface IReview {
	reviewer: string;
	position: string;
	content: string;
	rating: number;
	_id?: string;
	showOnLandingPage?: boolean;
	hidden?: boolean;
	postedBy?: string;
	createdAt?: string;
	updatedAt?: string;
	avatar?: string;
}

export interface IReviewValueProps {
	reviewer: string;
	rating: string;
	content: string;
}

export interface UseReviewReturnType {
	data: IReview[] | null;
	loading: boolean;
	getReviews: () => void;
	updateReview: (review: IReview) => void;
	addReview: (review: IReview) => void;
	removeReview: (id: string) => void;
}

function useReview(requestType: 'admin' | 'guest'): UseReviewReturnType {
	const [data, setData] = useState<IReview[] | null>(null);
	const [[loading], toggleLoading] = useLoaders<[boolean]>(false);
	const { success, error } = useNotificationsContext();
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const updateReview = useCallback(
		async (review: IReview) => {
			try {
				toggleLoading(0);
				const response = await patchReview(review);
				setData((prev) => {
					if (typeof response === 'string') {
						success('Review updated succesfully!');
					}
					if (prev) {
						const temp = [...prev];
						const indexOf = temp.findIndex((el) => el._id === review._id);
						temp.splice(indexOf, 1, review);
						return temp;
					}
					return prev;
				});
			} catch (e) {
				console.error(e);
				error('Failed to updated the review');
			} finally {
				toggleLoading(0);
				// await getReviews();
			}
			// eslint-disable-next-line
		},
		[setData, error, success, toggleLoading]
	);

	const addReview = useCallback(
		async (review: IReview) => {
			try {
				toggleLoading(1);
				const response = await postReview(review);
				if (typeof response === 'string') {
					success('Review added succesfully!');
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
				error("Couldn't add review");
			} finally {
				toggleLoading(1);
				// await getReviews();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading, error, success]
	);

	const getReviews = useCallback(async () => {
		try {
			toggleLoadGet(true);
			const response = await fetchReviews(requestType);
			if (typeof response !== 'string') {
				setData(response);
			}
		} catch (e) {
			console.error(e);
			error('Failed to get the reviews.');
		} finally {
			toggleLoadGet(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setData, toggleLoadGet, error]);

	const removeReview = useCallback(
		async (id: string) => {
			try {
				toggleLoading(2, id);
				const response = await deleteReview(id);
				if (typeof response !== 'string') {
					setData(response);
					success('Review removed succesfully!');
				}
				setData((prev) => {
					if (prev?.length) {
						const temp = [...prev];
						const reviewIndex = temp.findIndex((el) => el._id === id);
						if (reviewIndex !== -1) {
							temp.splice(reviewIndex, 1);
						}
						return temp;
					}
					return [];
				});
			} catch (e) {
				console.error(e);
				error('Failed to remove review.');
			} finally {
				toggleLoading(2);
				await getReviews();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading, error, success]
	);

	useEffect(() => {
		getReviews();
	}, [getReviews]);

	return {
		data,
		loading,
		getReviews,
		updateReview,
		addReview,
		removeReview,
	};
}

export default useReview;
