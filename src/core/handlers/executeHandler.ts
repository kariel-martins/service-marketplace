import { AppError } from "../Errors/AppError";

export class ExecuteHandler {
  public async repository<T>(
    fn: () => Promise<T | null>,
    message: string,
    context: string,
  ): Promise<T> {
    try {
      const result = await fn();

      if (!result) throw new AppError(message, 404, context);

      return result;
    } catch (error: any) {
      console.error(`Erro em ${context}:`, error?.message);

      if (error?.cause) {
        console.error("DB Cause:", {
          message: error.cause.message,
          code: error.cause.code,
          detail: error.cause.detail,
          constraint: error.cause.constraint,
        });
      }

      if (error?.code === "23503") {
        throw new AppError(
          "Registro relacionado não encontrado.",
          400,
          context,
        );
      }

      //  not null
      if (error?.code === "23502") {
        throw new AppError("Campo obrigatório não informado.", 400, context);
      }

      // unique violation
      if (error?.code === "23505") {
        throw new AppError("Registro já existe.", 409, context);
      }

      if (error instanceof AppError) throw error;

      throw new AppError(message, 500, context);
    }
  }

  public async service<T>(
    fn: () => Promise<T>,
    message: string,
    context: string,
  ): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      console.error(`Erro em ${context}:`, error?.message, error?.stack);

      if (error instanceof AppError) throw error;

      throw new AppError(message, 500, context);
    }
  }
}
