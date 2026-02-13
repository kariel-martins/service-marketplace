import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { Client, CreateClient } from "./dtos/client.dto.type";
import { createClientData, updateClientData } from "./dtos/client.dto.schema";
import { ClientRepository } from "./client.repository";

export class ClientService {
    constructor(
        private readonly execute: ExecuteHandler,
        private readonly repo: ClientRepository,
    ) {}

    public create(data: CreateClient): Promise<Client> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.create(data)
                    return result
            }, "Erro ao executar create",
            "Client/Client.Client.ts/create"
        )
    }
    public getById(client_id: string): Promise<Client> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getById(client_id)
                    return result
            }, "Erro ao executar getByAll",
            "Client/Client.Client.ts/getByAll"
        )
    }
    public getAll(professional_id: number): Promise<Client[]> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getAll(professional_id)
                    return result
            }, "Erro ao executar getAll",
            "Client/Client.Client.ts/getAll"
        )
    }
    public update(client_id: string, data: updateClientData): Promise<Client> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.update(client_id, data)
                    return result
            }, "Erro ao executar update",
            "Client/Client.Client.ts/update"
        )
    }
    public remove(client_id: string): Promise<{message: string}> {
        return this.execute.service(
            async () => {
                    await this.repo.delete(client_id)

                    return { message: "Servico removido com sucesso!"}
            }, "Erro ao executar remove",
            "Client/Client.Client.ts/remove"
        )
    }
}