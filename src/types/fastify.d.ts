import { db } from "../database";
import { JwtPayload } from "../share/types/JWTService";

declare module "fastify" {
  interface FastifyInstance {
    db: typeof db;
  }
}

declare module "fastify" {
  interface FastifyRequest {
    user?: JwtPayload
  }
}
