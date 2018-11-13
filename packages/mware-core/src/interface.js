// @flow

export type IAny = any

export type ILogMethod = (...args: IAny[]) => void
export type ILogger = {
  [string]: ILogMethod,
  debug: ILogMethod,
  info: ILogMethod,
  warn: ILogMethod,
  error: ILogMethod
}

export type IRequest = IAny
export type IResponse = IAny
export type INext = Function
export type IRegularMiddleware = (req: IRequest, res: IResponse, next: INext) => IAny
export type IErrorHandlerMiddleware = (err: IAny, req: IAny, res: IAny, next: Function) => IAny
export type IMiddleware = IRegularMiddleware | IErrorHandlerMiddleware

export type IMiddlewareOpts = {
  logger?: ILogger,
  [key: string]: IAny
}

export type IMiddlewareFactory = (opts?: IMiddlewareOpts) => IMiddleware
