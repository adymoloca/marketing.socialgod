import React from 'react';
import { Box } from '@mui/material';
import LandingHeader from 'components/landing/header';

const ComingSoonFeatures: React.FC = () => (
	<Box sx={{ height: '100%', width: '100%', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#A2004E' }}>
		<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<LandingHeader />
		</Box>
	</Box>
);

export default ComingSoonFeatures;
