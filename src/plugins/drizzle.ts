import fp from "fastify-plugin";
import { db } from "../database";

export default fp(async (fastify) => {
  fastify.decorate("db", db);
});
