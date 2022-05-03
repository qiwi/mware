# @qiwi/mware-core
Common middlewares core assets.

### Install
```bash
yarn add @qiwi/mware-core
npm i @qiwi/mware-core
```

### Usage

```javascript
import {util} from '@qiwi/mware-core'
import express from 'express'

const app = express()
const am = util.asyncMiddleware

app.get('/profile/:profileId', am(async (req, res) => {
  const data = await someService.getProfile(req.headers.authorization, req.params.profileId)

  if (!data) {
    res.status(404).send('Not found')
  }

  res.send(data)
}))

app.listen(...)
```