import { ChangeEvent, FC } from 'react';
import { Box, FormControl, IconButton, TextField, Typography } from '@mui/material';
import { stateSetter } from 'utils/types/state';
import { Delete } from '@mui/icons-material';

interface IParams {
	data: string[];
	index: number;
	setData: stateSetter<string[]>;
	accoutsNumber: number;
	setAccountsNumber: React.Dispatch<React.SetStateAction<number>>;
}

const AddProxyInput: FC<IParams> = (props) => {
	const { data, index, setData, accoutsNumber, setAccountsNumber } = props;

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		const newValue = e.target.value;
		const formatedValue = newValue.trim().replace(/\s+/, '');
		const temp = [...data];
		temp.splice(index, 1, formatedValue);
		setData([...temp]);
	};

	const isDuplicate = (arr: string[]): boolean => {
		for (let i = 0; i < arr.length; i++) {
			if (arr.indexOf(arr[i]) !== i) {
				return true;
			}
		}
		return false;
	};

	const regex = /(?=.*@)(?=.*;)(?=.*:).*/;
	const isUsed = isDuplicate(data);
	const isValidString = regex.test(data[index]);
	const disableInput = index === 0 ? false : !!(data[index - 1]?.length < 5 || !regex.test(data[index - 1]));

	return (
		<form noValidate style={{ width: '100%' }}>
			<Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<FormControl sx={{ width: 'calc(100% - 100px)', pr: 1 }}>
					<TextField
						margin='normal'
						type='text'
						label='Proxys*'
						name='proxys'
						disabled={disableInput}
						// onBlur={handleBlur}}
						value={data[index]}
						onChange={(e): void => handleChange(e)}
						inputProps={{ min: '1', max: '50' }}
					/>
				</FormControl>
				{accoutsNumber > 1 && index === (data?.length || 0) - 1 && (
					<IconButton
						onClick={(): void => setAccountsNumber(accoutsNumber - 1)}
						sx={{ mt: '12px', color: 'red' }}>
						<Delete />
					</IconButton>
				)}
			</Box>
			{!isValidString && !disableInput && data[index]?.length > 5 && !isUsed && (
				<Typography sx={{ color: 'red', fontSize: '14px', pl: 1 }}>
					Please ensure that the proxy has the rigth format (username:password;+host@:port) !
				</Typography>
			)}
			{isUsed && data[index]?.length > 5 && index === (data?.length || 0) - 1 && isValidString && (
				<Typography sx={{ color: 'red', fontSize: '14px', pl: 1 }}>Proxy already used !</Typography>
			)}
		</form>
	);
};

export default AddProxyInput;
