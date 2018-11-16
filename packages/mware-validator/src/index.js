// @flow

import type {
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext,
  IAnyObject,
} from '../../mware-core/src/interface'
import Ajv from 'ajv'
import { BAD_REQUEST, getStatusText } from 'http-status-codes'

export type IOpts = {
  schema: IAnyObject,
  scheme?: IAnyObject,
  opts?: IAnyObject
}

export const DEFAULT_SCHEMA: IOpts = {
  schema: {},
  opts: {}
}

const ajvStack = {}
const getAjv = (opts = {}) => {
  const key = JSON.stringify(opts)

  if (!ajvStack[key]) {
    ajvStack[key] = new Ajv(opts)
  }

  console.log('!!!', Object.keys(ajvStack))

  return ajvStack[key]
}

export default ((opts?: IOpts) => {
  const {schema, scheme, opts: ajvOpts} = opts || DEFAULT_SCHEMA
  const ajv = getAjv(ajvOpts)

  return ((req: IRequest, res: IResponse, next: INext) => {
    if (!ajv.validate(schema || scheme, req)) {
      console.log(schema || scheme, req)

      res
        .status(BAD_REQUEST)
        .send({
          message: getStatusText(BAD_REQUEST),
          details: ajv.errorsText()
        })

      return
    }

    next()
  }: IRegularMiddleware)
}: IMiddlewareFactory)