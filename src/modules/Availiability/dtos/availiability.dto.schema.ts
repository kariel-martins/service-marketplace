import { z } from "zod" 
import { schemaVars } from "../../../share/utils/SchemasVars"

export const createAvailiability = z.object({
    day_of_week: schemaVars.text,
    start_time: schemaVars.text,
    end_time: schemaVars.text
})

export const updateAvailiability = createAvailiability.partial()

export const availiabilityResponceSchema = z.object({
      id: schemaVars.number,
    professional_id: schemaVars.number,
    day_of_week: schemaVars.text,
    start_time: schemaVars.text,
    end_time: schemaVars.text
})

export type createAvailiabilityData = z.infer<typeof createAvailiability>
export type updateAvailiabilityData = z.infer<typeof updateAvailiability>