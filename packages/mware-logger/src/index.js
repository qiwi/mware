// @flow

import type {
  IMiddlewareFactory,
  IRegularMiddleware,
  IRequest,
  IResponse,
  INext, IMiddlewareOpts
} from '../../mware-core/src/interface'
import crypto from 'crypto'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes'

export const DEBUG = 'debug';
export const INFO = 'info';
export const WARN = 'warn';
export const ERROR = 'error';

export const getLogLevelByStatus = (status: number): string => {
  return status < BAD_REQUEST
    ? INFO
    : status >= INTERNAL_SERVER_ERROR
      ? ERROR
      : WARN
}

export const DEFAULT_LOGGER = console // TODO inherit from core

export default (opts => {
  const log = opts && opts.logger || DEFAULT_LOGGER

  return ((req: IRequest, res: IResponse, next: INext) => {
    const start = Date.now();
    const origin = req.get('origin')
    const id = req.id || res.get('x-b3-spanid') || crypto.randomBytes(8).toString('hex')
    const target = req.url

    const _write = res.write;
    const _end = res.end;
    const _send = res.send;
    const chunks = [];
    let sent;

    req.id = res.id = id;

    log.info(`REQ ${id} > method=${req.method} target=${target} origin=${origin} ip=${req.ip} headers=${JSON.stringify(req.headers)}`);

    res.send = (...args) => {
      res.send = _send;
      sent = args;
      _send.apply(res, args);
    };

    res.write = (...args) => {
      chunks.push(new Buffer(args[0]));
      _write.apply(res, args);
    };

    res.end = (...args) => {
      const chunk = args[0];

      if (chunk) {
        chunks.push(new Buffer(chunk));
      }
      res.end = _end;
      res.write = _write;
      _end.apply(res, args);
    };

    // NOTE we can not get entire headers list on send
    res.on('finish', () => {
      const status = res.statusCode;
      const level = getLogLevelByStatus(status);
      const contentLength = (sent ? new Buffer('' + sent[0]) : Buffer.concat(chunks)).length;

      sent = null;
      chunks.length = 0;

      log[level](`RES ${res.id} < status=${status} duration=${Date.now() - start}ms headers=${JSON.stringify(res.header()._headers)} bufferLength=${contentLength}`);
    });

    next();
  }: IRegularMiddleware)
}: IMiddlewareFactory)
