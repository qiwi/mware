// @flow

export type IAny = any

export interface ILogger {
  debug: (...args: ?IAny[]) => void,
  info: (...args: ?IAny[]) => void,
  warn: (...args: ?IAny[]) => void,
  error: (...args: ?IAny[]) => void
}
