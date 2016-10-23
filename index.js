#!/usr/bin/env node
require('babel-register')({
  ignore: /node_modules\/(?!routahe)/
})
require('babel-polyfill')
require('./app.js')