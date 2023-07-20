import { FC, useContext } from 'react';
import {
	Avatar,
	Button,
	TextField,
	Link,
	Paper,
	Box,
	Grid,
	Typography,
	CircularProgress,
} from '@mui/material';
import { AuthContext } from 'utils/context/auth';
import { Pin } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { BackgroundContainer } from 'components/guests/background-continer';
import { AuthWraper } from 'components/guests/auth-wraper';
import { SubmitHandler, useForm } from 'react-hook-form';
import FeedBackModal from '../sign-up/components/FeedBackModal';
import QuestionsMenu from '../sign-up/components/QuestionsMenu';

interface ForgotPasswordInputs {
	email: string;
}

const ForgotPassword: FC = (): JSX.Element => {
	const { recovery, loading } = useContext(AuthContext);
	const {
		register,
		formState: { errors },
		handleSubmit: handleSubmitForm,
	} = useForm<ForgotPasswordInputs>({ reValidateMode: 'onChange' });
	const navigate = useNavigate();

	const onSuccess = (email: string): void => {
		navigate('/reset-password', { state: { email } });
	};

	const handleSubmit: SubmitHandler<ForgotPasswordInputs> = (values: ForgotPasswordInputs) => {
		recovery(values.email, () => onSuccess(values.email));
	};

	const validateEmail = (email: string): string | undefined => {
		const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!regex.test(email)) return 'Invalid email';
		return undefined;
	};

	const isDisabled = !!errors.email?.message;

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
						<Pin />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Forgot password
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmitForm(handleSubmit, (error) => console.error(error))}
						sx={{ mt: 1, textAlign: 'left', width: '100%' }}
					>
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
						<Button
							disabled={loading || isDisabled}
							type='submit'
							fullWidth
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? <CircularProgress size='24px' /> : 'SEND RESET CODE'}
						</Button>
						<Grid container>
							<Grid item xs textAlign='left'>
								<Link href='/sign-in' variant='body2'>
									Return to Sign in page!
								</Link>
							</Grid>
						</Grid>
					</Box>
				</AuthWraper>
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
