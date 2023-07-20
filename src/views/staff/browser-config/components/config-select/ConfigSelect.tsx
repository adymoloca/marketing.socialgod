import React, { FC } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Typography } from '@mui/material';
import { uuid } from 'utils/functions';
import { argsData } from './data/argsData';
import { IConfigProps } from '../../add-browser-config';

const ConfigSelect: FC<IConfigProps> = (props) => {
	const { config, setConfig } = props;

	const handleArgs = (checked: boolean, newArg: string): void => {
		const temp = [...(config?.args || [])];
		if (checked) {
			temp.push(newArg);
			setConfig((prev) => ({ ...prev, args: temp }));
		} else {
			const interestIndex = config?.args.findIndex((el) => el === newArg);
			temp.splice(interestIndex, 1);
			setConfig((prev) => ({ ...prev, args: temp }));
		}
	};

	return (
		<Box sx={{ width: '50%', p: '16px 16px 0 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Typography sx={{ fontSize: '24px' }}>Arguments</Typography>
			<Box sx={{ width: '100%', display: 'flex' }}>
				<FormGroup sx={{ gap: 2 }}>
					{argsData?.map((arg) => (
						<FormControlLabel
							key={`selected-args-${uuid}`}
							onChange={(e, checked): void => handleArgs(checked, arg)}
							control={<Checkbox />}
							label={arg}
						/>
					))}
				</FormGroup>
			</Box>
		</Box>
	);
};

export default ConfigSelect;
