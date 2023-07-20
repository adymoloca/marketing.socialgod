import { FC, useContext, useState } from 'react';
import {
	TextField,
	Link,
	Paper,
	Box,
	Grid,
	Typography,
	CircularProgress,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { AuthContext } from 'utils/context/auth';
import { ButtonSG } from 'components/common';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { BackgroundContainer } from 'components/guests/background-continer';
import { AuthWraper } from 'components/guests/auth-wraper';
import { SubmitHandler, useForm } from 'react-hook-form';
import Logo from 'components/common/logo';
import HomeIcon from '@mui/icons-material/Home';
import {
	AuthGrid,
	BottomAuthWrapper,
	ErrorMessage,
	HighlightedTypography,
	LegalInfoBox,
	LogoWrapper,
} from '../sign-in/index.styled';
import FeedBackModal from './components/FeedBackModal';
import QuestionsMenu from './components/QuestionsMenu';

interface SingUpInputs {
	email: string;
	password: string;
	confirmPassword: string;
}

const SignUp: FC = (): JSX.Element => {
	const { register, loading } = useContext(AuthContext);
	const {
		register: registerForm,
		formState: { errors },
		handleSubmit: handleSubmitForm,
		getValues,
	} = useForm<SingUpInputs>({ reValidateMode: 'onChange' });
	const navigate = useNavigate();

	const handleSubmit: SubmitHandler<SingUpInputs> = (values: SingUpInputs) => {
		register({
			email: values.email as string,
			password: values.password as string,
		});
	};

	// handle visibility password
	const [showPassword, setShowPassword] = useState({
		password: false,
		confirm: false,
	});

	const handleClickShowPassword = (name: string, value: boolean): void => {
		setShowPassword((prev) => ({ ...prev, [name]: value }));
	};

	const validateEmail = (email: string): string | undefined => {
		const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!regex.test(email)) return 'Invalid email';
		return undefined;
	};

	const validatePassword = (password: string): string | undefined => {
		// eslint-disable-next-line no-useless-escape
		const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/;
		if (!regex.test(password)) return 'Invalid Password';
		return undefined;
	};

	const validateConfirmPassword = (password: string): string | undefined => {
		if (!(password === getValues('password'))) return 'Passwords do not match';
		return undefined;
	};

	const isDisabled = !!errors.email?.message || !!errors.password?.message || !!errors.confirmPassword?.message;

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<BackgroundContainer item xs={false} sm={4} md={7}>
				<FeedBackModal />
				<QuestionsMenu />
			</BackgroundContainer>
			<AuthGrid item xs={12} md={5} component={Paper} elevation={6} square>
				<LogoWrapper>
					<Link href='/'>
						<Logo width='150px' />
					</Link>
					<Link href='/'>
						<HomeIcon sx={{ fontSize: 40 }} />
					</Link>
				</LogoWrapper>
				<AuthWraper>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmitForm(handleSubmit, (error) => console.error(error))}
						sx={{ mt: 1, textAlign: 'left', width: '100%' }}>
						<Typography component='h1' variant='h5'>
							Sign up
						</Typography>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							autoFocus
							{...registerForm('email', {
								required: { value: true, message: 'Required' },
								minLength: { value: 12, message: 'Min Length' },
								validate: validateEmail,
							})}
						/>
						{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
						<TextField
							margin='normal'
							required
							fullWidth
							label='Password'
							type={showPassword.password ? 'text' : 'password'}
							id='password'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={(): void =>
												handleClickShowPassword('password', !showPassword.password)
											}>
											{showPassword.password ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							{...registerForm('password', {
								required: { value: true, message: 'Required' },
								minLength: { value: 5, message: 'Min Length' },
								maxLength: { value: 50, message: 'Max Length' },
								validate: validatePassword,
							})}
						/>
						{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
						<TextField
							margin='normal'
							required
							fullWidth
							label='Confirm password'
							type={showPassword.confirm ? 'text' : 'password'}
							id='confirm-password'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={(): void =>
												handleClickShowPassword('confirm', !showPassword.confirm)
											}>
											{showPassword.confirm ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							{...registerForm('confirmPassword', {
								required: { value: true, message: 'Required' },
								validate: validateConfirmPassword,
							})}
						/>
						{errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
						<ButtonSG
							disabled={loading || isDisabled}
							type='submit'
							fullWidth
							sx={{ mt: 3, mb: 2 }}>
							{loading ? <CircularProgress size='24px' /> : 'SIGN UP'}
						</ButtonSG>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='/sign-in' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</AuthWraper>
				<BottomAuthWrapper>
					<LegalInfoBox>
						<Typography noWrap fontSize='14px' sx={{ mr: '8px' }}>
							*By creating an account, you are agreeing to our{' '}
						</Typography>
						<HighlightedTypography
							noWrap
							fontSize='14px'
							onClick={(): void => navigate('/terms-of-service')}>
							Terms of Service{' '}
						</HighlightedTypography>
						<Typography noWrap fontSize='14px' sx={{ mr: '8px' }}>
							and
						</Typography>
						<HighlightedTypography noWrap fontSize='14px' onClick={(): void => navigate('/privacy-policy')}>
							{' '}
							Privacy Policy.
						</HighlightedTypography>
					</LegalInfoBox>
					<Typography sx={{ maxWidth: '600px' }} fontSize='14px'>
						**You also agree to receive product-related marketing emails from Writesonic, which you can
						unsubscribe from at any time.
					</Typography>
				</BottomAuthWrapper>
			</AuthGrid>
		</Grid>
	);
};

export default SignUp;
