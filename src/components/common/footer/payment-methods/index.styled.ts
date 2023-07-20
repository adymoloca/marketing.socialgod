import { Icon } from '@iconify/react';
import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const StyledIcon = styled(Icon)(() => ({
	width: '40px',
	height: '40px',
	marginLeft: '25px',
}));

const IconWrapper: FC<BoxProps> = styled(Box)(() => ({
	display: 'flex',
	flexWrap: 'wrap',
	width: 'auto',
}));

const PaymentWrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-between',
	alignItems: 'center',
	maxWidth: '1500px',
	minHeight: '100px',
	padding: '24px',
	borderRadius: '18px',
	position: 'absolute',
	top: '-50px',
	gap: 5,
	backgroundColor: '#fff',
	border: `2px solid ${theme.palette.primary.main}`,
	// background: `linear-gradient(
	//     0deg,
	//     hsl(343deg 100% 45%) 0%,
	//     hsl(340deg 100% 42%) 25%,
	//     hsl(337deg 100% 39%) 50%,
	//     hsl(334deg 100% 35%) 75%,
	//     hsl(331deg 100% 32%) 100%
	//   )`
}));

export { StyledIcon, IconWrapper, PaymentWrapper };
