import { Avatar, Box, CircularProgress, Grid, Paper, Typography, useTheme } from '@mui/material';
import { ButtonSG } from 'components/common';
import { AuthWraper } from 'components/guests/auth-wraper';
import { BackgroundContainer } from 'components/guests/background-continer';
import useSubscribe from 'hooks/fetch-hooks/use-subscribe';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { useNavigate } from 'react-router';

function Unsubscribe(): JSX.Element {
	const navigate = useNavigate();
	const theme = useTheme();
	const path = window.location.pathname;
	const { unsubscribeGuest, loadingUnsubscribe } = useSubscribe();
	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<BackgroundContainer item xs={false} sm={4} md={7} />
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<AuthWraper>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<UnsubscribeIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Unsubscribe
					</Typography>
					<Box component='form' noValidate sx={{ mt: 1, textAlign: 'left' }} />
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							p: 3,
							textAlign: 'center',
							alignItems: 'center',
						}}
					>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								gap: 1,
							}}
						>
							<Typography fontSize='20px'>
								{`*We' re sorry to hear that you want to unsubscribe from our platform. 
								We value your feedback and apologize for any inconvenience caused.
								Please let us know if there' s anything specific that has led to your decision.
								We strive to provide the best user experience and would appreciate the
								opportunity to address any concerns you may have. Thank you for your support,
								and we hope to have the chance to improve your experience in the future.`}
								<Typography
									fontSize='14px'
									onClick={(): void => navigate('/terms-of-service')}
									sx={{ color: `${theme.palette.primary.main}`, fontWeight: 600, cursor: 'pointer' }}
								>
									Terms of Service{' '}
								</Typography>
							</Typography>
						</Box>
						<ButtonSG
							name='Unsubscribe'
							type='submit'
							sx={{ mt: 2, width: '200px' }}
							onClick={(): void => unsubscribeGuest(path, () => navigate('/'))}
						>
							{loadingUnsubscribe === 'unsubscribe' ? <CircularProgress size={20} /> : 'Unsubscribe'}
						</ButtonSG>
					</Box>
				</AuthWraper>
			</Grid>
		</Grid>
	);
}

export default Unsubscribe;
