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
* [mware-crumbs](../mware-crumbs/README.md)
* [mware-cors](../mware-cors/README.md)

### Usage

```javascript
import {cors, mdc} from '@qiwi/mware'
import express from 'express'

const app = express()

app.use(cors())
app.use(mdc())
app.listen(...)
```

### Utils
```
import express from 'express'
import {util} from '@qiwi/mware'

const {asyncMiddleware} = util
...

app.get('/', asyncMiddleware(async (req, res, next) => {
    ...
    throw new Error('Something went wrong')
}))

app.use((error, req, res, next) => {
    error // Error('Something went wrong')
})

```