'use client';
import { logoutAction } from '@/actions/logout.action';
import useAuthStore from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

export default function DashboardMain() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { user, logout } = useAuthStore();
	async function handelLogout() {
		setLoading(true);
		await logoutAction();
		logout();
		router.push('/auth/login');
		setLoading(false);
	}
	return (
		<div className='flex flex-col gap-5 justify-center items-center'>
			<h2>user info</h2>
			<p>id: {user?.id}</p>
			<p>name: {user?.username}</p>

			<Button disabled={loading} onClick={handelLogout}>
				logout
			</Button>
		</div>
	);
}
