import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import useBotsActions from 'hooks/fetch-hooks/use-bots';
import { useLocation } from 'react-router';
import ConfigProxyInput from './ConfigProxyInput';

const ConfigProxyForm: FC = () => {
	const { state } = useLocation();

	const { getBot, dataId: botData } = useBotsActions();

	useEffect(() => {
		getBot(state?.id);
		// eslint-disable-next-line
	}, []);

	const initialData: string[] = useMemo(
		() => (botData?.bot?.assignedProxies?.length > 0 ? botData?.bot?.assignedProxies : ['', '']),
		[botData?.bot?.assignedProxies]
	);

	const [botProxy, setBotProxy] = useState<string[]>([]);

	useEffect(() => {
		setBotProxy(initialData);
	}, [initialData]);

	const handleSubmit = (values: string[]): void => {
		console.log('submit proxy', values);
	};

	const isDisabled = (value: string[]): boolean => {
		for (let i = 0; i < value.length; i++) {
			if (value[i]?.length < 10) {
				return true;
			}
		}
		return false;
	};

	return (
		<Box sx={{ width: '50%', minHeight: '60vh', padding: 3 }}>
			{botProxy?.map((proxy, index) => (
				<Fragment key={proxy}>
					<ConfigProxyInput botProxy={botProxy} setBotProxy={setBotProxy} index={index} />
				</Fragment>
			))}

			<Button
				disabled={isDisabled(botProxy)}
				onClick={(): void => handleSubmit(botProxy)}
				type='submit'
				sx={{ mt: 3, mb: 2, width: '300px' }}>
				Add proxies
			</Button>
		</Box>
	);
};

export default ConfigProxyForm;
