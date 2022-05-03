# @qiwi/mware-cors
CORS middleware

### Install
```bash
yarn add @qiwi/mware-cors
npm i @qiwi/mware-cors
```

### Usage

```javascript
import cors from '@qiwi/mware-cors'
import express from 'express'

const app = express()
app.use(cors())

app.get('/foo/bar', (req, res) => {
  res.send('foo')
})

/*
 RES {
  headers: { 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, PATCH, PUT, POST, DELETE, OPTIONS'
    ...
  },
  ...
 }
 */

app.listen(...)
```