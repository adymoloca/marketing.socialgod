import { FC, MouseEvent, useCallback, useState } from 'react';
import { FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { stateSetter } from 'utils/types/state';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';

interface SentObject {
	email: string;
	password: string;
}

interface IParams {
	data: SentObject[];
	index: number;
	setData: stateSetter<SentObject[]>;
}

const FormikOutlook: FC<IParams> = (props) => {
	const { data, index, setData } = props;

	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const initialValues = data[index];

	const handlePassword = (e: MouseEvent): void => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	const handleSubmitForm = (values: SentObject): void => {
		console.log(values);
	};

	const handleDataChange = useCallback(
		(newValue: string, objectName: string) => {
			const formatedValue = newValue.trim().replace(/\s+/, '');
			const value = { ...data[index], [objectName]: formatedValue };
			const temp = [...data];
			temp.splice(index, 1, value);
			setData(temp);
		},
		[data, index, setData]
	);

	const disableInput =
		index === 0 ? false : !!(data[index - 1]?.email?.length < 5 || data[index - 1]?.password?.length < 5);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				email: Yup.string()
					.required('Required Field')
					.min(5, 'Min number of characters is 5')
					.max(40, 'Max number of characters is 40'),
				password: Yup.string().required('Required Field').min(8, 'Min number of characters is 8'),
			})}
			onSubmit={handleSubmitForm}>
			{({ errors, handleBlur, handleSubmit, touched, handleChange, values }): JSX.Element => (
				<Form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
					<FormControl sx={{ width: '50%', pr: 1 }} error={Boolean(touched.email && errors.email)}>
						<TextField
							margin='normal'
							type='text'
							label={capitalize(t('email'))}
							name='email'
							disabled={disableInput}
							onBlur={(e): void => {
								handleBlur(e);
								handleDataChange(values?.email, 'email');
							}}
							value={values?.email}
							onChange={(e): void => handleChange(e)}
							inputProps={{ min: '1', max: '50' }}
						/>
						{touched.email && errors.email && (
							<ErrorMessage
								name='email'
								render={(msg): JSX.Element => (
									<Typography
										sx={{ fontSize: '14px', color: 'red', paddingLeft: '8px', textAlign: 'start' }}>
										{msg}
									</Typography>
								)}
							/>
						)}
					</FormControl>

					<FormControl sx={{ width: '50%', pl: 1 }} error={Boolean(touched.password && errors.password)}>
						<TextField
							margin='normal'
							name='password'
							label={capitalize(t('password'))}
							disabled={disableInput}
							type={showPassword ? 'text' : 'password'}
							onBlur={(e): void => {
								handleBlur(e);
								handleDataChange(values?.password, 'password');
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
										sx={{ fontSize: '14px', color: 'red', paddingLeft: '8px', textAlign: 'start' }}>
										{msg}
									</Typography>
								)}
							/>
						)}
					</FormControl>
				</Form>
			)}
		</Formik>
	);
};

export default FormikOutlook;
