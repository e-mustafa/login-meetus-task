import z from 'zod';

export const loginSchema = z.object({
	email: z.email({ message: 'invalid email' }),
	password: z.string().min(6, { message: 'password must be at least 6 characters' }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const defaultData_login = {
	email: '',
	password: '',
};
