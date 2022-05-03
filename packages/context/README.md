# @qiwi/mware-context
Middleware to attach CLS-based context to current request.

### Install
```bash
yarn add @qiwi/mware-context
npm i @qiwi/mware-context
```

### Usage

```javascript
import clscxt, {DEFAULT_NS, getContext} from '@qiwi/mware-context'

import express from 'express'

const app = express()
app.use(clscxt({ns: DEFAULT_NS}))

app.get('/foo/bar', (req, res) => {
  getContext().get('some-value-like-trace')
})
```
