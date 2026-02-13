import { z } from "zod" 
import { schemaVars } from "../../../share/utils/SchemasVars"

export const createServiceSchema = z.object({
    name: schemaVars.text,
    duration_minutes: schemaVars.text,
    price: schemaVars.text
})

export const updateServiceSchema = createServiceSchema.partial()

export const serviceResponceSchema = z.object({
    name: schemaVars.text,
    duration_minutes: schemaVars.text,
    price: schemaVars.text,
    id: schemaVars.number,
    created_at: z.date(),
    professional_id: schemaVars.number
})

export type createServiceRequestData = z.infer<typeof createServiceSchema>
export type updateServiceRequestData = z.infer<typeof updateServiceSchema>

