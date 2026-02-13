import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { availiabilityResponceSchema, createAvailiability, updateAvailiability } from "./dtos/availiability.dto.schema";
import { z } from "zod"
import * as controller from "../Availiability/availiability.controller"
import { Authorization } from "../../share/middlewares/Autorizations";

export async function AvailiabilityRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.post(
    "/",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Cadastrar um horário disponível!",
        tags: ["Availiability"],
        body: createAvailiability,
        response: {
          201: z.object({
            availiabilityData: availiabilityResponceSchema,
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
        summary: "Buscar todos os horário disponívels!",
        tags: ["Availiability"],
        response: {
          200: z.object({
            availiabilityData: z.array(availiabilityResponceSchema),
          }),
        },
      },
    },
    controller.getAll,
  );

  typedApp.get(
    "/:availiability_id",
    {
      preHandler: Authorization(["worker", "client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar horário disponível!",
        tags: ["Availiability"],
        params: z.object({availiability_id: z.string()}),
        response: {
          200: z.object({
            availiabilityData: availiabilityResponceSchema,
          }),
        },
      },
    },
    controller.getById,
  );

  typedApp.put(
    "/:availiability_id",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Atualizar horário disponível!",
        tags: ["Availiability"],
        params: z.object({availiability_id: z.string()}),
        body: updateAvailiability,
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
    "/:availiability_id",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Remove horário disponível!",
        tags: ["Availiability"],
        params: z.object({availiability_id: z.string()}),
        body: updateAvailiability,
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