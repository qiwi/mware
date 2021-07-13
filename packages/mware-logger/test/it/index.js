import factory from '../../src'
import express from 'express'
import request from 'supertest'

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

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('logs incoming request', () => {
    it('with empty body', () => {
      const mware = factory({ logger })

      const app = express()
      app.use(mware)
      const server = app.listen(3001)

      return request(app)
        .get('/')
        .then(() => {
          expect(info).toHaveBeenCalledWith(expect.stringMatching(/^REQ .{16} > method=GET target=.+ origin=.+ contentLength=0$/))
          server.close()
        })
    })

    it('with body', () => {
      const mware = factory({ logger })

      const app = express()
      app.use(mware)
      const server = app.listen(3000)

      return request(app)
        .post('/')
        .send({ example: 'value' })
        .then(() => {
          expect(info).toHaveBeenCalledWith(expect.stringMatching(/^REQ .{16} > method=POST target=.+ origin=.+ contentLength=19$/))
          server.close()
        })
    })

    // it('with empty body', () => {
    //   const { req, res, next } = reqresnext(
    //     {
    //       url: 'http://example.com/foo/bar',
    //       method: 'GET',
    //       headers: {
    //         origin: 'example.com'
    //       }
    //     },
    //     null,
    //     jest.fn()
    //   )
    //   mware(req, res, next)
    //
    //   expect(req.id).toMatch(/^[0-9a-f]{16}$/)
    //   expect(req.id).toBe(res.id)
    //   expect(info).toHaveBeenCalledWith(expect.stringMatching(/^REQ .{16} > method=GET target=http:\/\/example.com\/foo\/bar origin=example.com .+ contentLength=0$/))
    //   expect(next).toHaveBeenCalled()
    // })
  })
})
