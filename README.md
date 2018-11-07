# mware
Common middlewares collection.

### Install
```bash
yarn add @qiwi/mware
npm i @qiwi/mware
```

### Middlewares
* [mware-mdc](./packages/mware-mdc/README.md)
* [mware-logger](./packages/mware-logger/README.md)
* [mware-crumbs](./packages/mware-crumbs/README.md)
* [mware-cors](./packages/mware-cors/README.md)

### Usage
```javascript
import {cors, mdc} from '@qiwi/mware'
import express from 'express'

const app = express()

app.use(cors())
app.use(mdc())
app.listen(...)
```