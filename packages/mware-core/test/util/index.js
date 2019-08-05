import { util } from '../../src/'
import 'babel-polyfill'
import reqresnext from 'reqresnext'

describe('mware-core/util', () => {
  describe('`asyncMiddware` attaches catcher to passed handler:', () => {
    const { req, res, next } = reqresnext(null, null, jest.fn())
    const mware = async (req, res, next) => {
      if (req.throw === true) {
        throw new Error('Some error')
      }
      res.send('ok')
    }
    const wrapped = util.asyncMiddleware(mware)

    it('ignores `success` flow', async () => {
      jest.spyOn(res, 'send')

      await wrapped(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(res.send).toHaveBeenCalledWith('ok')
    })

    it('raises `next` handler on error', async () => {
      req.throw = true
      await expect(wrapped(req, res, next))

      expect(next).toHaveBeenCalledWith(new Error('Some error'))
    })
  })
})
