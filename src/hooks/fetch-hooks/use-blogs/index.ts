import { useCallback, useEffect, useState } from 'react';
import { useLoaders } from '../../use-loaders/index';
import { deleteBlog, fetchBlog, fetchBlogs, patchBlog, postBlog } from './index.actions';

export interface IBlog {
	_id?: string;
	title: string;
	data: string;
	categories: string[];
	image: string;
}

export interface UseBlogsReturnType {
	data: IBlog[] | IBlog | null;
	loading: {
		add: boolean;
		get: boolean;
		id: string;
	};
	getBlogs: () => void;
	getBlog: (id: string) => void;
	addBlog: (faq: IBlog) => void;
	updateBlog: (faq: IBlog, index: string) => void;
	removeBlog: (id: string) => void;
}

function useBlog(): UseBlogsReturnType {
	const [data, setData] = useState<IBlog[] | IBlog | null>(null);
	const [[loadingGet, loadingAdd, loadingId], toggleLoading] = useLoaders<[boolean, boolean, string]>(
		false,
		false,
		''
	);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const getBlogs = useCallback(async () => {
		try {
			toggleLoadGet(true);
			const response = await fetchBlogs();
			if (typeof response !== 'string') {
				setData(response);
			}
		} catch (e) {
			console.error(e);
		} finally {
			toggleLoadGet(false);
		}
	}, [setData, toggleLoadGet]);

	const getBlog = useCallback(
		async (id: string) => {
			try {
				toggleLoading(0);
				const response = await fetchBlog(id);
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

	const addBlog = useCallback(
		async (blog: IBlog) => {
			try {
				toggleLoading(1);
				await postBlog(blog);
				setData((prev) => {
					if (prev && Array.isArray(prev)) {
						const temp = [...prev];
						temp.push(blog);
						return temp;
					}
					return [blog];
				});
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(1);
				await getBlogs();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	const updateBlog = useCallback(
		async (blog: IBlog, index: string) => {
			try {
				toggleLoading(1);
				await patchBlog(blog, index);
				setData((prev) => {
					if (Array.isArray(prev) && !!prev?.length) {
						const temp = [...prev];
						const faqIndex = temp.findIndex((el) => el._id === blog._id);
						temp.splice(faqIndex, 1, blog);
						return temp;
					}
					return [blog];
				});
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoading(1);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	const removeBlog = useCallback(
		async (id: string) => {
			try {
				toggleLoading(2, id);
				await deleteBlog(id);
				setData((prev) => {
					if (Array.isArray(prev) && !!prev?.length) {
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
			} finally {
				toggleLoading(2);
				await getBlogs();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	useEffect(() => {
		getBlogs();
	}, [getBlogs]);

	return {
		data,
		loading: {
			get: loadingGet,
			add: loadingAdd,
			id: loadingId,
		},
		getBlog,
		getBlogs,
		addBlog,
		updateBlog,
		removeBlog,
	};
}

export default useBlog;
