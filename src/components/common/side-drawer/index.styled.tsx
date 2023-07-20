import {
	Box,
	BoxProps,
	CSSObject,
	Divider as MuiDivider,
	DividerProps,
	DrawerProps,
	Drawer as MuiDrawer,
	Theme,
	Typography,
	TypographyProps,
	styled,
} from '@mui/material';
import { FC } from 'react';

export const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer: FC<DrawerProps> = styled(MuiDrawer, { shouldForwardProp: (prop: string) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	})
);

const MenuWrapper: FC<BoxProps> = styled(Box)({
	overflowY: 'auto',
	paddingTop: '25px',
	'::-webkit-scrollbar': {
		width: '8px',
	},
	'::-webkit-scrollbar-thumb': {
		border: 'none',
	},
});

const MenuDivider: FC<DividerProps> = styled(MuiDivider)(({ theme }) => ({
	border: `2px solid ${theme.palette.primary.light}`,
	marginTop: '8px',
	width: '100%',
}));

const SectionTitle: FC<TypographyProps> = styled(Typography)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	color: theme.palette.primary.light,
	fontWeight: '550',
	fontStyle: 'oblique',
	fontSize: 12,
	padding: '0 20px',
	width: '100%',
	'&::before': {
		content: '""',
		height: '4px',
		backgroundColor: theme.palette.primary.light,
		flexGrow: 1, // both lines will expand to occupy the available space
		marginRight: 5,
	},
}));

export { Drawer, MenuWrapper, SectionTitle, MenuDivider };
