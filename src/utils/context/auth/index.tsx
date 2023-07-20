import { IReset, LoginData, RegisterData } from 'hooks/fetch-hooks/use-auth/index.actions';
import React from 'react';
import { User } from 'utils/interfaces/user';
import { stateSetterParam } from 'utils/types/state';

export interface AuthContextType {
	user: User;
	login: (user: LoginData) => void;
	logout: () => void;
	register: (user: RegisterData) => void;
	updateUser: (user: stateSetterParam<User>) => void;
	loading: boolean;
	message?: string;
	recovery: (email: string, onSuccess?: () => void) => void;
	resetPassword: (params: IReset, onSuccess?: () => void) => void;
}
export const AuthContext = React.createContext<AuthContextType>({
	user: {
		role: 'guest',
		email: '',
		tokens: 0,
	},
	login: () => {},
	logout: () => {},
	register: () => {},
	updateUser: () => {},
	loading: false,
	recovery: () => {},
	resetPassword: () => {},
});
