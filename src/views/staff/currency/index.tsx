import React, { FormEvent, useCallback } from 'react';
import useStocks, { IStock } from 'hooks/fetch-hooks/use-currency';
import { Flex } from 'components/common';
import { CircularProgress, Button, TextField, Typography, Box, IconButton } from '@mui/material';
import { Edit, EditOff } from '@mui/icons-material';

const Currency: React.FC = (): JSX.Element => {
	const { data: stocks, loading, updateStocks, toggleIsDisabled } = useStocks();
	const updateStockData = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			const targetKeys = Object.keys(e.target).filter((key) => !Number.isNaN(parseInt(key)));
			const targetObjectsFiltered = targetKeys
				.map((key) => e.target[key as keyof typeof e.target])
				.filter((el) => {
					const parsedEl = el as unknown as HTMLElement;
					return parsedEl.nodeName === 'INPUT';
				});
			const stocksParsed = targetObjectsFiltered.map((el) => {
				const parsedEl = el as unknown as HTMLInputElement;
				return {
					currency: parsedEl.name,
					rate: +parsedEl.value,
				};
			}) as IStock[];
			updateStocks(stocksParsed);
		},
		[updateStocks]
	);
	return (
		<Box>
			{loading ? (
				<Flex
					justifyCenter
					sx={{
						width: '100%',
						mt: 3,
					}}>
					<CircularProgress />
				</Flex>
			) : (
				<form onSubmit={updateStockData}>
					<Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
						{stocks.map((stock, index) => (
							<Box key={`${stock.currency}`} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
								<Typography sx={{ fontSize: 18 }}>{stock.currency.toUpperCase()}</Typography>
								<TextField
									name={stock.currency}
									key={`${stock.rate}`}
									defaultValue={stock.rate}
									disabled={stock.isDisabled}
								/>
								<IconButton onClick={(): void => toggleIsDisabled(index)}>
									{stock.isDisabled ? <Edit color='primary' /> : <EditOff color='secondary' />}
								</IconButton>
							</Box>
						))}
						<Button
							type='submit'
							variant='outlined'
							sx={{
								width: 222,
								marginTop: 2,
								marginLeft: 7,
							}}>
							Update Currency
						</Button>
					</Box>
				</form>
			)}
		</Box>
	);
};
export default Currency;
