import { useCallback, useState, useEffect } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import { CurrencyOptions } from 'utils/interfaces/packages';
import { useNotificationsContext } from 'hooks/use-notifications';
import { fetchStocks, patchStocks } from './index.action';

export interface IStock {
	currency: CurrencyOptions;
	rate: number;
	isDisabled?: boolean;
}

export interface StocksReturnType {
	getStocks: () => void;
	updateStocks: (rates: IStock[]) => void;
	data: IStock[];
	loading: boolean;
	toggleIsDisabled: (s: number) => void;
}

function useStocks(): StocksReturnType {
	const [data, setData] = useState<IStock[] | null>(null);
	const [[stocksLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const { success, error } = useNotificationsContext();
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);

	const updateStocks = useCallback(
		async (rates: IStock[]) => {
			try {
				toggleLoading(0);
				const res = await patchStocks({
					rates: rates.map((el) => {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const { isDisabled, ...remain } = el;
						return remain;
					}),
				});
				if (typeof res !== 'string') {
					success(res?.message);
				}
				setData(rates.map((el) => ({ ...el, isDisabled: true })));
			} catch (e) {
				console.error(e);
				error("Couldn't update stocks");
			} finally {
				toggleLoading(0);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoading]
	);

	const getStocks = useCallback(
		async () => {
			try {
				toggleLoadGet(true);
				const response = await fetchStocks();
				if (typeof response !== 'string') {
					setData(response.map((el) => ({ ...el, isDisabled: true })));
				}
			} catch (e) {
				console.error(e);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoadGet]
	);

	const toggleIsDisabled = useCallback(
		(s: number) => {
			setData(
				(prev) => prev?.map((el, i) => (i === s ? { ...el, isDisabled: !el.isDisabled } : { ...el })) || null
			);
		},
		[setData]
	);

	useEffect(() => {
		getStocks();
	}, [getStocks]);

	return {
		data: data || ([] as IStock[]),
		getStocks,
		updateStocks,
		loading: stocksLoading,
		toggleIsDisabled,
	} as const;
}

export default useStocks;
