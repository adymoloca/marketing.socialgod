import { useCallback, useState, useEffect } from 'react';
import { useNotificationsContext } from 'hooks/use-notifications';
import { useLoaders } from '../../use-loaders/index';
import { fetchReports, postReport } from './index.action';

export interface IReport {
	description: string;
}

export interface UseReportReturnType {
	data: IReport[] | null;
	loading: boolean;
	getReports: () => void;
	postReport: (report: IReport) => void;
}

function useReport(): UseReportReturnType {
	const [data, setData] = useState<IReport[] | null>(null);
	const [[loading], toggleLoading] = useLoaders<[boolean]>(false);
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const { success, error } = useNotificationsContext();

	const addReport = useCallback(
		async (report: IReport) => {
			try {
				toggleLoading(1);
				const response = await postReport(report);
				if (typeof response === 'string') {
					success('Report posted succesfully!');
				}
				setData((prev) => {
					if (prev) {
						const temp = [...prev];
						temp.push(report);
						return temp;
					}
					return [report];
				});
			} catch (e) {
				console.error(e);
				error("Couldn't post report");
			} finally {
				toggleLoading(1);
				// await getReviews();
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading, error, success]
	);

	const getReports = useCallback(async () => {
		try {
			toggleLoadGet(true);
			const response = await fetchReports();
			if (typeof response !== 'string') {
				setData(response);
			}
		} catch (e) {
			console.error(e);
			error('Failed to get the reports');
		} finally {
			toggleLoadGet(false);
		}
	}, [setData, toggleLoadGet, error]);

	useEffect(() => {
		getReports();
	}, [getReports]);

	return {
		data,
		loading,
		getReports,
		postReport: addReport,
	};
}

export default useReport;
