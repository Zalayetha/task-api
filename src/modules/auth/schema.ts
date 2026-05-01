import z from "zod";

export const RegisterAdminSchema = z.object({
	email: z.email(),
	name: z.string().min(1),
	password: z.string().min(8),
});

export const LoginAdminSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});
