const validate = require( "../index" );

describe( "proba", () => {

  describe( "validate.obj params", () => {

    it( "throw when first param of wrong type", () => {
      expect(() => {
        validate.obj("A", {});
      }).toThrowError( /validate.obj: Argument #1: Expected object but got string/ );
    });

    it( "throw when second param of wrong type", () => {
      expect(() => {
        validate.obj({}, "A");
      }).toThrowError( /validate.obj: Argument #2: Expected object but got string/ );
    });

  });

  describe( "target obj", () => {

    it( "throw when missing property", () => {
      expect(() => {
        validate.obj({
          "foo": "S"
        }, {});
      }).toThrowError( /Missing required property #foo/ );
    });

    it( "throw when invalid type", () => {
      expect(() => {
        validate.obj({
          "foo": "S"
        }, { foo: 1 });
      }).toThrowError( /Invalid type in property #foo: Expected string but got number/ );
    });

    it( "throw when invalid union type", () => {
      expect(() => {
        validate.obj({
          "foo": "S|Z|A"
        }, { foo: 1 });
      }).toThrowError( /Invalid type in property #foo: Expected string, null or array but got number/ );
    });

    it( "does not throw when valid", () => {
      expect(() => {
        validate.obj({
          "foo": "N",
          "bar": "S|A"
        }, { foo: 1, bar: "string" });
      }).not.toThrowError();
    });

    it( "does not throw when valid and optional", () => {
      expect(() => {
        validate.obj({
          "foo": "N",
          "bar": "S?"
        }, { foo: 1 });
      }).not.toThrowError();
    });

    it( "throw when invalid type fo optional property", () => {
      expect(() => {
        validate.obj({
          "foo": "S?"
        }, { foo: 1 });
      }).toThrowError( /Invalid type in property #foo: Expected string but got number/ );
    });

  });

   describe( "target nested obj", () => {

    it( "throw when missing 1st-level property", () => {
      expect(() => {
        validate.obj({
          foo: { bar: "S" }
        }, {});
      }).toThrowError( /Missing required property #foo/ );
    });

    it( "throw when missing 2st-level property", () => {
      expect(() => {
        validate.obj({
          foo: { bar: "S" }
        }, { foo: {} });
      }).toThrowError( /Missing required property #foo.bar/ );
    });

    it( "throw when 1st-level property on invalid type", () => {
      expect(() => {
        validate.obj({
          foo: { bar: "S" }
        }, { foo: 1 });
      }).toThrowError( /Invalid type in property #foo: Expected object but got number/ );
    });

    it( "throw when 2st-level property on invalid type", () => {
      expect(() => {
        validate.obj({
          foo: { bar: "S" }
        }, { foo: { bar: 1 } });
      }).toThrowError( /Invalid type in property #foo.bar: Expected string but got number/ );
    });


    it( "throw when 2st-level property of invalid union type", () => {
      expect(() => {
        validate.obj({
          foo: { bar: "S|Z" }
        }, { foo: { bar: 1 } });
      }).toThrowError( /Invalid type in property #foo.bar: Expected string or null but got number/ );
    });

    it( "does not throw when 2st-level property missing but optional", () => {
      expect(() => {
        validate.obj({
          foo: { bar: "S?" }
        }, { foo: {  } });
      }).not.toThrowError();
    });

    it( "does not throw when 2st-level property valid", () => {
      expect(() => {
        validate.obj({
          bar: "A",
          foo: {
            bar: "N?",
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
