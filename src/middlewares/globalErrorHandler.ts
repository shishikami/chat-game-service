import { APIError } from "@coze/api";
import { Request, Response, NextFunction } from "express";
import Result from "../utils/result";
import CustomError from "../utils/error";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof APIError){
    res.json(Result.error(err.code ?? 500, err.message))
  } if(err instanceof CustomError){
    res.json(Result.defaultError("业务异常", err.cause))
  } else {
    res.json(Result.defaultError("未知异常", err))
  }
};

export default globalErrorHandler;