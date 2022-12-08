// @flow

import type {
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext,
  IAnyObject,
} from '@qiwi/mware-core'
import Ajv from 'ajv'
import addAjvFormats from 'ajv-formats'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export type IOpts = {
  schema: IAnyObject,
  scheme?: IAnyObject,
  opts?: IAnyObject
}

export const DEFAULT_SCHEMA: IOpts = {
  schema: {},
  opts: {}
}

const ajvStack: {[string]: typeof Ajv} = {}
const getAjv = (opts: IAnyObject = {}) => {
  const key = JSON.stringify(opts)

  if (!ajvStack[key]) {
    ajvStack[key] = new Ajv(opts)
    addAjvFormats(ajvStack[key], opts)
  }

  return ajvStack[key]
}

export const validator = ((opts?: IOpts) => {
  const {schema, scheme, opts: ajvOpts = {}} = opts || DEFAULT_SCHEMA
  const ajv = getAjv(ajvOpts)

  return ((req: IRequest, res: IResponse, next: INext) => {
    if (!ajv.validate(schema || scheme, req)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({
          message: ReasonPhrases.BAD_REQUEST,
          details: ajv.errorsText()
        })

      return
    }

    next()
  }: IRegularMiddleware)
}: IMiddlewareFactory)

export default validator
