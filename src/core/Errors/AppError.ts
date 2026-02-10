export class AppError extends Error {
  public readonly statusCode: number;
  public context?: string;

  constructor (
    message: string,
    statusCode = 400,
    context?: string
  ) {
    super(message)

    this.statusCode = statusCode
    this.context = context

    Error.captureStackTrace(this, this.constructor)
  }
}
