import z from "zod";
export const taskSchema = z.object({
	title: z.string().min(5),
	description: z.string().min(5),
	userId: z.int().min(1),
	priority: z.enum(["low", "medium", "high"]),
	status: z.enum(["todo", "in_progress", "in_review", "done"]),
	startDate: z.coerce.date(),
	dueDate: z.coerce.date(),
});
export const changeStatusSchema = z.object({
	status: z.enum(["todo", "in_progress", "in_review", "done"]),
});
