# @qiwi/mware-validator
JSON-schema based validator middleware

### Install
```bash
yarn add @qiwi/mware-validator
npm i @qiwi/mware-validator
```

### Usage

```javascript
import validator from '@qiwi/mware-validator'
import express from 'express'

const app = express()
const schema = {
  type: 'object',
  properties: {
    params: {
      id: {
        type: 'string',
        pattern: '[abc]^\d{2}',
        required: true
      }
    },
    query: {
      data: {
        type: 'object',
        required: true
      }
    }
  }
}
app.get('/foo/:id', validator({schema}), (req, res) => {
  ...
  res.send({...})
})

app.listen(...)
```

### License
MIT
