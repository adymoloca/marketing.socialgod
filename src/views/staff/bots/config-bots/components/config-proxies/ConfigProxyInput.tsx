import React, { FC, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, TextField, Typography } from '@mui/material';
import { stateSetter } from 'utils/types/state';
import { ExpandMore } from '@mui/icons-material';
import useProxies from 'hooks/fetch-hooks/use-proxy';
import { capitalize } from 'utils/functions';

interface IProps {
	botProxy: string[];
	setBotProxy: stateSetter<string[]>;
	index: number;
}

const ConfigProxyInput: FC<IProps> = (props) => {
	const { botProxy, setBotProxy, index } = props;

	const [asignedProxy, setAsignedProxy] = useState<string>(botProxy[index]);

	const handleBlur = (newProxy: string): void => {
		const temp = [...botProxy];
		temp.splice(index, 1, newProxy);
		setBotProxy(temp);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const newValue = e?.target?.value;
		setAsignedProxy(newValue);
	};

	const { proxyData, getProxyId } = useProxies();

	useEffect(() => {
		botProxy[index]?.length > 0 && getProxyId(botProxy[index]);
		// eslint-disable-next-line
	}, []);

	console.log('data proxy ....', proxyData);

	return (
		<Box sx={{ width: '100%' }}>
			<FormControl fullWidth>
				<TextField
					margin='normal'
					label='Add proxy'
					name='addProxy'
					value={asignedProxy}
					onBlur={(): void => handleBlur(asignedProxy)}
					onChange={(e): void => handleChange(e)}
					inputProps={{ min: '1', max: '50' }}
				/>
			</FormControl>
			{proxyData && (
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
						<Typography>Proxy details</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									p: '3px 10px',
									justifyContent: 'space-between',
									backgroundColor: '#e9e9e9',
								}}>
								<Typography>Available</Typography>
								<Typography>{proxyData?.available ? 'Yes' : 'No'}</Typography>
							</Box>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									p: '3px 10px',
									justifyContent: 'space-between',
								}}>
								<Typography>Platform</Typography>
								<Typography>{capitalize(proxyData?.platform)}</Typography>
							</Box>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									p: '3px 10px',
									justifyContent: 'space-between',
									backgroundColor: '#e9e9e9',
								}}>
								<Typography>Location</Typography>
								<Typography>{`${proxyData?.country?.toUpperCase()}`}</Typography>
							</Box>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									p: '3px 10px',
									justifyContent: 'space-between',
								}}>
								<Typography>Host</Typography>
								<Typography>{proxyData?.host}</Typography>
							</Box>
						</Box>
					</AccordionDetails>
				</Accordion>
			)}
		</Box>
	);
};

export default ConfigProxyInput;
