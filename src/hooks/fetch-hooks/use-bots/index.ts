import { useCallback, useState } from 'react';
import { useLoaders } from 'hooks/use-loaders';
import useLocalStorage from '../../use-local-storage';
import { getBots, getBotsById } from './index.actions';
import { AllBotsResponse, BotResponse } from './index.interfaces';

export interface ProxiesReturnType {
	message: string;
	getAllBots: () => void;
	getBot: (params: string) => void;
	dataAll: AllBotsResponse;
	dataId: BotResponse;
	loading: boolean;
}

function useBotsActions(): ProxiesReturnType {
	const [[botLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const [message, setMessage] = useLocalStorage<string>('');
	const [dataAll, setDataAll] = useState<AllBotsResponse>();
	const [dataId, setDataId] = useState<BotResponse>();
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleL = (): void => toggleLoading(0);

	const getAllBots = useCallback(async () => {
		toggleLoadGet(true);
		try {
			const response = await getBots();
			if (typeof response !== 'string' && response?.bots) {
				console.log('all response', response);
				setDataAll(response);
			}
		} catch (errorMessage) {
			console.error(errorMessage);
		} finally {
			toggleLoadGet(false);
		}
	}, [toggleLoadGet]);

	const getBot = useCallback(
		async (params: string) => {
			try {
				toggleL();
				const response = await getBotsById(params);
				if (typeof response !== 'string' && response?.bot) {
					console.log('response', response);
					setDataId(response);
				}
			} catch (errorMessage) {
				console.log(errorMessage);
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	return {
		message: message as string,
		dataAll: dataAll as AllBotsResponse,
		dataId: dataId as BotResponse,
		getAllBots,
		getBot,
		loading: botLoading,
	};
}

export default useBotsActions;
