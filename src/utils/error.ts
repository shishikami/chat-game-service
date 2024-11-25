export default class CustomError extends Error {
  public cause: any

  constructor(message: string, data: any) {
    super(message);
    this.name = this.constructor.name;
    this.cause = data;
    Error.captureStackTrace(this, this.constructor);
  }
}