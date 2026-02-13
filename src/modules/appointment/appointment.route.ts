import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AppointmentResponceSchema, createAppointmentSchema, updateAppointmentSchema } from "./dtos/appointment.dto.type";
import { z } from "zod"
import * as controller from "../appointment/appointment.controller"
import { Authorization } from "../../share/middlewares/Autorizations";

export async function AppointmentsRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.post(
    "/",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Cadastrar um agendamento!",
        tags: ["Appointment"],
        body: createAppointmentSchema,
        response: {
          201: z.object({
            appointmentData: AppointmentResponceSchema,
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
        summary: "Buscar todos os agendamentos!",
        tags: ["Appointment"],
        response: {
          200: z.object({
            appointmentData: z.array(AppointmentResponceSchema),
          }),
        },
      },
    },
    controller.getAll,
  );

  typedApp.get(
    "/:appointment_id",
    {
     preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Buscar agendamento!",
        tags: ["Appointment"],
        params: z.object({appointment_id: z.string()}),
        response: {
          200: z.object({
            appointmentData: AppointmentResponceSchema,
          }),
        },
      },
    },
    controller.getById,
  );

  typedApp.put(
    "/:appointment_id",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Atualizar agendamento!",
        tags: ["Appointment"],
        params: z.object({appointment_id: z.string()}),
        body: updateAppointmentSchema,
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
    "/:appointment_id",
    {
      preHandler: Authorization(["worker"], "ACCESS_TOKEN", "accessToken"),
      schema: {
        summary: "Remove agendamento!",
        tags: ["Appointment"],
        params: z.object({appointment_id: z.string()}),
        body: updateAppointmentSchema,
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