import { z } from "zod";
import { schemaVars } from "../../../share/utils/SchemasVars";

export const createAppointmentSchema = z.object({
  service_id: schemaVars.number,
  client_id: schemaVars.id,
  date: schemaVars.date,
  start_time: schemaVars.text,
  end_time: schemaVars.text,
});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export const AppointmentResponceSchema = z.object({
  date: schemaVars.date,
  id: schemaVars.number,
  created_at: z.date(),
  professional_id: schemaVars.number,
  start_time: schemaVars.text,
  end_time: schemaVars.text,
  status: z.enum([
  "scheduled",
  "confirmed",
  "completed",
  "canceled",
  "no_show"
]).nullable(),
  client_id: schemaVars.id,
  service_id: schemaVars.number,
  cancel_reason: schemaVars.text.nullable(),
  confirm_at: z.date().nullable(),
});

export type createAppointmentData = z.infer<typeof createAppointmentSchema>;
export type updateAppointmentData = z.infer<typeof updateAppointmentSchema>;