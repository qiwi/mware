import factory from '../src'
import reqresnext from 'reqresnext'
import { StatusCodes } from 'http-status-codes'

describe('mware-validator', () => {
  beforeEach(() => jest.resetAllMocks)

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  describe('supports several ajv profiles', () => {
    const schema = {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
    const date = '2001-13-01T20:20:20Z'

    it('fast', () => {
      const validator = factory({schema, opts: {mode: 'fast', formats: ["date-time"], keywords: true}})
      const next = jest.fn()
      const res = {send: jest.fn(), status() {return res}}

      validator({date}, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.send).not.toHaveBeenCalled()
    })

    it('full (strict)', () => {
      const validator = factory({schema, opts: {mode: 'full'}})
      const next = jest.fn()
      const res = {send: jest.fn(), status() {return res}}

      validator({date}, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.send).toHaveBeenCalledWith({"details": "data/date must match format \"date-time\"", "message": "Bad Request"})
    })
  })

  describe('validates request fields by scheme', () => {
    const scheme = {
      type: 'object',
      required: ['headers', 'params', 'query', 'body'],
      properties: {
        headers: {
          type: 'object',
          required: ['foo'],
          properties: {
            foo: {
              type: 'string'
            }
          }
        },
        params: {
          type: 'object',
          required: ['baz'],
          properties: {
            baz: {
              type: 'string'
            }
          }
        },
        query: {
          type: 'object',
          required: ['quxx'],
          properties: {
            quxx: {
              type: 'string'
            }
          }
        },
        body: {
          type: 'string'
        }
      }
    }

    const mware = factory({scheme})

    it('proceeds to `next` if valid', () => {
      const { req, res, next } = reqresnext({
        headers: {
          foo: 'bar'
        },
        params: {
          baz: 'qux'
        },
        query: {
          quxx: 'buzz'
        },
        body: 'FooBarBaz'
      }, null, jest.fn())

      mware(req, res, next)

      expect(next).toHaveBeenCalled()
    })

    it('returns 404 otherwise', () => {
      const { req, res, next } = reqresnext(null, null, jest.fn())

      mware(req, res, next)

      expect(res.body).toBe("{\"message\":\"Bad Request\",\"details\":\"data must have required property 'query'\"}")
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(next).not.toHaveBeenCalled()
    })
  })
})
