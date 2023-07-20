/* Imports go  here */

import { Menu, MenuItem } from '@mui/material';
import { uuid } from 'utils/functions';
import ComponentsItems from '../../data/components-items.json';

interface IProps {
	anchorEl: null | HTMLElement;
	handleCloseMenu: VoidFunction;
	handleAddComponent: (id: string, pos: number) => void;
}

const BlogAddMenu: React.FC<IProps> = (props): JSX.Element => {
	const { anchorEl, handleCloseMenu, handleAddComponent } = props;

	const openMenu = Boolean(anchorEl);

	return (
		<Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
			{ComponentsItems.map((item, index) => (
				<MenuItem key={`${uuid()}`} onClick={(): void => handleAddComponent(item.title, index)}>
					{item.title}
				</MenuItem>
			))}
		</Menu>
	);
};

export default BlogAddMenu;
