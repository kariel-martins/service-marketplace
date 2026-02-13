import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import * as controller from "../Professional/professional.controller"
import { createProfessionalSchema, professionalResponceSchema, updateProfessionalSchema } from "./dtos/professional.dto.schema";
import { Authorization } from "../../share/middlewares/Autorizations";
import { schemaVars } from "../../share/utils/SchemasVars";

export async function ProfessionalRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.post(
    "/",
    {
      preHandler: Authorization(["client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Cadastrar um no Profissional!",
        tags: ["Professional"],
        body: createProfessionalSchema,
        response: {
          201: z.object({
            ProfessionalsData: professionalResponceSchema
          }),
        },
      },
    },
    controller.create,
  );

  typedApp.get(
    "/",
    {
     preHandler: Authorization(["worker", "client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar todos os Profissionals!",
        tags: ["Professional"],
        response: {
          200: z.object({
            ProfessionalsData: z.array(professionalResponceSchema)
          }),
        },
      },
    },
    controller.getAll,
  );

  typedApp.get(
    "/:professional_id",
    {
      preHandler: Authorization(["worker", "client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar Profissional!",
        tags: ["Professional"],
        params: z.object({professional_id: schemaVars.number}),
        response: {
          200: z.object({
            ProfessionalsData: professionalResponceSchema
          }),
        },
      },
    },
    controller.getById,
  );

  typedApp.put(
    "/:professional_id",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Atualizar Profissional!",
        tags: ["Professional"],
        params: z.object({professional_id: schemaVars.number}),
        body: updateProfessionalSchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    controller.update,
  );

  typedApp.delete(
    "/:professional_id",
    {
     preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Remove Profissional!",
        tags: ["Professional"],
        params: z.object({professional_id: z.string()}),
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    controller.remove,
  );


}