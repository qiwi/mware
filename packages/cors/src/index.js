// @flow

import type {
  IAny,
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext,
  ILogger
} from '@qiwi/mware-core'

import {omit} from 'lodash'

export const ALLOW_ORIGIN = 'Access-Control-Allow-Origin'
export const ALLOW_HEADERS = 'Access-Control-Allow-Headers'
export const EXPOSE_HEADERS = 'Access-Control-Expose-Headers'
export const ALLOW_METHODS = 'Access-Control-Allow-Methods'
export const ALLOW_CREDENTIALS = 'Access-Control-Allow-Credentials'

type Record<T, V> = {
  [T]: V
}

export const DEFAULT_HEADERS: Record<string, string> = {
  [ALLOW_ORIGIN]: '*',
  [ALLOW_HEADERS]: 'set-cookie, Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  [EXPOSE_HEADERS]: 'Cookie, Set-Cookie, Location',
  [ALLOW_METHODS]: 'GET, HEAD, PATCH, PUT, POST, DELETE, OPTIONS',
  [ALLOW_CREDENTIALS]: 'true'
}

export const formatOriginHeader = (policy: IAny, origin: IAny): string => {
  switch (policy) {
    case 'echo':
      return origin

    case undefined:
    case null:
      return '*'

    default:
      return '' + policy
  }
}
export type headers = typeof ALLOW_ORIGIN | typeof ALLOW_HEADERS | typeof EXPOSE_HEADERS | typeof ALLOW_METHODS | typeof ALLOW_CREDENTIALS
export type IOpts = {
  logger?: ILogger,
  [headers]: ?string
}

export const cors = ((opts: ?IOpts) => {
  return ((req: IRequest, res: IResponse, next: INext) => {
    const allowOrigin = formatOriginHeader(opts && opts[ALLOW_ORIGIN], req.get('origin'))
    const corsHeaders: {[key: string]: string} = {
      ...DEFAULT_HEADERS,
      ...omit(opts, 'logger'),
      [ALLOW_ORIGIN]: allowOrigin
    }

    res.header(corsHeaders)

    next()
  }: IRegularMiddleware)
}: IMiddlewareFactory)

export default cors
