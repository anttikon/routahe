## routahe

This is a command line [reittiopas](http://www.reittiopas.fi/en/) client for lazy atk people.

![](https://raw.githubusercontent.com/anttikon/routahe/master/misc/routahe.png)

<p>
  <a href="https://www.npmjs.com/package/routahe?activeTab=dependencies">
    <img alt="Dependencies" src="https://img.shields.io/david/anttikon/routahe.svg"></a>
</p>

## Install
```bash
npm install -g routahe
```

## Usage
```bash
routahe kamppi "kannistontie 2, vantaa"
```

Specify departure time
```bash
routahe kamppi "kannistontie 2, vantaa" 5:30
```

Specify arrival time
```bash
routahe kamppi "kannistontie 2, vantaa" @13:30
```

Specify date and time
```bash
routahe kamppi "kannistontie 2, vantaa" 5:30 24.12.2016
```

![Usage](https://raw.githubusercontent.com/anttikon/routahe/master/misc/routahe.gif)

## Develop
```bash
npm run dev kamppi pasila
```
