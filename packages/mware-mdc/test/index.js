import factory from '../src'
import reqresnext from 'reqresnext'

describe('mware-mdc', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  it('composes `mdc.proto.contextify()` and `.trace()`', () => {
    const mware = factory({})
    const {req, res, next} = reqresnext(null, null, jest.fn())

    mware(req, res, next)

    expect(res.get('x-b3-traceid')).toMatch(/^[0-9a-f]{16}$/)
    expect(res.get('x-b3-spanid')).toMatch(/^[0-9a-f]{16}$/)
    expect(res.get('x-b3-parentspanid')).toBeUndefined()
    expect(next).toHaveBeenCalled()
  })

  it('attaches req.trace field', () => {
    const mware = factory({})
    const {req, res} = reqresnext(null, null)

    mware(req, res, () => {
      expect(req.trace).toMatchObject({
        trace_id: expect.stringMatching(/^[0-9a-f]{16}$/),
        span_id: expect.stringMatching(/^[0-9a-f]{16}$/),
      })
    })

    expect(req.trace).toBeUndefined()
  })
})
