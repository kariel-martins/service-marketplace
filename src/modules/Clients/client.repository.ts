import { eq } from "drizzle-orm";
import app from "../../app";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { clients } from "../../database/Schemas";
import { Client, CreateClient } from "./dtos/client.dto.type";
import { createClientData } from "./dtos/client.dto.schema";

export class ClientRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: CreateClient): Promise<Client> {
    return this.execute.repository(
      async () => {
        const result = await app.db.insert(clients).values(data).returning();

        return result[0];
      },
      "Não foi possível criar o clientes!",
      "Client/client.repository.ts/create",
    );
  }
  public getById(client_id: string): Promise<Client> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(clients)
          .where(eq(clients.id, client_id));

        return result[0];
      },
      "Não foi possível buscar o clientes!",
      "Client/client.repository.ts/getById",
    );
  }
  public getAll(prossional_id: number): Promise<Client[]> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(clients)
          .where(eq(clients.professional_id, prossional_id));

        return result;
      },
      "Não Há clientes disponíveis!",
      "Client/client.repository.ts/getAll",
    );
  }
  public update(client_id: string, data: any): Promise<Client> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .update(clients)
          .set(data)
          .where(eq(clients.id, client_id)).returning();

        return result[0];
      },
      "Não foi possível atualizar o clientes!",
      "Client/client.repository.ts/update",
    );
  }
  public delete(client_id: string): Promise<Client> {
    return this.execute.repository(
      async () => {
        const result = await app.db.delete(clients).where(eq(clients.id, client_id)).returning()
        return result[0]
      },
      "Não foi possível remove o clientes!",
      "Client/client.repository.ts/delete",
    );
  }
}
