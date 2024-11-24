/**
 * 统一状态响应
 */
export default class Result<T> {
  private code: number;

  private message: string;

  private data: T

  constructor(code: number, message: string, data: T){
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static defaultError = <T>(message: string, data?: T) => {
    return new Result<T|undefined|null>(
      500,
      message,
      data,
    )
  }

  static error = <T>(code: number, message: string, data?: T) => {
    return new Result<T|undefined|null>(
      code,
      message,
      data,
    )
  }

  static defaultSuccess = <T>(data: T) => {
    return new Result<T>(
      200,
      'success',
      data,
    )
  }

  static success = <T>(message: string, data: T) => {
    return new Result<T>(
      200,
      message,
      data,
    )
  }
}