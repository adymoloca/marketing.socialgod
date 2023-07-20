import React, { FC, useEffect } from 'react';
import useProxy from 'hooks/fetch-hooks/use-proxy';
import { BotResponse } from 'hooks/fetch-hooks/use-bots/index.interfaces';
import ConfigProxyForm from './ConfigProxyForm';
import ConfigProxyEx from './ConfigProxyEx';

export interface ConfigProxiesProps {
	bot?: BotResponse;
}

const ConfigProxies: FC = () => {
	const { loading, getProxies, data } = useProxy();

	useEffect(() => {
		getProxies();
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
			<ConfigProxyForm />
			<ConfigProxyEx proxyData={data} loading={loading} />
		</div>
	);
};

export default ConfigProxies;
