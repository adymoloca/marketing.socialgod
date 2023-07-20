import { FC, useCallback } from 'react';
import { Box, FormControl, Grid, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import { ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { stateSetter } from 'utils/types/state';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';

interface IInitial {
	accounts: string;
}

interface SentObject {
	username: string;
	password: string;
}

interface IParams {
	setData: stateSetter<SentObject[]>;
}

const initialValues: IInitial = {
	accounts: '',
};

const MultipleAccounts: FC<IParams> = (props) => {
	const { t } = useTranslation();
	const { setData } = props;

	const handleBlurFormat = useCallback(
		(values: IInitial) => {
			const trimValue = values?.accounts.trim().replace(/(?<!\\) /g, '');
			const arr = trimValue.split(/[\s]+/);
			const sentData: SentObject[] = [];
			for (let i = 0; i < arr?.length; i++) {
				const account = arr[i].split(/[:]+/);
				sentData.push({ username: account[0], password: account[1] });
			}
			return setData([...sentData]);
		},
		[setData]
	);

	const handleSubmitForm = (values: IInitial): void => {
		console.log(values);
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
				<Formik
					initialValues={initialValues}
					validationSchema={Yup.object().shape({
						accounts: Yup.string().required('Required Field'),
					})}
					onSubmit={handleSubmitForm}>
					{({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
						<Form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
							<InputLabel
								sx={{ display: 'flex', alignSelf: 'start', ml: 1, mt: 2 }}
								id='outlined-input-accounts'>
								{capitalize(t('list_accounts_reddit'))}
							</InputLabel>
							<FormControl fullWidth error={Boolean(touched.accounts && errors.accounts)}>
								<TextareaAutosize
									id='outlined-input-accounts'
									aria-label='accounts-list'
									name='accounts'
									minRows={10}
									value={values?.accounts}
									onBlur={(e): void => {
										handleBlur(e);
										handleBlurFormat(values);
									}}
									onChange={(e): void => handleChange(e)}
									style={{
										width: '100%',
										margin: 1,
										resize: 'vertical',
										maxHeight: '250px',
										minHeight: '150px',
										fontSize: '14px',
										padding: '8px',
									}}
								/>
								<Typography sx={{ fontSize: '14px', color: '#696969', textAlign: 'start', ml: 1 }}>
									{capitalize(t('add_list_reddit_acounts_input_description'))}
								</Typography>
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
						</Form>
					)}
				</Formik>
			</Box>
		</Grid>
	);
};

export default MultipleAccounts;
