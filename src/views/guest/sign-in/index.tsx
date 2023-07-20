import { FC, useContext, useState } from 'react';
import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Paper,
	Box,
	Grid,
	Typography,
	InputAdornment,
	IconButton,
	CircularProgress,
} from '@mui/material';
import { AuthContext } from 'utils/context/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { BackgroundContainer } from 'components/guests/background-continer';
import { AuthWraper } from 'components/guests/auth-wraper';
import { SubmitHandler, useForm } from 'react-hook-form';
import Logo from 'components/common/logo';
import HomeIcon from '@mui/icons-material/Home';
import FeedBackModal from '../sign-up/components/FeedBackModal';
import QuestionsMenu from '../sign-up/components/QuestionsMenu';
import {
	AuthGrid,
	BottomAuthWrapper,
	ErrorMessage,
	HighlightedTypography,
	LegalInfoBox,
	LogoWrapper,
} from './index.styled';

interface SingInInputs {
	email: string;
	password: string;
	rememberMe: boolean;
}
const SignIn: FC = (): JSX.Element => {
	const { login, loading } = useContext(AuthContext);
	const {
		register,
		formState: { errors },
		handleSubmit: handleSubmitForm,
	} = useForm<SingInInputs>({ reValidateMode: 'onChange' });
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const navigate = useNavigate();
	const handleShowPassword = (): void => {
		setShowPassword((prev) => !prev);
	};
	const handleSubmit: SubmitHandler<SingInInputs> = (values: SingInInputs) => {
		login({
			email: values.email as string,
			password: values.password as string,
			rememberMe: values.rememberMe as unknown as boolean,
		});
	};
	const validateEmail = (email: string): string | undefined => {
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return !regex.test(email) ? 'Invalid email' : undefined;
	};
	const validatePassword = (password: string): string | undefined => {
		// eslint-disable-next-line no-useless-escape
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/;
		return !regex.test(password) ? 'Invalid Password' : undefined;
	};
	const isDisabled: boolean = !!errors.email?.message || !!errors.password?.message;
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
						onSubmit={handleSubmitForm(handleSubmit, console.error)}
						sx={{ mt: 1, textAlign: 'left', width: '100%' }}>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							autoFocus
							{...register('email', {
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
							type={showPassword ? 'text' : 'password'}
							id='password'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={(): void => handleShowPassword()}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							{...register('password', {
								required: { value: true, message: 'Required' },
								minLength: { value: 5, message: 'Min Length' },
								maxLength: { value: 50, message: 'Max Length' },
								validate: validatePassword,
							})}
						/>
						{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
						<FormControlLabel
							name='remember-me'
							control={<Checkbox color='primary' defaultChecked={false} {...register('rememberMe')} />}
							label='Remember me'
						/>
						<Button
							disabled={loading || isDisabled}
							type='submit'
							fullWidth
							sx={{ mt: 3, mb: 2 }}>
							{loading ? <CircularProgress size='24px' /> : 'SIGN IN'}
						</Button>
						<Grid container>
							<Grid item xs={12} sm={6} textAlign='left'>
								<Link href='/forgot-password' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								sx={{ display: 'flex', justifyContent: { xs: 'start', sm: 'end' } }}>
								<Link href='/sign-up' variant='body2'>
									Do not have an account? Sign Up
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
							Terms of Service
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
export default SignIn;
