bytes.js
========

Utf8 bytes array from/to string.

Install
-------

    npm install bytes.js

Example
-------

```js
var bytes = require('bytes.js');

bytes.fromString('abc')  // [97, 98, 99]
bytes.toString([97, 98, 99])  // 'abc'
bytes.fromString('你好')  // [228, 189, 160, 229, 165, 189]
bytes.toString([228, 189, 160, 229, 165, 189])  // '你好'
```

License
--------

MIT. Copyright (c) Chao Wang <hit9@icloud.com>
