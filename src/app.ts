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
import { ServicesRoutes } from "./modules/Service/service.route";
import { ProfessionalRoutes } from "./modules/Professional/professional.route";
import { ClientsRoutes } from "./modules/Clients/client.route";
import { AvailiabilityRoutes } from "./modules/Availiability/availiability.route";
import { AppointmentsRoutes } from "./modules/appointment/appointment.route";

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
app.register(ServicesRoutes, { prefix:"/api/v1/services"});
app.register(ProfessionalRoutes, { prefix:"/api/v1/professionals"});
app.register(ClientsRoutes, { prefix:"/api/v1/clients"});
app.register(AvailiabilityRoutes, { prefix:"/api/v1/availiabilities"});
app.register(AppointmentsRoutes, { prefix:"/api/v1/appointments"});

export default app;