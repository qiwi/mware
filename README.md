# mware
[![buildStatus](https://api.travis-ci.com/qiwi/cyclone.svg?branch=master)](https://travis-ci.com/qiwi/mware)
[![Coveralls](https://img.shields.io/coveralls/qiwi/mware.svg?maxAge=3600)](https://coveralls.io/github/qiwi/mware)
[![dependencyStatus](https://img.shields.io/david/qiwi/mware.svg?maxAge=3600)](https://david-dm.org/qiwi/mware)
[![devDependencyStatus](https://img.shields.io/david/dev/qiwi/mware.svg?maxAge=3600)](https://david-dm.org/qiwi/mware)
[![Maintainability](https://api.codeclimate.com/v1/badges/c46b48482b78c4f6c2c0/maintainability)](https://codeclimate.com/github/qiwi/mware/maintainability)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

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