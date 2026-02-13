import { and, eq, gt } from "drizzle-orm";
import app from "../../app";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { professionals, refresh_tokens, users } from "../../database/Schemas";
import { AppError } from "../../core/Errors/AppError";
import {
  RefreshWithProfessional,
  tokenRefresh,
  User,
  UserData,
  UserWithProfessional,
} from "./dtos/auth.dto.types";

export class AuthRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(
    data: UserData,
  ): Promise<{ users: User; refresh_tokens: tokenRefresh }> {
    return this.execute.repository(
      async () => {
        return await app.db.transaction(async (tx) => {
          const [user] = await tx
            .insert(users)
            .values({
              email: data.email,
              name: data.name,
              password_hash: data.password_hash,
              role: "client",
            })
            .returning();

          const [tokenRefresh] = await tx
            .insert(refresh_tokens)
            .values({
              expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
              token_hash: data.tokenRefresh,
              user_id: user.id,
            })
            .returning();

          return { users: user, refresh_tokens: tokenRefresh };
        });
      },
      "Erro ao executar create",
      "auth/auth.repository/create",
    );
  }

  public createToken(data: any): Promise<tokenRefresh> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .insert(refresh_tokens)
          .values({
            expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
            ...data,
          })
          .returning();
        return result[0];
      },
      "Erro ao executar createToken",
      "auth/auth.repository/createToken",
    );
  }

  public getById(user_id: string): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(users)
          .where(eq(users.id, user_id));

        return result[0];
      },
      "Usuário não encontrado",
      "auth/auth.repository/getByEmail",
    );
  }

  public getByEmail(email: string): Promise<UserWithProfessional> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .leftJoin(professionals, eq(professionals.user_id, users.id));

        const user = result[0];

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        return user;
      },
      "Usuário não encontrado",
      "auth/auth.repository/getByEmail",
    );
  }

  public async getUserNotExists(email: string): Promise<void> {
    const [result] = await app.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result) {
      throw new AppError(
        "Usuário já existe",
        409,
        "auth/repositories/auth.repository/getUserNotExists",
      );
    }
  }

  public async getTokenRefresh(user_id: string): Promise<RefreshWithProfessional[]> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(refresh_tokens)
          .where(
            and(
              eq(refresh_tokens.user_id, user_id),
              eq(refresh_tokens.revoked, false),
              gt(refresh_tokens.expires_at, new Date()),
            ),
          ).leftJoin(professionals, eq(professionals.user_id, refresh_tokens.user_id))
        return result;
      },
      "Erro ao executar getTokenRefresh",
      "auth/auth.repository/getTokenRefresh",
    );
  }

  public updateRefreshToken(refreshToken_id: string, data: any): Promise<any> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .update(refresh_tokens)
          .set(data)
          .where(
            and(
              eq(refresh_tokens.id, refreshToken_id),
              eq(refresh_tokens.revoked, false),
            ),
          )
          .returning();

        if (!result.length) {
          throw new AppError("Refresh token já revogado ou inexistente");
        }

        return result[0];
      },
      "Erro ao executar updateRefreshToken",
      "auth/auth.repository/updateRefreshToken",
    );
  }

  public revokeAllUserTokens(user_id: string): Promise<void> {
    return this.execute.repository(
      async () => {
        await app.db
          .update(refresh_tokens)
          .set({ revoked: true })
          .where(
            and(
              eq(refresh_tokens.user_id, user_id),
              eq(refresh_tokens.revoked, false),
            ),
          );
      },
      "Erro ao executar revokeAllUserTokens",
      "auth/auth.repository/revokeAllUserTokens",
    );
  }

  public update(user_id: string, data: any): Promise<any> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .update(users)
          .set(data)
          .where(eq(users.id, user_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "auth/auth.repository/update",
    );
  }
}
