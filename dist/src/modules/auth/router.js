import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma.js";
import { LoginAdminSchema, RegisterAdminSchema } from "./schema.js";
import { hashPassword, isPasswordValid } from "./utils.js";
export const authRouter = new Hono()
	.post("/register", zValidator("json", RegisterAdminSchema), async (c) => {
		const { name, email, password } = c.req.valid("json");
		const user = await prisma.admin.findUnique({
			where: {
				email,
			},
		});
		if (user) {
			return c.json(
				{
					error: "email already exists!",
				},
				404,
			);
		}
		const hashedPassword = await hashPassword(password);
		const newUser = await prisma.admin.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		const filteredData = {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
		};
		return c.json(filteredData);
	})
	.post("/login", zValidator("json", LoginAdminSchema), async (c) => {
		const { email, password } = c.req.valid("json");
		// Check if user exists
		const user = await prisma.admin.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			return c.json(
				{
					error: "user not found!",
				},
				404,
			);
		}
		// Check if password is correct
		const isValid = await isPasswordValid(password, user.password);
		if (!isValid) {
			return c.json(
				{
					error: "invalid credential!",
				},
				401,
			);
		}
		// Authorization
		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
		const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
		if (!accessTokenSecret || !refreshTokenSecret) {
			throw new Error(
				"ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined",
			);
		}
		const accessToken = jwt.sign({ sub: user.id }, accessTokenSecret, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign({ sub: user.id }, refreshTokenSecret, {
			expiresIn: "7d",
		});
		return c.json({ accessToken, refreshToken });
	});
