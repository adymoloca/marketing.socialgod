import { useCallback, useEffect, useState } from 'react';
import { User } from 'utils/interfaces/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { invalidateUser, validateUser } from 'store/slices/utils';
import { stateSetterParam } from 'utils/types/state';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import {
	IReset,
	LoginData,
	RegisterData,
	getRecoveryCode,
	loginUser,
	logoutUser,
	patchNewPasswod,
	registerUser,
} from './index.actions';
import useLocalStorage from '../../use-local-storage';

export interface AuthReturnType {
	user: User;
	login: (user: LoginData) => void;
	logout: () => void;
	register: (user: RegisterData) => void;
	updateUser: (param: stateSetterParam<User>) => void;
	loading: boolean;
	message: string;
	recovery: (email: string, onSuccess?: () => void) => void;
	resetPassword: (params: IReset, onSuccess?: () => void) => void;
}

function useAuth(): AuthReturnType {
	const [user, setUser] = useLocalStorage<User>('user');
	const [message, setMessage] = useState<string>('');
	const [[authLoading], toggleLoading] = useLoaders<[boolean]>(false);
	const toggleL = (): void => toggleLoading(0);
	const { isUserValid } = useAppSelector((state) => state.utils);
	const dispatch = useAppDispatch();
	const { success, error } = useNotificationsContext();

	useEffect(() => {
		!isUserValid && setUser(null);
	}, [isUserValid, setUser]);

	const login = useCallback(
		async (u: LoginData) => {
			toggleL();
			try {
				const response = await loginUser(u);
				if (typeof response !== 'string') {
					setUser(response.user);
					dispatch(validateUser());
					success(response.message);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
				error('Sign in failed.');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setUser, dispatch]
	);

	const logout = useCallback(
		async () => {
			toggleL();
			try {
				await logoutUser();
				setUser(null);
				dispatch(invalidateUser());
				success('Logged out!');
			} catch (errorMessage) {
				console.error(errorMessage);
				error('Logout failed!');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setUser, dispatch]
	);

	const register = useCallback(
		async (u: RegisterData) => {
			toggleL();
			try {
				const response = await registerUser(u);
				if (typeof response !== 'string') {
					setUser(response.user);
					dispatch(validateUser());
					success(response.message);
				}
			} catch (errorMessage) {
				console.log(errorMessage);
				error('Sign up failed.');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setUser, dispatch]
	);

	const updateUser = useCallback(
		async (param: stateSetterParam<User>) => {
			toggleL();
			try {
				if (typeof param === 'function') setUser(param(user ?? ({} as User)));
				else setUser(param);
				// dispatch(validateUser());
			} catch (errorMessage) {
				console.error(errorMessage);
				error('Update failed!');
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setUser, user]
	);

	const recovery = useCallback(
		async (email: string, onSuccess?: () => void) => {
			toggleL();
			try {
				const response = await getRecoveryCode(email);
				console.log(response);
				if (typeof response !== 'string') {
					setMessage(response.message);
					onSuccess && onSuccess();
					success(response.message);
				}
			} catch (errorMessage) {
				console.error(errorMessage);
				error("Couldn't sent the recovery Code.");
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setMessage]
	);

	const resetPassword = useCallback(
		async (params: IReset, onSuccess?: () => void) => {
			toggleL();
			try {
				const response = await patchNewPasswod(params);
				console.log(response);
				if (typeof response !== 'string') {
					setUser(response.user);
					dispatch(validateUser());
					onSuccess && onSuccess();
					success(response.message);
				}
			} catch (errorMessage) {
				console.log(errorMessage);
				error("Couldn't reset the password.");
			} finally {
				toggleL();
			}
		},
		// eslint-disable-next-line
		[setUser]
	);

	return {
		user: user || ({ role: 'guest' } as User),
		loading: authLoading,
		login,
		logout,
		register,
		updateUser,
		message,
		recovery,
		resetPassword,
	};
}

export default useAuth;
