import React, { useContext, useState, FC, useRef } from 'react';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, VpnKey } from '@mui/icons-material';
import { useLocation } from 'react-router';
import { AuthContext } from 'utils/context/auth';
import { BackgroundContainer } from 'components/guests/background-continer';
import { AuthWraper } from 'components/guests/auth-wraper';
import CountdownTimer from './components/CountdownResend';
import CodeInput from './components/CodeInput';
import FeedBackModal from '../sign-up/components/FeedBackModal';
import QuestionsMenu from '../sign-up/components/QuestionsMenu';
import passwordErrors from './data/index.json';

const ResetPassword: FC = (): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { state } = useLocation();
	const { resetPassword, loading } = useContext(AuthContext);
	const [code, setCode] = useState<string>('');
	const [errorConfirm, setErrorConfirm] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<string>('');

	const handleErrorPassword = (event: React.FormEvent<HTMLFormElement>): string => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const password = data.get('password') as string;
		if (password !== '') {
			for (const item of passwordErrors) {
				const regex = new RegExp(item.regex);
				if (!regex.test(password)) {
					return item.message;
				}
			}
			return 'This password really meets all the conditions! :)';
		}
		return '';
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		resetPassword({
			password: data.get('password') as string,
			recoveryCode: code,
		});
	};

	const handleChangeConfirm = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirm-password') as string;
		setErrorConfirm(password !== confirmPassword && confirmPassword !== '');
		setPasswordError(handleErrorPassword(event));
	};

	const handleDisable = loading || passwordError === '' || errorConfirm || code.length < 6;

	// handle visibility password
	const [showPassword, setShowPassword] = useState({ password: false, confirm: false });

	const handleClickShowPassword = (name: string, value: boolean): void => {
		setShowPassword((prev) => ({ ...prev, [name]: value }));
	};

	const handleFocus = (): void => {
		inputRef?.current?.focus();
	};

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<BackgroundContainer item xs={false} sm={4} md={7}>
				<FeedBackModal />
				<QuestionsMenu />
			</BackgroundContainer>
			<Grid
				item
				xs={12}
				md={5}
				component={Paper}
				elevation={6}
				square
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<AuthWraper>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<VpnKey />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Reset password
					</Typography>
					<CodeInput codeProp={code} onCodeEntered={setCode} setActivationCode={handleFocus} />
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						onChange={handleChangeConfirm}
						sx={{ mt: 1, textAlign: 'left', width: '100%' }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							inputRef={inputRef}
							label='Password'
							type={showPassword.password ? 'text' : 'password'}
							id='password'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={(): void =>
												handleClickShowPassword('password', !showPassword.password)
											}
											edge='end'
											size='large'
										>
											{showPassword.password ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{passwordError !== '' && (
							<Typography
								sx={{
									color:
										passwordError !== 'This password really meets all the conditions! :)'
											? 'red'
											: 'green',
									fontSize: '14px',
									pl: 1,
								}}
							>
								{passwordError}
							</Typography>
						)}
						<TextField
							margin='normal'
							required
							fullWidth
							name='confirm-password'
							label='Confirm password'
							type={showPassword.confirm ? 'text' : 'password'}
							id='confirm-password'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle confirm password visibility'
											onClick={(): void =>
												handleClickShowPassword('confirm', !showPassword.confirm)
											}
											edge='end'
											size='large'
										>
											{showPassword.confirm ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{errorConfirm && (
							<Typography sx={{ color: 'red', fontSize: '14px', pl: 1 }}>
								{`${"Passwords don't match !"}`}
							</Typography>
						)}
						<Button
							disabled={handleDisable}
							type='submit'
							fullWidth						
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? <CircularProgress size='24px' /> : 'RESET PASSWORD'}
						</Button>
						<Grid container>
							<Grid item xs={6} textAlign='left'>
								<Link href='/sign-in' variant='body2'>
									Return to Sign in page!
								</Link>
							</Grid>
							<Grid item xs={6} textAlign='right'>
								<CountdownTimer email={state?.email} />
							</Grid>
						</Grid>
					</Box>
				</AuthWraper>
			</Grid>
		</Grid>
	);
};

export default ResetPassword;
