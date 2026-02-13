import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controller from "./auth.controller";

import { z } from "zod";
import {
  AuthUserWithTokensResponceSchema,
  createUsersSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "./dtos/auth.dto.schema";
import { Authorization } from "../../share/middlewares/Autorizations";

export async function authRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  // Registro de Usuário / Empresa
  typedApp.post(
    "/register",
    {
      schema: {
        summary: "Registrar novo usuário e empresa",
        tags: ["Auth"],
        body: createUsersSchema,
        response: {
          201: z.object({
            usersData: z.any()
          }),
        },
      },
    },
    controller.createUser,
  );

  // Login
  typedApp.post(
    "/login",
    {
      schema: {
        summary: "Autenticar usuário",
        tags: ["Auth"],
        body: loginSchema,
        response: {
          200: z.object({
            usersData: z.any()
          }),
        },
      },
    },
    controller.login,
  );

  // Refresh Token
  typedApp.post(
    "/refresh",
    {
      preHandler: Authorization(["worker", "client"], "REFRESH_TOKEN", "refreshToken"),
      schema: {
        summary: "Atualizar tokens de acesso",
        tags: ["Auth"],
        description:
          "Utiliza o refreshToken enviado via cookie para gerar novos tokens",
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    controller.refresh,
  );

  // Esqueci a Senha
  typedApp.post(
    "/forgot-password",
    {
      schema: {
        summary: "Solicitar recuperação de senha",
        tags: ["Auth"],
        body: forgotPasswordSchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    controller.forgotPassword,
  );

  // Resetar Senha
  typedApp.post(
    "/reset-password",
    {
      preHandler: Authorization(["worker", "client"], "FORGOT_PASSWORD", "forgotPassword"),
      schema: {
        summary: "Redefinir senha",
        tags: ["Auth"],
        body: resetPasswordSchema,
        description: "Utiliza o token de recuperação enviado via cookie",
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    controller.resetPassword,
  );

  // Logout
  typedApp.post(
    "/logout",
    {
      schema: {
        summary: "Encerrar sessão",
        tags: ["Auth"],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    controller.logout,
  );
}
