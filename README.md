# routahe
This is command line [reittiopas](http://www.reittiopas.fi/en/) client for lazy atk people. 

## Install
```bash
npm install -g routahe
```

## Usage
```bash
routahe kamppi "kannistontie 2, vantaa"
```

Or search for your current location using nearby wifi access points.

```bash
routahe "kannistontie 2, vantaa"
```

![Usage](https://raw.githubusercontent.com/anttikon/routahe/master/misc/routahe.gif)

## Develop
Use NODE_ENV=development to enable Babel Require Hook
```bash
NODE_ENV=development node index.js kamppi "kannistontie 2, vantaa"
```