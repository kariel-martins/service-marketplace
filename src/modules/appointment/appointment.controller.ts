import { FastifyReply, FastifyRequest } from "fastify";
import { makeAppointmentService } from "./appointment.factory";
import { createAppointmentData, updateAppointmentData } from "./dtos/appointment.dto.type";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const Appointment = makeAppointmentService();
  const data = request.body as createAppointmentData
  const { scope } = request.user! as {scope: number}
  const result = await Appointment.create({ professional_id: scope, ...data });

  reply.status(201)
    .send({
      appointmentData: result,
    });
};

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const Appointment = makeAppointmentService();
  const { appointment_id } = request.params as {appointment_id: number}
  const result = await Appointment.getById(appointment_id);

  reply.status(200)
    .send({
      appointmentData: result,
    });
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const Appointment = makeAppointmentService();
  const professional_id = request.user?.scope!
  const result = await Appointment.getAll(Number(professional_id));

  reply.status(200)
    .send({
      appointmentData: result,
    });
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const Appointment = makeAppointmentService();
  const { appointment_id } = request.params as {appointment_id: number}
  const data = request.body as updateAppointmentData
  await Appointment.update(Number(appointment_id), data);

  reply.status(200)
    .send({
      message: "Agendamento atualizado com sucesso!"
    });
};


export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  const Appointment = makeAppointmentService();
  const { appointment_id } = request.params as {appointment_id: number}
  await Appointment.remove(appointment_id);

  reply.status(200)
    .send({
      message: "Agendamento removido com sucesso!"
    });
};