import React, { FC, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Flex, Heading } from 'components/common';
import useBlog, { IBlog } from 'hooks/fetch-hooks/use-blogs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { uuid } from 'utils/functions';
import { BlogCategory, IBlogComponent } from './index.interfaces';
import EditContainer from '../components/edit-container';
import { AddBlogWrapper } from './index.styled';

const initialTemplate: IBlogComponent[] = [
	{
		type: 'Heading',
		content: 'Title 0',
		color: '#000000',
		textAlign: 'center',
		fontSize: 70,
		deletable: false,
	},
	{
		type: 'Image',
		content: '',
		image: true,
		textAlign: 'center',
		deletable: true,
	} as IBlogComponent,
];

const AddBlogs: FC = (): JSX.Element => {
	const { addBlog } = useBlog();
	const [blog, setBlog] = useState<IBlogComponent[]>(initialTemplate);
	const [category, setCategory] = useState<string>('All');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const allCategories: BlogCategory[] = ['All', 'Reddit', 'Twitter', 'Instagram'];

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleAddCategory = (type: BlogCategory): void => {
		const categoryAdd = (): void => {
			if (category.includes('All')) setCategory(type);
			else if (category.includes(type))
				setCategory((prev) => {
					prev.slice(prev.indexOf(type) - 2, prev.indexOf(type) + type.length + 1);
					return prev;
				});
			else if (category.includes(', ')) setCategory('All');
			else setCategory((prev) => `${prev}, ${type}`);
		};
		switch (type) {
			case 'All': {
				setCategory('All');
				break;
			}
			case 'Reddit': {
				categoryAdd();
				break;
			}
			case 'Instagram': {
				categoryAdd();
				break;
			}
			case 'Twitter': {
				categoryAdd();
				break;
			}
			default: {
				break;
			}
		}
	};

	console.log(category);

	return (
		<Flex>
			<AddBlogWrapper>
				<Heading>Add blogs</Heading>
				<Button
					sx={{ width: 150, height: 30 }}
					onClick={(): void => {
						const temp: IBlog = {
							title: blog[0].content,
							data: JSON.stringify(blog),
							categories: category.split(', '),
							image: blog[1].content,
						};
						addBlog(temp);
					}}>
					Create Blog
				</Button>
				<Button
					onClick={(e): void => handleClick(e)}
					endIcon={!anchorEl ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}>
					{category}
				</Button>
				<Menu
					id='simple-menu'
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={(): void => setAnchorEl(null)}>
					{allCategories.map((item: BlogCategory) => (
						<MenuItem
							key={`${uuid()}`}
							onClick={(): void => handleAddCategory(item)}
							sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography>{item}</Typography>
							{!category.includes(item) ? <CheckCircleOutlineIcon /> : <CheckCircleIcon />}
						</MenuItem>
					))}
				</Menu>
			</AddBlogWrapper>
			<Box sx={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'center' }}>
				<EditContainer blog={blog} setBlog={setBlog} />
			</Box>
		</Flex>
	);
};

export default AddBlogs;
