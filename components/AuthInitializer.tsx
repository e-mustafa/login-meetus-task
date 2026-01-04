'use client';

import { getUserInfo } from '@/actions/login.action';
import useAuthStore from '@/stores/auth.store';
import { useEffect } from 'react';

export function AuthInitializer() {
	const setAuth = useAuthStore((state) => state.setAuth);

	useEffect(() => {
		async function init() {
			const user = await getUserInfo();
			if (user) {
				setAuth({
					id: user.id,
					email: user.email ?? '',
					username: user.name,
				});
			}
		}
		init();
	}, [setAuth]);

	return null;
}
