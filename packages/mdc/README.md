# @qiwi/mware-mdc
Middleware for MDC headers processing 

### Install
```bash
yarn add @qiwi/mware-mdc
npm i @qiwi/mware-mdc
```

### Usage

```javascript
import mdc from '@qiwi/mware-mdc'
import express from 'express'

const app = express()
app.use(mdc())

app.get('/', (req, res) => {
  req.trace // {trace_id: 'baf7f0cd41768a7e', span_id: '7b94b0a800870252'}
  res.headers // {'x-b3-traceid': 'baf7f0cd41768a7e', 'x-b3-traceid': '7b94b0a800870252', ...}
})
app.listen(...)
```

### License
MIT
