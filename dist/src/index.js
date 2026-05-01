import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRouter } from "./modules/auth/router.js";
import { taskRouter } from "./modules/tasks/router.js";

const app = new Hono().route("/tasks", taskRouter).route("/auth", authRouter);
serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
