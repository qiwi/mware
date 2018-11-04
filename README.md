# mware
Common middlewares stack.

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

app.use(cors)
app.listen(...)
```