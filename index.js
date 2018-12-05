"use strict";
const validate = require( "aproba" );

function newException( code, msg ) {
  const err = new Error( msg );
  err.code = code;
  /* istanbul ignore else */
  if ( Error.captureStackTrace ) {
    Error.captureStackTrace( err, validate );
  }
  return err;
}

function normalizeProp( prop, propPath ) {
  return propPath ? propPath + prop : prop;
}

function normalizeErrMsg( msg, extMsg ) {
  return extMsg + " " + msg.replace( /^Argument #1: /, "" );
}

/**
 * Validate key-value object
 *
 * @param {Object} schema
 * @param {Object} obj
 * @param {String} [propPath]
 */
function validateObj( schema, obj, propPath = "" ) {
  try {
    validate( "OO|OOS", arguments );
  } catch ( err ) {
    throw new newException( err.code, "validateObj: " + err.message );
  }
  Object.keys( schema ).forEach(function( key ){
    if ( !( key in obj ) ) {
      throw new newException( "EMISSINGPROP", "Missing required property #" + normalizeProp( key, propPath ) );
    }
    // validateObj( { foo: { bar: "A" } }, obj )
    if ( typeof schema[ key ] === "object" && schema[ key ] !== null && !Array.isArray( schema[ key ] ) ) {
      try {
        validate( "O", [ obj[ key ] ] );
      } catch ( err ) {
        throw new newException( err.code, normalizeErrMsg(
          err.message,
          "Invalid type in property #" + normalizeProp( key, propPath ) + ":" ) );
      }
      return validateObj( schema[ key ], obj[ key ], key + "." );
    }

    try {
      validate( schema[ key ], [ obj[ key ] ] );
    } catch ( err ) {
      throw new newException( err.code, normalizeErrMsg(
        err.message,
        "Invalid type in property #" + normalizeProp( key, propPath ) + ":" ) );
    }
  });
}

exports.validate = validate;
exports.validateObj = validateObj;