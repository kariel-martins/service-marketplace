import { eq } from "drizzle-orm";
import app from "../../app";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { services } from "../../database/Schemas";
import { CreateService, Service } from "./dtos/service.dto.type";
import { updateServiceRequestData } from "./dtos/service.dto.schema";

export class ServiceRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: CreateService): Promise<Service> {
    return this.execute.repository(
      async () => {
        const result = await app.db.insert(services).values(data).returning();

        return result[0];
      },
      "Não foi possível criar o serviço!",
      "Service/service.repository.ts/create",
    );
  }
  public getById(service_id: number): Promise<Service> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(services)
          .where(eq(services.id, service_id));

        return result[0];
      },
      "Não foi possível buscar o serviço!",
      "Service/service.repository.ts/getById",
    );
  }
  public getAll(prossional_id: number): Promise<Service[]> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(services)
          .where(eq(services.professional_id, prossional_id));

        return result;
      },
      "Não Há servicos disponíveis!",
      "Service/service.repository.ts/getAll",
    );
  }
  public update(service_id: number, data: updateServiceRequestData): Promise<Service> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .update(services)
          .set(data)
          .where(eq(services.id, service_id)).returning();

        return result[0];
      },
      "Não foi possível atualizar o serviço!",
      "Service/service.repository.ts/update",
    );
  }
  public delete(service_id: number): Promise<Service> {
    return this.execute.repository(
      async () => {
        const result = await app.db.delete(services).where(eq(services.id, service_id)).returning()
        return result[0]
      },
      "Não foi possível remove o serviço!",
      "Service/service.repository.ts/delete",
    );
  }
}
