# oproba
[![NPM](https://nodei.co/npm/oproba.png)](https://nodei.co/npm/oproba/)

[![Build Status](https://travis-ci.org/dsheiko/oproba.png)](https://travis-ci.org/dsheiko/oproba)

Extension of [aproba - argument validator](https://github.com/iarna/aproba) for key-value object validation

```js
const validate = require( "oproba" );
// 'validate' is instance of aproba

// Check that `options` object properties comply specified aproba constraints
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

## Aproba constraints:

| type | description
| :--: | :----------
| *    | matches any type
| A    | `Array.isArray` OR an `arguments` object
| S    | typeof == string
| N    | typeof == number
| F    | typeof == function
| O    | typeof == object and not type A and not type E
| B    | typeof == boolean
| E    | `instanceof Error` OR `null` 
| Z    | == `null`
