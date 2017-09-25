#!/usr/bin/env node
'use strict'
require('babel-polyfill')

process.env.NODE_ENV === 'development' ? development() : production()

function development() {
  require('babel-register')
  require('./src/routahe')
}

function production() {
  require('./lib/routahe')
}