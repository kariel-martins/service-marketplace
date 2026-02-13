import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { clients } from "../../../database/Schemas";

export type Client = InferSelectModel<typeof clients>
export type CreateClient = InferInsertModel<typeof clients>
export type UpdateClient = Partial<Client>