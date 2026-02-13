import { z } from "zod"
import { schemaVars } from "../../../share/utils/SchemasVars";


export const createProfessionalSchema = z.object({
  name: schemaVars.text,
  specialty: schemaVars.text,
});

export const professionalResponceSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  name: z.string(),
  created_at: z.date(),
  specialty: z.string(),
  is_active: z.boolean(),
})

export const updateProfessionalSchema = createProfessionalSchema.partial();

export type createProfessionalData = z.infer<typeof createProfessionalSchema>;
export type updateProfessionalData = z.infer<typeof updateProfessionalSchema>;