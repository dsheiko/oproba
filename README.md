# oproba
[![NPM](https://nodei.co/npm/oproba.png)](https://nodei.co/npm/oproba/)

[![Build Status](https://travis-ci.org/dsheiko/oproba.png)](https://travis-ci.org/dsheiko/oproba)

A 'rediculously light-weight' extension of [aproba](https://github.com/iarna/aproba) for key-value object validation

```js
const validate = require( "oproba" );
// 'validate' is instance of aproba

// Check that `options` object properties comply specified aproba schemas
validate.obj({ foo: "N", bar: "S|N" }, options );


// Validate a nested object
validate.obj({
  foo: {
    baz: {
      quiz: "S"
    }
  },
  bar: "S|N" }, options );
```

## Optional properties (`?` directive)
```js
validate.obj({ foo: "N?", bar: "S|N?" }, options );
```

## Explanatory error messages
```js
  validate.obj({
    foo: { bar: "S|Z" }
  }, {
    foo: { bar: 1 }
  });
// throws `Error: Invalid type in property #foo.bar: Expected string or null but got number`
```
