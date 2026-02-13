import { z } from "zod";
import { schemaVars } from "../../../share/utils/SchemasVars";

export const createClientSchema = z.object({
  name: schemaVars.text,
  email: schemaVars.email,
  phone: schemaVars.phone,
});

export const updateClientSchema = createClientSchema.partial();

export const clientReponseSchema = z.object({
  name: schemaVars.text,
  email: schemaVars.email,
  id: schemaVars.id,
  created_at: z.date(),
  professional_id: schemaVars.number,
  phone: schemaVars.phone,
  total_services: schemaVars.number,
});

export type createClientData = z.infer<typeof createClientSchema>;
export type updateClientData = z.infer<typeof updateClientSchema>;
