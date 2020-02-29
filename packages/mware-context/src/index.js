// @flow

import type {
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext
} from '../../mware-core/src/interface'

import {createNamespace, getNamespace} from 'cls-hooked'
import type {INamespace} from 'cls-hooked'

export const DEFAULT_SPACE_ID = 'DEFAULT_SPACE'
export const DEFAULT_NS = getNamespace(DEFAULT_SPACE_ID) || createNamespace(DEFAULT_SPACE_ID)
export const TRACE_KEY = 'trace'

export const getContextValue = (key: string, ns?: IAny) => {
  return getContext(ns).get(key)
}
export const setContextValue = (key: string, value: IAny, ns?: IAny) => {
  getContext(ns).set(key, value)
}
export const getContext = (ns: IAny): INamespace => {
  switch (typeof ns) {
    case 'string':
      return getNamespace(ns) || createNamespace(ns)

    case 'object':
      return ns

    default:
      return DEFAULT_NS
  }
}

export type IOpts = {
  ns?: string | INamespace
}

export default ((opts: ?IOpts) => {
  const cxt: INamespace = getContext(opts && opts.ns)
  return ((req: IRequest, res: IResponse, next: INext) => {
    cxt.bindEmitter(req)
    cxt.bindEmitter(res)

    return cxt.run(() => next())
  }: IRegularMiddleware)
}: IMiddlewareFactory)
