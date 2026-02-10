import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { refresh_tokens, users } from "../../../database/Schemas";

export type User = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>
export type updateUser = Partial<InsertUser>
export type UserOmitPassword = Omit<User, "password_hash">

export type tokenRefresh = InferSelectModel<typeof refresh_tokens>
export type InsertTokenRefresh = InferInsertModel<typeof refresh_tokens>
export type UpdateTokenRefresh = Partial<InferInsertModel<typeof refresh_tokens>>

type OmitPassword = Omit<User, "password_hash">

export type UserTokenRefresh = {
    users: OmitPassword,
    refresh_tokens: tokenRefresh
}
export type UserTokensResponce = {
    users: OmitPassword,
    refresh_token: string
    access_token: string
}

export type UserData = {
    name: string,
    email: string,
    password_hash: string,
    role: "worker" | "client",
    tokenRefresh: string
}

export type UserDataService = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: "worker" | "client",

}
