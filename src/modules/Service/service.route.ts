import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { z } from "zod"
import * as controller from "../Service/service.controller"
import { createServiceSchema, serviceResponceSchema, updateServiceSchema } from "./dtos/service.dto.schema";
import { Authorization } from "../../share/middlewares/Autorizations";

export async function ServicesRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.post(
    "/",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Cadastrar um no serviço!",
        tags: ["Service"],
        body: createServiceSchema,
        response: {
          201: z.object({
            serviceData: serviceResponceSchema
          }),
        },
      },
    },
    controller.create,
  );

  typedApp.get(
    "/:service_id",
    {
       preHandler: Authorization(["worker","client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar serviço!",
        tags: ["Service"],
        params: z.object({service_id: z.string()}),
        response: {
          200: z.object({
            serviceData: serviceResponceSchema
          }),
        },
      },
    },
    controller.getById,
  );

   typedApp.get(
    "/",
    {
      preHandler: Authorization(["worker","client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar todos os serviços!",
        tags: ["Service"],
        response: {
          200: z.object({
            serviceData: z.array(serviceResponceSchema)
          }),
        },
      },
    },
    controller.getAll,
  );

  typedApp.put(
    "/:service_id",
    {
       preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Atualizar serviço!",
        tags: ["Service"],
        params: z.object({service_id: z.string()}),
        body: updateServiceSchema,
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
    "/:service_id",
    {
       preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Remove serviço!",
        tags: ["Service"],
        params: z.object({service_id: z.string()}),
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