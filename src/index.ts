import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { taskRouter } from "./modules/tasks/router.js";

const app = new Hono().route("/tasks", taskRouter);
serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
