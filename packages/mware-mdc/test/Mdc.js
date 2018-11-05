import Mdc, {DEFAULT_NS, DEFAULT_KEY} from '../src/Mdc'
import reqresnext from 'reqresnext'

describe('Mdc', () => {
  const reqSpanId = '1234567890abcdef'
  const reqTraceId = 'abcdef1234567890'
  const bindEmitter = jest.fn()
  const get = jest.fn()
  const set = jest.fn()
  const run = cb => cb()
  const { req, res, next } = reqresnext(null, null, jest.fn())
  const ns = {
    bindEmitter,
    get,
    set,
    run
  }
  const mdc = new Mdc({ns})

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('returns proper instance', () => {
      expect(mdc).toBeInstanceOf(Mdc)
      expect(mdc.ns).not.toBeUndefined()
    })
  })

  describe('proto', () => {
    it('`contextify` binds req, res', () => {
      mdc.contextify(req, res, next)

      expect(bindEmitter).toHaveBeenCalledWith(req)
      expect(bindEmitter).toHaveBeenCalledWith(res)
      expect(next).toHaveBeenCalled()
    })

    describe('`trace` attaches MDC ids to res headers', () => {
      it('init', () => {
        const {req, res} = reqresnext()
        mdc.trace(req, res, next)

        expect(res.get('x-b3-traceid')).not.toBe(reqTraceId)
        expect(res.get('x-b3-traceid')).toMatch(/^[0-9a-f]{16}$/)
        expect(res.get('x-b3-spanid')).toMatch(/^[0-9a-f]{16}$/)
        expect(res.get('x-b3-parentspanid')).toBeUndefined()
        expect(next).toHaveBeenCalled()
      })

      it('transmit', () => {
        const {req, res} = reqresnext({
          headers: {
            'x-b3-traceid': reqTraceId,
            'x-b3-spanid': reqSpanId
          }
        })
        mdc.trace(req, res, next)

        expect(res.get('x-b3-traceid')).toBe(reqTraceId)
        expect(res.get('x-b3-spanid')).toMatch(/^[0-9a-f]{16}$/)
        expect(res.get('x-b3-parentspanid')).toBe(reqSpanId)
        expect(next).toHaveBeenCalled()
      })

      it('`get` returns stores vars', done => {
        const mdc = new Mdc({})
        const {req, res} = reqresnext({
          headers: {
            'x-b3-traceid': reqTraceId,
            'x-b3-spanid': reqSpanId
          }
        })
        const next = () => {
          expect(mdc.get()).toEqual(expect.objectContaining({
            trace_id: reqTraceId,
            parent_span_id: reqSpanId
          }))
          done()
        }
        mdc.contextify(req, res, () => mdc.trace(req, res, next))
      })
    })
  })

  describe('static', () => {
    it('`getNamespace` returns CLS namespace', () => {
      expect(Mdc.getNamespace(DEFAULT_KEY)).toBe(DEFAULT_NS)
      expect(Mdc.getNamespace()).toBe(DEFAULT_NS)
      expect(Mdc.getNamespace('foo')).not.toBe(DEFAULT_NS)
      expect(Mdc.getNamespace({})).toEqual({})
    })
  })
})
