import { UserRole } from 'utils/types/role';

export interface RouteProps {
	role: UserRole;
	redirectPath?: string;
}
