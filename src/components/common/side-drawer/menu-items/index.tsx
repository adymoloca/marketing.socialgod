import { Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { capitalize, uuid } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import PinToggle from 'components/common/button/pin-toggle';
import MenuCollapsed from '../menu-collapsed';

export interface MenuItem {
	title: string;
	icon: string;
	type?: string;
	url: string;
	children?: MenuItem[];
}

interface MenuTabsProps {
	menuItems: MenuItem[];
	favorites: MenuItem[];
	removeFromFavs: (item: MenuItem) => void;
	addToFavs: (item: MenuItem) => void;
}

const MenuTabs: FC<MenuTabsProps> = ({ menuItems, favorites, removeFromFavs, addToFavs }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { t } = useTranslation();
	const { isDrawerOpen } = useAppSelector((state) => state.utils);
	const [listButtonHovered, setListButtonHovered] = useState('');

	return (
		<List sx={{ overflow: 'hidden', pt: 0 }}>
			{menuItems.map((item, index) => (
				<Fragment key={uuid()}>
					{item?.type === 'item' ? (
						<ListItem
							onMouseOver={(): void => setListButtonHovered(`${item.url}-${index}`)}
							onMouseLeave={(): void => setListButtonHovered('')}
							disablePadding
							sx={{ display: 'block' }}
							onClick={(): void => navigate(item?.url)}
						>
							<ListItemButton
								disableRipple
								sx={{
									minHeight: 40,
									justifyContent: 'initial',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: 'center',
									}}
								>
									<Icon color={pathname.includes(item?.url) ? 'primary' : 'inherit'}>
										{item.icon ? item.icon : 'horizontal_rule'}
									</Icon>
								</ListItemIcon>
								{isDrawerOpen && (
									<>
										<ListItemText primary={capitalize(t(item.title))} sx={{ opacity: 1 }} />
										{listButtonHovered === `${item.url}-${index}` && (
											<PinToggle
												pinned={favorites?.includes(item)}
												onClick={(): void =>
													favorites?.includes(item) ? removeFromFavs(item) : addToFavs(item)
												}
											/>
										)}
									</>
								)}
							</ListItemButton>
						</ListItem>
					) : (
						<Fragment key={uuid()}>
							<MenuCollapsed
								menuTab={item}
								favorites={favorites}
								addToFavs={addToFavs}
								removeFromFavs={removeFromFavs}
							/>
						</Fragment>
					)}
				</Fragment>
			))}
		</List>
	);
};

export default MenuTabs;
