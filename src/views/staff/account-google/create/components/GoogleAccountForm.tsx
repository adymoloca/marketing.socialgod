import React, { FC } from 'react';
import {
	Box,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	Radio,
	RadioGroup,
	TextField,
	TextareaAutosize,
	Tooltip,
	Typography,
} from '@mui/material';
import { ErrorMessage, Formik, Form, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { ButtonSG } from 'components/common';
import { Info } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';

interface IProps {
	accounts: number;
	time: number;
	names: string;
}

const initialValues: IProps = {
	accounts: 30,
	time: 60,
	names: '',
};

const GoogleAccountForm: FC = () => {
	const { t } = useTranslation();
	const [accountType, setAccountType] = React.useState<string>('preset');
	const handleSubmitForm = (values: IProps): void => {
		console.log(values);
	};

	const handleType = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setAccountType((event.target as HTMLInputElement).value);
	};

	const isDisabled = (errors: FormikErrors<IProps>, values: IProps): boolean => {
		const names = values?.names;
		const arr = names?.split(/[,/./;]+/);
		const isValideNames = arr.length !== values?.accounts;

		if (errors.names || errors.time || errors.accounts || isValideNames) return true;
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
							PreSet options create 30 accouonts in 1 hours to not be suspicious and require a list of
							names to create the accounts ( ex: Jhon Snow)
						</p>
					}>
					<Info sx={{ cursor: 'pointer' }} />
				</Tooltip>
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
				<Formik
					initialValues={initialValues}
					validationSchema={Yup.object().shape({
						accounts: Yup.number()
							.required('Required Field')
							.min(5, 'Min number of accounts is 5')
							.max(50, 'Max number of accounts is 50'),
						time: Yup.number()
							.required('Required Field')
							.min(5, 'Minimum time to create an account is 5 min')
							.max(720, 'Max time to create an account is 12 hours ( the time is masured in minutes)'),
						names: Yup.string()
							.required('Required Field')
							.matches(
								/^[a-zA-Z,.;\s]*$/,
								"The value can contains only letters, whitespace, and the symbols ',', '.', and ';'."
							),
					})}
					onSubmit={handleSubmitForm}>
					{({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
						<Form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
							<FormControl
								sx={{ width: '50%', pr: 1 }}
								error={Boolean(touched.accounts && errors.accounts)}>
								<TextField
									disabled={accountType === 'preset'}
									margin='normal'
									id='accounts'
									type='number'
									label='Number of accounts to create*'
									name='accounts'
									onBlur={handleBlur}
									value={values?.accounts}
									onChange={(e): void => handleChange(e)}
									inputProps={{ min: '1', max: '50' }}
								/>
								{touched.accounts && errors.accounts && (
									<ErrorMessage
										name='accounts'
										render={(msg): JSX.Element => (
											<Typography
												sx={{
													fontSize: '14px',
													color: 'red',
													paddingLeft: '8px',
													textAlign: 'start',
												}}>
												{msg}
											</Typography>
										)}
									/>
								)}
							</FormControl>

							<FormControl sx={{ width: '50%', pl: 1 }} error={Boolean(touched.time && errors.time)}>
								<TextField
									disabled={accountType === 'preset'}
									margin='normal'
									name='time'
									label='Time to create the accounts ( min )*'
									type='number'
									id='time'
									onBlur={handleBlur}
									value={values?.time}
									onChange={(e): void => handleChange(e)}
									inputProps={{ min: '5' }}
								/>
								{touched.time && errors.time && (
									<ErrorMessage
										name='time'
										render={(msg): JSX.Element => (
											<Typography
												sx={{
													fontSize: '14px',
													color: 'red',
													paddingLeft: '8px',
													textAlign: 'start',
												}}>
												{msg}
											</Typography>
										)}
									/>
								)}
							</FormControl>

							<InputLabel
								sx={{ display: 'flex', alignSelf: 'start', ml: 1, mt: 2 }}
								id='outlined-input-names'>
								{capitalize(t('list_selected_names'))}
							</InputLabel>
							<FormControl fullWidth error={Boolean(touched.names && errors.names)}>
								<TextareaAutosize
									id='outlined-input-names'
									aria-label='names-list'
									name='names'
									minRows={10}
									value={values?.names}
									onBlur={handleBlur}
									onChange={(e): void => handleChange(e)}
									style={{
										width: '100%',
										margin: 1,
										resize: 'vertical',
										maxHeight: '150px',
										minHeight: '100px',
									}}
								/>
								<Typography sx={{ fontSize: '14px', color: '#696969', textAlign: 'start', ml: 1 }}>
									{`${t('create_google_accounts_input_description_start')} 
									${values?.accounts} 
									${t('create_google_accounts_input_description_end')}`}
								</Typography>
								{touched.names && errors.names && (
									<ErrorMessage
										name='names'
										render={(msg): JSX.Element => (
											<Typography
												sx={{
													fontSize: '14px',
													color: 'red',
													paddingLeft: '8px',
													textAlign: 'start',
												}}>
												{msg}
											</Typography>
										)}
									/>
								)}
							</FormControl>

							<ButtonSG
								disabled={isDisabled(errors, values)}
								type='submit'
								sx={{ mt: 3, mb: 2, width: '300px' }}>
								{t('create_account')}
							</ButtonSG>
						</Form>
					)}
				</Formik>
			</Box>
		</Grid>
	);
};

export default GoogleAccountForm;
