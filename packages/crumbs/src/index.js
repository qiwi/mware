// @flow

import type {
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext
} from '@qiwi/mware-core'
import {address} from 'ip'

export const HOST = 'host'
export const X_FORWARDED_FOR = 'x-forwarded-for'
export const X_FORWARDED_HOST = 'x-forwarded-host'
export const XFF = X_FORWARDED_FOR;
export const XFH = X_FORWARDED_HOST
export const SEPARATOR = ', '

export default (() => {
  return ((req: IRequest, res: IResponse, next: INext) => {
    const xfh = req.get(XFH) || req.get(HOST)
    const xff = req.get(XFF) || req.connection.remoteAddress
    const ip = address()
    const ips = xff
      ? xff.split(SEPARATOR)
      : []
    const nextXff = ips.concat(ip).join(SEPARATOR)

    req.headers[XFF] = nextXff
    req.headers[XFH] = xfh

    next()
  }: IRegularMiddleware)
}: IMiddlewareFactory)
