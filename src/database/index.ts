import { Pool } from "pg";
import { env } from "../config/env"
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./Schemas"

const pool = new Pool({
    connectionString: env("DATABASE_URL")
})

export const db = drizzle(pool, {schema})