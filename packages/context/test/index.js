import factory, {getContextValue, setContextValue, DEFAULT_NS, getContext} from '../src'
import reqresnext from 'reqresnext'

describe('mware-context', () => {
  const mware = factory({})

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  describe('contextify', () => {
    it('binds req, res with cls context', () => {
      expect(() => setContextValue('foo', 123)).toThrow('No context available. ns.run() or ns.bind() must be called first.')

      const { req, res, next } = reqresnext(null, null, jest.fn(() => {
        setContextValue('foo', 'bar')
        expect(getContextValue('foo')).toBe('bar')
      }))

      mware(req, res, next)

      expect(getContextValue('foo')).toBeUndefined()
      expect(next).toHaveBeenCalled()
    })
  })

  describe('getContext', () => {
    it('creates/returns ns by name', () => {
      const ns = 'foo'

      expect(getContext(ns)).toBe(getContext(ns))
      expect(getContext(ns)).not.toBe(DEFAULT_NS)
    })

    it('returns constext by ref', () => {
      const cxt = getContext('baz')

      expect(getContext(cxt)).toBe(cxt)
    })

    it('returns default NS otherwise', () => {
      expect(getContext()).toBe(DEFAULT_NS)
    })
  })

  describe('mware', () => {
    it('binds req, res with context', () => {
      const bindEmitter = jest.fn()
      const get = jest.fn()
      const set = jest.fn()
      const run = jest.fn(cb => cb())
      const { req, res, next } = reqresnext(null, null, jest.fn())
      const ns = {
        bindEmitter,
        get,
        set,
        run
      }
      const mware = factory({ns})
      mware(req, res, next)

      expect(bindEmitter).toHaveBeenCalledWith(req)
      expect(bindEmitter).toHaveBeenCalledWith(res)
      expect(run).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })
})
