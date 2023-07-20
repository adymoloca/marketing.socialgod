import * as React from 'react';
import { Close, QuestionMark } from '@mui/icons-material';
import { Avatar, Box, Icon, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, useTheme } from '@mui/material';
import { uuid } from 'utils/functions';
import { questionMenuData } from './questionMenuData';

const QuestionsMenu: React.FC = () => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mb: 2 }}>
				<Tooltip title='Help menu'>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}>
						<Avatar sx={{ width: 32, height: 32 }}>
							{open ? <Close /> : <QuestionMark sx={{ color: `${theme.palette.primary.main}` }} />}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				sx={{
					'.MuiMenu-paper': {
						elevation: 0,
						style: {
							overflow: 'visible',
							mb: 2,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
						},
						backgroundColor: '#3B444B',
						color: '#fff',
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
				{questionMenuData?.map((item, _index) => (
					<MenuItem
						key={`question-men-${uuid}`}
						sx={{ ':hover': { backgroundColor: '#232B2B' } }}
						onClick={handleClose}>
						<ListItemIcon>
							<Icon sx={{ color: '#fff', fontSize: '20px' }}>{item.icon}</Icon>
						</ListItemIcon>
						{item.titler}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default QuestionsMenu;
