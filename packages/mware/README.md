# mware
Common middlewares collection.

### Install
```bash
yarn add @qiwi/mware
npm i @qiwi/mware
```

### Middlewares
* [mware-mdc](../mware-mdc/README.md)
* [mware-logger](../mware-logger/README.md)

### Usage

```javascript
import {cors, mdc} from '@qiwi/mware'
import express from 'express'

const app = express()

app.use(cors())
app.use(mdc())
app.listen(...)
```