import React, { FC, useState } from 'react';
import {
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ButtonSG } from 'components/common';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';

// ============================|| FIREBASE - LOGIN ||============================ //

interface IValues {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const ChangePasswordForm: FC = () => {
	const { t } = useTranslation();

	// handle visibility password
	const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

	const handleClickShowPassword = (name: string, value: boolean): void => {
		setShowPassword((prev) => ({ ...prev, [name]: value }));
	};

	const submitAction = (values: IValues): void => {
		console.log(values);
	};

	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
	const isValid = (value: string): boolean => regex.test(value);

	const isDisabled = (values: IValues): boolean => {
		const temp = !!(
			!values?.oldPassword ||
			!values?.newPassword ||
			!values?.confirmPassword ||
			values?.newPassword !== values?.confirmPassword ||
			!isValid(values?.newPassword)
		);
		return temp;
	};

	return (
		<Grid item xs={12}>
			<Formik
				initialValues={{
					oldPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				validationSchema={Yup.object().shape({
					oldPassword: Yup.string().required('Old password is required'),
					newPassword: Yup.string()
						.required('New password is required')
						.matches(
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
							`Password must be at least 8 characters long and contain at least one lowercase letter,
							one uppercase letter, one number, and one special character (!@#$%^&*).`
						),
					confirmPassword: Yup.string()
						.oneOf([Yup.ref('newPassword')], "Passwords don't match!")
						.required('Confirm password is required'),
				})}
				onSubmit={submitAction}>
				{({ errors, handleBlur, handleSubmit, touched, handleChange, values }): JSX.Element => (
					<form
						noValidate
						onSubmit={handleSubmit}
						style={{
							width: '100%',
							maxWidth: '600px',
							display: 'flex',
							flexDirection: 'column',
							gap: '18px',
						}}>
						<FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)}>
							<InputLabel htmlFor='outlined-adornment-oldPassword-change'>
								{capitalize(t('old_password'))}
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-oldPassword-change'
								type={showPassword.old ? 'text' : 'password'}
								value={values.oldPassword}
								name='oldPassword'
								onBlur={handleBlur}
								onChange={(e): void => {
									handleChange(e);
								}}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={(): void => handleClickShowPassword('old', !showPassword.old)}
											edge='end'
											size='large'>
											{showPassword.old ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								label='Password'
								inputProps={{}}
							/>
							{touched.oldPassword && errors.oldPassword && (
								<FormHelperText error id='standard-weight-helper-text-oldPassword-change'>
									{errors.oldPassword}
								</FormHelperText>
							)}
						</FormControl>
						<FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)}>
							<InputLabel htmlFor='outlined-adornment-newPassword-change'>
								{capitalize(t('new_password'))}
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-newPassword-change'
								type={showPassword.new ? 'text' : 'password'}
								value={values.newPassword}
								name='newPassword'
								onBlur={handleBlur}
								onChange={handleChange}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle newPassword visibility'
											onClick={(): void => handleClickShowPassword('new', !showPassword.new)}
											edge='end'
											size='large'>
											{showPassword.new ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								label='New Password'
								inputProps={{}}
							/>
							{touched.newPassword && errors.newPassword && (
								<FormHelperText error id='standard-weight-helper-text-newPassword-change'>
									{errors.newPassword}
								</FormHelperText>
							)}
						</FormControl>
						<FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)}>
							<InputLabel htmlFor='outlined-adornment-confirmPassword-confirm'>
								{capitalize(t('confirm_password'))}
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-confirmPassword-confirm'
								type={showPassword.confirm ? 'text' : 'password'}
								value={values.confirmPassword}
								name='confirmPassword'
								onBlur={handleBlur}
								onChange={(e): void => {
									handleChange(e);
								}}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle confirmPassword visibility'
											onClick={(): void =>
												handleClickShowPassword('confirm', !showPassword.confirm)
											}
											edge='end'
											size='large'>
											{showPassword.confirm ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								label='Confirm password'
								inputProps={{}}
							/>
							{touched.confirmPassword && errors.confirmPassword && (
								<FormHelperText error id='standard-weight-helper-text-confirmPassword-confirm'>
									{errors.confirmPassword}
								</FormHelperText>
							)}
						</FormControl>
						<ButtonSG
							name='change-form'
							type='submit'
							sx={{ mt: 2, width: '200px' }}
							disabled={isDisabled(values)}>
							{capitalize(t('change_password'))}
						</ButtonSG>
					</form>
				)}
			</Formik>
		</Grid>
	);
};

export default ChangePasswordForm;
