import { FastifyReply, FastifyRequest } from "fastify";
import { makeProfessionalService } from "./professional.factory";
import { createProfessionalData } from "./dtos/professional.dto.schema";
import { UpdateProfessional } from "./dtos/professional.dto.type";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeProfessionalService();
  const data = request.body as createProfessionalData;
  const user_id = request.user?.sub!;
  const result = await service.create({ user_id, ...data });

  reply.status(201).send({
    ProfessionalsData: result,
  });
};

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeProfessionalService();
  const { professional_id } = request.params as { professional_id: number };
  const result = await service.getById(professional_id);

  reply.status(200).send({
    ProfessionalsData: result,
  });
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeProfessionalService();
  const result = await service.getAll();

  reply.status(200).send({
    ProfessionalsData: result,
  });
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeProfessionalService();
  const data = request.body as UpdateProfessional;
  const { professional_id } = request.params as { professional_id: number };
  await service.update(professional_id, data);

  reply.status(200).send({
    message: "Dados do profissional atualizado com sucesso!",
  });
};

export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  const service = makeProfessionalService();
  const { professional_id } = request.params as { professional_id: number };
  await service.remove(professional_id);

  reply.status(200).send({
     message: "Profissional removido com sucesso!",
  });
};
