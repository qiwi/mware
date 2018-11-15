import factory from '../src'
import reqresnext from 'reqresnext'
import {BAD_REQUEST} from 'http-status-codes'

describe('mware-validator', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
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

    expect(res.body).toBe("{\"message\":\"Bad Request\",\"details\":\"data.headers should have required property 'foo'\"}")
    expect(res.statusCode).toBe(BAD_REQUEST)
    expect(next).not.toHaveBeenCalled()
  })
})
