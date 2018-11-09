// @flow

import crypto from 'crypto'
import {createNamespace, getNamespace} from 'cls-hooked'
import type {INamespace} from 'cls-hooked'
import type {
  IAny,
  IRequest,
  IResponse,
  INext
} from '../../mware-core/src/interface'

export const DEFAULT_SPACE_ID = 'mdc'
export const DEFAULT_NS = createNamespace(DEFAULT_SPACE_ID)
export const TRACE_KEY = 'trace'

export type IOpts = {
  ns?: string
}

export default class Mdc {
  ns: INamespace
  constructor({ns}: IOpts) {
    this.ns = this.constructor.getNamespace(ns)
  }

  contextify(req: IRequest, res: IResponse, next: INext) {
    this.ns.bindEmitter(req)
    this.ns.bindEmitter(res)

    return this.ns.run(() => next())
  }

  trace(req: IRequest, res: IResponse, next: INext) {
    const spanId = crypto.randomBytes(8).toString('hex')
    const traceId = req.get('X-B3-TraceId') || spanId
    const parentSpanId = req.get('X-B3-SpanId')
    const self = this

    // $FlowFixMe
    Object.defineProperty(req, 'trace', {
      get() {
        return self.get()
      },
      set() {}
    })

    // NOTE underscored by contract
    this.ns.set(TRACE_KEY, {
      trace_id: traceId,
      span_id: spanId,
      parent_span_id: parentSpanId || null
    })

    res.set('X-B3-TraceId', traceId)
    res.set('X-B3-SpanId', spanId)

    if (parentSpanId) {
      res.set('X-B3-ParentSpanId', parentSpanId)
    }

    next()
  }

  get() {
    return this.ns.get(TRACE_KEY)
  }

  static getNamespace(ns: IAny) {
    switch (typeof ns) {
      case 'string':
        return getNamespace(ns) || createNamespace(ns)

      case 'object':
        return ns

      default:
        return DEFAULT_NS
    }
  }
};

