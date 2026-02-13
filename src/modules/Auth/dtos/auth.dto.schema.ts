import { z } from "zod";
import { schemaVars } from "../../../share/utils/SchemasVars";

export const createUsersSchema = z.object({
  name: schemaVars.text,
  email: schemaVars.email,
  password: schemaVars.password,
  confirmPassword: schemaVars.password,
});

export const loginSchema = z.object({
  email: schemaVars.email,
  password: schemaVars.password,
});

export const forgotPasswordSchema = z.object({
  email: schemaVars.email,
});

export const resetPasswordSchema = z.object({
  password: schemaVars.password,
  confirmPassword: schemaVars.password,
});

export const AuthUserWithTokensResponceSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  id: z.string(),
  role: z.enum(["worker", "client"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});


export type createUsersData = z.infer<typeof createUsersSchema>;
export type loginData = z.infer<typeof loginSchema>;
export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordData = z.infer<typeof resetPasswordSchema>;

