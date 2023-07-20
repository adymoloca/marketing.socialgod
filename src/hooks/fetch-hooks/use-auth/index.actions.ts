import { AxiosError } from 'axios';
import { request, requestClient } from 'utils/config/axios';
import { decryptData, encryptData } from 'utils/functions/decript';
import { User } from 'utils/interfaces/user';

export interface LoginData {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface RegisterData {
	email: string;
	password: string;
	referral?: string;
}

export interface IReset {
	recoveryCode: string;
	password: string;
}

async function loginUser(params: LoginData): Promise<{ user: User; message: string } | string> {
	try {
		const encParams = encryptData(params);
		const encryptedResponse = await request.post('auth/login', encParams);
		const data = decryptData(encryptedResponse);
		return {
			user: { email: data.user.email, role: data.user.role, tokens: data.user.tokens || 0 },
			message: 'User signed up successfully!',
		};
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to login.');
	}
}

async function logoutUser(): Promise<string> {
	try {
		const res = await request.patch('auth/logout');
		const data = res.data as unknown as { message: string };
		return data.message;
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to logout.');
	}
}

async function registerUser(params: RegisterData): Promise<{ user: User; message: string } | string> {
	try {
		const encSendParams = encryptData(params);
		const encryptedResponse = await request.post('auth/', encSendParams);
		const data = decryptData(encryptedResponse);
		return { user: { email: data.user.email, role: 'client', tokens: 0 }, message: 'User signed up successfully!' };
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to register.');
	}
}

async function updateUserObject(): Promise<{ user: User; message: string } | string> {
	try {
		const encryptedResponse = await requestClient.get('profile');
		const data = decryptData(encryptedResponse);
		return {
			user: {
				email: data.user.profile.email,
				role: data.user.profile.role,
				tokens: data.user.profile.tokens || 0,
			},
			message: 'User successfully updated!',
		};
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to update user.');
	}
}

async function getRecoveryCode(email: string): Promise<{ message: string } | string> {
	try {
		const encSendParams = encryptData({ email });
		const res = await request.patch('auth/recovery', encSendParams);
		return { message: res?.data?.message || 'Check your email!' };
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { message: string };
		return data.message;
	}
}

async function patchNewPasswod(params: IReset): Promise<{ user: User; message: string } | string> {
	try {
		const encSendParams = encryptData(params);
		const encryptedResponse = await request.patch('auth/reset', encSendParams);
		const data = decryptData(encryptedResponse);
		return {
			user: { email: data.user.email, role: data.user.role, tokens: data.user.tokens || 0 },
			message: 'User signed up successfully!',
		};
	} catch (e) {
		const error = e as unknown as AxiosError;
		const data = error.response?.data as { message: string };
		return data.message;
	}
}

export { loginUser, logoutUser, registerUser, updateUserObject, getRecoveryCode, patchNewPasswod };
