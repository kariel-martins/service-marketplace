import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { availabilities } from "../../../database/Schemas";

export type Availiability = InferSelectModel<typeof availabilities>
export type CreateAvailiability = InferInsertModel<typeof availabilities>
export type UpdateAvailiability = Partial<Availiability>