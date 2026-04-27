import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaBetterSqlite3({
	url: "file:./prisma/db.dev",
});

export const prisma = new PrismaClient({
	adapter,
});
