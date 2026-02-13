import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ServiceRepository } from "./service.repository";
import { ServiceService } from "./service.service";

export function makeServiceService() {{
    const execute = new ExecuteHandler()
    const repo = new ServiceRepository(execute)

    return new ServiceService(execute, repo)
}}