import { MoreVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import ProfileMenu from './menu';

const Profile: FC = () => {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

	return (
		<>
			<IconButton onClick={(e): void => setMenuAnchor(e.currentTarget)}>
				<MoreVert />
			</IconButton>
			<ProfileMenu anchor={menuAnchor} setAnchor={setMenuAnchor} />
		</>
	);
};

export default Profile;
