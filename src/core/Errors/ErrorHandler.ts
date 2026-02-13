import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./AppError";
import { env } from "../../config/env";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

const DEBUG = env("DEBUG");

export function errorHandler(
  err: Error,
  _req: FastifyRequest,
  res: FastifyReply,
) {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return res.status(400).send({
      context: err.validationContext,
      message: "Erro de validação",
      issues: err.validation.map((error) => {
          return { path: error.instancePath, message: error.message };
        }),
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
