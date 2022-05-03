import factory, {TRACE_KEY} from '../src'
import reqresnext from 'reqresnext'
import clscontext, {getContextValue} from '@qiwi/mware-context'

describe('mware-mdc', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  it('attaches trace headers to response`', () => {
    const mware = factory({})
    const {req, res, next} = reqresnext(null, null, jest.fn())

    mware(req, res, next)

    expect(res.get('x-b3-traceid')).toMatch(/^[0-9a-f]{16}$/)
    expect(res.get('x-b3-spanid')).toMatch(/^[0-9a-f]{16}$/)
    expect(res.get('x-b3-parentspanid')).toBeUndefined()
    expect(next).toHaveBeenCalled()
  })

  it('relies on incoming req tracing headers if exist', () => {
    const mware = factory({})
    const reqSpanId = '1234567890abcdef'
    const reqTraceId = 'abcdef1234567890'
    const {req, res, next} = reqresnext({
      headers: {
        'x-b3-traceid': reqTraceId,
        'x-b3-spanid': reqSpanId
      }
    }, null, jest.fn())
    mware(req, res, next)

    expect(res.get('x-b3-traceid')).toBe(reqTraceId)
    expect(res.get('x-b3-spanid')).toMatch(/^[0-9a-f]{16}$/)
    expect(res.get('x-b3-parentspanid')).toBe(reqSpanId)
  })

  it('attaches req.trace field and passes it down through inner async context', done => {
    const mware = factory({})
    const {req, res} = reqresnext()
    const delayed = (req) => new Promise(resolve => setTimeout(() => resolve(req.trace), 200))
    const inner = () => {
      expect(req.trace).toMatchObject({
        trace_id: expect.stringMatching(/^[0-9a-f]{16}$/),
        span_id: expect.stringMatching(/^[0-9a-f]{16}$/),
      })

      delayed(req)
        .then(trace => {
          expect(trace).toMatchObject({
            trace_id: expect.stringMatching(/^[0-9a-f]{16}$/),
            span_id: expect.stringMatching(/^[0-9a-f]{16}$/),
          })
        })
        .then(() => done())
    }
    mware(req, res, inner)
  })

  describe('injects trace to CLS-context if exists', () => {
    const clswware = clscontext()
    const mdcmware = factory()
    const reqSpanId = '1234567890abcdef_'
    const reqTraceId = 'abcdef1234567890_'
    const last = jest.fn(() => {
      expect(getContextValue(TRACE_KEY)).toEqual(expect.objectContaining({
        trace_id: reqTraceId,
        parent_span_id: reqSpanId
      }))
    })

    const {req, res, next} = reqresnext({
      headers: {
        'x-b3-traceid': reqTraceId,
        'x-b3-spanid': reqSpanId
      }
    }, null, () => mdcmware(req, res, last))
    clswware(req, res, next)

    expect(last).toHaveBeenCalled()
  })
})
