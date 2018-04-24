import index from '../../src/common'
import logger from '../../src/common/logger'

describe('common/index', () => {
  describe('exposes defaults', () => {
    it('logger', () => {
      expect(index.logger).toBe(logger)
    })
  })
})
