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
  })
})
