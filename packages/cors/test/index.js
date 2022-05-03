import factory, {ALLOW_ORIGIN, ALLOW_METHODS } from '../src'
import reqresnext from 'reqresnext'

describe('mware-crumbs', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  describe('sets CORS headers', () => {
    it('default', () => {
      const mware = factory({})
      const { req, res, next } = reqresnext(null, null, jest.fn())

      mware(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(res.get(ALLOW_ORIGIN)).toBe('*')
    })

    it('optional methods', () => {
      const mware = factory({
        [ALLOW_ORIGIN]: 'example.com',
        [ALLOW_METHODS]: 'GET, PUT'
      })
      const { req, res, next } = reqresnext(null, null, jest.fn())

      mware(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(res.get(ALLOW_ORIGIN)).toBe('example.com')
      expect(res.get(ALLOW_METHODS)).toBe('GET, PUT')
    })

    it('origin echo', () => {
      const mware = factory({ [ALLOW_ORIGIN]: 'echo' })
      const { req, res, next } = reqresnext({
        headers: {
          origin: 'www.example.com'
        }
      }, null, jest.fn())

      mware(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(res.get(ALLOW_ORIGIN)).toBe('www.example.com')
    })
  })
})