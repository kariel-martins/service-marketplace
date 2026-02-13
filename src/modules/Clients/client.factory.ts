import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ClientRepository } from "./client.repository";
import { ClientService } from "./client.service";

export function makeClientClient() {{
    const execute = new ExecuteHandler()
    const repo = new ClientRepository(execute)

    return new ClientService(execute, repo)
}}