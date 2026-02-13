import { eq } from "drizzle-orm";
import app from "../../app";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { availabilities } from "../../database/Schemas";
import { Availiability, CreateAvailiability, UpdateAvailiability } from "./dtos/availiability.dto.type";

export class AvailiabilityRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: CreateAvailiability): Promise<Availiability> {
    return this.execute.repository(
      async () => {
        const result = await app.db.insert(availabilities).values(data).returning();

        return result[0];
      },
      "Não foi possível criar o serviço!",
      "Availiability/availiability.repository.ts/create",
    );
  }
  public getById(availiability_id: number): Promise<Availiability> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(availabilities)
          .where(eq(availabilities.id, availiability_id));

        return result[0];
      },
      "Não foi possível buscar o serviço!",
      "Availiability/availiability.repository.ts/getById",
    );
  }
  public getAll(prossional_id: number): Promise<Availiability[]> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(availabilities)
          .where(eq(availabilities.professional_id, prossional_id));

        return result;
      },
      "Não Há servicos disponíveis!",
      "Availiability/availiability.repository.ts/getAll",
    );
  }
  public update(availiability_id: number, data: UpdateAvailiability): Promise<Availiability> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .update(availabilities)
          .set(data)
          .where(eq(availabilities.id, availiability_id)).returning();

        return result[0];
      },
      "Não foi possível atualizar o serviço!",
      "Availiability/availiability.repository.ts/update",
    );
  }
  public delete(availiability_id: number): Promise<Availiability> {
    return this.execute.repository(
      async () => {
        const result = await app.db.delete(availabilities).where(eq(availabilities.id, availiability_id)).returning()
        return result[0]
      },
      "Não foi possível remove o serviço!",
      "Availiability/availiability.repository.ts/delete",
    );
  }
}
