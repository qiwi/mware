# mware
Common middlewares collection.

### Install
```bash
yarn add @qiwi/mware
npm i @qiwi/mware
```

### Middlewares
* [mware-mdc](../mdc/README.md)
* [mware-logger](../logger/README.md)
* [mware-crumbs](../crumbs/README.md)
* [mware-cors](../cors/README.md)
* [mware-validator](../validator/README.md)

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
```js
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
### License
MIT
