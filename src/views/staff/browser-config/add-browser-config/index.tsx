import React, { FC, useState } from 'react';
import { BrowserConfig, ViewPort } from 'hooks/fetch-hooks/use-bots/index.interfaces';
import { stateSetter } from 'utils/types/state';
import ConfigForm from '../components/config-form/ConfigForm';
import ConfigSelect from '../components/config-select/ConfigSelect';

export interface IConfigProps {
	config: BrowserConfig;
	setConfig: stateSetter<BrowserConfig>;
}

const AddBrowserConfig: FC = () => {
	const emptyViewPort: ViewPort = { width: 0, height: 0, deviceScaleFactor: 1 };
	const emptyConfig: BrowserConfig = {
		args: [],
		path: '',
		userAgent: '',
		device: '',
		os: '',
		viewPort: emptyViewPort,
	};

	const [config, setConfig] = useState<BrowserConfig>(emptyConfig);

	return (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
			<ConfigForm config={config} setConfig={setConfig} />
			<ConfigSelect config={config} setConfig={setConfig} />
		</div>
	);
};

export default AddBrowserConfig;
