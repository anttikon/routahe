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

## Usage (cli)
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

## Usage (import)

```javascript
import {getRoute} from 'routahe'

getRoute({from: 'Kamppi', to: 'Kannistontie 2, vantaa' }).then(routes => console.log(routes))
```

Attribute | Example value | Description | Required?
--- | --- | --- | ---
from | Kamppi | place of departure | required
to | Kannistontie 2, Vantaa | travel destination | required
dateTime | JavaScript date or moment() | departure time / arrival time | optional
arriveBy | true / false | use dateTime as arrival time | optional


![Usage](https://raw.githubusercontent.com/anttikon/routahe/master/misc/routahe.gif)

## Develop
```bash
npm run dev kamppi pasila
```
