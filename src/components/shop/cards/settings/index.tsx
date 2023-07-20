import { Box, BoxProps, styled, Icon, Typography, capitalize } from '@mui/material';
import { FC } from 'react';

const Wrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	display: 'flex',
	width: 180,
	height: 80,
	alignItems: 'center',
	borderRadius: 15,
	border: `1px solid ${theme.palette.divider}`,
	padding: '25px',
	cursor: 'pointer',
}));

interface SettingsCardProps {
	icon: string;
	title: string;
	handler: () => void;
}

const SettingsCard: FC<SettingsCardProps> = ({ icon, title, handler }) => (
	<Wrapper gap={3} onClick={handler}>
		<Icon fontSize='large' color='disabled'>
			{icon}
		</Icon>
		<Typography width='100%' textAlign='center' fontSize='large' color='GrayText'>
			{capitalize(title)}
		</Typography>
	</Wrapper>
);

export default SettingsCard;
