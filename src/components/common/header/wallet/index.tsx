import { SvgIcon as MuiSvgIcon, SvgIconProps } from '@mui/material';
import { FC, SVGProps, useContext } from 'react';
import { ReactComponent as Coin } from 'assets/svg/coin.svg';
import { useNavigate } from 'react-router';
import { AuthContext } from 'utils/context/auth';
import ButtonSG from 'components/common/button';

type CustSvgProps = SvgIconProps<'svg', { component: FC<SVGProps<SVGSVGElement>> }>;
const SvgIcon = MuiSvgIcon as FC<CustSvgProps>;

const Wallet: FC = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	return (
		<ButtonSG variant='outlined' onClick={(): void => navigate('wallet')}>
			<SvgIcon component={Coin} viewBox='0 0 20 20' sx={{ marginRight: '25px', height: 20, width: 20 }} />
			{user.tokens}
		</ButtonSG>
	);
};

export default Wallet;
