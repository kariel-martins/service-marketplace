import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../core/Errors/AppError";
import { JwtPayload } from "../types/JWTService";

type Roles = "worker" | "client"

export const Authorization = (allowedRoles: Roles[], purposeToken: string, token: string) => {
 return async function authorizationasync(request: FastifyRequest, reply: FastifyReply) {
      const jwt = request.server.token;
      const accessToken = request.cookies[token];

      if (!accessToken) throw new AppError("Não autorizado!", 401);

      const payload = await jwt.verify(accessToken) as JwtPayload;

      if (
        !payload ||
        !payload.sub ||
        !payload.role ||
        payload.purpose !== purposeToken
      ) {
        throw new AppError("Token ausente ou inválido!", 401);
      }

      if (!allowedRoles.includes(payload.role as Roles)) {
        throw new AppError("Acesso negado!", 403);
      }

      request.user = payload
    }
}