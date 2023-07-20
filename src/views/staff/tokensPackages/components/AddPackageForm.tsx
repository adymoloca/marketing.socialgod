import React, { FC, useCallback, useEffect, useState } from 'react';
import {
	Button,
	CircularProgress,
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
import usePackages from 'hooks/fetch-hooks/use-packages';
import PriceInput, { currencyOptions } from './PriceInput';

const AddPackageForm: FC = () => {
	const initialValues: IPackage = {
		name: '',
		description: '',
		tokens: 1,
		initialPrice: {
			currency: 'ron',
			value: 1,
		},
		discount: {
			type: 0,
			value: 1,
			currency: 'ron',
		},
	};

	const [packageData, setPackageData] = useState<IPackage>(initialValues);

	const { postPackage, loading, message, setMessage } = usePackages();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: string): void => {
		const newValue = inputName === 'quantity' ? Number(e.target.value) : e.target.value;
		setPackageData((prev) => ({ ...prev, [inputName]: newValue }));
	};

	const handleChangeDiscount = (
		e: SelectChangeEvent<number | string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		inputName: string
	): void => {
		const newValue = inputName === 'value' ? Number(e.target.value) : e.target.value;
		setPackageData((prev) => ({ ...prev, discount: { ...prev?.discount, [inputName]: newValue } }));
	};

	const handleSubmit = (values: IPackage): void => {
		postPackage(values);
	};

	const isDisabled = packageData?.name?.length === 0 || packageData?.description?.length === 0 || loading;

	const handleSucess = useCallback(
		(values: IPackage): void => {
			setPackageData(values);
			// setPricesNumber(1)
			setMessage('');
		},
		[setPackageData, setMessage]
	);

	useEffect(() => {
		message?.length > 0 && handleSucess(initialValues);
		// eslint-disable-next-line
	}, [message, handleSucess]);

	return (
		<Grid container sx={{ maxWidth: '1000px', rowGap: 2 }}>
			<Grid item xs={12} md={6} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='outlined-adornment-name'>{capitalize('name')}</InputLabel>
					<OutlinedInput
						id='outlined-adornment-name'
						type='text'
						value={packageData.name}
						name='adminName'
						label='adminName'
						inputProps={{ maxLength: 16 }}
						onChange={(e): void => handleChange(e, 'name')}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={6} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='outlined-adornment-tokens'>{capitalize('tokens')}</InputLabel>
					<OutlinedInput
						id='outlined-adornment-tokens'
						type='number'
						value={packageData.tokens}
						name='tokens'
						label='tokens'
						onChange={(e): void => handleChange(e, 'tokens')}
						inputProps={{ min: 1 }}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={12} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='outlined-adornment-description'>{capitalize('description')}</InputLabel>
					<OutlinedInput
						id='outlined-adornment-description'
						type='text'
						value={packageData.description}
						name='description'
						label='description'
						onChange={(e): void => handleChange(e, 'description')}
					/>
				</FormControl>
			</Grid>

			<PriceInput packageData={packageData} setPackageData={setPackageData} />

			<Grid item xs={12} md={4} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='outlined-adornment-discountType'>{capitalize('discount type')}</InputLabel>
					<Select
						labelId='outlined-adornment-currency'
						id='outlined-adornment-discountType'
						type='text'
						value={packageData.discount.type}
						name='discountType'
						label='discount-type'
						onChange={(e): void => handleChangeDiscount(e, 'type')}>
						<MenuItem value={0}>{capitalize('none')}</MenuItem>
						<MenuItem value={1}>{capitalize('procentage')}</MenuItem>
						<MenuItem value={2}>{capitalize('numeric')}</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='outlined-adornment-discountValue'>{capitalize('discount value')}</InputLabel>
					<OutlinedInput
						disabled={packageData?.discount?.type === 0}
						id='outlined-adornment-discountValue'
						type='number'
						value={packageData.discount.value}
						name='discountValue'
						label='discount-value'
						inputProps={{ min: 0 }}
						onChange={(e): void => handleChangeDiscount(e, 'value')}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4} sx={{ px: 1 }}>
				<FormControl fullWidth>
					<InputLabel htmlFor='outlined-adornment-discountCurrency'>
						{capitalize('discount currency')}
					</InputLabel>
					<Select
						disabled={packageData?.discount?.type === 0}
						labelId='outlined-adornment-currency'
						id='outlined-adornment-discountCurrency'
						type='text'
						value={packageData.discount.currency}
						name='discountCurrency'
						label='discount-currency'
						onChange={(e): void => handleChangeDiscount(e, 'currency')}>
						{currencyOptions?.map((currency) => (
							<MenuItem key={`price-currency-${currency}`} value={currency}>
								{capitalize(currency)}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} sx={{ p: 1 }}>
				<Button
					sx={{ width: '300px' }}
					disabled={isDisabled}
					onClick={(): void => handleSubmit(packageData)}>
					{loading ? <CircularProgress size='24px' /> : 'Submit'}
				</Button>
			</Grid>
		</Grid>
	);
};

export default AddPackageForm;
