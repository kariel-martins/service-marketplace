import { defineConfig } from "drizzle-kit"
import { env } from "./src/config/env"

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/database/Schemas.ts',
    out: './drizzle',
    dbCredentials: {
        url: env("DATABASE_URL"),
        ssl: true
    }
})