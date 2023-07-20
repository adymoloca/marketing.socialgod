import { FC, Fragment, useState } from 'react';
import { Divider } from '@mui/material';
import { UserRole } from 'utils/types/role';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleDrawer } from 'store/slices/utils';
import { uuid } from 'utils/functions';
import DrawerHeader from './drawer-header';
import MenuTabs from './menu-items';
import AdminMenu from './data/admin-menu.json';
import ClientMenu from './data/client-menu.json';
import { Drawer, MenuDivider, MenuWrapper, SectionTitle } from './index.styled';

interface SideDrawerProps {
	role: UserRole;
}

export interface MenuItem {
	type?: string;
	title: string;
	icon: string;
	url: string;
	children?: MenuItem[];
}

const SideDrawer: FC<SideDrawerProps> = ({ role }) => {
	const { isDrawerOpen } = useAppSelector((state) => state.utils);
	const dispatch = useAppDispatch();
	const [favorites, setFavorites] = useState<MenuItem[]>(
		role === 'admin'
			? AdminMenu.filter((el) => el.title === 'favorites')[0]?.children || []
			: ClientMenu.filter((el) => el.title === 'favorites')[0]?.children || []
	);
	const removeFromFavorites = (item: MenuItem): void =>
		setFavorites((prev) => {
			const temp = prev.filter((el) => el !== item);
			return temp;
		});
	const addToFavorites = (item: MenuItem): void =>
		setFavorites((prev) => {
			const temp = [...prev];
			temp.push(item);
			return temp;
		});

	return (
		<Drawer variant='permanent' open={isDrawerOpen}>
			<DrawerHeader
				open={isDrawerOpen}
				closeDrawer={(): { payload: undefined; type: 'utils/toggleDrawer' } => dispatch(toggleDrawer())}
			/>
			<Divider />
			{/* ****************| MENU ACTIONS |************************* */}
			<MenuWrapper>
				{(role === 'admin' ? AdminMenu : ClientMenu).map(
					(el) =>
						(!!el.children?.length || (el.title === 'favorites' && !!favorites.length)) && (
							<Fragment key={`menu-tabs-${uuid()}`}>
								{isDrawerOpen ? <SectionTitle>{el.title.toUpperCase()}</SectionTitle> : <MenuDivider />}
								<MenuTabs
									favorites={favorites}
									removeFromFavs={removeFromFavorites}
									addToFavs={addToFavorites}
									menuItems={el.title === 'favorites' ? favorites : el?.children || []}
								/>
							</Fragment>
						)
				)}
			</MenuWrapper>
		</Drawer>
	);
};

export default SideDrawer;
