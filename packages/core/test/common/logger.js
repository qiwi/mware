import logger from '../../src/common/logger'

describe('common/logger', () => {
  it('exposes standard console', () => {
    ['info', 'warn', 'error', 'debug'].forEach(method => {
      expect(logger[method]).toBe(console[method])
    })
  })
})
