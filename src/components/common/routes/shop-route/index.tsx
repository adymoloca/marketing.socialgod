import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import WithViewWrapper from 'utils/hoc/view-wrapper';
import Wrapper from 'components/common/wrapper/main';
import { useAppSelector } from 'store/hooks';
import { RouteProps } from '../index.interfaces';

const ShopRouteBase: FC<RouteProps> = ({ role, redirectPath = '/' }) => {
	const { isDrawerOpen } = useAppSelector((state) => state.utils);

	if (role === 'client') {
		return (
			<Wrapper isDrawerOpen={isDrawerOpen}>
				<Outlet />
			</Wrapper>
		);
	}

	return <Navigate to={redirectPath} replace />;
};

const ShopRoute: FC<RouteProps> = WithViewWrapper<RouteProps>(ShopRouteBase, 'client');

export default ShopRoute;
