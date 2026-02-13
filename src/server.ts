import app from "./app";
import dotenv from "dotenv";
import { env } from "./config/env";

dotenv.config();

function bootstrap() {
  try {
    app.listen({ port: Number(env("PORT") || 3030), host: '0.0.0.0'});
    console.log(`Servidor rodando: http://localhost:${env("PORT")}`);
    console.log(`Documentação rodando: http://localhost:${env("PORT")}/docs`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

bootstrap();
