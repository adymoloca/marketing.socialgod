import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import {
	CircularProgress,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Heading } from 'components/common';
import { capitalize } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import useAdmins from 'hooks/fetch-hooks/use-admins';
import { IAdmin } from 'hooks/fetch-hooks/use-admins/index.actions';
import { useNavigate } from 'react-router';
import ButtonSG from 'components/common/button';
import AdminContext from '../admins-context';

export interface IValuesProps {
	email: string;
	permissions: string[];
	password: string;
	confirmPassword: string;
}

export interface IValueEdit {
	permissions: string[];
}

export interface IProps {
	type: string;
	adminId?: string;
	setType?: Dispatch<SetStateAction<string>>;
}

const shapeAdd = Yup.object().shape({
	email: Yup.string()
		.required('Required field')
		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email!'),
	password: Yup.string()
		.required('New password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
			`Password must be at least 8 characters long and contain at least one lowercase letter,
			one uppercase letter, one number, and one special character (!@#$%^&*).`
		),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], "Passwords don't match!")
		.required('Confirm password is required'),
});

const initialValuesAdd = {
	email: '',
	permissions: [],
	password: '',
	confirmPassword: '',
};

const AdminForm: FC<IProps> = ({ type, adminId, setType }) => {
	const navigate = useNavigate();
	const [adminPermissions, setAdminPermissions] = useState<string[]>([]);
	const { t } = useTranslation();
	const { setter: setAdmins, loadingPermissions } = useContext(AdminContext);
	const {
		getAdmin,
		postAdmin,
		loadingAdmin,
		data: admin,
		getPermissions,
		allPermissions: permissions,
		update,
	} = useAdmins<IAdmin>(setAdmins);

	useEffect(() => {
		if (adminId) {
			getAdmin(adminId);
		}
		getPermissions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [adminId]);

	useEffect(() => {
		!!admin?.permissions && setAdminPermissions(admin.permissions);
	}, [admin]);

	const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

	const handleClickShowPassword = (name: string, value: boolean): void => {
		setShowPassword((prev) => ({ ...prev, [name]: value }));
	};

	const handleMouseDownPassword = (event: React.MouseEvent): void => {
		event?.preventDefault();
	};

	const submitButtonTitle = type === 'Add_Admin' ? 'add_admin' : 'edit_admin';

	const submitAction = (values: IValuesProps | IValueEdit, actions: { resetForm: () => void }): void => {
		if (type === 'Add_Admin') {
			const valuesProps = values as IValuesProps;
			const formatedAccess =
				valuesProps.permissions?.length === permissions.length ? ['all'] : valuesProps.permissions;
			const sendData = { ...valuesProps, permissions: formatedAccess };
			postAdmin(sendData);
			actions.resetForm();
		} else if (type === 'Edit_Admin') {
			const formatedAccess = adminPermissions?.length === permissions.length ? ['all'] : [...adminPermissions];
			const sendData = { permissions: formatedAccess };
			adminId && update(sendData, adminId);
			setAdminPermissions([]);
			setType && setType('Add_Admin');
			navigate('/staff/admins');
		}
	};
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const isValid = (value: string): boolean => regex.test(value);

	function isDisabled(values: IValuesProps | IValueEdit): boolean {
		const valuesProps = values as IValuesProps;
		return type === 'Add_Admin'
			? !valuesProps?.email ||
					!valuesProps?.password ||
					!valuesProps?.confirmPassword ||
					valuesProps?.permissions?.length < 1 ||
					valuesProps?.password !== valuesProps?.confirmPassword ||
					!isValid(valuesProps?.email)
			: adminPermissions?.length === admin?.permissions?.length;
	}

	const YupValidation = type === 'Add_Admin' ? shapeAdd : Yup.object().shape({});

	const handleChangePermissions = (e: SelectChangeEvent<string[]>): void => {
		setAdminPermissions(e.target.value as unknown as string[]);
	};

	const getInitial = (): { email?: string; permissions: string[]; password?: string; confirmPassword?: string } =>
		type === 'Add_Admin' ? initialValuesAdd : { permissions: [...(admin?.permissions || [])] };
	return (
		<>
			<Heading>{t(type)}</Heading>
			<Formik initialValues={getInitial()} validationSchema={YupValidation} onSubmit={submitAction}>
				{({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
					<form
						noValidate
						onSubmit={handleSubmit}
						style={{
							width: '100%',
							maxWidth: '600px',
							display: 'flex',
							flexDirection: 'column',
							gap: '18px',
						}}
					>
						<Grid item xs={12}>
							<FormControl
								sx={type === 'Edit_Admin' ? { display: 'none' } : { display: 'flex' }}
								fullWidth
								error={Boolean(touched.email && errors.email)}
							>
								<InputLabel htmlFor='outlined-adornment-email'>{capitalize(t('email'))}</InputLabel>
								<OutlinedInput
									id='outlined-adornment-email'
									type='text'
									value={values.email}
									name='email'
									label='Email'
									onBlur={handleBlur}
									onChange={handleChange}
									inputProps={{ maxLength: '40' }}
								/>
								{touched.email && errors.email && (
									<ErrorMessage
										name='email'
										render={(msg): JSX.Element => (
											<Typography sx={{ fontSize: '12px', color: 'red', paddingLeft: '10px' }}>
												{msg}
											</Typography>
										)}
									/>
								)}
							</FormControl>
						</Grid>

						<FormControl fullWidth error={Boolean(touched.permissions && errors.permissions)}>
							<InputLabel id='select-permissions-label'>Permissions</InputLabel>
							<Select
								labelId='select-permissions-label'
								id='select-permissions'
								label={capitalize(t('permissions'))}
								name='permissions'
								multiple
								value={
									type === 'Edit_Admin'
										? [...(adminPermissions || [])]
										: [...(values.permissions || [])]
								}
								onBlur={handleBlur}
								onChange={type === 'Edit_Admin' ? handleChangePermissions : handleChange}
							>
								{loadingPermissions ? (
									<CircularProgress size={20} />
								) : (
									permissions?.map((p) => (
										<MenuItem key={p} value={p}>
											{capitalize(p)}
										</MenuItem>
									))
								)}
							</Select>
							{touched.permissions && errors.permissions && (
								<ErrorMessage
									name='email'
									render={(msg): JSX.Element => (
										<Typography sx={{ fontSize: '12px', color: 'red', paddingLeft: '10px' }}>
											{msg}
										</Typography>
									)}
								/>
							)}
						</FormControl>
						<FormControl
							sx={type === 'Edit_Admin' ? { display: 'none' } : { display: 'flex' }}
							fullWidth
							error={Boolean(touched.password && errors.password)}
						>
							<InputLabel htmlFor='outlined-adornment-password'>{capitalize(t('password'))}</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={showPassword?.new ? 'text' : 'password'}
								value={values.password}
								name='password'
								label='Password'
								onBlur={handleBlur}
								onChange={(e): void => {
									handleChange(e);
								}}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={(): void => handleClickShowPassword('new', !showPassword?.new)}
											onMouseDown={handleMouseDownPassword}
											edge='end'
											size='large'
										>
											{showPassword?.new ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								inputProps={{}}
							/>
							{touched.password && errors.password && (
								<ErrorMessage
									name='password'
									render={(msg): JSX.Element => (
										<Typography sx={{ fontSize: '12px', color: 'red', paddingLeft: '10px' }}>
											{msg}
										</Typography>
									)}
								/>
							)}
						</FormControl>
						<FormControl
							sx={type === 'Edit_Admin' ? { display: 'none' } : { display: 'flex' }}
							fullWidth
							error={Boolean(touched.confirmPassword && errors.confirmPassword)}
						>
							<InputLabel htmlFor='outlined-adornment-confirmPassword-confirm'>
								{capitalize(t('confirm_password'))}
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-confirmPassword-confirm'
								type={showPassword?.confirm ? 'text' : 'password'}
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
												handleClickShowPassword('confirm', !showPassword?.confirm)
											}
											edge='end'
											size='large'
										>
											{showPassword?.confirm ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								label='Confirm password'
								inputProps={{}}
							/>
							{touched.confirmPassword && errors.confirmPassword && (
								<ErrorMessage
									name='confirmPassword'
									render={(msg): JSX.Element => (
										<Typography sx={{ fontSize: '12px', color: 'red', paddingLeft: '10px' }}>
											{msg}
										</Typography>
									)}
								/>
							)}
						</FormControl>
						<ButtonSG
							shadow
							name={type === 'Add_Admin' ? 'add-owner' : 'edit-owner'}
							disabled={isDisabled(values)}
							type='submit'
							sx={{ mt: 2, width: '200px' }}
						>
							{loadingAdmin === 'post-update-admin' ? <CircularProgress size={20} /> : submitButtonTitle}
						</ButtonSG>
					</form>
				)}
			</Formik>
		</>
	);
};

AdminForm.defaultProps = {
	adminId: '',
	setType: (): void => {},
};

export default AdminForm;
