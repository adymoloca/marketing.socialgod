import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import WithViewWrapper from 'utils/hoc/view-wrapper';
import Wrapper from 'components/common/wrapper/main';
import { useAppSelector } from 'store/hooks';
import { RouteProps } from '../index.interfaces';

const StaffRouteBase: FC<RouteProps> = ({ role, redirectPath = '/shop/dashboard' }) => {
	const { isDrawerOpen } = useAppSelector((state) => state.utils);

	if (role === 'admin') {
		return (
			<Wrapper isDrawerOpen={isDrawerOpen}>
				<Outlet />
			</Wrapper>
		);
	}

	return <Navigate to={redirectPath} replace />;
};

const StaffRoute = WithViewWrapper<RouteProps>(StaffRouteBase, 'admin');

export default StaffRoute;
