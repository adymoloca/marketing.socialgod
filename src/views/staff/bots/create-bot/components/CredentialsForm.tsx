import { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { stateSetter } from 'utils/types/state';
import { Add, Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';
import useCredentials from 'hooks/fetch-hooks/use-credentials';
import { BotObject, SentObject } from '../ParentCreateBot';
import SelectLang from './SelectLangInput';

interface IParams {
	data: BotObject[];
	index: number;
	setData: stateSetter<BotObject[]>;
	accoutsNumber: number;
	setAccountsNumber: React.Dispatch<React.SetStateAction<number>>;
}

const CredentialsForm: FC<IParams> = (props) => {
	const { data, index, setData, accoutsNumber, setAccountsNumber } = props;
	const { data: credentials, loading, getCredentialsData } = useCredentials();

	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handlePassword = (e: MouseEvent): void => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	const handleSubmit = (values: SentObject): void => {
		console.log(values);
	};

	const handleSetData = useCallback(
		(newValue: string, objectName: string) => {
			const formatedValue = newValue.trim().replace(/\s+/, '');
			const value = { ...data[index], [objectName]: formatedValue };
			const temp = [...data];
			temp.splice(index, 1, value);
			setData(temp);
		},
		[data, index, setData]
	);

	const handleGet = useCallback(
		(newValue: SentObject) => {
			const temp = [...data];
			const language = data[index]?.language;
			temp.splice(index, 1, { language, credentials: newValue });
			setData(temp);
			// eslint-disable-next-line
		},
		[data, index, setData]
	);

	const initialData: SentObject = useMemo(() => credentials, [credentials]);

	useEffect(() => {
		if (credentials?.firstName?.length > 0) handleGet(credentials);
		else getCredentialsData();
		// eslint-disable-next-line
	}, [credentials?.firstName]);

	return loading ? (
		<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
			<CircularProgress />
		</Box>
	) : (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'row',
				alignItems: 'center',
				pt: index > 0 ? 2 : 0,
				mt: index > 0 ? 1 : 0,
				borderTop: index > 0 ? '2px solid #9e9e9e' : 'none',
			}}>
			<Box
				sx={{
					width: 'calc(100% - 100px)',
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
				}}>
				<SelectLang language={data[index]?.language} setLanguage={setData} data={data} index={index} />
				<Formik
					initialValues={initialData}
					validationSchema={Yup.object().shape({
						firstName: Yup.string()
							.required('Required Field')
							.min(2, 'Min number of characters is 2')
							.max(40, 'Max number of characters is 40'),
						lastName: Yup.string()
							.required('Required Field')
							.min(2, 'Min number of characters is 2')
							.max(40, 'Max number of characters is 40'),
						username: Yup.string()
							.required('Required Field')
							.min(5, 'Min number of characters is 5')
							.max(40, 'Max number of characters is 40'),
						password: Yup.string().required('Required Field').min(8, 'Min number of characters is 8'),
					})}
					onSubmit={handleSubmit}>
					{({ errors, handleBlur, touched, handleChange, values }): JSX.Element => (
						<Form noValidate style={{ width: '100%' }}>
							<FormControl
								sx={{ width: '50%', pr: 1 }}
								error={Boolean(touched.firstName && errors.firstName)}>
								<TextField
									margin='normal'
									type='text'
									label={capitalize(t('first_name'))}
									name='firstName'
									onBlur={(e): void => {
										handleBlur(e);
										handleSetData(values?.firstName, 'firstName');
									}}
									value={values?.firstName}
									onChange={(e): void => handleChange(e)}
									inputProps={{ min: '1', max: '50' }}
								/>
								{touched.firstName && errors.firstName && (
									<ErrorMessage
										name='firstName'
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

							<FormControl
								sx={{ width: '50%', pl: 1 }}
								error={Boolean(touched.lastName && errors.lastName)}>
								<TextField
									margin='normal'
									type='text'
									label={capitalize(t('last_name'))}
									name='lastName'
									onBlur={(e): void => {
										handleBlur(e);
										handleSetData(values?.lastName, 'lastName');
									}}
									value={values?.lastName}
									onChange={(e): void => handleChange(e)}
									inputProps={{ min: '1', max: '50' }}
								/>
								{touched.lastName && errors.lastName && (
									<ErrorMessage
										name='lastName'
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

							<FormControl
								sx={{ width: '50%', pr: 1 }}
								error={Boolean(touched.username && errors.username)}>
								<TextField
									margin='normal'
									type='text'
									label={capitalize(t('user_name'))}
									name='username'
									onBlur={(e): void => {
										handleBlur(e);
										handleSetData(values?.username, 'username');
									}}
									value={values?.username}
									onChange={(e): void => handleChange(e)}
									inputProps={{ min: '1', max: '50' }}
								/>
								{touched.username && errors.username && (
									<ErrorMessage
										name='username'
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

							<FormControl
								sx={{ width: '50%', pl: 1 }}
								error={Boolean(touched.password && errors.password)}>
								<TextField
									margin='normal'
									name='password'
									label={capitalize(t('password'))}
									type={showPassword ? 'text' : 'password'}
									onBlur={(e): void => {
										handleBlur(e);
										handleSetData(values?.password, 'password');
									}}
									value={values?.password}
									onChange={(e): void => handleChange(e)}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton onClick={(e): void => handlePassword(e)}>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								{touched.password && errors.password && (
									<ErrorMessage
										name='password'
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
			<Box sx={{ width: '60px', display: 'flex', gap: '8px', flexDirection: 'column', pt: 2 }}>
				{index === (data?.length || 0) - 1 && (
					<Button
						variant='outlined'
						disabled={data[index]?.language?.length < 1}
						onClick={(): void => setAccountsNumber(accoutsNumber + 1)}>
						<Add />
					</Button>
				)}
				{accoutsNumber > 1 && index === (data?.length || 0) - 1 && (
					<Button variant='outlined' onClick={(): void => setAccountsNumber(accoutsNumber - 1)}>
						<Delete />
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default CredentialsForm;
