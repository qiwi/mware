# mware
[![CI](https://github.com/qiwi/mware/workflows/CI/badge.svg)](https://github.com/qiwi/mware/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/c46b48482b78c4f6c2c0/maintainability)](https://codeclimate.com/github/qiwi/mware/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c46b48482b78c4f6c2c0/test_coverage)](https://codeclimate.com/github/qiwi/mware/test_coverage)

Common middlewares collection.

### Install
```bash
yarn add @qiwi/mware
npm i @qiwi/mware
```

### Middlewares
* [mware-mdc](packages/mdc/README.md)
* [mware-logger](packages/logger/README.md)
* [mware-crumbs](packages/crumbs/README.md)
* [mware-cors](packages/cors/README.md)
* [mware-validator](packages/validator/README.md)

### Usage
```javascript
import {cors, mdc} from '@qiwi/mware'
import express from 'express'

const app = express()

app.use(cors())
app.use(mdc())
app.listen(...)
```