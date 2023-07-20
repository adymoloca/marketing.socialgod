import React, { FC, useEffect, useState } from 'react';
import {
	Box,
	BoxProps,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
	capitalize,
	styled,
} from '@mui/material';
import { stateSetter } from 'utils/types/state';
import { Flex } from 'components/common';
import { CurrencyOptions, IPackageDiscount, IPackagePrice, IResponsePackage } from 'utils/interfaces/packages';

const Wrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '500px',
	borderRadius: 15,
	width: '100%',
	border: `1px solid ${theme.palette.divider}`,
	padding: '15px',
}));
interface IProps {
	currency: CurrencyOptions;
	setCurrency: stateSetter<CurrencyOptions>;
	loading: boolean;
	dataId: IResponsePackage;
}

const PackagePresentation: FC<IProps> = (props) => {
	const { dataId, loading, currency, setCurrency } = props;

	const [currencyOptions, setCurrencyOption] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<IPackagePrice>({} as IPackagePrice);
	const [selectedDiscount, setSelectedDiscount] = useState<IPackageDiscount>({} as IPackageDiscount);

	const handlePrice = (dataIdParsed: IResponsePackage, currencyParsed: CurrencyOptions): void => {
		const interestIndex = dataIdParsed?.finalPrices?.findIndex((el) => el?.currency === currencyParsed);
		const data = dataIdParsed?.finalPrices[interestIndex] as IPackagePrice;
		const discountData =
			dataIdParsed?.discounts?.length > 0
				? (dataIdParsed?.discounts[interestIndex] as IPackageDiscount)
				: (dataIdParsed?.discount as IPackageDiscount);
		setSelectedPrice(data);
		setSelectedDiscount(discountData);
	};

	const handleCurrency = (dataIdParsed: IResponsePackage, currencyParsed: CurrencyOptions): void => {
		handlePrice(dataIdParsed, currencyParsed);
		const temp: string[] = [];
		dataIdParsed?.finalPrices?.length > 0 && dataIdParsed?.finalPrices?.map((el) => temp?.push(el?.currency));
		dataIdParsed?.finalPrices?.length === temp?.length && setCurrencyOption(temp);
	};

	const handleChangePrice = (e: SelectChangeEvent<string>): void => {
		const newValue = e.target.value as CurrencyOptions;
		setCurrency(newValue);
	};

	useEffect(() => {
		!loading && dataId?._id && handleCurrency(dataId, currency);
		// eslint-disable-next-line
	}, [dataId, loading, currency]);

	const formatNumber = (num: number): string => {
		if (Number.isInteger(num)) {
			return num.toString();
		}
		const roundedNum = num.toFixed(2);
		const formattedNum = parseFloat(roundedNum).toString();

		return formattedNum;
	};

	return (
		<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
			<Typography sx={{ fontSize: '24px' }}>Package presentation</Typography>
			<FormControl sx={{ width: '500px' }}>
				<InputLabel htmlFor='input-adornment-currency'>{capitalize('currency')}</InputLabel>
				<Select
					labelId='input-adornment-currency'
					id='input-adornment-currency}'
					label={capitalize('currency')}
					name='currency'
					value={currency}
					onChange={(e): void => handleChangePrice(e)}>
					{currencyOptions?.map((current) => (
						<MenuItem key={`price-currency-${current}`} value={current}>
							{capitalize(current)}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Wrapper>
				{loading ? (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							minHeight: '150px',
						}}>
						<CircularProgress size={60} />
					</Box>
				) : (
					<>
						<Typography fontSize={30}>{dataId?.name}</Typography>
						<Flex justifyEnd flexGrow={1} gap={2}>
							<Typography fontSize={30}>Buy</Typography>
							<Typography
								fontSize={40}
								fontWeight={600}
								color={(theme): string =>
									theme.palette.primary.main
								}>{`${dataId?.tokens} tockens`}</Typography>
							<Typography fontSize={30}>for</Typography>
						</Flex>
						<Flex flexGrow={1} gap={2}>
							<Typography fontSize={30} color={(theme): string => theme.palette.primary.main}>
								{`${selectedPrice?.value && formatNumber(selectedPrice?.value)} ${
									selectedPrice?.currency
								}`}
							</Typography>
							{dataId?.discount && selectedDiscount?.type !== 0 && (
								<Typography fontSize={20}>
									with{' '}
									{`${selectedDiscount?.value && formatNumber(selectedDiscount?.value)} ${
										selectedDiscount?.type === 1 ? selectedDiscount?.currency : ' % '
									} discount`}
								</Typography>
							)}
						</Flex>
					</>
				)}
			</Wrapper>
		</Box>
	);
};

export default PackagePresentation;
