import z, { email } from "zod";

export const CreateAdminSchema = z.object({
	email,
});
