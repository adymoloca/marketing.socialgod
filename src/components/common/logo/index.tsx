import { Box } from '@mui/material';
import { FC } from 'react';

interface LogoProps {
	width?: string;
}

const Logo: FC<LogoProps> = ({ width }) => (
	<Box
		component='img'
		sx={{ width, height: 'auto' }}
		src='https://storage.googleapis.com/sbdcloud/1688720650889-socialgod-logo.png'
	/>
);

Logo.defaultProps = {
	width: '100%',
};

export default Logo;
