import { Box, Button, Typography, useTheme } from '@mui/material';
import React, {FC} from 'react';
import { useNavigate } from 'react-router';

const clipPath = `polygon(100% 100%, 0% 100% , 0.00% 13.31%, 2.86% 12.98%,
	 5.71% 12.00%, 8.57% 10.49%, 11.43% 8.60%, 14.29% 6.53%, 
    17.14% 4.48%, 20.00% 2.68%, 22.86% 1.30%, 25.71% 0.50%,
	 28.57% 0.35%, 31.43% 0.87%, 34.29% 2.01%, 37.14% 3.64%, 40.00% 5.60%, 
    42.86% 7.69%, 45.71% 9.69%, 48.57% 11.39%, 51.43% 12.62%,
	 54.29% 13.24%, 57.14% 13.21%, 60.00% 12.51%, 62.86% 11.22%, 65.71% 9.48%, 
    68.57% 7.46%, 71.43% 5.37%, 74.29% 3.44%, 77.14% 1.85%, 80.00% 0.78%, 82.86% 0.33%,
	 85.71% 0.56%, 88.57% 1.43%, 91.43% 2.86%, 94.29% 4.70%, 97.14% 6.76%, 100.00% 8.82%)`;

const GetStartedSection:FC = ():JSX.Element => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				width: '100%',
				height: '500px',
				backgroundColor: `${theme?.palette?.primary?.main}`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 3,
				clipPath,
			}}
		>
			<Typography
				sx={{
					maxWidth: '1200px',
					color: '#fff',
					fontSize: '54px',
					fontWeight: 800,
					textShadow: '2px 1px 1px #000',
					textAlign: 'center',
					lineHeight: '60px',
				}}
			>
				Unlock the untapped potential of your social account!
			</Typography>
			<Typography
				sx={{
					maxWidth: '1200px',
					color: '#fff',
					fontSize: '34px',
					fontWeight: 800,
					textShadow: '2px 1px 1px #000',
					textAlign: 'center',
				}}
			>
				Experience the thrill of watching your audience skyrocket.
			</Typography>
			<Button
				variant='outlined'
				sx={{
					backgroundColor: '#fff',
					borderRadius: '24px',
					width: '100%',
					maxWidth: '600px',
					fontSize: '28px',
					fontWeight: 600,
					mt: 3,
					': hover': { backgroundColor: '#e9e9e9' },
				}}
				onClick={():void => navigate('/sign-up')}
			>
				Start now
			</Button>
		</Box>
	);
};

export default GetStartedSection;
