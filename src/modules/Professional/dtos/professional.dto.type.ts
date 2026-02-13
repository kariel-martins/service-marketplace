import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { professionals } from "../../../database/Schemas";

export type Professional = InferSelectModel<typeof professionals>
export type CreateProfessional = InferInsertModel<typeof professionals>
export type UpdateProfessional = Partial<Professional>