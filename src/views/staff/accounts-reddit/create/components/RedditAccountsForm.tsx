import React, { FC, useCallback, useEffect } from 'react';
import {
	Box,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { ButtonSG } from 'components/common';
import { Info } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';
import MultipleAccounts from './MultipleAcounts';
import FormikAccount from './FormikAccount';

interface SentObject {
	username: string;
	password: string;
}

const RedditAccountForm: FC = () => {
	const { t } = useTranslation();

	const [accountsNumber, setAccountsNumber] = React.useState<number>(1);
	const [data, setData] = React.useState<SentObject[]>([{ username: '', password: '' }]);
	const [accountType, setAccountType] = React.useState<string>('preset');

	const createDataArray = useCallback(
		(numElements: number) => {
			const arr: SentObject[] = [];
			for (let i = data?.length; i < numElements; i++) {
				arr.push({ username: '', password: '' });
			}
			return setData((prev) => [...prev, ...arr]);
		},
		[setData, data?.length]
	);

	const removeLastElement = useCallback(
		(numElements: number) => {
			const arr: SentObject[] = data;
			for (let i = data?.length; i > numElements; i--) {
				arr.pop();
			}
			return setData([...arr]);
			// eslint-disable-next-line
		},
		[setData, data]
	);

	useEffect(() => {
		if (accountType === 'custom' && data?.length !== accountsNumber)
			if (data?.length < accountsNumber) createDataArray(accountsNumber);
			else removeLastElement(accountsNumber);
		// eslint-disable-next-line
	}, [createDataArray, removeLastElement, accountsNumber, data?.length]);

	const handleAccounts = (number: number): void => {
		const reducedValue = number >= 30 ? 30 : number;
		const rightValue = number < 1 ? 1 : reducedValue;
		setAccountsNumber(rightValue);
	};

	const handleSubmitForm = (values: SentObject[]): void => {
		console.log(values);
	};

	const handleType = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setAccountType((event.target as HTMLInputElement).value);
		setAccountsNumber(1);
		setData([{ username: '', password: '' }]);
	};

	const isDisabled = (values: SentObject[]): boolean => {
		for (let i = 0; i < values.length; i++) {
			if (values[i].username.length < 5 || values[i].password.length < 5) {
				return true;
			}
		}
		return false;
	};

	return (
		<Grid container sx={{ justifyContent: 'start' }}>
			<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
				<Typography>{capitalize(t('select_create_accounts_models'))} :</Typography>
				<FormControl>
					<RadioGroup
						row
						aria-labelledby='radio-buttons-group-amount'
						defaultValue='preset'
						name='radio-buttons-group-custom'
						value={accountType}
						onChange={handleType}>
						<FormControlLabel value='preset' control={<Radio />} label='PreSet' />
						<FormControlLabel value='custom' control={<Radio />} label='Custom' />
					</RadioGroup>
				</FormControl>
				<Tooltip
					arrow
					title={
						<p style={{ fontSize: '14px', textAlign: 'center' }}>
							{' '}
							PreSet options create multiple accouonts and require a list of specific data format ( ex:
							username: password )
						</p>
					}>
					<Info sx={{ cursor: 'pointer' }} />
				</Tooltip>
			</Box>
			{accountType === 'custom' ? (
				<>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'end',
							justifyContent: 'space-between',
							gap: 2,
							borderTop: '1px solid #e9e9e9',
							pt: 1,
							mt: 1,
						}}>
						<Typography>{`${capitalize(t('disponible_google_acounts'))} : ${
							30 - accountsNumber
						}`}</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: 2 }}>
							<Typography>{`${capitalize(t('how_many_select_amount'))} :`}</Typography>
							<TextField
								name='accounts'
								aria-labelledby='Account number selected'
								type='number'
								variant='standard'
								value={accountsNumber}
								onChange={(e): void => handleAccounts(Number(e.target.value))}
								sx={{ width: '40px' }}
								inputProps={{ min: '1', max: '30' }}
							/>
						</Box>
					</Box>
					<Box
						sx={{
							my: 4,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'start',
							alignItems: 'start',
							width: '100%',
						}}>
						<Typography>{`${capitalize(t('select_accounts_display_inputs'))} !`}</Typography>

						{data?.map((account, index) => (
							<FormikAccount
								key={`fromic-for-user-${account.username}`}
								index={index}
								data={data}
								setData={setData}
							/>
						))}
					</Box>
				</>
			) : (
				<MultipleAccounts setData={setData} />
			)}
			<ButtonSG
				onClick={(): void => handleSubmitForm(data)}
				disabled={isDisabled(data)}
				type='submit'
				sx={{ mt: 3, mb: 2, width: '300px' }}>
				{t('create_account')}
			</ButtonSG>
		</Grid>
	);
};

export default RedditAccountForm;
