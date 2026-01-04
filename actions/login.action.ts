'use server';

import { isPROD } from '@/configs/general';
import { TLoginSchema } from '@/validation/login.validation';
import { cookies } from 'next/headers';

const API_BASE_URL = 'https://api-yeshtery.dev.meetusvr.com/v1';

type LoginResponse = {
	token: string;
	refresh: string;
	message: string;
	status: number;
};

type ActionState = {
	success: boolean;
	status: number;
	message: string;
	user?: {
		id: string;
		email: string;
		username: string;
	};
};

export type UserInfoResponse = {
	id: string;
	name: string;
	email?: string;
	[key: string]: any;
};

/**
 * Fetch user info from API using access token
 */
export async function getUserInfo(token?: string): Promise<UserInfoResponse | null> {
	try {
		const cookieStore = await cookies();

		const accessToken = token ?? cookieStore.get('access_token')?.value;

		if (!accessToken) return null;

		const res = await fetch(`${API_BASE_URL}/user/info`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!res.ok) return null;

		const userInfo: UserInfoResponse = await res.json();
		return userInfo;
	} catch (error) {
		console.error('getUserInfo error:', error);
		return null;
	}
}

export async function loginAction(prevState: ActionState, formData: TLoginSchema): Promise<ActionState> {
	try {
		// Step 1: Login API call
		const loginResponse = await fetch(`${API_BASE_URL}/yeshtery/token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
				orgId: 2,
				isEmployee: true,
			}),
		});

		const loginData: LoginResponse = await loginResponse.json();

		if (!loginResponse.ok || !loginData.token) {
			return {
				success: false,
				status: loginData.status || loginResponse.status,
				message: loginData.message || 'Invalid email or password',
			};
		}

		const accessToken = loginData.token;

		const cookieStore = await cookies();
		cookieStore.set('access_token', accessToken, {
			httpOnly: true,
			secure: isPROD,
			path: '/',
		});

		// Step 2: Fetch user info via helper
		const userInfo: UserInfoResponse | null = await getUserInfo(accessToken);

		if (!userInfo) {
			return {
				success: false,
				status: 500,
				message: 'Failed to retrieve user information',
			};
		}

		// Step 3: Return user data
		return {
			success: true,
			status: 200,
			message: 'Login successful',
			user: {
				id: userInfo.id,
				email: formData.email,
				username: userInfo.name,
			},
		};
	} catch (error) {
		console.error('Login error:', error);
		return {
			success: false,
			status: 500,
			message: 'An error occurred. Please try again.',
		};
	}
}
