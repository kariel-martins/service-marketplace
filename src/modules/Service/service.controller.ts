import { FastifyReply, FastifyRequest } from "fastify";
import { makeServiceService } from "./service.factory";
import { createServiceRequestData, updateServiceRequestData } from "./dtos/service.dto.schema";


export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeServiceService();
  
  const data = request.body as createServiceRequestData
  const professional_id = Number(request.user?.scope!)
  const result = await service.create({professional_id, ...data});

  reply.status(201)
    .send({
      serviceData: result,
    });
};

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeServiceService();
  const { service_id } = request.params as {service_id: number}
  const result = await service.getById(service_id);

  reply.status(200)
    .send({
      serviceData: result,
    });
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeServiceService();
  const professional_id = request.user!.scope!
  const result = await service.getAll(Number(professional_id));

  reply.status(200)
    .send({
      serviceData: result,
    });
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeServiceService();
  const { service_id } = request.params as {service_id: number}
  const data = request.body as updateServiceRequestData
  await service.update(Number(service_id), data);

  reply.status(200)
    .send({
      message: "Serviço atualizado com sucesso!"
    });
};


export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeServiceService();
  const { service_id } = request.params as {service_id: number}
  await service.remove(service_id);

  reply.status(200)
    .send({
      message: "Serviço removido com sucesso!"
    });
};