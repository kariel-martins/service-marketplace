import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import * as controller from "../Clients/client.controller"
import { clientReponseSchema, createClientSchema, updateClientSchema } from "./dtos/client.dto.schema";
import { Authorization } from "../../share/middlewares/Autorizations";

export async function ClientsRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.post(
    "/",
    {
      preHandler: Authorization(["worker", "client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Cadastrar um no Cliente!",
        tags: ["Client"],
        body: createClientSchema,
        response: {
          201: z.object({
            clientData: clientReponseSchema,
          }),
        },
      },
    },
    controller.create,
  );

  typedApp.get(
    "/",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar todos os Clientes!",
        tags: ["Client"],
        response: {
          200: z.object({
            clientData: z.array(clientReponseSchema),
          }),
        },
      },
    },
    controller.getAll,
  );

  typedApp.get(
    "/:client_id",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar Cliente!",
        tags: ["Client"],
        params: z.object({client_id: z.string()}),
        response: {
          200: z.object({
            clientData: clientReponseSchema,
          }),
        },
      },
    },
    controller.getById,
  );

  typedApp.put(
    "/:client_id",
    {
      preHandler: Authorization(["worker", "client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Atualizar Cliente!",
        tags: ["Client"],
        params: z.object({client_id: z.string()}),
        body: updateClientSchema,
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
    "/:client_id",
    {
      preHandler: Authorization(["worker", "client"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Remove Cliente!",
        tags: ["Client"],
        params: z.object({client_id: z.string()}),
        body: updateClientSchema,
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