import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { Appointment, CreateAppointment } from "./dtos/appointment.dto.schema";
import { updateAppointmentData } from "./dtos/appointment.dto.type";
import { AppointmentRepository } from "./appointment.repository";

export class AppointmentService {
    constructor(
        private readonly execute: ExecuteHandler,
        private readonly repo: AppointmentRepository,
    ) {}

    public create(data: CreateAppointment): Promise<Appointment> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.create(data)
                    return result
            }, "Erro ao executar create",
            "Appointment/Appointment.Appointment.ts/create"
        )
    }
    public getById(appointment_id: number): Promise<Appointment> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getById(appointment_id)
                    return result
            }, "Erro ao executar getByAll",
            "Appointment/Appointment.Appointment.ts/getByAll"
        )
    }
    public getAll(professional_id: number): Promise<Appointment[]> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.getAll(professional_id)
                    return result
            }, "Erro ao executar getAll",
            "Appointment/Appointment.Appointment.ts/getAll"
        )
    }
    public update(appointment_id: number, data: updateAppointmentData): Promise<Appointment> {
        return this.execute.service(
            async () => {
                    const result = await this.repo.update(appointment_id, data)
                    return result
            }, "Erro ao executar update",
            "Appointment/Appointment.Appointment.ts/update"
        )
    }
    public remove(appointment_id: number): Promise<{message: string}> {
        return this.execute.service(
            async () => {
                    await this.repo.delete(appointment_id)

                    return { message: "Servico removido com sucesso!"}
            }, "Erro ao executar remove",
            "Appointment/Appointment.Appointment.ts/remove"
        )
    }
}