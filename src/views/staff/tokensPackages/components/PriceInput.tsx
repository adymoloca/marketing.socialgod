import React, { FC } from 'react';
import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	capitalize,
} from '@mui/material';
import { IPackage } from 'utils/interfaces/packages';
import { stateSetter } from 'utils/types/state';

interface IProps {
	packageData: IPackage;
	setPackageData: stateSetter<IPackage>;
}

export const currencyOptions = ['ron', 'eur', 'usd', 'btc', 'eth'];

const PriceInput: FC<IProps> = (props) => {
	const { packageData, setPackageData } = props;

	const handleChangePrice = (
		e: SelectChangeEvent | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		inputName: string
	): void => {
		const newValue = inputName === 'value' ? Number(e.target.value) : e.target.value;
		const temp = { ...packageData?.initialPrice, [inputName]: newValue };
		setPackageData((prev) => ({ ...prev, initialPrice: temp }));
	};

	return (
		<>
			<Grid item xs={12} md={6} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='outlined-adornment-price'>{capitalize('price')}</InputLabel>
					<OutlinedInput
						id='outlined-adornment-price'
						type='number'
						value={packageData.initialPrice.value}
						name='price'
						label='price'
						inputProps={{ min: 1 }}
						onChange={(e): void => handleChangePrice(e, 'value')}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={6} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='input-adornment-currency'>{capitalize('currency')}</InputLabel>
					<Select
						labelId='input-adornment-currency'
						id='input-adornment-currency'
						label={capitalize('currency')}
						name='currency'
						value={packageData.initialPrice.currency}
						onChange={(e): void => handleChangePrice(e, 'currency')}>
						{currencyOptions?.map((currency) => (
							<MenuItem key={`price-currency-${currency}`} value={currency}>
								{capitalize(currency)}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</>
	);
};

export default PriceInput;
