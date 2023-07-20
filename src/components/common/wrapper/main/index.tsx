import { FC } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { drawerWidth } from 'components/common/side-drawer/index.styled';

interface CustBoxProps extends BoxProps {
	isDrawerOpen: boolean;
}

const Wrapper: FC<CustBoxProps> = styled(Box as FC<CustBoxProps>, {
	shouldForwardProp: (prop: string) => prop !== 'isDrawerOpen',
})(({ theme, isDrawerOpen }) => ({
	marginLeft: '64px',
	padding: '30px',
	paddingTop: '94px',
	overflowY: 'auto',
	width: 'calc(100% - 64px)',
	height: '100%',
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(isDrawerOpen && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default Wrapper;
