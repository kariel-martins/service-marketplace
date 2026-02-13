import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { AvailiabilityRepository } from "./availiability.repository";
import { AvailiabilityService } from "./availiability.service";

export function makeAvailiabilityService() {{
    const execute = new ExecuteHandler()
    const repo = new AvailiabilityRepository(execute)

    return new AvailiabilityService(execute, repo)
}}