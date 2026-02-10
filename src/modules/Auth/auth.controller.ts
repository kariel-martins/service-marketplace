import { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthService } from "./auth.factory";
import { UserDataService } from "./dtos/auth.dto.types";
import { loginData, resetPasswordData } from "./dtos/auth.dto.schema";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
  path: "/",
};

export const createUser = async (request: FastifyRequest<{ Body: UserDataService }>, reply: FastifyReply) => {
  const { hash, token } = request.server;
  const service = makeAuthService(hash, token);
  
  const result = await service.registerUser(request.body);

  reply.setCookie("refreshToken", result.refresh_token, { ...COOKIE_OPTIONS, maxAge: 60 * 60 * 48 }) // 48h
    .setCookie("accessToken", result.access_token, { ...COOKIE_OPTIONS, maxAge: 60 * 15 }) // 15min
    .status(201)
    .send({
      usersData: result.users,
    });
};

export const login = async (request: FastifyRequest<{ Body: loginData }>, reply: FastifyReply) => {
  const { hash, token } = request.server;
  const service = makeAuthService(hash, token);
  
  const result = await service.login(request.body);

  return reply
    .setCookie("refreshToken", result.refresh_token, { ...COOKIE_OPTIONS, maxAge: 60 * 60 * 48 })
    .setCookie("accessToken", result.access_token, { ...COOKIE_OPTIONS, maxAge: 60 * 15 })
    .status(200)
    .send({ usersData: result.users });
};

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  const { hash, token } = request.server;
  const { user } = request
  const service = makeAuthService(hash, token);
  
  const result = await service.refresh(user!);

  return reply
    .setCookie("refreshToken", result.refreshToken, { ...COOKIE_OPTIONS, maxAge: 60 * 60 * 48 })
    .setCookie("accessToken", result.accessToken, { ...COOKIE_OPTIONS, maxAge: 60 * 15 })
    .send({ message: "Validação bem sucedida!" });
};

export const forgotPassword = async (request: FastifyRequest<{ Body: { email: string } }>, reply: FastifyReply) => {
  const { hash, token } = request.server;
  const service = makeAuthService(hash, token);
  
  const { email } = request.body;
  const result = await service.forgotPassword(email);

  return reply
    .setCookie("forgotPassword", result.token, { ...COOKIE_OPTIONS, maxAge: 60 * 15 })
    .send({ message: result.message });
};

export const resetPassword = async (request: FastifyRequest, reply: FastifyReply) => {
  const { hash, token } = request.server;
  const service = makeAuthService(hash, token);
  const result = await service.resetPassword(request.user!, request.body);

  return result; // Status 200 default
};

export const logout = async (_request: FastifyRequest, reply: FastifyReply) => {
  return reply
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .send({ message: "Logout realizado com sucesso" });
};