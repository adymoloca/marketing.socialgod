import { Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { capitalize, uuid } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import { ExpandLess, ExpandMore, HorizontalRule } from '@mui/icons-material';
import { useAppSelector } from 'store/hooks';
import PinToggle from 'components/common/button/pin-toggle';
import { MenuItem } from '../menu-items';

interface IState {
	menuTab: MenuItem;
	favorites: MenuItem[];
	removeFromFavs: (item: MenuItem) => void;
	addToFavs: (item: MenuItem) => void;
}

const MenuCollapsed: FC<IState> = ({ menuTab, favorites, addToFavs, removeFromFavs }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const { isDrawerOpen } = useAppSelector((state) => state.utils);
	const [childButtonHovered, setChildButtonHovered] = useState('');

	const handleClick = (): void => {
		const callbackNeeded = isDrawerOpen
			? (): void => setOpen((prev) => !prev)
			: (): void => menuTab?.children && navigate(menuTab?.children[0]?.url);
		callbackNeeded();
	};

	return (
		<>
			<ListItemButton
				onClick={handleClick}
				disableRipple
				sx={{
					minHeight: 48,
					justifyContent: 'initial',
					pl: 2.5,
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: 3,
						justifyContent: 'center',
					}}
				>
					<Icon color={menuTab?.children?.some((el) => pathname.includes(el.url)) ? 'primary' : 'inherit'}>
						{menuTab.icon}
					</Icon>
				</ListItemIcon>
				{isDrawerOpen && <ListItemText primary={capitalize(t(menuTab?.title))} />}
				{isDrawerOpen &&
					(open ? <ExpandLess sx={{ color: '#696969' }} /> : <ExpandMore sx={{ color: '#696969' }} />)}
			</ListItemButton>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					{isDrawerOpen &&
						menuTab?.children?.map((child, index) => (
							<ListItemButton
								onMouseOver={(): void => setChildButtonHovered(`${child.url}-${index}`)}
								onMouseLeave={(): void => setChildButtonHovered('')}
								key={uuid()}
								sx={{ pl: 5 }}
								onClick={(): void => navigate(child?.url)}
								disableRipple
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 2,
										justifyContent: 'center',
									}}
								>
									<HorizontalRule
										color={pathname.includes(child?.url) ? 'primary' : 'inherit'}
										fontSize='small'
									/>
								</ListItemIcon>
								{isDrawerOpen && (
									<>
										<ListItemText
											primary={capitalize(t(child?.title))}
											primaryTypographyProps={{ fontSize: '14px' }}
										/>
										{childButtonHovered === `${child.url}-${index}` && (
											<PinToggle
												pinned={favorites?.includes(child)}
												onClick={(): void =>
													favorites?.includes(child)
														? removeFromFavs(child)
														: addToFavs(child)
												}
											/>
										)}
									</>
								)}
							</ListItemButton>
						))}
				</List>
			</Collapse>
		</>
	);
};

export default MenuCollapsed;
