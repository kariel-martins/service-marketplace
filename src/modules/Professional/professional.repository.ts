import { eq } from "drizzle-orm";
import app from "../../app";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { professionals } from "../../database/Schemas";
import { CreateProfessional, Professional, UpdateProfessional } from "./dtos/professional.dto.type";

export class ProfessionalRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: CreateProfessional): Promise<Professional> {
    return this.execute.repository(
      async () => {
        const result = await app.db.insert(professionals).values(data).returning();

        return result[0];
      },
      "Não foi possível criar o Profissional!",
      "Professional/professional.repository.ts/create",
    );
  }
  public getById(Professional_id: number): Promise<Professional> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(professionals)
          .where(eq(professionals.id, Professional_id));

        return result[0];
      },
      "Não foi possível buscar o Profissional!",
      "Professional/professional.repository.ts/getById",
    );
  }
  public getAll(): Promise<Professional[]> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(professionals)

        return result;
      },
      "Não Há servicos disponíveis!",
      "Professional/professional.repository.ts/getAll",
    );
  }
  public update(Professional_id: number, data: UpdateProfessional): Promise<Professional> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .update(professionals)
          .set(data)
          .where(eq(professionals.id, Professional_id)).returning();

        return result[0];
      },
      "Não foi possível atualizar o Profissional!",
      "Professional/professional.repository.ts/update",
    );
  }
  public delete(Professional_id: number): Promise<Professional> {
    return this.execute.repository(
      async () => {
        const result = await app.db.delete(professionals).where(eq(professionals.id, Professional_id)).returning()
        return result[0]
      },
      "Não foi possível remove o Profissional!",
      "Professional/professional.repository.ts/delete",
    );
  }
}
