import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import drizzlePlugin from "./plugins/drizzle"
import swaggerPlugin from "./plugins/swagger"
import seguriPlugin from "./plugins/segurity"
import fastifyCookie from "@fastify/cookie";
import { authRoutes } from "./modules/Auth/auth.route";
import formbody from '@fastify/formbody'
import { env } from "./config/env";
import { errorHandler } from "./core/Errors/ErrorHandler";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(formbody)

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
})
app.setErrorHandler(errorHandler);

app.register(seguriPlugin)
app.register(drizzlePlugin)

app.register(fastifyCookie, {
  secret: env("COOKIES_SECRET")
});

app.register(swaggerPlugin)

app.register(authRoutes, { prefix:"/api/v1/auth"});

export default app;