import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./AppError";
import { env } from "../../config/env";
import { ZodError } from "zod";

const DEBUG = env("DEBUG");

export function errorHandler(
  err: Error,
  _req: FastifyRequest,
  res: FastifyReply,
) {
  if (err instanceof ZodError) {
    return res.status(400).send({
      status: "error",
      message: "Erro de validação",
      issues: err.flatten().fieldErrors,
    });
  }
  if (err instanceof AppError) {
    console.error(`[APP ERROR] ${err.context ?? "APP"} -> ${err.message}`);

    return res.status(err.statusCode).send({
      status: "error",
      message: err.message,
    });
  }

  console.error(`[UNEXPECTED ERROR] ${err.message}`, DEBUG ? err.stack : "");

  return res.status(500).send({
    status: "error",
    message: "Erro interno no servidor",
  });
}
