# @qiwi/mware-crumbs
X-Forwarded-* proxying middleware

### Install
```bash
yarn add @qiwi/mware-crumbs
npm i @qiwi/mware-crumbs
```

### Usage

```javascript
import crumbs from '@qiwi/mware-crumbs'
import express from 'express'
import request from 'request'

const app = express()
app.use(crumbs())

app.get('/foo/bar', (req, res) => {
  req.pipe(request({...})).pipe(res)
})

app.listen(...)
```
### License
MIT
