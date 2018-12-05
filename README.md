# oproba
[![NPM](https://nodei.co/npm/oproba.png)](https://nodei.co/npm/oproba/)

[![Build Status](https://travis-ci.org/dsheiko/oproba.png)](https://travis-ci.org/dsheiko/oproba)

A 'rediculously light-weight' extension of [aproba](https://github.com/iarna/aproba) for key-value object validation

```js
const { validate, validateObj } = require( "oproba" );
// 'validate' is instance of aproba

// Check that `options` object properties comply specified aproba schemas
validateObj({ foo: "N", bar: "S|N" }, options );


// Validate a nested object
validateObj({
  foo: {
    baz: {
      quiz: "S"
    }
  },
  bar: "S|N" }, options );
```
