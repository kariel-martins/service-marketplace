import fp from "fastify-plugin";
import { env } from "../config/env";
import { JwtService } from "../share/providers/JWTService";
import { CryptoService } from "../share/providers/CryptoService";
import { ICryptoService } from "../share/interfaces/ICryptoService";
import { IJWTService } from "../share/interfaces/IJWTService";

export default fp(async (app) => {
  const tokenProvider = new JwtService(env("JWT_SECRET"));
  const hashProvider = new CryptoService

  app.decorate("hash", hashProvider);
  app.decorate("token", tokenProvider);
});

declare module "fastify" {
  interface FastifyInstance {
    hash: ICryptoService;
    token: IJWTService;
  }
}