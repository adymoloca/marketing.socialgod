import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import theme from 'utils/config/theme';

interface IProps {
	title: string;
}

const clipPath = `polygon(100% 0%, 0% 0%, 0.00% 86.69%, 2.86% 87.02%,
	5.71% 88.00%, 8.57% 89.51%, 11.43% 91.40%, 14.29% 93.47%, 
    17.14% 95.52%, 20.00% 97.32%, 22.86% 98.70%, 25.71% 99.50%, 28.57% 99.65%,
	31.43% 99.13%, 34.29% 97.99%, 37.14% 96.36%, 40.00% 94.40%, 42.86% 92.31%,
	45.71% 90.31%, 48.57% 88.61%, 51.43% 87.38%, 54.29% 86.76%, 57.14% 86.79%,
	60.00% 87.49%, 62.86% 88.78%, 65.71% 90.52%, 68.57% 92.54%, 71.43% 94.63%,
	74.29% 96.56%, 77.14% 98.15%, 80.00% 99.22%, 82.86% 99.67%, 85.71% 99.44%,
	88.57% 98.57%, 91.43% 97.14%, 94.29% 95.30%, 97.14% 93.24%, 100.00% 91.18%)`;

const HeroSection: FC<IProps> = ({ title }) => (
	<Box
		display='center'
		justifyContent='center'
		alignItems='center'
		sx={{ backgroundColor: `${theme?.light?.palette?.primary?.main}`, clipPath }}
		width='100%'
		height='200px'>
		<Typography
			sx={{
				maxWidth: '1200px',
				color: '#fff',
				fontSize: '54px',
				fontWeight: 800,
				textShadow: '2px 1px 1px #000',
				textAlign: 'center',
			}}>
			{title}
		</Typography>
	</Box>
);

export default HeroSection;
