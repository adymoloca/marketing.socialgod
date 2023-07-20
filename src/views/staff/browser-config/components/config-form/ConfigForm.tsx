import React, { FC } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { capitalize } from 'utils/functions';
import { BrowserConfig } from 'hooks/fetch-hooks/use-bots/index.interfaces';
import useConfig from 'hooks/fetch-hooks/use-config';
import ConfigDevice from '../config-select/ConfigDevice';
import { IConfigProps } from '../../add-browser-config';

const ConfigForm: FC<IConfigProps> = (props) => {
	const { config, setConfig } = props;

	const { postBrowser } = useConfig();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string): void => {
		const newValue = e?.target?.value;
		setConfig((prev) => ({ ...prev, [name]: newValue }));
	};

	const handleDisable = !!(
		config?.device?.length === 0 ||
		config?.path?.length === 0 ||
		config?.userAgent?.length === 0 ||
		config?.os?.length === 0
	);

	const handleSubmit = (values: BrowserConfig): void => {
		postBrowser(values);
	};

	return (
		<Box
			sx={{
				width: '50%',
				p: '16px 16px 0 16px',
				display: 'flex',
				alignContent: 'center',
				flexDirection: 'column',
				borderRight: '2px solid #9e9e9e',
				minHeight: '70vh',
				gap: 3,
			}}>
			<FormControl size='small' fullWidth>
				<TextField
					type='text'
					label={capitalize('Path')}
					name='path'
					value={config?.path}
					onChange={(e): void => handleChange(e, 'path')}
				/>
			</FormControl>
			<FormControl size='small' fullWidth>
				<TextField
					type='text'
					label={capitalize('User Agent')}
					name='userAgent'
					value={config?.userAgent}
					onChange={(e): void => handleChange(e, 'userAgent')}
				/>
			</FormControl>

			<ConfigDevice config={config} setConfig={setConfig} />
			<Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
				<Button
					sx={{ width: '300px' }}
					disabled={handleDisable}
					onClick={(): void => handleSubmit(config)}>
					Save configuration
				</Button>
			</Box>
		</Box>
	);
};

export default ConfigForm;
