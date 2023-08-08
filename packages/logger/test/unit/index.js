import reqresnext from 'reqresnext'
import factory, { getLogLevelByStatus } from '../../src'

describe('mware-logger', () => {
  const info = jest.fn()
  const warn = jest.fn()
  const error = jest.fn()
  const debug = jest.fn()
  const logger = {
    info,
    warn,
    error,
    debug
  }
  const mware = factory({ logger })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  describe('logs incoming request', () => {
    it('with span_id', () => {
      const { req, res, next } = reqresnext(
        {
          url: 'http://example.com/foo/bar',
          method: 'GET',
          headers: {
            origin: 'example.com'
          }
        },
        null,
        jest.fn()
      )
      mware(req, res, next)

      req.emit('end')
      expect(req.id).toMatch(/^[0-9a-f]{16}$/)
      expect(req.id).toBe(res.id)
      expect(info).toHaveBeenCalledWith(expect.stringMatching(/^REQ .{16} > method=GET target=http:\/\/example.com\/foo\/bar origin=example.com .+ contentLength=0$/))
      expect(next).toHaveBeenCalled()
    })

    // TODO later
    it('with req.id', () => {})
    it('initial', () => {})
  })

  describe('logs outgoing response', () => {
    it('#send', () => {
      const { req, res, next } = reqresnext(
        null,
        null,
        jest.fn()
      )
      const send = jest.spyOn(res, 'send')
      mware(req, res, next)

      res.send('foo')

      expect(send).toHaveBeenCalledWith('foo')
    })

    it('#write + #end', done => {
      const { req, res, next } = reqresnext(
        {
          url: 'http://example.com/foo/bar',
          method: 'GET',
        },
        null,
        jest.fn()
      )

      mware(req, res, next)

      res.on('finish', () => {
        expect(error).toHaveBeenCalledWith(expect.stringMatching(/^RES .{16} method=GET target=http:\/\/example.com\/foo\/bar < status=503 duration=.+$/))
        done()
      })
      res.status(503)
      res.write('foo')
      res.end('bar')

      expect(next).toHaveBeenCalled()
    })
  })

  describe('getLogLevelByStatus', () => {
    it('returns level by status', () => {
      expect(getLogLevelByStatus(200)).toBe('info')
      expect(getLogLevelByStatus(302)).toBe('info')
      expect(getLogLevelByStatus(404)).toBe('warn')
      expect(getLogLevelByStatus(502)).toBe('error')
    })
  })
})
