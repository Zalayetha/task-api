import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../utils/prisma.js";
import { changeStatusSchema, taskSchema } from "./schema.js";
export const taskRouter = new Hono()

  // To get all the task
  .get("/", async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const tasks = await prisma.tasks.findMany();
    return c.json(tasks);
  })

  //   To get specific task by using id
  .get("/:id", async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const task = await prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });
    return c.json(task ?? { message: "Task not found" });
  })

  //   To insert task
  .post("/", zValidator("json", taskSchema), async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const body = c.req.valid("json");
    const newTask = await prisma.tasks.create({
      data: {
        title: body.title,
        description: body.description,
        assignee: body.assignee,
        priority: body.priority,
        status: body.status,
        startDate: body.startDate,
        dueDate: body.dueDate,
      },
    });
    return c.json(newTask ?? { message: "Failed create task" }, 201);
  })

  //   To update task
  .patch("/:id", zValidator("json", taskSchema), async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const body = c.req.valid("json");
    const task = await prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      return c.json({ message: "Failed update task. [Task Not Found]" });
    }
    const updatedTask = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        description: body.description,
        assignee: body.assignee,
        priority: body.priority,
        status: body.status,
        startDate: body.startDate,
        dueDate: body.dueDate,
        updatedAt: new Date(),
      },
    });
    return c.json(updatedTask ?? { message: "Failed update task." });
  })
  //   To delete task
  .delete("/:id", async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const task = await prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      return c.json({ message: "Failed delete task. [Task Not Found]" });
    }
    await prisma.tasks.delete({
      where: {
        id: Number(id),
      },
    });
    return c.json({ message: "Successfully delete task" });
  })

  //   To set status to in progress
  .post("/:id/start", async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const task = await prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      return c.json({ message: "Failed change status [Task Not Found]" });
    }
    const newTask = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "in_progress",
      },
    });
    return c.json(newTask, 201);
  })

  // To set status to in_review
  .post("/:id/submit", async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const task = await prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      return c.json({ message: "Failed change status [Task Not Found]" });
    }
    const newTask = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "in_review",
      },
    });
    return c.json(newTask, 201);
  })
  // To set status to done
  .post("/:id/complete", async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const task = await prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      return c.json({ message: "Failed change status [Task Not Found]" });
    }
    const newTask = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "done",
      },
    });
    return c.json(newTask, 201);
  })
  // To set status to todo
  .post("/:id/reopen", async (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const task = await prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      return c.json({ message: "Failed change status [Task Not Found]" });
    }
    const newTask = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "todo",
      },
    });
    return c.json(newTask, 201);
  });
