import { Fab } from '@mui/material';
import React, { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IBlogComponent } from '../add-blogs/index.interfaces';
import BlogAddMenu from './sub-components/menu';
import BlogAddModal from './sub-components/modal';
import { handleChangeProperty, handleFindComponent, handlePushComponent } from '../functions';
import { EditContainerWrapper } from '../add-blogs/index.styled';

interface IProps {
	blog: IBlogComponent[];
	setBlog: React.Dispatch<React.SetStateAction<IBlogComponent[]>>;
}

const EditContainer: FC<IProps> = (props): JSX.Element => {
	const { setBlog, blog } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = (index: number): void => {
		setCurrentIndex(index);
		setOpen(true);
	};

	const handleClose = (): void => setOpen(false);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = (): void => {
		setAnchorEl(null);
	};

	const handleAddComponent = (component: string): void => {
		setBlog((prevValue) => [...prevValue, handlePushComponent(component, blog.length)]);
		handleCloseMenu();
	};

	const handleInputChange = (value: string, type: string): void => {
		setBlog((prevValue) => {
			const temp = prevValue;
			temp[currentIndex] = handleChangeProperty(temp[currentIndex], value, type);
			return temp;
		});
	};

	const handleDelete = (index: number): void => {
		setBlog((prev) => {
			prev.splice(index, 1);
			return prev;
		});
	};

	return (
		<EditContainerWrapper>
			{blog.map(
				(component: IBlogComponent, index: number): JSX.Element => (
					<React.Fragment key={`${component.content}`}>
						{handleFindComponent(component, 'edit', index + 1, handleOpen)}
					</React.Fragment>
				)
			)}
			<Fab size='large' onClick={handleClick}>
				<AddIcon />
			</Fab>
			<BlogAddMenu
				anchorEl={anchorEl}
				handleAddComponent={handleAddComponent}
				handleCloseMenu={handleCloseMenu}
			/>
			<BlogAddModal
				open={open}
				handleClose={handleClose}
				blog={blog}
				currentIndex={currentIndex}
				handleInputChange={handleInputChange}
				handleDelete={(): void => handleDelete(currentIndex)}
			/>
		</EditContainerWrapper>
	);
};

export default EditContainer;
