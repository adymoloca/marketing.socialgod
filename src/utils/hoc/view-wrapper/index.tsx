/* eslint-disable arrow-body-style */
import { Header, SideDrawer } from 'components/common';
import { ComponentType, FC } from 'react';
import { UserRole } from 'utils/types/role';

const WithViewWrapper = <P extends object>(Component: ComponentType<P>, role: UserRole): FC<P> => {
	return (props: P): JSX.Element => {
		return (
			<>
				<SideDrawer role={role} />
				<Header />
				<Component {...props} />
			</>
		);
	};
};

export default WithViewWrapper;
