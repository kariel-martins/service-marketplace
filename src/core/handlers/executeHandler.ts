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
      console.error(`Erro em ${context}:`, error?.message, error?.stack);

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
