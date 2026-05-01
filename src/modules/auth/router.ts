import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateAdminSchema } from "./schema.js";

export const authRouter = new Hono().get(
	"/register",
	zValidator("json", CreateAdminSchema),
	async (c) => {
		const { password } = c.req.valid("json");
		return c.json({ password });
	},
);
