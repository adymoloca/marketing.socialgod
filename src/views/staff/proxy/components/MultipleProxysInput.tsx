import { ChangeEvent, FC, useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextareaAutosize,
	Typography,
} from '@mui/material';
import { stateSetter } from 'utils/types/state';
import { Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';
import { ISendData } from '../add-proxy/proxi-form';

interface IFormat {
	format: string;
	example: string;
}

interface IParams {
	index: number;
	data: ISendData;
	setData: stateSetter<ISendData>;
	accoutsNumber: number;
	setAccountsNumber: React.Dispatch<React.SetStateAction<number>>;
}

const displayType = (type: string): JSX.Element => {
	const formats: IFormat[] = [
		{
			format: 'username:password@host:port - Proxy Empire',
			example: '17NakDzpU8Zs9CO7:wifi;us;;nevada;las+vegas@rotating.proxyempire.io:9000',
		},
		{
			format: 'username:password:host:port - Proxy Empire',
			example: '17NakDzpU8Zs9CO7:wifi;us;;nevada;las+vegas:rotating.proxyempire.io:9000',
		},
		{
			format: 'host:port:username:password - Proxy Empire',
			example: 'rotating.proxyempire.io:9000:17NakDzpU8Zs9CO7:wifi;us;;nevada;las+vegas',
		},
		{
			format: 'username:password@hostname:port - Packet Stream',
			example: 'vasilca01:OeXvwPma1cIwfKbn_country-UnitedStates@proxy.packetstream.io:31112',
		},
		{
			format: 'username:password:hostname:port - Packet Stream',
			example: 'vasilca01:OeXvwPma1cIwfKbn_country-UnitedStates:proxy.packetstream.io:31112',
		},
		{
			format: 'hostname:port:username:password - Packet Stream',
			example: 'proxy.packetstream.io:31112:vasilca01:OeXvwPma1cIwfKbn_country-UnitedStates',
		},
	];

	const formatData = formats[Number(type)];

	if (formatData) {
		return (
			<>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Typography fontWeight={600}>Format: </Typography>
					<Typography>{formatData.format}</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Typography fontWeight={600}>EX: </Typography>
					<Typography>{formatData.example}</Typography>
				</Box>
			</>
		);
	}
	return <>None</>;
};

const MultipleProxysInput: FC<IParams> = (props) => {
	const { index, data, setData, accoutsNumber, setAccountsNumber } = props;
	const { t } = useTranslation();
	const [type, setType] = useState('');
	const [platform, setPlatform] = useState<string>('');
	const [newData, setNewData] = useState<string>('');

	const handleBlurFormat = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		e.preventDefault();
		const newValue = e.target.value;
		setNewData(newValue);
		const arr = newValue.split(/[\s]+/);
		const sentData: string[] = [];
		for (let i = 0; i < arr?.length; i++) {
			const proxy = arr[i];
			sentData.push(proxy);
		}
		if (arr?.length === sentData.length) {
			const newDataObject = { platform, type: Number(type), proxies: sentData };
			const updatedProxies = [...data.proxies];
			updatedProxies.splice(index, 1, newDataObject);
			const updatedData = { ...data, proxies: updatedProxies };
			setData(updatedData);
		}
	};
	const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>): void => {
		setNewData(event.target.value);
	};

	const handleChange = (event: SelectChangeEvent): void => {
		setType(event.target.value);
	};

	const handleChangePlatform = (event: SelectChangeEvent): void => {
		setPlatform(event.target.value);
	};

	return (
		<Grid container sx={{ justifyContent: 'start' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					alignItems: 'start',
					width: '100%',
				}}>
				<form noValidate style={{ width: '100%' }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Typography>{capitalize('Select platform')} :</Typography>
							<FormControl sx={{ minWidth: 220 }} size='small'>
								<Select
									labelId='platform-input-label'
									id='platform-input'
									value={platform}
									aria-labelledby='platform-type'
									onChange={handleChangePlatform}>
									<MenuItem value='web'>Web</MenuItem>
									<MenuItem value='mobile'>Mobile</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Typography>{capitalize(t('select_proxy_type'))} :</Typography>
							<FormControl sx={{ minWidth: 220 }} size='small' disabled={platform?.length < 1}>
								<Select
									labelId='proxy-input-label'
									id='proxy-input'
									value={type}
									aria-labelledby='proxy-type'
									onChange={handleChange}>
									<MenuItem value={0}>Type 0</MenuItem>
									<MenuItem value={1}>Type 1</MenuItem>
									<MenuItem value={2}>Type 2</MenuItem>
									{platform === 'web' && [
										<MenuItem key='proxy-tipe-3' value={3}>
											Type 3
										</MenuItem>,
										<MenuItem key='proxy-tipe-4' value={4}>
											Type 4
										</MenuItem>,
										<MenuItem key='proxy-tipe-5' value={5}>
											Type 5
										</MenuItem>,
									]}
								</Select>
							</FormControl>
						</Box>
					</Box>
					<Box
						sx={{
							width: 'calc(100% - 80px)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						{type !== '' && displayType(String(type))}
					</Box>
					<FormControl fullWidth>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}>
							<TextareaAutosize
								id='outlined-input-proxyies'
								aria-label='proxyies-list'
								name='proxyies'
								disabled={type?.length === 0}
								minRows={10}
								value={newData}
								onBlur={handleBlurFormat}
								onChange={(e): void => handleChangeText(e)}
								style={{
									width: 'calc(100% - 80px)',
									margin: 1,
									resize: 'vertical',
									maxHeight: '250px',
									minHeight: '150px',
									fontSize: '16px',
									padding: '8px',
								}}
							/>
							{accoutsNumber > 1 && index === (data?.proxies?.length || 0) - 1 && (
								<Button variant='outlined' onClick={(): void => setAccountsNumber(accoutsNumber - 1)}>
									<Delete />
								</Button>
							)}
						</Box>
						<Typography sx={{ fontSize: '14px', color: '#696969', textAlign: 'start', ml: 1 }}>
							{capitalize(t('add_proxies_input_description'))}
						</Typography>
					</FormControl>
				</form>
			</Box>
		</Grid>
	);
};

export default MultipleProxysInput;
