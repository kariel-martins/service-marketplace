import { z } from "zod";

const text = z
  .string({message: "Deve ser string"})
  .min(3, "Deve conter no mínimo 3 caracteres")
  .describe("Texto com no mínimo 3 caracteres");

const email = z
  .string({message: "Deve ser string"})
  .email("Informe um email válido")
  .describe("Email válido no formato usuario@dominio.com");

const password = z
  .string({message: "Deve ser string"})
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    "Deve conter letra maiúscula, minúscula, número e caractere especial"
  )
  .describe(
    "Senha com no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial"
  );

const number = z
  .coerce.number({message: "Deve ser um number"})
  .describe("Valor numérico");

const id = z
  .string({message: "Deve ser string"})
  .uuid("Formato de ID inválido")
  .describe("Identificador único no formato UUID");

const url = z
  .string({message: "Deve ser string"})
  .url("Informe uma URL válida")
  .describe("URL válida no formato https://exemplo.com");

const date = z
  .string({message: "Deve ser string"})
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    "Data deve estar no formato YYYY-MM-DD"
  )
  .describe("Data no formato YYYY-MM-DD");

  const phone = z
  .string({ message: "Deve ser string" })
  .regex(
    /^\+55 \(\d{2}\) 9 \d{4} \d{4}$/,
    "Telefone deve estar no formato +55 (99) 9 9999 9999"
  )
  .describe("Telefone no formato +55 (99) 9 9999 9999");

export const schemaVars = {
  text,
  email,
  password,
  id,
  number,
  phone,
  url,
  date,
};
