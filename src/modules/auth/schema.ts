import z from "zod";

export const CreateAdminSchema = z.object({
	email: z.email(),
	name: z.string().min(1),
	password: z.string().min(8),
});
