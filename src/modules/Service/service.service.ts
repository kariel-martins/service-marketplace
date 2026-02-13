import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { createServiceRequestData, updateServiceRequestData } from "./dtos/service.dto.schema";
import { CreateService, Service } from "./dtos/service.dto.type";

import { ServiceRepository } from "./service.repository";

export class ServiceService {
    constructor(
        private readonly execute: ExecuteHandler,
        private readonly repo: ServiceRepository,
    ) {}

    public create(data: CreateService): Promise<Service> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.create(data)
                    return result
            }, "Erro ao executar create",
            "Service/service.service.ts/create"
        )
    }
    public getById(service_id: number): Promise<Service> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getById(service_id)
                    return result
            }, "Erro ao executar getById",
            "Service/service.service.ts/getById"
        )
    }
    public getAll(professional_id: number): Promise<Service[]> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getAll(professional_id)
                    return result
            }, "Erro ao executar getAll",
            "Service/service.service.ts/getAll"
        )
    }
    public update(service_id: number, data: updateServiceRequestData): Promise<Service> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.update(service_id, data)
                    return result
            }, "Erro ao executar update",
            "Service/service.service.ts/update"
        )
    }
    public remove(service_id: number): Promise<{message: string}> {
        return this.execute.service(
            async () => {
                    await this.repo.delete(service_id)

                    return { message: "Servico removido com sucesso!"}
            }, "Erro ao executar remove",
            "Service/service.service.ts/remove"
        )
    }
}