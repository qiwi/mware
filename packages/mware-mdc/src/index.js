// @flow

import type {
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext
} from '../../mware-core/src/interface'
import crypto from 'crypto'
import {setContextValue, getContext} from '@qiwi/mware-context'

export const TRACE_KEY = 'trace'

export default (() => {
  return ((req: IRequest, res: IResponse, next: INext) => {
    if (req.trace) {
      next()
    }

    const spanId = crypto.randomBytes(8).toString('hex')
    const traceId = req.get('X-B3-TraceId') || spanId
    const parentSpanId = req.get('X-B3-SpanId')
    const trace = {
      trace_id: traceId,
      span_id: spanId,
      parent_span_id: parentSpanId || null
    }

    if (getContext().active) {
      setContextValue(TRACE_KEY, trace)
    }

    Object.defineProperty(req, 'trace', {
      get() {
        return trace
      },
      set() {}
    })

    res.set('X-B3-TraceId', traceId)
    res.set('X-B3-SpanId', spanId)

    if (parentSpanId) {
      res.set('X-B3-ParentSpanId', parentSpanId)
    }

    next()
  }: IRegularMiddleware)
}: IMiddlewareFactory)
