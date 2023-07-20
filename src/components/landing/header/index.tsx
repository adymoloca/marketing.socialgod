import React, { FC, useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material';
import { Close, Menu } from '@mui/icons-material';
import Logo from 'components/common/logo';
import { useNavigate } from 'react-router-dom';
import { uuid } from 'utils/functions';
import { Icon } from '@iconify/react';
import { ButtonSG } from 'components/common';
import { NavButton } from './components/NavButton';
import { LogoBoxAnimation } from './components/LogoBoxAnimation';

const drawerWidth = '100%';
const navItems = [
	{ name: 'Products', path: '/products' },
	{ name: 'Prices', path: '/prices' },
	{ name: 'Subscriptions', path: '/subscriptions' },
	{ name: 'Discounts', path: '/discounts' },
];
const LOGO = 'https://storage.googleapis.com/sbdcloud/1688720650889-socialgod-logo.png';
const LandingHeader: FC = (): JSX.Element => {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const handleDrawerToggle = (): void => {
		setMobileOpen((prevState) => !prevState);
	};
	
	const drawer = (
		<Box onClick={handleDrawerToggle}>
			<IconButton size='large'>
				<Close />
			</IconButton>
			<Box marginLeft={3}>
				<Box >
					<LogoBoxAnimation>
						<Box
							component='img'
							sx={{ width: '150px', height: 'auto' }}
							src={LOGO}
						/>
					</LogoBoxAnimation>
				</Box>
				<List >
					{navItems.map((item) => (
						<ListItem key={`item-name-${uuid()}`} disablePadding >
							<NavButton key={item.name} to={item.path}>{item.name}</NavButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	);

	return (
		<Box
			sx={{
				display: 'flex',
				width: { lg: '1200px', xs: '100%' },
				height: '60px',
				justifyContent: 'center',
				backgroundColor: '#000',
			}}>
			<Toolbar
				sx={{
					width: '100%',
					height: '60px',
					display: 'flex',
					justifySelf: 'center',
					justifyContent: 'space-between',
					backgroundColor: '#fff',
					color: '#000',
					gap: { lg: 3, xs: 1 },
					alignItems: 'center'
				}}>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					edge='start'
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { md: 'none' } }}>
					<Menu />
				</IconButton>
				<LogoBoxAnimation sx={{ display: { xs: 'none', sm: 'block' } }} onClick={(): void => navigate('/')}>
					<Logo />
				</LogoBoxAnimation>
				<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', height: '100%' }}>
					{navItems.map((item) => (
						<NavButton key={item.name} to={item.name}>{item.name}</NavButton>
					))}
				</Box>
				{/* <SignInButton /> */}
				<Box>
					<ButtonSG shadow variant='outlined'><Typography>Login</Typography></ButtonSG>
					<ButtonSG shadow hover> 
						<Typography marginRight={2}>Get started</Typography> 
						<Icon icon='maki:arrow'/>
					</ButtonSG>
				</Box>
			</Toolbar>
			<Box component='nav'>
				<Drawer
					anchor='right'
					container={window.document.body}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};
export default LandingHeader;
