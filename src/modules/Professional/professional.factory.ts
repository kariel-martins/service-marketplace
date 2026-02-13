import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ProfessionalRepository } from "./professional.repository";
import { ProfessionalService } from "./professional.service";

export function makeProfessionalService() {{
    const execute = new ExecuteHandler()
    const repo = new ProfessionalRepository(execute)

    return new ProfessionalService(execute, repo)
}}