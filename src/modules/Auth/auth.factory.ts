import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ICryptoService } from "../../share/interfaces/ICryptoService";
import { IJWTService } from "../../share/interfaces/IJWTService";
import { JwtPayload } from "../../share/types/JWTService";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

export function makeAuthService(
  hash: ICryptoService, 
  token: IJWTService,
) {
  const execute = new ExecuteHandler();
  const repo = new AuthRepository(execute);

  return new AuthService(
    execute,
    repo,
    hash,
    token,
  );
}