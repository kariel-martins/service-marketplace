import dotenv from "dotenv"
import path from "node:path"
import { AppError } from "../core/Errors/AppError"

const nodeEnv = process.env.NODE_ENV || "development"
const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`)

dotenv.config({path: envPath})

export function env(key: string) {
    const val = process.env[key]

    if (!val) throw new AppError(`Variavel de ambiente ${key} não definida!`, 500, "config/env.ts")

    return val

}