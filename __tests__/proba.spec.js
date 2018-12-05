const { validate, validateObj } = require( "../index" );

describe( "proba", () => {

  describe( "validateObj params", () => {

    it( "throw when first param of wrong type", () => {
      expect(() => {
        validateObj("A", {});
      }).toThrowError( /validateObj: Argument #1: Expected object but got string/ );
    });

    it( "throw when second param of wrong type", () => {
      expect(() => {
        validateObj({}, "A");
      }).toThrowError( /validateObj: Argument #2: Expected object but got string/ );
    });

  });

  describe( "target obj", () => {

    it( "throw when missing property", () => {
      expect(() => {
        validateObj({
          "foo": "S"
        }, {});
      }).toThrowError( /Missing required property #foo/ );
    });

    it( "throw when missing property", () => {
      expect(() => {
        validateObj({
          "foo": "S"
        }, { foo: 1 });
      }).toThrowError( /Invalid type in property #foo: Expected string but got number/ );
    });

    it( "does not throw when valid", () => {
      expect(() => {
        validateObj({
          "foo": "N",
          "bar": "S"
        }, { foo: 1, bar: "string" });
      }).not.toThrowError();
    });

  });

   describe( "target nested obj", () => {

    it( "throw when missing 1st-level property", () => {
      expect(() => {
        validateObj({
          foo: { bar: "S" }
        }, {});
      }).toThrowError( /Missing required property #foo/ );
    });

    it( "throw when missing 2st-level property", () => {
      expect(() => {
        validateObj({
          foo: { bar: "S" }
        }, { foo: {} });
      }).toThrowError( /Missing required property #foo.bar/ );
    });

    it( "throw when 1st-level property on invalid type", () => {
      expect(() => {
        validateObj({
          foo: { bar: "S" }
        }, { foo: 1 });
      }).toThrowError( /Invalid type in property #foo: Expected object but got number/ );
    });

    it( "throw when 2st-level property of invalid type", () => {
      expect(() => {
        validateObj({
          foo: { bar: "S" }
        }, { foo: { bar: 1 } });
      }).toThrowError( /Invalid type in property #foo.bar: Expected string but got number/ );
    });

    it( "does not throw when 2st-level property valid", () => {
      expect(() => {
        validateObj({
          bar: "A",
          foo: {
            bar: "N",
            baz: "Z"
          }
        }, {
          bar: [],
          foo: {
            bar: 1,
            baz: null
          }
        });
      }).not.toThrowError();
    });

  });


});
