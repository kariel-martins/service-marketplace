import jwt, { SignOptions } from "jsonwebtoken";
import { IJWTService } from "../interfaces/IJWTService";
import { IJwtData } from "../types/JWTService";
import { AppError } from "../../core/Errors/AppError";


export class JwtService implements IJWTService {
  constructor(private readonly jwtKey: string) {}

  async sign(
    data: IJwtData,
    expiresIn: SignOptions["expiresIn"],
  ): Promise<string> {
    try {
      return jwt.sign(data, this.jwtKey, {
        expiresIn,
        issuer: "auth-api",
        audience: "web-client",
      });
    } catch {
      throw new AppError("Erro ao gerar token", 500, "JwtService.sign");
    }
  }

  async verify(token: string): Promise<IJwtData> {
    try {
      const decoded = jwt.verify(token, this.jwtKey);

      if (typeof decoded === "string") {
        throw new AppError("Invalid token", 401);
      }

      return decoded as IJwtData;
    } catch (error) {
      throw new AppError(
        "Token inválido ou expirado",
        401,
        "JwtService.verify",
      );
    }
  }
}
