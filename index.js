#!/usr/bin/env node
'use strict';
require('babel-polyfill');

process.env.NODE_ENV === 'development' ? development() : prodution();

function development() {
  require('babel-register');
  require('./src/routahe');
}

function prodution() {
  require('./lib/routahe');
}