export default async function Layout({ children }: { children: React.ReactNode }) {
	// const res = await getUserInfo();

	// if (res?.status !== 200) {
	// 	redirect('/auth/login');
	// }

	return <main>{children}</main>;
}
