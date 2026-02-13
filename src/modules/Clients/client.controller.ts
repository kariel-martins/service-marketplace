import { FastifyReply, FastifyRequest } from "fastify";
import { makeClientClient } from "./client.factory";
import { createClientData, updateClientData } from "./dtos/client.dto.schema";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const Client = makeClientClient();
  const professional_id = Number(request.user?.scope!)
  const data = request.body as createClientData
  const result = await Client.create({professional_id, ...data});

  reply.status(201)
    .send({
      clientData: result,
    });
};

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const Client = makeClientClient();
  const { client_id } = request.params as {client_id: string}
  const result = await Client.getById(client_id);

  reply.status(200)
    .send({
      clientData: result,
    });
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const Client = makeClientClient();
  const professional_id = request.user?.scope!
  const result = await Client.getAll(Number(professional_id));

  reply.status(200)
    .send({
      clientData: result,
    });
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const Client = makeClientClient();
  const { client_id } = request.params as {client_id: string}
  const data = request.body as updateClientData
  await Client.update(client_id, data);

  reply.status(200)
    .send({
      message: "Cliente atualizado com sucesso!"
    });
};


export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  const Client = makeClientClient();
  const { client_id } = request.params as {client_id: string}
  await Client.remove(client_id);

  reply.status(200)
    .send({
      message: "Cliente removido com sucesso!"
    });
};