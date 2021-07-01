// @flow

export const asyncMiddleware = (fn: Function): Function => (req: any, res:any, next: Function): Promise<any> =>
  Promise.resolve(fn(req, res, next)).catch(next)
