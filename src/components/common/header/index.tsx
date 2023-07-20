import { FC, useContext } from 'react';
import { AuthContext } from 'utils/context/auth';
import { useAppSelector } from 'store/hooks';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import HeaderWrapper from './wrapper';
import Wallet from './wallet';
import Flex from '../wrapper/flex';
import Profile from './profile';
import Logo from '../logo';

const Header: FC = () => {
	const { user } = useContext(AuthContext);
	const { isDrawerOpen } = useAppSelector((state) => state.utils);
	const navigate = useNavigate();

	return (
		<HeaderWrapper isDrawerOpen={isDrawerOpen}>
			<Box
				onClick={(): void =>
					user.role === 'client' ? navigate('/shop/dashboard') : navigate('/staff/dashboard')
				}>
				<Logo width='150px' />
			</Box>
			<Flex gap={2}>
				{user.role === 'client' && <Wallet />}
				<Profile />
			</Flex>
		</HeaderWrapper>
	);
};

export default Header;
