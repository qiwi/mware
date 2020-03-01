// @flow

export const asyncMiddleware = (fn: Function) => (req: any, res:any, next: Function) =>
  Promise.resolve(fn(req, res, next)).catch(next)
