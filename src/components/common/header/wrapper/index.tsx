import { AppBar as MuiAppBar, AppBarProps, styled, Toolbar } from '@mui/material';
import { drawerWidth } from 'components/common/side-drawer/index.styled';
import { FC, ReactNode } from 'react';

interface CustAppBarProps extends AppBarProps {
	isDrawerOpen?: boolean;
}
const AppBar: FC<CustAppBarProps> = styled(MuiAppBar as FC<CustAppBarProps>, {
	shouldForwardProp: (prop: string) => prop !== 'isDrawerOpen',
})(({ theme, isDrawerOpen }) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: 'none',
	padding: '0 6px',
	border: `1px solid ${theme.palette.divider}`,
	zIndex: theme.zIndex.drawer + 1,
	width: 'calc(100% - 64px)',
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

interface HeaderWrapperProps {
	isDrawerOpen: boolean;
	children?: ReactNode;
}

const HeaderWrapper: FC<HeaderWrapperProps> = ({ isDrawerOpen, children }) => (
	<AppBar position='fixed' isDrawerOpen={isDrawerOpen}>
		<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '30px' }}>
			{children}
		</Toolbar>
	</AppBar>
);

HeaderWrapper.defaultProps = {
	children: '',
};

export default HeaderWrapper;
