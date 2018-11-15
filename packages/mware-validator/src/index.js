// @flow

import type {
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext, IAny
} from '../../mware-core/src/interface'
import Ajv from 'ajv'
import { BAD_REQUEST, getStatusText } from 'http-status-codes'

const ajv = new Ajv()

export type IOpts = {
  schema: {
    [key: string]: IAny
  },
  scheme?: {
    [key: string]: IAny
  }
}

export const DEFAULT_SCHEMA: IOpts = {
  schema: {}
}

export default ((opts?: IOpts) => {
  const {schema, scheme} = opts || DEFAULT_SCHEMA

  return ((req: IRequest, res: IResponse, next: INext) => {
    if (!ajv.validate(schema || scheme, req)) {
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