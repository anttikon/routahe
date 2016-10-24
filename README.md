# routahe
This is command line [reittiopas](http://www.reittiopas.fi/en/) client for lazy atk people. 

## Install
```bash
npm install -g routahe
```

## Usage
```bash
routahe steissi "kannistontie 2, vantaa"
```

![Usage](misc/routahe.gif)

## Develop
Use NODE_ENV=development to enable Babel Require Hook
```bash
NODE_ENV=development node index.js steissi "kannistontie 2, vantaa"
```