module.exports = {
  "parser": "@babel/eslint-parser",
  "plugins": [
    "flowtype"
  ],
  "extends": [
    "plugin:flowtype/recommended"
  ],
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
}