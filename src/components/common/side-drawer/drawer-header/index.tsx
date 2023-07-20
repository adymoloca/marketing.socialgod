import { ChevronLeft } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

const Wrapper: FC<{ children: ReactNode }> = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface IProps {
	open: boolean;
	closeDrawer: () => void;
}

const DrawerHeader: FC<IProps> = ({ open, closeDrawer }) => (
	<Wrapper>
		<IconButton onClick={closeDrawer}>
			<ChevronLeft
				fontSize='large'
				sx={{
					transform: `rotate(${open ? 0 : 180}deg)`,
					transition: 'all 0.3s ease-in',
				}}
			/>
		</IconButton>
	</Wrapper>
);

export default DrawerHeader;
