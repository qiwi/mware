# @qiwi/mware-logger
Request/response logger middleware

### Install
```bash
yarn add @qiwi/mware-logger
npm i @qiwi/mware-logger
```

### Usage

```javascript
import logger from '@qiwi/mware-logger'
import express from 'express'

const app = express()
app.use(logger())

app.get('/foo/bar', (req, res) => res.status(503).send('foobar'))
// REQ 1f2146c00726d6f3 > method=GET target=/foo/bar origin=example.com ip=10.10.10.10 headers={\"origin\":\"example.com\",\"host\":null}
// RES ccb0fa3f9c8f5afc < status=503 duration=1ms headers={} bufferLength=6

app.listen(...)
```

### License
MIT
