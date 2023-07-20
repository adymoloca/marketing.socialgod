import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { RouteProps } from '../index.interfaces';

const GuestRoute: FC<RouteProps> = ({ role, redirectPath = '/staff/dashboard' }) => {
	if (role === 'guest') {
		return <Outlet />;
	}

	return <Navigate to={redirectPath} replace />;
};

export default GuestRoute;
