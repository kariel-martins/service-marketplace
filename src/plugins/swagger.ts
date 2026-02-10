import fp from "fastify-plugin";
import { fastifySwagger } from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export default fp(async (app) => {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Marketplace de Serviços (API)",
        description: "Documentação completa das rotas da API",
        version: "0.1.0",
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "accessToken",
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(ScalarApiReference, {
    routePrefix: "/docs"
  }); //posivelmente foi aqui
});