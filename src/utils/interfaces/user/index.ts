import { UserRole } from 'utils/types/role';

export interface User {
	email: string;
	role: UserRole;
	loggedIn?: true;
	rememberMe?: false;
	tokens: number;
}
