import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from './login-form';

export default function LoginLayout() {
	return (
		<div className='bg-[#E9ECF2] flex flex-col md:flex-row gap-5 px-5 md:px-10 min-h-svh relative overflow-hidden'>
			<div className='size-[667px] bg-[#E477F6] blur-[400px] absolute -top-[30%] right-[10%]'></div>
			<div className='size-[667px] bg-[#9E77F6] blur-[400px] absolute top-[70%] -right-[20%]'></div>
			<div className='size-[667px] bg-[#B0D2E5] opacity-60 blur-[400px] absolute top-[70%] -left-[20%]'></div>

			<div className='md:max-w-[554px] flex justify-center items-center flex-2'>
				<div className='md:max-w-[381] flex flex-col gap-9 justify-center items-center z-10'>
					<div className='flex-col gap-2 font-[ABeeZee]'>
						<h1 className='text-4xl md:text-[56px] text-center text-[#1A1A1E]'>Welcome back</h1>
						<p className='md:text-lg text-center text-[#62626B]'>
							Step into our shopping metaverse for an unforgettable shopping experience
						</p>
					</div>

					<LoginForm />

					<div className='text-[#62626B] text-sm'>
						Don&apos;t have an account?
						<Link href='#'> Sign up</Link>
					</div>
				</div>
			</div>
			<div className='hidden md:flex flex-col flex-3 justify-center items-center'>
				<div className='size-full relative'>
					<Image
						src='/images/Frame 1216257798.png'
						alt='login-image'
						fill
						className='w-full max-w-[826px] h-auto mx-auto'
					/>
				</div>
			</div>
		</div>
	);
}
