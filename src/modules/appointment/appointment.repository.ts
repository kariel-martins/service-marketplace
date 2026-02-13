import { eq } from "drizzle-orm";
import app from "../../app";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { appointment } from "../../database/Schemas";
import { Appointment, CreateAppointment } from "./dtos/appointment.dto.schema";

export class AppointmentRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: CreateAppointment): Promise<Appointment> {
    return this.execute.repository(
      async () => {
        const result = await app.db.insert(appointment).values({status: "scheduled", ...data}).returning();

        return result[0];
      },
      "Não foi possível criar o agendamento!",
      "Appointment/Appointment.repository.ts/create",
    );
  }
  public getById(appointment_id: number): Promise<Appointment> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(appointment)
          .where(eq(appointment.id, appointment_id));

        return result[0];
      },
      "Não foi possível buscar o agendamento!",
      "Appointment/Appointment.repository.ts/getById",
    );
  }
  public getAll(prossional_id: number): Promise<Appointment[]> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .select()
          .from(appointment)
          .where(eq(appointment.professional_id, prossional_id));

        return result;
      },
      "Não Há servicos disponíveis!",
      "Appointment/Appointment.repository.ts/getAll",
    );
  }
  public update(appointment_id: number, data: any): Promise<Appointment> {
    return this.execute.repository(
      async () => {
        const result = await app.db
          .update(appointment)
          .set(data)
          .where(eq(appointment.id, appointment_id)).returning();

        return result[0];
      },
      "Não foi possível atualizar o agendamento!",
      "Appointment/Appointment.repository.ts/update",
    );
  }
  public delete(appointment_id: number): Promise<Appointment> {
    return this.execute.repository(
      async () => {
        const result = await app.db.delete(appointment).where(eq(appointment.id, appointment_id)).returning()
        return result[0]
      },
      "Não foi possível remove o agendamento!",
      "Appointment/Appointment.repository.ts/delete",
    );
  }
}
