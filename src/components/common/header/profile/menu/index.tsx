import { FC, useContext } from 'react';
import {
	ClickAwayListener,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Popper,
	Typography,
	Icon,
} from '@mui/material';
import Flex from 'components/common/wrapper/flex';
import { stateSetter } from 'utils/types/state';
import { AuthContext } from 'utils/context/auth';
import { uuid } from 'utils/functions';
import ClientMenu from '../../data/client-menu.json';
import AdminMenu from '../../data/admin-menu.json';

interface ProfileMenuProps {
	anchor: HTMLElement | null;
	setAnchor: stateSetter<HTMLElement | null>;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ anchor, setAnchor }) => {
	const { user, logout } = useContext(AuthContext);
	const items = user.role === 'client' ? ClientMenu : AdminMenu;

	return (
		<Popper placement='bottom-end' disablePortal open={anchor !== null} anchorEl={anchor}>
			<ClickAwayListener onClickAway={(): void => setAnchor(null)}>
				<Flex
					color={(theme): string => theme.palette.secondary.main}
					boxShadow={(theme): string => theme.shadows[2]}
					bgcolor={(theme): string => theme.palette.background.paper}
					width='300px'
					py={2}>
					<Typography textAlign='center' sx={{ color: '#000' }} width='100%'>
						{user.email}
					</Typography>
					<List style={{ width: '100%' }}>
						{items.map((item) => (
							<ListItem key={`item-title-${uuid()}`}
								disablePadding sx={{ display: 'block' }} onClick={logout}>
								<ListItemButton
									disableRipple
									sx={{
										minHeight: 48,
										justifyContent: 'center',
										px: 2.5,
									}}>
									<ListItemIcon
										sx={{
											width: '45%',
											justifyContent: 'flex-end',
											paddingRight: 3,
										}}>
										<Icon>{item.icon}</Icon>
									</ListItemIcon>
									<ListItemText
										primary={item.title}
										sx={{ opacity: 1, width: '50%', color: '#000' }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Flex>
			</ClickAwayListener>
		</Popper>
	);
};

export default ProfileMenu;
