import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { updateProfessionalData } from "./dtos/professional.dto.schema";
import { CreateProfessional, Professional } from "./dtos/professional.dto.type";
import { ProfessionalRepository } from "./professional.repository";

export class ProfessionalService {
    constructor(
        private readonly execute: ExecuteHandler,
        private readonly repo: ProfessionalRepository,
    ) {}

    public create(data: CreateProfessional): Promise<Professional> {
        return this.execute.repository(
            async () => {
                    const result = await this.repo.create(data)
                    return result
            }, "Erro ao executar create",
            "Professional/professional.service.ts/create"
        )
    }
    public getById(Professional_id: number): Promise<Professional> {
        return this.execute.repository(
            async () => {
                    const result = await this.repo.getById(Professional_id)
                    return result
            }, "Erro ao executar getByAll",
            "Professional/professional.service.ts/getByAll"
        )
    }
    public getAll(): Promise<Professional[]> {
        return this.execute.repository(
            async () => {
                    const result = await this.repo.getAll()
                    return result
            }, "Erro ao executar getAll",
            "Professional/professional.service.ts/getAll"
        )
    }
    public update(Professional_id: number, data: updateProfessionalData): Promise<Professional> {
        return this.execute.repository(
            async () => {
                    const result = await this.repo.update(Professional_id, data)
                    return result
            }, "Erro ao executar update",
            "Professional/professional.service.ts/update"
        )
    }
    public remove(Professional_id: number): Promise<{message: string}> {
        return this.execute.repository(
            async () => {
                    await this.repo.delete(Professional_id)

                    return { message: "Servico removido com sucesso!"}
            }, "Erro ao executar remove",
            "Professional/professional.service.ts/remove"
        )
    }
}