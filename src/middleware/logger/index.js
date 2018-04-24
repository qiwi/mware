// @flow

import type {
  ILogger,
  IMiddlewareOpts,
  INext,
  IRequest,
  IResponse,
  IMiddleware,
  IRegularMiddleware
} from '../../interface'

import common from '../../common'

export default function loggerMiddlewareFactory (opts: IMiddlewareOpts = {}): IMiddleware {
  const log: ILogger = opts.logger || common.logger

  return (((req: IRequest, res: IResponse, next: INext) => {}): IRegularMiddleware)
}
