import factory, {XFF, XFH, HOST} from '../src'
import reqresnext from 'reqresnext'
import {address} from 'ip'

const IP = address()

describe('mware-crumbs', () => {
  const mware = factory({})

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('factory returns a middleware', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  describe('handles x-forwarded-*', () => {
    it('proxies XFF and XFH if present', () => {
      const { req, res, next } = reqresnext({
        headers: {
          [XFH]: '10.11.12.13',
          [XFF]: '10.10.1.1, 10.10.1.2'
        }
      }, null, jest.fn())

      mware(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(req.get(XFH)).toBe('10.11.12.13')
      expect(req.get(XFF)).toBe('10.10.1.1, 10.10.1.2, ' + IP)
    })

    it('fallbacks to Host headers', () => {
      const { req, res, next } = reqresnext({
        headers: {
          [HOST]: '10.11.0.1'
        }
      }, null, jest.fn())

      mware(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(req.get(XFH)).toBe('10.11.0.1')
      expect(req.get(XFF)).toBe(IP)
    })
  })
})