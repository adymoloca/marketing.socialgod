import React, { FC, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { capitalize } from 'utils/functions';
import { desktopDevices } from './data/desktopData';
import { Device, androidDevices } from './data/androidData';
import { iphoneDevices } from './data/iPhoneData';
import { operatingSystems } from './data/operatingSystemsData';
import { IConfigProps } from '../../add-browser-config';

export interface IViewPort {
	width: number;
	height: number;
	deviceScaleFactor: number;
}
export interface IDeviceConfig {
	device: string;
	viewPort: IViewPort;
}

const ConfigDevice: FC<IConfigProps> = (props) => {
	const { config, setConfig } = props;

	const [deviceType, setDeviceType] = useState<string>('');

	const handleChangeDeviceType = (event: SelectChangeEvent): void => {
		setDeviceType(event.target.value);
	};

	const handleDeviceType = (type: string): Device[] => {
		switch (type) {
			case 'desktop':
				return desktopDevices;
			case 'iPhone':
				return iphoneDevices;
			case 'android':
				return androidDevices;
			default:
				return [];
		}
	};

	const handleChangeDevice = (event: SelectChangeEvent, type: string): void => {
		const deviceName = event.target.value;

		const interestIndex = handleDeviceType(type)?.findIndex((el) => el?.deviceName === deviceName);

		const viewPortString = handleDeviceType(type)[interestIndex]?.viewport?.trim();
		const width = viewPortString?.split('x')[0];
		const height = viewPortString?.split('x')[1];

		const viewPort: IViewPort = { width: Number(width), height: Number(height), deviceScaleFactor: 1 };

		setConfig((prev) => ({ ...prev, device: deviceName, viewPort }));
		// setConfig({ deviceName: deviceName, viewPort: viewPort });
	};

	const handleChangeSyetem = (event: SelectChangeEvent): void => {
		const newSystem = event.target.value;
		setConfig((prev) => ({ ...prev, os: newSystem }));
	};

	return (
		<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%' }}>
				<FormControl sx={{ minWidth: '48%' }}>
					<InputLabel id='device-type-input-label'>{capitalize('Select device type')}</InputLabel>
					<Select
						labelId='device-type-input-label'
						label='Select device type'
						id='device-type-input'
						value={deviceType}
						aria-labelledby='device-type'
						onChange={handleChangeDeviceType}>
						<MenuItem value='desktop'>Desktop</MenuItem>
						<MenuItem value='android'>Android</MenuItem>
						<MenuItem value='iPhone'>Iphone</MenuItem>
					</Select>
				</FormControl>
				<FormControl sx={{ minWidth: '48%' }} disabled={deviceType?.length < 1}>
					<InputLabel id='dveice-select-input'>{capitalize('Select device')}</InputLabel>
					<Select
						MenuProps={{ sx: { maxHeight: '400px' } }}
						label='Select device'
						labelId='dveice-select-input'
						id='dveice-select-input'
						value={config?.device}
						aria-labelledby='dveice-select-input'
						onChange={(e): void => handleChangeDevice(e, deviceType)}>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						{handleDeviceType(deviceType)?.map((el) => (
							<MenuItem key={`${el?.deviceName}`} value={el?.deviceName}>
								{el?.deviceName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box
				sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', backgroundColor: '#e9e9e9', p: 1 }}>
				<Typography>{capitalize('View port')} :</Typography>
				<Typography
					sx={{ fontWeight: 600 }}>{`${config?.viewPort?.width} x ${config?.viewPort?.height}`}</Typography>
			</Box>
			<FormControl sx={{ minWidth: '100%' }} disabled={config?.device?.length < 1}>
				<InputLabel id='operating-system-input-label'>
					{capitalize('Select the device operating system')}
				</InputLabel>
				<Select
					MenuProps={{ sx: { maxHeight: '400px' } }}
					label='Select the device operating system'
					labelId='operating-system-input-label'
					id='operating-system-input'
					value={config?.os}
					aria-labelledby='operating-system-type'
					onChange={handleChangeSyetem}>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{operatingSystems?.map((system) => (
						<MenuItem key={`${system}`} value={system}>
							{system}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default ConfigDevice;
