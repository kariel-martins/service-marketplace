import { FastifyReply, FastifyRequest } from "fastify";
import { makeAvailiabilityService } from "./availiability.factory";
import { createAvailiabilityData, updateAvailiabilityData } from "./dtos/availiability.dto.schema";


export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const Availiability = makeAvailiabilityService();
  const professional_id = Number(request.user?.scope!);
  const data = request.body as createAvailiabilityData;
  const result = await Availiability.create({ ...data, professional_id });

  reply.status(201).send({
    availiabilityData: result,
  });
};

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const Availiability = makeAvailiabilityService();
  const { availiability_id } = request.params as { availiability_id: number };
  const result = await Availiability.getById(availiability_id);

  reply.status(200).send({
    availiabilityData: result,
  });
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const Availiability = makeAvailiabilityService();
  const professional_id = request.user?.scope!;
  const result = await Availiability.getAll(Number(professional_id));

  reply.status(200).send({
    availiabilityData: result,
  });
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const Availiability = makeAvailiabilityService();
  const { availiability_id } = request.params as { availiability_id: number };
  const data = request.body as updateAvailiabilityData;
  await Availiability.update(Number(availiability_id), data);

  reply.status(200).send({
    message: "Disponibilidade atualizada com sucesso!"
  });
};

export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  const Availiability = makeAvailiabilityService();
  const { availiability_id } = request.params as { availiability_id: number };
  await Availiability.remove(availiability_id);

  reply.status(200).send({
    message: "Disponibilidade removido com sucesso!"
  });
};
