// @flow

export type IAny = any

export interface ILogger {
  debug: (...args: IAny[]) => void,
  info: (...args: IAny[]) => void,
  warn: (...args: IAny[]) => void,
  error: (...args: IAny[]) => void
}

export type IRequest = IAny
export type IResponse = IAny
export type INext = Function
export type IRegularMiddleware = (req: IRequest, res: IResponse, next: INext) => IAny
export type IErrorHandlerMiddleware = (err: IAny, req: IAny, res: IAny, next: Function) => IAny
export type IMiddleware = IRegularMiddleware | IErrorHandlerMiddleware

export type IMiddlewareOpts = {
  logger?: ILogger
}

export type IMiddlewareFactory = (?IMiddlewareOpts) => IMiddleware
