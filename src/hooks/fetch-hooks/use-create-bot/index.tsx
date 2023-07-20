import { useCallback, useState } from 'react';
import { BotObject } from 'views/staff/bots/create-bot/ParentCreateBot';
import { stateSetter } from 'utils/types/state';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import { addBot } from './index.actions';

export interface ProxiesReturnType {
	message: string;
	setMessage: stateSetter<string | null>;
	postBots: (params: SentBots) => void;
	loading: boolean;
}

export interface SentBots {
	bots: BotObject[];
}

function useCreateBot(): ProxiesReturnType {
	const [message, setMessage] = useState<string | null>('');
	const [[loading], toggleLoading] = useLoaders<[boolean]>(false);
	const { success, error } = useNotificationsContext();

	const toggleL = (): void => toggleLoading(0);

	const postBots = useCallback(
		async (params: SentBots) => {
			try {
				toggleL();
				const response = await addBot(params);
				if (typeof response !== 'string') {
					setMessage(response?.message);
					success(response?.message);
				}
			} catch (errorMessage) {
				console.error('PRESET ERROR:...', errorMessage);
				error('Could not add bot!');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	return { message: message as string, setMessage, postBots, loading };
}

export default useCreateBot;
