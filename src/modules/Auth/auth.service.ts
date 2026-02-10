import { AppError } from "../../core/Errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ICryptoService } from "../../share/interfaces/ICryptoService";
import { IJWTService } from "../../share/interfaces/IJWTService";
import { JwtPayload } from "../../share/types/JWTService";
import { AuthRepository } from "./auth.repository";
import { loginData } from "./dtos/auth.dto.schema";
import { User, UserData, UserDataService, UserTokensResponce } from "./dtos/auth.dto.types";

export class AuthService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: AuthRepository,
    private readonly hash: ICryptoService,
    private readonly token: IJWTService,
  ) {}

  public registerUser(
    data: UserDataService,
  ): Promise<UserTokensResponce> {
    return this.execute.service(
      async () => {

        await this.repo.getUserNotExists(data.email);

        if (!data.confirmPassword || data.password !== data.confirmPassword) {
          throw new AppError("Senhas não coincidem", 400);
        }

        const password_hash = await this.hash.hashText(data.password);
        const refreshToken = crypto.randomUUID();
        const refreshTokenHash = await this.hash.hashText(refreshToken);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);

        const {users, refresh_tokens} = await this.repo.create({
          password_hash,
          tokenRefresh: refreshTokenHash,
          ...data,
          role: "worker"
        });

        const {password_hash: password, ...rest} = users
        const refreshTokenJwt = await this.token.sign(
          {
            purpose: "REFRESH_TOKEN",
            scope: refreshToken,
            role: rest.role,
            sub: rest.id,
          },
          "2d",
        );

        const accessToken = await this.token.sign(
          {
            purpose: "ACCESS_TOKEN",
            role: rest.role,
            sub: rest.id,
          },
          "15m",
        );
        const result = {
          refresh_token: refreshTokenJwt,
          access_token: accessToken,
          users: rest
        };
        return result;
      },
      "Erro ao executar registerUser",
      "auth/service/auth.service/registerUser",
    );
  }

  public login(data: loginData): Promise<UserTokensResponce> {
    return this.execute.service(
      async () => {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);

        const {password_hash, ...rest} = await this.repo.getByEmail(
          data.email
        );

        const isValid = await this.hash.compareText(
          data.password,
          password_hash,
        );

        if (!isValid) throw new AppError("Senha inválida");

        const refreshToken = crypto.randomUUID();
        const refreshTokenHash = await this.hash.hashText(refreshToken);

        await this.repo.createToken({
          user_id: rest.id,
          token_hash: refreshTokenHash,
          expires_at: expiresAt,
        });

        const refreshTokenJwt = await this.token.sign(
          {
            purpose: "REFRESH_TOKEN",
            scope: refreshToken,
            role: rest.role,
            sub: rest.id,
          },
          "2d",
        );

        const accessToken = await this.token.sign(
          { purpose: "ACCESS_TOKEN", 
            role: rest.role,
            sub: rest.id
           },
          "15m",
        );

        const result = {
          refresh_token: refreshTokenJwt,
          access_token: accessToken,
          users: rest
        };
        return result;
      },
      "Erro ao executar login",
      "auth/service/auth.service/login",
    );
  }

  public refresh(payload: JwtPayload): Promise<{ accessToken: string; refreshToken: string }> {
    return this.execute.service(
      async () => {
        let validToken = null;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);

        const tokens = await this.repo.getTokenRefresh(payload.sub);

        for (const token of tokens) {
          const match = await this.hash.compareText(
            payload.scope,
            token.token_hash,
          );

          if (match) {
            if (token.revoked) {
              await this.repo.revokeAllUserTokens(payload.sub);
              throw new AppError("Sessão comprometida", 401);
            }

            validToken = token;
            break;
          }
        }

        if (!validToken) throw new AppError("Refresh token inválido", 401);

        const tokenRefresh = crypto.randomUUID();
        const newRefreshToken = await this.hash.hashText(tokenRefresh);

        const newTokenRefresh = await this.repo.createToken({
          user_id: payload.sub,
          token_hash: newRefreshToken,
          expires_at: expiresAt,
        });

        const user = await this.repo.getById(newTokenRefresh.user_id)

        await this.repo.updateRefreshToken(validToken?.id, {
          revoked: true,
        });

        const refreshTokenJwt = await this.token.sign(
          {
            purpose: "REFRESH_TOKEN",
            scope: tokenRefresh,
            sub: newTokenRefresh.user_id,
          },
          "2d",
        );

        const newAccessToken = await this.token.sign(
          {
            purpose: "ACCESS_TOKEN",
            role: user.user_role,
            sub: user.id,
          },
          "15m",
        );

        return { accessToken: newAccessToken, refreshToken: refreshTokenJwt };
      },
      "Erro ao executar refresh",
      "auth/service/auth.service/refresh",
    );
  }

  public forgotPassword(email: string): Promise<{ message: string, token: string }> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getByEmail(email);

        const token = await this.token.sign(
          {
            purpose: "FORGOT_PASSWORD",
            role: result.role,
            sub: result.id,
          },
          "15m",
        );

        //incompleto adicionar serviço de email

        return { message: "Email enviar com sucesso!", token};
      },
      "Erro ao executar forgotPassword",
      "auth/service/auth.service/forgotPassword",
    );
  }

  public resetPassword(
    payload: JwtPayload,
    data: any,
  ): Promise<{ message: string }> {
    return this.execute.service(
      async () => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword)
          throw new AppError("Senhas não coincidem!");

        const password_hash = await this.hash.hashText(password);
        await this.repo.update(payload.sub, {
          password_hash
        });

        //incompleto adicionar serviço de email

        return { message: "Senha atualizada com sucesso!" };
      },
      "Erro ao executar resetPassword",
      "auth/service/auth.service/resetPassword",
    );
  }
}
