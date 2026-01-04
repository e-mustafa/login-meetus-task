import { create } from 'zustand';

export type TUser = {
	id: string;
	email: string;
	role?: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	gender?: string;
	image?: string;
};

export type TAuthStore = {
	user: TUser | null;
	isAuthenticated: boolean;
	setAuth: (user: TUser) => void;
	logout: () => void;
};

const useAuthStore = create<TAuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	setAuth: (user: TUser) => set({ user, isAuthenticated: true }),
	logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
