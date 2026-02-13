import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { AvailiabilityRepository } from "./availiability.repository";
import { Availiability, CreateAvailiability } from "./dtos/availiability.dto.type";
import { updateAvailiabilityData } from "./dtos/availiability.dto.schema";

export class AvailiabilityService {
    constructor(
        private readonly execute: ExecuteHandler,
        private readonly repo: AvailiabilityRepository,
    ) {}

    public create(data: CreateAvailiability): Promise<Availiability> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.create(data)
                    return result
            }, "Erro ao executar create",
            "Availability/availability.service.ts/create"
        )
    }
    public getById(availability_id: number): Promise<Availiability> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getById(availability_id)
                    return result
            }, "Erro ao executar getByAll",
            "Availability/availability.service.ts/getByAll"
        )
    }
    public getAll(professional_id: number): Promise<Availiability[]> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getAll(professional_id)
                    return result
            }, "Erro ao executar getAll",
            "Availability/availability.service.ts/getAll"
        )
    }
    public update(availability_id: number, data: updateAvailiabilityData): Promise<Availiability> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.update(availability_id, data)
                    return result
            }, "Erro ao executar update",
            "Availability/availability.service.ts/update"
        )
    }
    public remove(availability_id: number): Promise<{message: string}> {
        return this.execute.service(
            async () => {
                    await this.repo.delete(availability_id)

                    return { message: "Servico removido com sucesso!"}
            }, "Erro ao executar remove",
            "Availability/availability.service.ts/remove"
        )
    }
}