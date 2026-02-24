/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2024 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */

/******/ var __webpack_modules__ = ({

/***/ 9306:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(4901);
var tryToString = __webpack_require__(6823);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 3506:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPossiblePrototype = __webpack_require__(3925);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 7080:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var has = (__webpack_require__(4402).has);

// Perform ? RequireInternalSlot(M, [[SetData]])
module.exports = function (it) {
  has(it);
  return it;
};


/***/ }),

/***/ 6469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(8227);
var create = __webpack_require__(2360);
var defineProperty = (__webpack_require__(4913).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPrototypeOf = __webpack_require__(1625);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 8551:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(34);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 9617:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIndexedObject = __webpack_require__(5397);
var toAbsoluteIndex = __webpack_require__(5610);
var lengthOfArrayLike = __webpack_require__(6198);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4527:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var isArray = __webpack_require__(4376);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 7680:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 6319:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(8551);
var iteratorClose = __webpack_require__(9539);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 2195:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 6955:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var TO_STRING_TAG_SUPPORT = __webpack_require__(2140);
var isCallable = __webpack_require__(4901);
var classofRaw = __webpack_require__(2195);
var wellKnownSymbol = __webpack_require__(8227);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7740:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(9297);
var ownKeys = __webpack_require__(5031);
var getOwnPropertyDescriptorModule = __webpack_require__(7347);
var definePropertyModule = __webpack_require__(4913);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 2211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 2529:
/***/ ((module) => {


// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ 6699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 6980:
/***/ ((module) => {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 2278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};


/***/ }),

/***/ 2106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var makeBuiltIn = __webpack_require__(283);
var defineProperty = __webpack_require__(4913);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 6840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(4901);
var definePropertyModule = __webpack_require__(4913);
var makeBuiltIn = __webpack_require__(283);
var defineGlobalProperty = __webpack_require__(9433);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 6279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var defineBuiltIn = __webpack_require__(6840);

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 9433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),

/***/ 3724:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(9039);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 4055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 6837:
/***/ ((module) => {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 8727:
/***/ ((module) => {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2839:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ 9519:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);
var userAgent = __webpack_require__(2839);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 6193:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 747:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var createNonEnumerableProperty = __webpack_require__(6699);
var clearErrorStack = __webpack_require__(6193);
var ERROR_STACK_INSTALLABLE = __webpack_require__(4659);

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};


/***/ }),

/***/ 4659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(9039);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = !fails(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 6518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);
var getOwnPropertyDescriptor = (__webpack_require__(7347).f);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIn = __webpack_require__(6840);
var defineGlobalProperty = __webpack_require__(9433);
var copyConstructorProperties = __webpack_require__(7740);
var isForced = __webpack_require__(2796);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 9039:
/***/ ((module) => {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 8745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 6080:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(7476);
var aCallable = __webpack_require__(9306);
var NATIVE_BIND = __webpack_require__(616);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 616:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(616);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var hasOwn = __webpack_require__(9297);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 6706:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var aCallable = __webpack_require__(9306);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 7476:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classofRaw = __webpack_require__(2195);
var uncurryThis = __webpack_require__(9504);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ 9504:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 7751:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),

/***/ 1767:
/***/ ((module) => {


// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};


/***/ }),

/***/ 851:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(6955);
var getMethod = __webpack_require__(5966);
var isNullOrUndefined = __webpack_require__(4117);
var Iterators = __webpack_require__(6269);
var wellKnownSymbol = __webpack_require__(8227);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 81:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var getIteratorMethod = __webpack_require__(851);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 6933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var isArray = __webpack_require__(4376);
var isCallable = __webpack_require__(4901);
var classof = __webpack_require__(2195);
var toString = __webpack_require__(655);

var push = uncurryThis([].push);

module.exports = function (replacer) {
  if (isCallable(replacer)) return replacer;
  if (!isArray(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push(keys, element);
    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};


/***/ }),

/***/ 5966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(9306);
var isNullOrUndefined = __webpack_require__(4117);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 3789:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var call = __webpack_require__(9565);
var toIntegerOrInfinity = __webpack_require__(1291);
var getIteratorDirect = __webpack_require__(1767);

var INVALID_SIZE = 'Invalid size';
var $RangeError = RangeError;
var $TypeError = TypeError;
var max = Math.max;

var SetRecord = function (set, intSize) {
  this.set = set;
  this.size = max(intSize, 0);
  this.has = aCallable(set.has);
  this.keys = aCallable(set.keys);
};

SetRecord.prototype = {
  getIterator: function () {
    return getIteratorDirect(anObject(call(this.keys, this.set)));
  },
  includes: function (it) {
    return call(this.has, this.set, it);
  }
};

// `GetSetRecord` abstract operation
// https://tc39.es/proposal-set-methods/#sec-getsetrecord
module.exports = function (obj) {
  anObject(obj);
  var numSize = +obj.size;
  // NOTE: If size is undefined, then numSize will be NaN
  // eslint-disable-next-line no-self-compare -- NaN check
  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
  var intSize = toIntegerOrInfinity(numSize);
  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
  return new SetRecord(obj, intSize);
};


/***/ }),

/***/ 2478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var toObject = __webpack_require__(8981);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 4576:
/***/ (function(module) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 9297:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var toObject = __webpack_require__(8981);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 421:
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ 397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(7751);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 5917:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);
var createElement = __webpack_require__(4055);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 7055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var classof = __webpack_require__(2195);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 3167:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var setPrototypeOf = __webpack_require__(2967);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 3706:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var isCallable = __webpack_require__(4901);
var store = __webpack_require__(7629);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 7584:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(34);
var createNonEnumerableProperty = __webpack_require__(6699);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 1181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_WEAK_MAP = __webpack_require__(8622);
var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);
var createNonEnumerableProperty = __webpack_require__(6699);
var hasOwn = __webpack_require__(9297);
var shared = __webpack_require__(7629);
var sharedKey = __webpack_require__(6119);
var hiddenKeys = __webpack_require__(421);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 4209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(8227);
var Iterators = __webpack_require__(6269);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 4376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(2195);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 4901:
/***/ ((module) => {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 2796:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 4117:
/***/ ((module) => {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 34:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(4901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 3925:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(34);

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ 6395:
/***/ ((module) => {


module.exports = false;


/***/ }),

/***/ 788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(34);
var classof = __webpack_require__(2195);
var wellKnownSymbol = __webpack_require__(8227);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
};


/***/ }),

/***/ 757:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(7751);
var isCallable = __webpack_require__(4901);
var isPrototypeOf = __webpack_require__(1625);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 507:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);

module.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};


/***/ }),

/***/ 2652:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var bind = __webpack_require__(6080);
var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var isArrayIteratorMethod = __webpack_require__(4209);
var lengthOfArrayLike = __webpack_require__(6198);
var isPrototypeOf = __webpack_require__(1625);
var getIterator = __webpack_require__(81);
var getIteratorMethod = __webpack_require__(851);
var iteratorClose = __webpack_require__(9539);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 9539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var getMethod = __webpack_require__(5966);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 9462:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);
var create = __webpack_require__(2360);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIns = __webpack_require__(6279);
var wellKnownSymbol = __webpack_require__(8227);
var InternalStateModule = __webpack_require__(1181);
var getMethod = __webpack_require__(5966);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var createIterResultObject = __webpack_require__(2529);
var iteratorClose = __webpack_require__(9539);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      try {
        var result = state.done ? undefined : state.nextHandler();
        return createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      if (state.inner) try {
        iteratorClose(state.inner.iterator, 'normal');
      } catch (error) {
        return iteratorClose(iterator, 'throw', error);
      }
      if (iterator) iteratorClose(iterator, 'normal');
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};


/***/ }),

/***/ 713:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new IteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};


/***/ }),

/***/ 7657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var create = __webpack_require__(2360);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltIn = __webpack_require__(6840);
var wellKnownSymbol = __webpack_require__(8227);
var IS_PURE = __webpack_require__(6395);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 6269:
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ 6198:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toLength = __webpack_require__(8014);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var hasOwn = __webpack_require__(9297);
var DESCRIPTORS = __webpack_require__(3724);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(350).CONFIGURABLE);
var inspectSource = __webpack_require__(3706);
var InternalStateModule = __webpack_require__(1181);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 741:
/***/ ((module) => {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 6043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(9306);

var $TypeError = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 2603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toString = __webpack_require__(655);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 2360:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(8551);
var definePropertiesModule = __webpack_require__(6801);
var enumBugKeys = __webpack_require__(8727);
var hiddenKeys = __webpack_require__(421);
var html = __webpack_require__(397);
var documentCreateElement = __webpack_require__(4055);
var sharedKey = __webpack_require__(6119);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 6801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var definePropertyModule = __webpack_require__(4913);
var anObject = __webpack_require__(8551);
var toIndexedObject = __webpack_require__(5397);
var objectKeys = __webpack_require__(1072);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 4913:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var IE8_DOM_DEFINE = __webpack_require__(5917);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var anObject = __webpack_require__(8551);
var toPropertyKey = __webpack_require__(6969);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7347:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var call = __webpack_require__(9565);
var propertyIsEnumerableModule = __webpack_require__(8773);
var createPropertyDescriptor = __webpack_require__(6980);
var toIndexedObject = __webpack_require__(5397);
var toPropertyKey = __webpack_require__(6969);
var hasOwn = __webpack_require__(9297);
var IE8_DOM_DEFINE = __webpack_require__(5917);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 3717:
/***/ ((__unused_webpack_module, exports) => {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 2787:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(9297);
var isCallable = __webpack_require__(4901);
var toObject = __webpack_require__(8981);
var sharedKey = __webpack_require__(6119);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(2211);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 1625:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);
var toIndexedObject = __webpack_require__(5397);
var indexOf = (__webpack_require__(9617).indexOf);
var hiddenKeys = __webpack_require__(421);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 8773:
/***/ ((__unused_webpack_module, exports) => {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(6706);
var isObject = __webpack_require__(34);
var requireObjectCoercible = __webpack_require__(7750);
var aPossiblePrototype = __webpack_require__(3506);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 4270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 5031:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var getOwnPropertyNamesModule = __webpack_require__(8480);
var getOwnPropertySymbolsModule = __webpack_require__(3717);
var anObject = __webpack_require__(8551);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 8235:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);

var $SyntaxError = SyntaxError;
var $parseInt = parseInt;
var fromCharCode = String.fromCharCode;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);

var codePoints = {
  '\\"': '"',
  '\\\\': '\\',
  '\\/': '/',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t'
};

var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
// eslint-disable-next-line regexp/no-control-character -- safe
var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

module.exports = function (source, i) {
  var unterminated = true;
  var value = '';
  while (i < source.length) {
    var chr = at(source, i);
    if (chr === '\\') {
      var twoChars = slice(source, i, i + 2);
      if (hasOwn(codePoints, twoChars)) {
        value += codePoints[twoChars];
        i += 2;
      } else if (twoChars === '\\u') {
        i += 2;
        var fourHexDigits = slice(source, i, i + 4);
        if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
        value += fromCharCode($parseInt(fourHexDigits, 16));
        i += 4;
      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
    } else if (chr === '"') {
      unterminated = false;
      i++;
      break;
    } else {
      if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
      value += chr;
      i++;
    }
  }
  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
  return { value: value, end: i };
};


/***/ }),

/***/ 1056:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var defineProperty = (__webpack_require__(4913).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 7979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(8551);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 1034:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);
var hasOwn = __webpack_require__(9297);
var isPrototypeOf = __webpack_require__(1625);
var regExpFlags = __webpack_require__(7979);

var RegExpPrototype = RegExp.prototype;

module.exports = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
    ? call(regExpFlags, R) : flags;
};


/***/ }),

/***/ 7750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isNullOrUndefined = __webpack_require__(4117);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 9286:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var SetHelpers = __webpack_require__(4402);
var iterate = __webpack_require__(8469);

var Set = SetHelpers.Set;
var add = SetHelpers.add;

module.exports = function (set) {
  var result = new Set();
  iterate(set, function (it) {
    add(result, it);
  });
  return result;
};


/***/ }),

/***/ 3440:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aSet = __webpack_require__(7080);
var SetHelpers = __webpack_require__(4402);
var clone = __webpack_require__(9286);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSet = __webpack_require__(8469);
var iterateSimple = __webpack_require__(507);

var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
module.exports = function difference(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = clone(O);
  if (size(O) <= otherRec.size) iterateSet(O, function (e) {
    if (otherRec.includes(e)) remove(result, e);
  });
  else iterateSimple(otherRec.getIterator(), function (e) {
    if (has(O, e)) remove(result, e);
  });
  return result;
};


/***/ }),

/***/ 4402:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);

// eslint-disable-next-line es/no-set -- safe
var SetPrototype = Set.prototype;

module.exports = {
  // eslint-disable-next-line es/no-set -- safe
  Set: Set,
  add: uncurryThis(SetPrototype.add),
  has: uncurryThis(SetPrototype.has),
  remove: uncurryThis(SetPrototype['delete']),
  proto: SetPrototype
};


/***/ }),

/***/ 8750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aSet = __webpack_require__(7080);
var SetHelpers = __webpack_require__(4402);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSet = __webpack_require__(8469);
var iterateSimple = __webpack_require__(507);

var Set = SetHelpers.Set;
var add = SetHelpers.add;
var has = SetHelpers.has;

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
module.exports = function intersection(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = new Set();

  if (size(O) > otherRec.size) {
    iterateSimple(otherRec.getIterator(), function (e) {
      if (has(O, e)) add(result, e);
    });
  } else {
    iterateSet(O, function (e) {
      if (otherRec.includes(e)) add(result, e);
    });
  }

  return result;
};


/***/ }),

/***/ 4449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aSet = __webpack_require__(7080);
var has = (__webpack_require__(4402).has);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSet = __webpack_require__(8469);
var iterateSimple = __webpack_require__(507);
var iteratorClose = __webpack_require__(9539);

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
module.exports = function isDisjointFrom(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) <= otherRec.size) return iterateSet(O, function (e) {
    if (otherRec.includes(e)) return false;
  }, true) !== false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};


/***/ }),

/***/ 3838:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aSet = __webpack_require__(7080);
var size = __webpack_require__(5170);
var iterate = __webpack_require__(8469);
var getSetRecord = __webpack_require__(3789);

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
module.exports = function isSubsetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) > otherRec.size) return false;
  return iterate(O, function (e) {
    if (!otherRec.includes(e)) return false;
  }, true) !== false;
};


/***/ }),

/***/ 8527:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aSet = __webpack_require__(7080);
var has = (__webpack_require__(4402).has);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSimple = __webpack_require__(507);
var iteratorClose = __webpack_require__(9539);

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
module.exports = function isSupersetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) < otherRec.size) return false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (!has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};


/***/ }),

/***/ 8469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);
var iterateSimple = __webpack_require__(507);
var SetHelpers = __webpack_require__(4402);

var Set = SetHelpers.Set;
var SetPrototype = SetHelpers.proto;
var forEach = uncurryThis(SetPrototype.forEach);
var keys = uncurryThis(SetPrototype.keys);
var next = keys(new Set()).next;

module.exports = function (set, fn, interruptible) {
  return interruptible ? iterateSimple({ iterator: keys(set), next: next }, fn) : forEach(set, fn);
};


/***/ }),

/***/ 4916:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(7751);

var createSetLike = function (size) {
  return {
    size: size,
    has: function () {
      return false;
    },
    keys: function () {
      return {
        next: function () {
          return { done: true };
        }
      };
    }
  };
};

module.exports = function (name) {
  var Set = getBuiltIn('Set');
  try {
    new Set()[name](createSetLike(0));
    try {
      // late spec change, early WebKit ~ Safari 17.0 beta implementation does not pass it
      // https://github.com/tc39/proposal-set-methods/pull/88
      new Set()[name](createSetLike(-1));
      return false;
    } catch (error2) {
      return true;
    }
  } catch (error) {
    return false;
  }
};


/***/ }),

/***/ 5170:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThisAccessor = __webpack_require__(6706);
var SetHelpers = __webpack_require__(4402);

module.exports = uncurryThisAccessor(SetHelpers.proto, 'size', 'get') || function (set) {
  return set.size;
};


/***/ }),

/***/ 3650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aSet = __webpack_require__(7080);
var SetHelpers = __webpack_require__(4402);
var clone = __webpack_require__(9286);
var getSetRecord = __webpack_require__(3789);
var iterateSimple = __webpack_require__(507);

var add = SetHelpers.add;
var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
module.exports = function symmetricDifference(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (e) {
    if (has(O, e)) remove(result, e);
    else add(result, e);
  });
  return result;
};


/***/ }),

/***/ 4204:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aSet = __webpack_require__(7080);
var add = (__webpack_require__(4402).add);
var clone = __webpack_require__(9286);
var getSetRecord = __webpack_require__(3789);
var iterateSimple = __webpack_require__(507);

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
module.exports = function union(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (it) {
    add(result, it);
  });
  return result;
};


/***/ }),

/***/ 6119:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var shared = __webpack_require__(5745);
var uid = __webpack_require__(3392);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 7629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IS_PURE = __webpack_require__(6395);
var globalThis = __webpack_require__(4576);
var defineGlobalProperty = __webpack_require__(9433);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.39.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.39.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 5745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var store = __webpack_require__(7629);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 4495:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(9519);
var fails = __webpack_require__(9039);
var globalThis = __webpack_require__(4576);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 5610:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(1291);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7055);
var requireObjectCoercible = __webpack_require__(7750);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 1291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var trunc = __webpack_require__(741);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 8014:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(1291);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 8981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var requireObjectCoercible = __webpack_require__(7750);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 2777:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(9565);
var isObject = __webpack_require__(34);
var isSymbol = __webpack_require__(757);
var getMethod = __webpack_require__(5966);
var ordinaryToPrimitive = __webpack_require__(4270);
var wellKnownSymbol = __webpack_require__(8227);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 6969:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toPrimitive = __webpack_require__(2777);
var isSymbol = __webpack_require__(757);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 2140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(8227);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(6955);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6823:
/***/ ((module) => {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 3392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(9504);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 7040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4495);

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 8686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 2812:
/***/ ((module) => {


var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 8622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 8227:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var globalThis = __webpack_require__(4576);
var shared = __webpack_require__(5745);
var hasOwn = __webpack_require__(9297);
var uid = __webpack_require__(3392);
var NATIVE_SYMBOL = __webpack_require__(4495);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 4601:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(7751);
var hasOwn = __webpack_require__(9297);
var createNonEnumerableProperty = __webpack_require__(6699);
var isPrototypeOf = __webpack_require__(1625);
var setPrototypeOf = __webpack_require__(2967);
var copyConstructorProperties = __webpack_require__(7740);
var proxyAccessor = __webpack_require__(1056);
var inheritIfRequired = __webpack_require__(3167);
var normalizeStringArgument = __webpack_require__(2603);
var installErrorCause = __webpack_require__(7584);
var installErrorStack = __webpack_require__(747);
var DESCRIPTORS = __webpack_require__(3724);
var IS_PURE = __webpack_require__(6395);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 8107:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var toIntegerOrInfinity = __webpack_require__(1291);
var addToUnscopables = __webpack_require__(6469);

// `Array.prototype.at` method
// https://tc39.es/ecma262/#sec-array.prototype.at
$({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables('at');


/***/ }),

/***/ 4114:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var setArrayLength = __webpack_require__(4527);
var doesNotExceedSafeInteger = __webpack_require__(6837);
var fails = __webpack_require__(9039);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 6280:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var apply = __webpack_require__(8745);
var wrapErrorConstructorWithCause = __webpack_require__(4601);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = globalThis[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 5081:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$({ global: true, forced: globalThis.globalThis !== globalThis }, {
  globalThis: globalThis
});


/***/ }),

/***/ 8111:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var anInstance = __webpack_require__(679);
var anObject = __webpack_require__(8551);
var isCallable = __webpack_require__(4901);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltInAccessor = __webpack_require__(2106);
var createProperty = __webpack_require__(2278);
var fails = __webpack_require__(9039);
var hasOwn = __webpack_require__(9297);
var wellKnownSymbol = __webpack_require__(8227);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var DESCRIPTORS = __webpack_require__(3724);
var IS_PURE = __webpack_require__(6395);

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = globalThis[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS) {
    defineBuiltInAccessor(IteratorPrototype, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject(this);
        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
        if (hasOwn(this, key)) this[key] = replacement;
        else createProperty(this, key, replacement);
      }
    });
  } else IteratorPrototype[key] = value;
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://tc39.es/ecma262/#sec-iterator
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ }),

/***/ 1148:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.every` method
// https://tc39.es/ecma262/#sec-iterator.prototype.every
$({ target: 'Iterator', proto: true, real: true }, {
  every: function every(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return !iterate(record, function (value, stop) {
      if (!predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});


/***/ }),

/***/ 2489:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);
var IS_PURE = __webpack_require__(6395);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://tc39.es/ecma262/#sec-iterator.prototype.filter
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(predicate) {
    anObject(this);
    aCallable(predicate);
    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});


/***/ }),

/***/ 7588:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.forEach` method
// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    anObject(this);
    aCallable(fn);
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});


/***/ }),

/***/ 1701:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var map = __webpack_require__(713);
var IS_PURE = __webpack_require__(6395);

// `Iterator.prototype.map` method
// https://tc39.es/ecma262/#sec-iterator.prototype.map
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  map: map
});


/***/ }),

/***/ 3110:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var getBuiltIn = __webpack_require__(7751);
var apply = __webpack_require__(8745);
var call = __webpack_require__(9565);
var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var isSymbol = __webpack_require__(757);
var arraySlice = __webpack_require__(7680);
var getReplacerFunction = __webpack_require__(6933);
var NATIVE_SYMBOL = __webpack_require__(4495);

var $String = String;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')('stringify detection');
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = getReplacerFunction(replacer);
  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
  args[1] = function (key, value) {
    // some old implementations (like WebKit) could pass numbers as keys
    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
    if (!isSymbol(value)) return value;
  };
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}


/***/ }),

/***/ 9469:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);

// eslint-disable-next-line es/no-math-hypot -- required for testing
var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt;

// Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546
var FORCED = !!$hypot && $hypot(Infinity, NaN) !== Infinity;

// `Math.hypot` method
// https://tc39.es/ecma262/#sec-math.hypot
$({ target: 'Math', stat: true, arity: 2, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function hypot(value1, value2) {
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});


/***/ }),

/***/ 4628:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var newPromiseCapabilityModule = __webpack_require__(6043);

// `Promise.withResolvers` method
// https://tc39.es/ecma262/#sec-promise.withResolvers
$({ target: 'Promise', stat: true }, {
  withResolvers: function withResolvers() {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    return {
      promise: promiseCapability.promise,
      resolve: promiseCapability.resolve,
      reject: promiseCapability.reject
    };
  }
});


/***/ }),

/***/ 7642:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var difference = __webpack_require__(3440);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.difference` method
// https://tc39.es/ecma262/#sec-set.prototype.difference
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('difference') }, {
  difference: difference
});


/***/ }),

/***/ 8004:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var fails = __webpack_require__(9039);
var intersection = __webpack_require__(8750);
var setMethodAcceptSetLike = __webpack_require__(4916);

var INCORRECT = !setMethodAcceptSetLike('intersection') || fails(function () {
  // eslint-disable-next-line es/no-array-from, es/no-set -- testing
  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
});

// `Set.prototype.intersection` method
// https://tc39.es/ecma262/#sec-set.prototype.intersection
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  intersection: intersection
});


/***/ }),

/***/ 3853:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var isDisjointFrom = __webpack_require__(4449);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.isDisjointFrom` method
// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isDisjointFrom') }, {
  isDisjointFrom: isDisjointFrom
});


/***/ }),

/***/ 5876:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var isSubsetOf = __webpack_require__(3838);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.isSubsetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSubsetOf') }, {
  isSubsetOf: isSubsetOf
});


/***/ }),

/***/ 2475:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var isSupersetOf = __webpack_require__(8527);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.isSupersetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSupersetOf') }, {
  isSupersetOf: isSupersetOf
});


/***/ }),

/***/ 5024:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var symmetricDifference = __webpack_require__(3650);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.symmetricDifference` method
// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('symmetricDifference') }, {
  symmetricDifference: symmetricDifference
});


/***/ }),

/***/ 1698:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var union = __webpack_require__(4204);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.union` method
// https://tc39.es/ecma262/#sec-set.prototype.union
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
  union: union
});


/***/ }),

/***/ 9978:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var uncurryThis = __webpack_require__(9504);
var requireObjectCoercible = __webpack_require__(7750);
var isCallable = __webpack_require__(4901);
var isNullOrUndefined = __webpack_require__(4117);
var isRegExp = __webpack_require__(788);
var toString = __webpack_require__(655);
var getMethod = __webpack_require__(5966);
var getRegExpFlags = __webpack_require__(1034);
var getSubstitution = __webpack_require__(2478);
var wellKnownSymbol = __webpack_require__(8227);
var IS_PURE = __webpack_require__(6395);

var REPLACE = wellKnownSymbol('replace');
var $TypeError = TypeError;
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, position, replacement;
    var endOfLastMatch = 0;
    var result = '';
    if (!isNullOrUndefined(searchValue)) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)));
        if (!~indexOf(flags, 'g')) throw new $TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) return call(replacer, searchValue, O, replaceValue);
      if (IS_PURE && IS_REG_EXP) return replace(toString(O), searchValue, replaceValue);
    }
    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = indexOf(string, searchString);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = position + advanceBy > string.length ? -1 : indexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});


/***/ }),

/***/ 8992:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4`
__webpack_require__(8111);


/***/ }),

/***/ 3215:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4`
__webpack_require__(1148);


/***/ }),

/***/ 4520:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4`
__webpack_require__(2489);


/***/ }),

/***/ 3949:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4`
__webpack_require__(7588);


/***/ }),

/***/ 1454:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4`
__webpack_require__(1701);


/***/ }),

/***/ 8335:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var DESCRIPTORS = __webpack_require__(3724);
var globalThis = __webpack_require__(4576);
var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var isArray = __webpack_require__(4376);
var hasOwn = __webpack_require__(9297);
var toString = __webpack_require__(655);
var lengthOfArrayLike = __webpack_require__(6198);
var createProperty = __webpack_require__(2278);
var fails = __webpack_require__(9039);
var parseJSONString = __webpack_require__(8235);
var NATIVE_SYMBOL = __webpack_require__(4495);

var JSON = globalThis.JSON;
var Number = globalThis.Number;
var SyntaxError = globalThis.SyntaxError;
var nativeParse = JSON && JSON.parse;
var enumerableOwnProperties = getBuiltIn('Object', 'keys');
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);
var push = uncurryThis([].push);

var IS_DIGIT = /^\d$/;
var IS_NON_ZERO_DIGIT = /^[1-9]$/;
var IS_NUMBER_START = /^[\d-]$/;
var IS_WHITESPACE = /^[\t\n\r ]$/;

var PRIMITIVE = 0;
var OBJECT = 1;

var $parse = function (source, reviver) {
  source = toString(source);
  var context = new Context(source, 0, '');
  var root = context.parse();
  var value = root.value;
  var endIndex = context.skip(IS_WHITESPACE, root.end);
  if (endIndex < source.length) {
    throw new SyntaxError('Unexpected extra character: "' + at(source, endIndex) + '" after the parsed data at: ' + endIndex);
  }
  return isCallable(reviver) ? internalize({ '': value }, '', reviver, root) : value;
};

var internalize = function (holder, name, reviver, node) {
  var val = holder[name];
  var unmodified = node && val === node.value;
  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
  var elementRecordsLen, keys, len, i, P;
  if (isObject(val)) {
    var nodeIsArray = isArray(val);
    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
    if (nodeIsArray) {
      elementRecordsLen = nodes.length;
      len = lengthOfArrayLike(val);
      for (i = 0; i < len; i++) {
        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
      }
    } else {
      keys = enumerableOwnProperties(val);
      len = lengthOfArrayLike(keys);
      for (i = 0; i < len; i++) {
        P = keys[i];
        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn(nodes, P) ? nodes[P] : undefined));
      }
    }
  }
  return call(reviver, holder, name, val, context);
};

var internalizeProperty = function (object, key, value) {
  if (DESCRIPTORS) {
    var descriptor = getOwnPropertyDescriptor(object, key);
    if (descriptor && !descriptor.configurable) return;
  }
  if (value === undefined) delete object[key];
  else createProperty(object, key, value);
};

var Node = function (value, end, source, nodes) {
  this.value = value;
  this.end = end;
  this.source = source;
  this.nodes = nodes;
};

var Context = function (source, index) {
  this.source = source;
  this.index = index;
};

// https://www.json.org/json-en.html
Context.prototype = {
  fork: function (nextIndex) {
    return new Context(this.source, nextIndex);
  },
  parse: function () {
    var source = this.source;
    var i = this.skip(IS_WHITESPACE, this.index);
    var fork = this.fork(i);
    var chr = at(source, i);
    if (exec(IS_NUMBER_START, chr)) return fork.number();
    switch (chr) {
      case '{':
        return fork.object();
      case '[':
        return fork.array();
      case '"':
        return fork.string();
      case 't':
        return fork.keyword(true);
      case 'f':
        return fork.keyword(false);
      case 'n':
        return fork.keyword(null);
    } throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  },
  node: function (type, value, start, end, nodes) {
    return new Node(value, end, type ? null : slice(this.source, start, end), nodes);
  },
  object: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectKeypair = false;
    var object = {};
    var nodes = {};
    while (i < source.length) {
      i = this.until(['"', '}'], i);
      if (at(source, i) === '}' && !expectKeypair) {
        i++;
        break;
      }
      // Parsing the key
      var result = this.fork(i).string();
      var key = result.value;
      i = result.end;
      i = this.until([':'], i) + 1;
      // Parsing value
      i = this.skip(IS_WHITESPACE, i);
      result = this.fork(i).parse();
      createProperty(nodes, key, result);
      createProperty(object, key, result.value);
      i = this.until([',', '}'], result.end);
      var chr = at(source, i);
      if (chr === ',') {
        expectKeypair = true;
        i++;
      } else if (chr === '}') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, object, this.index, i, nodes);
  },
  array: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectElement = false;
    var array = [];
    var nodes = [];
    while (i < source.length) {
      i = this.skip(IS_WHITESPACE, i);
      if (at(source, i) === ']' && !expectElement) {
        i++;
        break;
      }
      var result = this.fork(i).parse();
      push(nodes, result);
      push(array, result.value);
      i = this.until([',', ']'], result.end);
      if (at(source, i) === ',') {
        expectElement = true;
        i++;
      } else if (at(source, i) === ']') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, array, this.index, i, nodes);
  },
  string: function () {
    var index = this.index;
    var parsed = parseJSONString(this.source, this.index + 1);
    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
  },
  number: function () {
    var source = this.source;
    var startIndex = this.index;
    var i = startIndex;
    if (at(source, i) === '-') i++;
    if (at(source, i) === '0') i++;
    else if (exec(IS_NON_ZERO_DIGIT, at(source, i))) i = this.skip(IS_DIGIT, i + 1);
    else throw new SyntaxError('Failed to parse number at: ' + i);
    if (at(source, i) === '.') i = this.skip(IS_DIGIT, i + 1);
    if (at(source, i) === 'e' || at(source, i) === 'E') {
      i++;
      if (at(source, i) === '+' || at(source, i) === '-') i++;
      var exponentStartIndex = i;
      i = this.skip(IS_DIGIT, i);
      if (exponentStartIndex === i) throw new SyntaxError("Failed to parse number's exponent value at: " + i);
    }
    return this.node(PRIMITIVE, Number(slice(source, startIndex, i)), startIndex, i);
  },
  keyword: function (value) {
    var keyword = '' + value;
    var index = this.index;
    var endIndex = index + keyword.length;
    if (slice(this.source, index, endIndex) !== keyword) throw new SyntaxError('Failed to parse value at: ' + index);
    return this.node(PRIMITIVE, value, index, endIndex);
  },
  skip: function (regex, i) {
    var source = this.source;
    for (; i < source.length; i++) if (!exec(regex, at(source, i))) break;
    return i;
  },
  until: function (array, i) {
    i = this.skip(IS_WHITESPACE, i);
    var chr = at(this.source, i);
    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
    throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  }
};

var NO_SOURCE_SUPPORT = fails(function () {
  var unsafeInt = '9007199254740993';
  var source;
  nativeParse(unsafeInt, function (key, value, context) {
    source = context.source;
  });
  return source !== unsafeInt;
});

var PROPER_BASE_PARSE = NATIVE_SYMBOL && !fails(function () {
  // Safari 9 bug
  return 1 / nativeParse('-0 \t') !== -Infinity;
});

// `JSON.parse` method
// https://tc39.es/ecma262/#sec-json.parse
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
  parse: function parse(text, reviver) {
    return PROPER_BASE_PARSE && !isCallable(reviver) ? nativeParse(text) : $parse(text, reviver);
  }
});


/***/ }),

/***/ 4603:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var defineBuiltIn = __webpack_require__(6840);
var uncurryThis = __webpack_require__(9504);
var toString = __webpack_require__(655);
var validateArgumentsLength = __webpack_require__(2812);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var append = uncurryThis(URLSearchParamsPrototype.append);
var $delete = uncurryThis(URLSearchParamsPrototype['delete']);
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);
var push = uncurryThis([].push);
var params = new $URLSearchParams('a=1&a=2&b=3');

params['delete']('a', 1);
// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
params['delete']('b', undefined);

if (params + '' !== 'a=2') {
  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $delete(this, name);
    var entries = [];
    forEach(this, function (v, k) { // also validates `this`
      push(entries, { key: k, value: v });
    });
    validateArgumentsLength(length, 1);
    var key = toString(name);
    var value = toString($value);
    var index = 0;
    var dindex = 0;
    var found = false;
    var entriesLength = entries.length;
    var entry;
    while (index < entriesLength) {
      entry = entries[index++];
      if (found || entry.key === key) {
        found = true;
        $delete(this, entry.key);
      } else dindex++;
    }
    while (dindex < entriesLength) {
      entry = entries[dindex++];
      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 7566:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var defineBuiltIn = __webpack_require__(6840);
var uncurryThis = __webpack_require__(9504);
var toString = __webpack_require__(655);
var validateArgumentsLength = __webpack_require__(2812);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var getAll = uncurryThis(URLSearchParamsPrototype.getAll);
var $has = uncurryThis(URLSearchParamsPrototype.has);
var params = new $URLSearchParams('a=1');

// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
if (params.has('a', 2) || !params.has('a', undefined)) {
  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $has(this, name);
    var values = getAll(this, name); // also validates `this`
    validateArgumentsLength(length, 1);
    var value = toString($value);
    var index = 0;
    while (index < values.length) {
      if (values[index++] === value) return true;
    } return false;
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 8721:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(3724);
var uncurryThis = __webpack_require__(9504);
var defineBuiltInAccessor = __webpack_require__(2106);

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}


/***/ }),

/***/ 7208:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return call(URL.prototype.toString, this);
  }
});


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = globalThis.pdfjsViewer = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  AnnotationLayerBuilder: () => (/* reexport */ AnnotationLayerBuilder),
  DownloadManager: () => (/* reexport */ DownloadManager),
  EventBus: () => (/* reexport */ EventBus),
  FindState: () => (/* reexport */ FindState),
  GenericL10n: () => (/* reexport */ genericl10n_GenericL10n),
  LinkTarget: () => (/* reexport */ LinkTarget),
  PDFFindController: () => (/* reexport */ PDFFindController),
  PDFHistory: () => (/* reexport */ PDFHistory),
  PDFLinkService: () => (/* reexport */ PDFLinkService),
  PDFPageView: () => (/* reexport */ PDFPageView),
  PDFScriptingManager: () => (/* reexport */ PDFScriptingManagerComponents),
  PDFSinglePageViewer: () => (/* reexport */ PDFSinglePageViewer),
  PDFThumbnailView: () => (/* reexport */ PDFThumbnailView),
  PDFThumbnailViewer: () => (/* reexport */ PDFThumbnailViewer),
  PDFViewer: () => (/* reexport */ PDFViewer),
  ProgressBar: () => (/* reexport */ ProgressBar),
  RenderingStates: () => (/* reexport */ RenderingStates),
  ScrollMode: () => (/* reexport */ ScrollMode),
  SimpleLinkService: () => (/* reexport */ SimpleLinkService),
  SpreadMode: () => (/* reexport */ SpreadMode),
  StructTreeLayerBuilder: () => (/* reexport */ StructTreeLayerBuilder),
  TextLayerBuilder: () => (/* reexport */ TextLayerBuilder),
  XfaLayerBuilder: () => (/* reexport */ XfaLayerBuilder),
  getVisibleElements: () => (/* reexport */ getVisibleElements),
  getXfaHtmlForPrinting: () => (/* reexport */ getXfaHtmlForPrinting),
  isValidRotation: () => (/* reexport */ isValidRotation),
  parseQueryString: () => (/* reexport */ parseQueryString),
  scrollIntoView: () => (/* reexport */ scrollIntoView),
  watchScroll: () => (/* reexport */ watchScroll)
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(6280);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(4114);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__(3110);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.with-resolvers.js
var es_promise_with_resolvers = __webpack_require__(4628);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.difference.v2.js
var es_set_difference_v2 = __webpack_require__(7642);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.intersection.v2.js
var es_set_intersection_v2 = __webpack_require__(8004);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.is-disjoint-from.v2.js
var es_set_is_disjoint_from_v2 = __webpack_require__(3853);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.is-subset-of.v2.js
var es_set_is_subset_of_v2 = __webpack_require__(5876);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.is-superset-of.v2.js
var es_set_is_superset_of_v2 = __webpack_require__(2475);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.symmetric-difference.v2.js
var es_set_symmetric_difference_v2 = __webpack_require__(5024);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.union.v2.js
var es_set_union_v2 = __webpack_require__(1698);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace-all.js
var es_string_replace_all = __webpack_require__(9978);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(8992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.filter.js
var esnext_iterator_filter = __webpack_require__(4520);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.for-each.js
var esnext_iterator_for_each = __webpack_require__(3949);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.map.js
var esnext_iterator_map = __webpack_require__(1454);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.at.js
var es_array_at = __webpack_require__(8107);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.math.hypot.js
var es_math_hypot = __webpack_require__(9469);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.delete.js
var web_url_search_params_delete = __webpack_require__(4603);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.has.js
var web_url_search_params_has = __webpack_require__(7566);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.size.js
var web_url_search_params_size = __webpack_require__(8721);
;// ./web/ui_utils.js
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }















const DEFAULT_SCALE_VALUE = "auto";
const DEFAULT_SCALE = 1.0;
const DEFAULT_SCALE_DELTA = 1.1;
const MIN_SCALE = 0.1;
const MAX_SCALE = 10.0;
const UNKNOWN_SCALE = 0;
const MAX_AUTO_SCALE = 1.25;
const SCROLLBAR_PADDING = 40;
const VERTICAL_PADDING = 5;
const RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
};
const PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
};
const SidebarView = {
  UNKNOWN: -1,
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3,
  LAYERS: 4
};
const TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_PERMISSIONS: 2
};
const ScrollMode = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2,
  PAGE: 3
};
const SpreadMode = {
  UNKNOWN: -1,
  NONE: 0,
  ODD: 1,
  EVEN: 2
};
const CursorTool = {
  SELECT: 0,
  HAND: 1,
  ZOOM: 2
};
const AutoPrintRegExp = /\bprint\s*\(/;
function scrollIntoView(element, spot, scrollMatches = false) {
  let parent = element.offsetParent;
  if (!parent) {
    console.error("offsetParent is not set -- cannot scroll");
    return;
  }
  let offsetY = element.offsetTop + element.clientTop;
  let offsetX = element.offsetLeft + element.clientLeft;
  while (parent.clientHeight === parent.scrollHeight && parent.clientWidth === parent.scrollWidth || scrollMatches && (parent.classList.contains("markedContent") || getComputedStyle(parent).overflow === "hidden")) {
    offsetY += parent.offsetTop;
    offsetX += parent.offsetLeft;
    parent = parent.offsetParent;
    if (!parent) {
      return;
    }
  }
  if (spot) {
    if (spot.top !== undefined) {
      offsetY += spot.top;
    }
    if (spot.left !== undefined) {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
    }
  }
  parent.scrollTop = offsetY;
}
function watchScroll(viewAreaElement, callback, abortSignal = undefined) {
  const debounceScroll = function (evt) {
    if (rAF) {
      return;
    }
    rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      const currentX = viewAreaElement.scrollLeft;
      const lastX = state.lastX;
      if (currentX !== lastX) {
        state.right = currentX > lastX;
      }
      state.lastX = currentX;
      const currentY = viewAreaElement.scrollTop;
      const lastY = state.lastY;
      if (currentY !== lastY) {
        state.down = currentY > lastY;
      }
      state.lastY = currentY;
      callback(state);
    });
  };
  const state = {
    right: true,
    down: true,
    lastX: viewAreaElement.scrollLeft,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
  };
  let rAF = null;
  viewAreaElement.addEventListener("scroll", debounceScroll, {
    useCapture: true,
    signal: abortSignal
  });
  abortSignal === null || abortSignal === void 0 || abortSignal.addEventListener("abort", () => window.cancelAnimationFrame(rAF), {
    once: true
  });
  return state;
}
function parseQueryString(query) {
  const params = new Map();
  for (const [key, value] of new URLSearchParams(query)) {
    params.set(key.toLowerCase(), value);
  }
  return params;
}
const InvisibleCharsRegExp = /[\x00-\x1F]/g;
function removeNullCharacters(str, replaceInvisible = false) {
  if (!InvisibleCharsRegExp.test(str)) {
    return str;
  }
  if (replaceInvisible) {
    return str.replaceAll(InvisibleCharsRegExp, m => m === "\x00" ? "" : " ");
  }
  return str.replaceAll("\x00", "");
}
function binarySearchFirstItem(items, condition, start = 0) {
  let minIndex = start;
  let maxIndex = items.length - 1;
  if (maxIndex < 0 || !condition(items[maxIndex])) {
    return items.length;
  }
  if (condition(items[minIndex])) {
    return minIndex;
  }
  while (minIndex < maxIndex) {
    const currentIndex = minIndex + maxIndex >> 1;
    const currentItem = items[currentIndex];
    if (condition(currentItem)) {
      maxIndex = currentIndex;
    } else {
      minIndex = currentIndex + 1;
    }
  }
  return minIndex;
}
function approximateFraction(x) {
  if (Math.floor(x) === x) {
    return [x, 1];
  }
  const xinv = 1 / x;
  const limit = 8;
  if (xinv > limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }
  const x_ = x > 1 ? xinv : x;
  let a = 0,
    b = 1,
    c = 1,
    d = 1;
  while (true) {
    const p = a + c,
      q = b + d;
    if (q > limit) {
      break;
    }
    if (x_ <= p / q) {
      c = p;
      d = q;
    } else {
      a = p;
      b = q;
    }
  }
  let result;
  if (x_ - a / b < c / d - x_) {
    result = x_ === x ? [a, b] : [b, a];
  } else {
    result = x_ === x ? [c, d] : [d, c];
  }
  return result;
}
function floorToDivide(x, div) {
  return x - x % div;
}
function getPageSizeInches({
  view,
  userUnit,
  rotate
}) {
  const [x1, y1, x2, y2] = view;
  const changeOrientation = rotate % 180 !== 0;
  const width = (x2 - x1) / 72 * userUnit;
  const height = (y2 - y1) / 72 * userUnit;
  return {
    width: changeOrientation ? height : width,
    height: changeOrientation ? width : height
  };
}
function backtrackBeforeAllVisibleElements(index, views, top) {
  if (index < 2) {
    return index;
  }
  let elt = views[index].div;
  let pageTop = elt.offsetTop + elt.clientTop;
  if (pageTop >= top) {
    elt = views[index - 1].div;
    pageTop = elt.offsetTop + elt.clientTop;
  }
  for (let i = index - 2; i >= 0; --i) {
    elt = views[i].div;
    if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop) {
      break;
    }
    index = i;
  }
  return index;
}
function getVisibleElements({
  scrollEl,
  views,
  sortByVisibility = false,
  horizontal = false,
  rtl = false
}) {
  const top = scrollEl.scrollTop,
    bottom = top + scrollEl.clientHeight;
  const left = scrollEl.scrollLeft,
    right = left + scrollEl.clientWidth;
  function isElementBottomAfterViewTop(view) {
    const element = view.div;
    const elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  }
  function isElementNextAfterViewHorizontally(view) {
    const element = view.div;
    const elementLeft = element.offsetLeft + element.clientLeft;
    const elementRight = elementLeft + element.clientWidth;
    return rtl ? elementLeft < right : elementRight > left;
  }
  const visible = [],
    ids = new Set(),
    numViews = views.length;
  let firstVisibleElementInd = binarySearchFirstItem(views, horizontal ? isElementNextAfterViewHorizontally : isElementBottomAfterViewTop);
  if (firstVisibleElementInd > 0 && firstVisibleElementInd < numViews && !horizontal) {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top);
  }
  let lastEdge = horizontal ? right : -1;
  for (let i = firstVisibleElementInd; i < numViews; i++) {
    const view = views[i],
      element = view.div;
    const currentWidth = element.offsetLeft + element.clientLeft;
    const currentHeight = element.offsetTop + element.clientTop;
    const viewWidth = element.clientWidth,
      viewHeight = element.clientHeight;
    const viewRight = currentWidth + viewWidth;
    const viewBottom = currentHeight + viewHeight;
    if (lastEdge === -1) {
      if (viewBottom >= bottom) {
        lastEdge = viewBottom;
      }
    } else if ((horizontal ? currentWidth : currentHeight) > lastEdge) {
      break;
    }
    if (viewBottom <= top || currentHeight >= bottom || viewRight <= left || currentWidth >= right) {
      continue;
    }
    const hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
    const hiddenWidth = Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
    const fractionHeight = (viewHeight - hiddenHeight) / viewHeight,
      fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
    const percent = fractionHeight * fractionWidth * 100 | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view,
      percent,
      widthPercent: fractionWidth * 100 | 0
    });
    ids.add(view.id);
  }
  const first = visible[0],
    last = visible.at(-1);
  if (sortByVisibility) {
    visible.sort(function (a, b) {
      const pc = a.percent - b.percent;
      if (Math.abs(pc) > 0.001) {
        return -pc;
      }
      return a.id - b.id;
    });
  }
  return {
    first,
    last,
    views: visible,
    ids
  };
}
function normalizeWheelEventDirection(evt) {
  let delta = Math.hypot(evt.deltaX, evt.deltaY);
  const angle = Math.atan2(evt.deltaY, evt.deltaX);
  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
  }
  return delta;
}
function normalizeWheelEventDelta(evt) {
  const deltaMode = evt.deltaMode;
  let delta = normalizeWheelEventDirection(evt);
  const MOUSE_PIXELS_PER_LINE = 30;
  const MOUSE_LINES_PER_PAGE = 30;
  if (deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
  } else if (deltaMode === WheelEvent.DOM_DELTA_LINE) {
    delta /= MOUSE_LINES_PER_PAGE;
  }
  return delta;
}
function isValidRotation(angle) {
  return Number.isInteger(angle) && angle % 90 === 0;
}
function isValidScrollMode(mode) {
  return Number.isInteger(mode) && Object.values(ScrollMode).includes(mode) && mode !== ScrollMode.UNKNOWN;
}
function isValidSpreadMode(mode) {
  return Number.isInteger(mode) && Object.values(SpreadMode).includes(mode) && mode !== SpreadMode.UNKNOWN;
}
function isPortraitOrientation(size) {
  return size.width <= size.height;
}
const animationStarted = new Promise(function (resolve) {
  window.requestAnimationFrame(resolve);
});
const docStyle = document.documentElement.style;
function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
var _classList = /*#__PURE__*/new WeakMap();
var _disableAutoFetchTimeout = /*#__PURE__*/new WeakMap();
var _percent = /*#__PURE__*/new WeakMap();
var _style = /*#__PURE__*/new WeakMap();
var _visible = /*#__PURE__*/new WeakMap();
class ProgressBar {
  constructor(bar) {
    _classPrivateFieldInitSpec(this, _classList, null);
    _classPrivateFieldInitSpec(this, _disableAutoFetchTimeout, null);
    _classPrivateFieldInitSpec(this, _percent, 0);
    _classPrivateFieldInitSpec(this, _style, null);
    _classPrivateFieldInitSpec(this, _visible, true);
    _classPrivateFieldSet(_classList, this, bar.classList);
    _classPrivateFieldSet(_style, this, bar.style);
  }
  get percent() {
    return _classPrivateFieldGet(_percent, this);
  }
  set percent(val) {
    _classPrivateFieldSet(_percent, this, clamp(val, 0, 100));
    if (isNaN(val)) {
      _classPrivateFieldGet(_classList, this).add("indeterminate");
      return;
    }
    _classPrivateFieldGet(_classList, this).remove("indeterminate");
    _classPrivateFieldGet(_style, this).setProperty("--progressBar-percent", `${_classPrivateFieldGet(_percent, this)}%`);
  }
  setWidth(viewer) {
    if (!viewer) {
      return;
    }
    const container = viewer.parentNode;
    const scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
    if (scrollbarWidth > 0) {
      _classPrivateFieldGet(_style, this).setProperty("--progressBar-end-offset", `${scrollbarWidth}px`);
    }
  }
  setDisableAutoFetch(delay = 5000) {
    if (_classPrivateFieldGet(_percent, this) === 100 || isNaN(_classPrivateFieldGet(_percent, this))) {
      return;
    }
    if (_classPrivateFieldGet(_disableAutoFetchTimeout, this)) {
      clearTimeout(_classPrivateFieldGet(_disableAutoFetchTimeout, this));
    }
    this.show();
    _classPrivateFieldSet(_disableAutoFetchTimeout, this, setTimeout(() => {
      _classPrivateFieldSet(_disableAutoFetchTimeout, this, null);
      this.hide();
    }, delay));
  }
  hide() {
    if (!_classPrivateFieldGet(_visible, this)) {
      return;
    }
    _classPrivateFieldSet(_visible, this, false);
    _classPrivateFieldGet(_classList, this).add("hidden");
  }
  show() {
    if (_classPrivateFieldGet(_visible, this)) {
      return;
    }
    _classPrivateFieldSet(_visible, this, true);
    _classPrivateFieldGet(_classList, this).remove("hidden");
  }
}
function getActiveOrFocusedElement() {
  let curRoot = document;
  let curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");
  while ((_curActiveOrFocused = curActiveOrFocused) !== null && _curActiveOrFocused !== void 0 && _curActiveOrFocused.shadowRoot) {
    var _curActiveOrFocused;
    curRoot = curActiveOrFocused.shadowRoot;
    curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");
  }
  return curActiveOrFocused;
}
function apiPageLayoutToViewerModes(layout) {
  let scrollMode = ScrollMode.VERTICAL,
    spreadMode = SpreadMode.NONE;
  switch (layout) {
    case "SinglePage":
      scrollMode = ScrollMode.PAGE;
      break;
    case "OneColumn":
      break;
    case "TwoPageLeft":
      scrollMode = ScrollMode.PAGE;
    case "TwoColumnLeft":
      spreadMode = SpreadMode.ODD;
      break;
    case "TwoPageRight":
      scrollMode = ScrollMode.PAGE;
    case "TwoColumnRight":
      spreadMode = SpreadMode.EVEN;
      break;
  }
  return {
    scrollMode,
    spreadMode
  };
}
function apiPageModeToSidebarView(mode) {
  switch (mode) {
    case "UseNone":
      return SidebarView.NONE;
    case "UseThumbs":
      return SidebarView.THUMBS;
    case "UseOutlines":
      return SidebarView.OUTLINE;
    case "UseAttachments":
      return SidebarView.ATTACHMENTS;
    case "UseOC":
      return SidebarView.LAYERS;
  }
  return SidebarView.NONE;
}
function toggleCheckedBtn(button, toggle, view = null) {
  button.classList.toggle("toggled", toggle);
  button.setAttribute("aria-checked", toggle);
  view === null || view === void 0 || view.classList.toggle("hidden", !toggle);
}
function toggleExpandedBtn(button, toggle, view = null) {
  button.classList.toggle("toggled", toggle);
  button.setAttribute("aria-expanded", toggle);
  view === null || view === void 0 || view.classList.toggle("hidden", !toggle);
}
const calcRound = function () {
  const e = document.createElement("div");
  e.style.width = "round(down, calc(1.6666666666666665 * 792px), 1px)";
  return e.style.width === "calc(1320px)" ? Math.fround : x => x;
}();

;// ./web/pdf_find_utils.js


const CharacterType = {
  SPACE: 0,
  ALPHA_LETTER: 1,
  PUNCT: 2,
  HAN_LETTER: 3,
  KATAKANA_LETTER: 4,
  HIRAGANA_LETTER: 5,
  HALFWIDTH_KATAKANA_LETTER: 6,
  THAI_LETTER: 7
};
function isAlphabeticalScript(charCode) {
  return charCode < 0x2e80;
}
function isAscii(charCode) {
  return (charCode & 0xff80) === 0;
}
function isAsciiAlpha(charCode) {
  return charCode >= 0x61 && charCode <= 0x7a || charCode >= 0x41 && charCode <= 0x5a;
}
function isAsciiDigit(charCode) {
  return charCode >= 0x30 && charCode <= 0x39;
}
function isAsciiSpace(charCode) {
  return charCode === 0x20 || charCode === 0x09 || charCode === 0x0d || charCode === 0x0a;
}
function isHan(charCode) {
  return charCode >= 0x3400 && charCode <= 0x9fff || charCode >= 0xf900 && charCode <= 0xfaff;
}
function isKatakana(charCode) {
  return charCode >= 0x30a0 && charCode <= 0x30ff;
}
function isHiragana(charCode) {
  return charCode >= 0x3040 && charCode <= 0x309f;
}
function isHalfwidthKatakana(charCode) {
  return charCode >= 0xff60 && charCode <= 0xff9f;
}
function isThai(charCode) {
  return (charCode & 0xff80) === 0x0e00;
}
function getCharacterType(charCode) {
  if (isAlphabeticalScript(charCode)) {
    if (isAscii(charCode)) {
      if (isAsciiSpace(charCode)) {
        return CharacterType.SPACE;
      } else if (isAsciiAlpha(charCode) || isAsciiDigit(charCode) || charCode === 0x5f) {
        return CharacterType.ALPHA_LETTER;
      }
      return CharacterType.PUNCT;
    } else if (isThai(charCode)) {
      return CharacterType.THAI_LETTER;
    } else if (charCode === 0xa0) {
      return CharacterType.SPACE;
    }
    return CharacterType.ALPHA_LETTER;
  }
  if (isHan(charCode)) {
    return CharacterType.HAN_LETTER;
  } else if (isKatakana(charCode)) {
    return CharacterType.KATAKANA_LETTER;
  } else if (isHiragana(charCode)) {
    return CharacterType.HIRAGANA_LETTER;
  } else if (isHalfwidthKatakana(charCode)) {
    return CharacterType.HALFWIDTH_KATAKANA_LETTER;
  }
  return CharacterType.ALPHA_LETTER;
}
let NormalizeWithNFKC;
function getNormalizeWithNFKC() {
  NormalizeWithNFKC || (NormalizeWithNFKC = ` ¨ª¯²-µ¸-º¼-¾Ĳ-ĳĿ-ŀŉſǄ-ǌǱ-ǳʰ-ʸ˘-˝ˠ-ˤʹͺ;΄-΅·ϐ-ϖϰ-ϲϴ-ϵϹևٵ-ٸक़-य़ড়-ঢ়য়ਲ਼ਸ਼ਖ਼-ਜ਼ਫ਼ଡ଼-ଢ଼ำຳໜ-ໝ༌གྷཌྷདྷབྷཛྷཀྵჼᴬ-ᴮᴰ-ᴺᴼ-ᵍᵏ-ᵪᵸᶛ-ᶿẚ-ẛάέήίόύώΆ᾽-῁ΈΉ῍-῏ΐΊ῝-῟ΰΎ῭-`ΌΏ´-῾ - ‑‗․-… ″-‴‶-‷‼‾⁇-⁉⁗ ⁰-ⁱ⁴-₎ₐ-ₜ₨℀-℃℅-ℇ℉-ℓℕ-№ℙ-ℝ℠-™ℤΩℨK-ℭℯ-ℱℳ-ℹ℻-⅀ⅅ-ⅉ⅐-ⅿ↉∬-∭∯-∰〈-〉①-⓪⨌⩴-⩶⫝̸ⱼ-ⱽⵯ⺟⻳⼀-⿕　〶〸-〺゛-゜ゟヿㄱ-ㆎ㆒-㆟㈀-㈞㈠-㉇㉐-㉾㊀-㏿ꚜ-ꚝꝰꟲ-ꟴꟸ-ꟹꭜ-ꭟꭩ豈-嗀塚晴凞-羽蘒諸逸-都飯-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-זּטּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-﷼︐-︙︰-﹄﹇-﹒﹔-﹦﹨-﹫ﹰ-ﹲﹴﹶ-ﻼ！-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ￠-￦`);
  return NormalizeWithNFKC;
}

;// ./web/pdf_find_controller.js
function _classPrivateMethodInitSpec(e, a) { pdf_find_controller_checkPrivateRedeclaration(e, a), a.add(e); }
function pdf_find_controller_classPrivateFieldInitSpec(e, t, a) { pdf_find_controller_checkPrivateRedeclaration(e, t), t.set(e, a); }
function pdf_find_controller_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateGetter(s, r, a) { return a(pdf_find_controller_assertClassBrand(s, r)); }
function pdf_find_controller_classPrivateFieldGet(s, a) { return s.get(pdf_find_controller_assertClassBrand(s, a)); }
function pdf_find_controller_classPrivateFieldSet(s, a, r) { return s.set(pdf_find_controller_assertClassBrand(s, a), r), r; }
function pdf_find_controller_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


















const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
const FIND_TIMEOUT = 250;
const MATCH_SCROLL_OFFSET_TOP = -50;
const MATCH_SCROLL_OFFSET_LEFT = -400;
const CHARACTERS_TO_NORMALIZE = {
  "\u2010": "-",
  "\u2018": "'",
  "\u2019": "'",
  "\u201A": "'",
  "\u201B": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u201E": '"',
  "\u201F": '"',
  "\u00BC": "1/4",
  "\u00BD": "1/2",
  "\u00BE": "3/4"
};
const DIACRITICS_EXCEPTION = new Set([0x3099, 0x309a, 0x094d, 0x09cd, 0x0a4d, 0x0acd, 0x0b4d, 0x0bcd, 0x0c4d, 0x0ccd, 0x0d3b, 0x0d3c, 0x0d4d, 0x0dca, 0x0e3a, 0x0eba, 0x0f84, 0x1039, 0x103a, 0x1714, 0x1734, 0x17d2, 0x1a60, 0x1b44, 0x1baa, 0x1bab, 0x1bf2, 0x1bf3, 0x2d7f, 0xa806, 0xa82c, 0xa8c4, 0xa953, 0xa9c0, 0xaaf6, 0xabed, 0x0c56, 0x0f71, 0x0f72, 0x0f7a, 0x0f7b, 0x0f7c, 0x0f7d, 0x0f80, 0x0f74]);
let DIACRITICS_EXCEPTION_STR;
const DIACRITICS_REG_EXP = /\p{M}+/gu;
const SPECIAL_CHARS_REG_EXP = /([.*+?^${}()|[\]\\])|(\p{P})|(\s+)|(\p{M})|(\p{L})/gu;
const NOT_DIACRITIC_FROM_END_REG_EXP = /([^\p{M}])\p{M}*$/u;
const NOT_DIACRITIC_FROM_START_REG_EXP = /^\p{M}*([^\p{M}])/u;
const SYLLABLES_REG_EXP = /[\uAC00-\uD7AF\uFA6C\uFACF-\uFAD1\uFAD5-\uFAD7]+/g;
const SYLLABLES_LENGTHS = new Map();
const FIRST_CHAR_SYLLABLES_REG_EXP = "[\\u1100-\\u1112\\ud7a4-\\ud7af\\ud84a\\ud84c\\ud850\\ud854\\ud857\\ud85f]";
const NFKC_CHARS_TO_NORMALIZE = new Map();
let noSyllablesRegExp = null;
let withSyllablesRegExp = null;
function normalize(text) {
  const syllablePositions = [];
  let m;
  while ((m = SYLLABLES_REG_EXP.exec(text)) !== null) {
    let {
      index
    } = m;
    for (const char of m[0]) {
      let len = SYLLABLES_LENGTHS.get(char);
      if (!len) {
        len = char.normalize("NFD").length;
        SYLLABLES_LENGTHS.set(char, len);
      }
      syllablePositions.push([len, index++]);
    }
  }
  let normalizationRegex;
  if (syllablePositions.length === 0 && noSyllablesRegExp) {
    normalizationRegex = noSyllablesRegExp;
  } else if (syllablePositions.length > 0 && withSyllablesRegExp) {
    normalizationRegex = withSyllablesRegExp;
  } else {
    const replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
    const toNormalizeWithNFKC = getNormalizeWithNFKC();
    const CJK = "(?:\\p{Ideographic}|[\u3040-\u30FF])";
    const HKDiacritics = "(?:\u3099|\u309A)";
    const CompoundWord = "\\p{Ll}-\\n\\p{Lu}";
    const regexp = `([${replace}])|([${toNormalizeWithNFKC}])|(${HKDiacritics}\\n)|(\\p{M}+(?:-\\n)?)|(${CompoundWord})|(\\S-\\n)|(${CJK}\\n)|(\\n)`;
    if (syllablePositions.length === 0) {
      normalizationRegex = noSyllablesRegExp = new RegExp(regexp + "|(\\u0000)", "gum");
    } else {
      normalizationRegex = withSyllablesRegExp = new RegExp(regexp + `|(${FIRST_CHAR_SYLLABLES_REG_EXP})`, "gum");
    }
  }
  const rawDiacriticsPositions = [];
  while ((m = DIACRITICS_REG_EXP.exec(text)) !== null) {
    rawDiacriticsPositions.push([m[0].length, m.index]);
  }
  let normalized = text.normalize("NFD");
  const positions = [[0, 0]];
  let rawDiacriticsIndex = 0;
  let syllableIndex = 0;
  let shift = 0;
  let shiftOrigin = 0;
  let eol = 0;
  let hasDiacritics = false;
  normalized = normalized.replace(normalizationRegex, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, i) => {
    var _syllablePositions$sy;
    i -= shiftOrigin;
    if (p1) {
      const replacement = CHARACTERS_TO_NORMALIZE[p1];
      const jj = replacement.length;
      for (let j = 1; j < jj; j++) {
        positions.push([i - shift + j, shift - j]);
      }
      shift -= jj - 1;
      return replacement;
    }
    if (p2) {
      let replacement = NFKC_CHARS_TO_NORMALIZE.get(p2);
      if (!replacement) {
        replacement = p2.normalize("NFKC");
        NFKC_CHARS_TO_NORMALIZE.set(p2, replacement);
      }
      const jj = replacement.length;
      for (let j = 1; j < jj; j++) {
        positions.push([i - shift + j, shift - j]);
      }
      shift -= jj - 1;
      return replacement;
    }
    if (p3) {
      var _rawDiacriticsPositio;
      hasDiacritics = true;
      if (i + eol === ((_rawDiacriticsPositio = rawDiacriticsPositions[rawDiacriticsIndex]) === null || _rawDiacriticsPositio === void 0 ? void 0 : _rawDiacriticsPositio[1])) {
        ++rawDiacriticsIndex;
      } else {
        positions.push([i - 1 - shift + 1, shift - 1]);
        shift -= 1;
        shiftOrigin += 1;
      }
      positions.push([i - shift + 1, shift]);
      shiftOrigin += 1;
      eol += 1;
      return p3.charAt(0);
    }
    if (p4) {
      var _rawDiacriticsPositio2;
      const hasTrailingDashEOL = p4.endsWith("\n");
      const len = hasTrailingDashEOL ? p4.length - 2 : p4.length;
      hasDiacritics = true;
      let jj = len;
      if (i + eol === ((_rawDiacriticsPositio2 = rawDiacriticsPositions[rawDiacriticsIndex]) === null || _rawDiacriticsPositio2 === void 0 ? void 0 : _rawDiacriticsPositio2[1])) {
        jj -= rawDiacriticsPositions[rawDiacriticsIndex][0];
        ++rawDiacriticsIndex;
      }
      for (let j = 1; j <= jj; j++) {
        positions.push([i - 1 - shift + j, shift - j]);
      }
      shift -= jj;
      shiftOrigin += jj;
      if (hasTrailingDashEOL) {
        i += len - 1;
        positions.push([i - shift + 1, 1 + shift]);
        shift += 1;
        shiftOrigin += 1;
        eol += 1;
        return p4.slice(0, len);
      }
      return p4;
    }
    if (p5) {
      positions.push([i - shift + 3, 1 + shift]);
      shift += 1;
      shiftOrigin += 1;
      eol += 1;
      return p5.replace("\n", "");
    }
    if (p6) {
      const len = p6.length - 2;
      positions.push([i - shift + len, 1 + shift]);
      shift += 1;
      shiftOrigin += 1;
      eol += 1;
      return p6.slice(0, -2);
    }
    if (p7) {
      const len = p7.length - 1;
      positions.push([i - shift + len, shift]);
      shiftOrigin += 1;
      eol += 1;
      return p7.slice(0, -1);
    }
    if (p8) {
      positions.push([i - shift + 1, shift - 1]);
      shift -= 1;
      shiftOrigin += 1;
      eol += 1;
      return " ";
    }
    if (i + eol === ((_syllablePositions$sy = syllablePositions[syllableIndex]) === null || _syllablePositions$sy === void 0 ? void 0 : _syllablePositions$sy[1])) {
      const newCharLen = syllablePositions[syllableIndex][0] - 1;
      ++syllableIndex;
      for (let j = 1; j <= newCharLen; j++) {
        positions.push([i - (shift - j), shift - j]);
      }
      shift -= newCharLen;
      shiftOrigin += newCharLen;
    }
    return p9;
  });
  positions.push([normalized.length, shift]);
  return [normalized, positions, hasDiacritics];
}
function getOriginalIndex(diffs, pos, len) {
  if (!diffs) {
    return [pos, len];
  }
  const start = pos;
  const end = pos + len - 1;
  let i = binarySearchFirstItem(diffs, x => x[0] >= start);
  if (diffs[i][0] > start) {
    --i;
  }
  let j = binarySearchFirstItem(diffs, x => x[0] >= end, i);
  if (diffs[j][0] > end) {
    --j;
  }
  const oldStart = start + diffs[i][1];
  const oldEnd = end + diffs[j][1];
  const oldLen = oldEnd + 1 - oldStart;
  return [oldStart, oldLen];
}
var _state = /*#__PURE__*/new WeakMap();
var _updateMatchesCountOnProgress = /*#__PURE__*/new WeakMap();
var _visitedPagesCount = /*#__PURE__*/new WeakMap();
var _PDFFindController_brand = /*#__PURE__*/new WeakSet();
class PDFFindController {
  constructor({
    linkService: _linkService,
    eventBus,
    updateMatchesCountOnProgress = true
  }) {
    _classPrivateMethodInitSpec(this, _PDFFindController_brand);
    pdf_find_controller_classPrivateFieldInitSpec(this, _state, null);
    pdf_find_controller_classPrivateFieldInitSpec(this, _updateMatchesCountOnProgress, true);
    pdf_find_controller_classPrivateFieldInitSpec(this, _visitedPagesCount, 0);
    this._linkService = _linkService;
    this._eventBus = eventBus;
    pdf_find_controller_classPrivateFieldSet(_updateMatchesCountOnProgress, this, updateMatchesCountOnProgress);
    this.onIsPageVisible = null;
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _reset).call(this);
    eventBus._on("find", pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _onFind).bind(this));
    eventBus._on("findbarclose", pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _onFindBarClose).bind(this));
  }
  get highlightMatches() {
    return this._highlightMatches;
  }
  get pageMatches() {
    return this._pageMatches;
  }
  get pageMatchesLength() {
    return this._pageMatchesLength;
  }
  get selected() {
    return this._selected;
  }
  get state() {
    return pdf_find_controller_classPrivateFieldGet(_state, this);
  }
  setDocument(pdfDocument) {
    if (this._pdfDocument) {
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _reset).call(this);
    }
    if (!pdfDocument) {
      return;
    }
    this._pdfDocument = pdfDocument;
    this._firstPageCapability.resolve();
  }
  scrollMatchIntoView({
    element = null,
    selectedLeft = 0,
    pageIndex = -1,
    matchIndex = -1
  }) {
    if (!this._scrollMatches || !element) {
      return;
    } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
      return;
    } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
      return;
    }
    this._scrollMatches = false;
    const spot = {
      top: MATCH_SCROLL_OFFSET_TOP,
      left: selectedLeft + MATCH_SCROLL_OFFSET_LEFT
    };
    scrollIntoView(element, spot, true);
  }
  match(query, pageContent, pageIndex) {
    const hasDiacritics = this._hasDiacritics[pageIndex];
    let isUnicode = false;
    if (typeof query === "string") {
      [isUnicode, query] = pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _convertToRegExpString).call(this, query, hasDiacritics);
    } else {
      query = query.sort().reverse().map(q => {
        const [isUnicodePart, queryPart] = pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _convertToRegExpString).call(this, q, hasDiacritics);
        isUnicode || (isUnicode = isUnicodePart);
        return `(${queryPart})`;
      }).join("|");
    }
    if (!query) {
      return undefined;
    }
    const {
      caseSensitive,
      entireWord
    } = pdf_find_controller_classPrivateFieldGet(_state, this);
    const flags = `g${isUnicode ? "u" : ""}${caseSensitive ? "" : "i"}`;
    query = new RegExp(query, flags);
    const matches = [];
    let match;
    while ((match = query.exec(pageContent)) !== null) {
      if (entireWord && !pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _isEntireWord).call(this, pageContent, match.index, match[0].length)) {
        continue;
      }
      matches.push({
        index: match.index,
        length: match[0].length
      });
    }
    return matches;
  }
}
function _onFind(state) {
  if (!state) {
    return;
  }
  const pdfDocument = this._pdfDocument;
  const {
    type
  } = state;
  if (pdf_find_controller_classPrivateFieldGet(_state, this) === null || pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _shouldDirtyMatch).call(this, state)) {
    this._dirtyMatch = true;
  }
  pdf_find_controller_classPrivateFieldSet(_state, this, state);
  if (type !== "highlightallchange") {
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateUIState).call(this, FindState.PENDING);
  }
  this._firstPageCapability.promise.then(() => {
    if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument) {
      return;
    }
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _extractText).call(this);
    const findbarClosed = !this._highlightMatches;
    const pendingTimeout = !!this._findTimeout;
    if (this._findTimeout) {
      clearTimeout(this._findTimeout);
      this._findTimeout = null;
    }
    if (!type) {
      this._findTimeout = setTimeout(() => {
        pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _nextMatch).call(this);
        this._findTimeout = null;
      }, FIND_TIMEOUT);
    } else if (this._dirtyMatch) {
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _nextMatch).call(this);
    } else if (type === "again") {
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _nextMatch).call(this);
      if (findbarClosed && pdf_find_controller_classPrivateFieldGet(_state, this).highlightAll) {
        pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateAllPages).call(this);
      }
    } else if (type === "highlightallchange") {
      if (pendingTimeout) {
        pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _nextMatch).call(this);
      } else {
        this._highlightMatches = true;
      }
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateAllPages).call(this);
    } else {
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _nextMatch).call(this);
    }
  });
}
function _reset() {
  this._highlightMatches = false;
  this._scrollMatches = false;
  this._pdfDocument = null;
  this._pageMatches = [];
  this._pageMatchesLength = [];
  pdf_find_controller_classPrivateFieldSet(_visitedPagesCount, this, 0);
  pdf_find_controller_classPrivateFieldSet(_state, this, null);
  this._selected = {
    pageIdx: -1,
    matchIdx: -1
  };
  this._offset = {
    pageIdx: null,
    matchIdx: null,
    wrapped: false
  };
  this._extractTextPromises = [];
  this._pageContents = [];
  this._pageDiffs = [];
  this._hasDiacritics = [];
  this._matchesCountTotal = 0;
  this._pagesToSearch = null;
  this._pendingFindMatches = new Set();
  this._resumePageIdx = null;
  this._dirtyMatch = false;
  clearTimeout(this._findTimeout);
  this._findTimeout = null;
  this._firstPageCapability = Promise.withResolvers();
}
function _get_query(_this) {
  const {
    query
  } = pdf_find_controller_classPrivateFieldGet(_state, _this);
  if (typeof query === "string") {
    if (query !== _this._rawQuery) {
      _this._rawQuery = query;
      [_this._normalizedQuery] = normalize(query);
    }
    return _this._normalizedQuery;
  }
  return (query || []).filter(q => !!q).map(q => normalize(q)[0]);
}
function _shouldDirtyMatch(state) {
  var _this$onIsPageVisible, _this$onIsPageVisible2;
  const newQuery = state.query,
    prevQuery = pdf_find_controller_classPrivateFieldGet(_state, this).query;
  const newType = typeof newQuery,
    prevType = typeof prevQuery;
  if (newType !== prevType) {
    return true;
  }
  if (newType === "string") {
    if (newQuery !== prevQuery) {
      return true;
    }
  } else if (JSON.stringify(newQuery) !== JSON.stringify(prevQuery)) {
    return true;
  }
  switch (state.type) {
    case "again":
      const pageNumber = this._selected.pageIdx + 1;
      const linkService = this._linkService;
      return pageNumber >= 1 && pageNumber <= linkService.pagesCount && pageNumber !== linkService.page && !((_this$onIsPageVisible = (_this$onIsPageVisible2 = this.onIsPageVisible) === null || _this$onIsPageVisible2 === void 0 ? void 0 : _this$onIsPageVisible2.call(this, pageNumber)) !== null && _this$onIsPageVisible !== void 0 ? _this$onIsPageVisible : true);
    case "highlightallchange":
      return false;
  }
  return true;
}
function _isEntireWord(content, startIdx, length) {
  let match = content.slice(0, startIdx).match(NOT_DIACRITIC_FROM_END_REG_EXP);
  if (match) {
    const first = content.charCodeAt(startIdx);
    const limit = match[1].charCodeAt(0);
    if (getCharacterType(first) === getCharacterType(limit)) {
      return false;
    }
  }
  match = content.slice(startIdx + length).match(NOT_DIACRITIC_FROM_START_REG_EXP);
  if (match) {
    const last = content.charCodeAt(startIdx + length - 1);
    const limit = match[1].charCodeAt(0);
    if (getCharacterType(last) === getCharacterType(limit)) {
      return false;
    }
  }
  return true;
}
function _convertToRegExpString(query, hasDiacritics) {
  const {
    matchDiacritics
  } = pdf_find_controller_classPrivateFieldGet(_state, this);
  let isUnicode = false;
  query = query.replaceAll(SPECIAL_CHARS_REG_EXP, (match, p1, p2, p3, p4, p5) => {
    if (p1) {
      return `[ ]*\\${p1}[ ]*`;
    }
    if (p2) {
      return `[ ]*${p2}[ ]*`;
    }
    if (p3) {
      return "[ ]+";
    }
    if (matchDiacritics) {
      return p4 || p5;
    }
    if (p4) {
      return DIACRITICS_EXCEPTION.has(p4.charCodeAt(0)) ? p4 : "";
    }
    if (hasDiacritics) {
      isUnicode = true;
      return `${p5}\\p{M}*`;
    }
    return p5;
  });
  const trailingSpaces = "[ ]*";
  if (query.endsWith(trailingSpaces)) {
    query = query.slice(0, query.length - trailingSpaces.length);
  }
  if (matchDiacritics) {
    if (hasDiacritics) {
      DIACRITICS_EXCEPTION_STR || (DIACRITICS_EXCEPTION_STR = String.fromCharCode(...DIACRITICS_EXCEPTION));
      isUnicode = true;
      query = `${query}(?=[${DIACRITICS_EXCEPTION_STR}]|[^\\p{M}]|$)`;
    }
  }
  return [isUnicode, query];
}
function _calculateMatch(pageIndex) {
  var _this$visitedPagesCou;
  const query = _classPrivateGetter(_PDFFindController_brand, this, _get_query);
  if (query.length === 0) {
    return;
  }
  const pageContent = this._pageContents[pageIndex];
  const matcherResult = this.match(query, pageContent, pageIndex);
  const matches = this._pageMatches[pageIndex] = [];
  const matchesLength = this._pageMatchesLength[pageIndex] = [];
  const diffs = this._pageDiffs[pageIndex];
  matcherResult === null || matcherResult === void 0 || matcherResult.forEach(({
    index,
    length
  }) => {
    const [matchPos, matchLen] = getOriginalIndex(diffs, index, length);
    if (matchLen) {
      matches.push(matchPos);
      matchesLength.push(matchLen);
    }
  });
  if (pdf_find_controller_classPrivateFieldGet(_state, this).highlightAll) {
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updatePage).call(this, pageIndex);
  }
  if (this._resumePageIdx === pageIndex) {
    this._resumePageIdx = null;
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _nextPageMatch).call(this);
  }
  const pageMatchesCount = matches.length;
  this._matchesCountTotal += pageMatchesCount;
  if (pdf_find_controller_classPrivateFieldGet(_updateMatchesCountOnProgress, this)) {
    if (pageMatchesCount > 0) {
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateUIResultsCount).call(this);
    }
  } else if (pdf_find_controller_classPrivateFieldSet(_visitedPagesCount, this, (_this$visitedPagesCou = pdf_find_controller_classPrivateFieldGet(_visitedPagesCount, this), ++_this$visitedPagesCou)) === this._linkService.pagesCount) {
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateUIResultsCount).call(this);
  }
}
function _extractText() {
  if (this._extractTextPromises.length > 0) {
    return;
  }
  let deferred = Promise.resolve();
  const textOptions = {
    disableNormalization: true
  };
  for (let i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
    const {
      promise,
      resolve
    } = Promise.withResolvers();
    this._extractTextPromises[i] = promise;
    deferred = deferred.then(() => {
      return this._pdfDocument.getPage(i + 1).then(pdfPage => pdfPage.getTextContent(textOptions)).then(textContent => {
        const strBuf = [];
        for (const textItem of textContent.items) {
          strBuf.push(textItem.str);
          if (textItem.hasEOL) {
            strBuf.push("\n");
          }
        }
        [this._pageContents[i], this._pageDiffs[i], this._hasDiacritics[i]] = normalize(strBuf.join(""));
        resolve();
      }, reason => {
        console.error(`Unable to get text content for page ${i + 1}`, reason);
        this._pageContents[i] = "";
        this._pageDiffs[i] = null;
        this._hasDiacritics[i] = false;
        resolve();
      });
    });
  }
}
function _updatePage(index) {
  if (this._scrollMatches && this._selected.pageIdx === index) {
    this._linkService.page = index + 1;
  }
  this._eventBus.dispatch("updatetextlayermatches", {
    source: this,
    pageIndex: index
  });
}
function _updateAllPages() {
  this._eventBus.dispatch("updatetextlayermatches", {
    source: this,
    pageIndex: -1
  });
}
function _nextMatch() {
  const previous = pdf_find_controller_classPrivateFieldGet(_state, this).findPrevious;
  const currentPageIndex = this._linkService.page - 1;
  const numPages = this._linkService.pagesCount;
  this._highlightMatches = true;
  if (this._dirtyMatch) {
    this._dirtyMatch = false;
    this._selected.pageIdx = this._selected.matchIdx = -1;
    this._offset.pageIdx = currentPageIndex;
    this._offset.matchIdx = null;
    this._offset.wrapped = false;
    this._resumePageIdx = null;
    this._pageMatches.length = 0;
    this._pageMatchesLength.length = 0;
    pdf_find_controller_classPrivateFieldSet(_visitedPagesCount, this, 0);
    this._matchesCountTotal = 0;
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateAllPages).call(this);
    for (let i = 0; i < numPages; i++) {
      if (this._pendingFindMatches.has(i)) {
        continue;
      }
      this._pendingFindMatches.add(i);
      this._extractTextPromises[i].then(() => {
        this._pendingFindMatches.delete(i);
        pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _calculateMatch).call(this, i);
      });
    }
  }
  const query = _classPrivateGetter(_PDFFindController_brand, this, _get_query);
  if (query.length === 0) {
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateUIState).call(this, FindState.FOUND);
    return;
  }
  if (this._resumePageIdx) {
    return;
  }
  const offset = this._offset;
  this._pagesToSearch = numPages;
  if (offset.matchIdx !== null) {
    const numPageMatches = this._pageMatches[offset.pageIdx].length;
    if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
      offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateMatch).call(this, true);
      return;
    }
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _advanceOffsetPage).call(this, previous);
  }
  pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _nextPageMatch).call(this);
}
function _matchesReady(matches) {
  const offset = this._offset;
  const numMatches = matches.length;
  const previous = pdf_find_controller_classPrivateFieldGet(_state, this).findPrevious;
  if (numMatches) {
    offset.matchIdx = previous ? numMatches - 1 : 0;
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateMatch).call(this, true);
    return true;
  }
  pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _advanceOffsetPage).call(this, previous);
  if (offset.wrapped) {
    offset.matchIdx = null;
    if (this._pagesToSearch < 0) {
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateMatch).call(this, false);
      return true;
    }
  }
  return false;
}
function _nextPageMatch() {
  if (this._resumePageIdx !== null) {
    console.error("There can only be one pending page.");
  }
  let matches = null;
  do {
    const pageIdx = this._offset.pageIdx;
    matches = this._pageMatches[pageIdx];
    if (!matches) {
      this._resumePageIdx = pageIdx;
      break;
    }
  } while (!pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _matchesReady).call(this, matches));
}
function _advanceOffsetPage(previous) {
  const offset = this._offset;
  const numPages = this._linkService.pagesCount;
  offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
  offset.matchIdx = null;
  this._pagesToSearch--;
  if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
    offset.pageIdx = previous ? numPages - 1 : 0;
    offset.wrapped = true;
  }
}
function _updateMatch(found = false) {
  let state = FindState.NOT_FOUND;
  const wrapped = this._offset.wrapped;
  this._offset.wrapped = false;
  if (found) {
    const previousPage = this._selected.pageIdx;
    this._selected.pageIdx = this._offset.pageIdx;
    this._selected.matchIdx = this._offset.matchIdx;
    state = wrapped ? FindState.WRAPPED : FindState.FOUND;
    if (previousPage !== -1 && previousPage !== this._selected.pageIdx) {
      pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updatePage).call(this, previousPage);
    }
  }
  pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateUIState).call(this, state, pdf_find_controller_classPrivateFieldGet(_state, this).findPrevious);
  if (this._selected.pageIdx !== -1) {
    this._scrollMatches = true;
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updatePage).call(this, this._selected.pageIdx);
  }
}
function _onFindBarClose(evt) {
  const pdfDocument = this._pdfDocument;
  this._firstPageCapability.promise.then(() => {
    if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument) {
      return;
    }
    if (this._findTimeout) {
      clearTimeout(this._findTimeout);
      this._findTimeout = null;
    }
    if (this._resumePageIdx) {
      this._resumePageIdx = null;
      this._dirtyMatch = true;
    }
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateUIState).call(this, FindState.FOUND);
    this._highlightMatches = false;
    pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _updateAllPages).call(this);
  });
}
function _requestMatchesCount() {
  const {
    pageIdx,
    matchIdx
  } = this._selected;
  let current = 0,
    total = this._matchesCountTotal;
  if (matchIdx !== -1) {
    for (let i = 0; i < pageIdx; i++) {
      var _this$_pageMatches$i;
      current += ((_this$_pageMatches$i = this._pageMatches[i]) === null || _this$_pageMatches$i === void 0 ? void 0 : _this$_pageMatches$i.length) || 0;
    }
    current += matchIdx + 1;
  }
  if (current < 1 || current > total) {
    current = total = 0;
  }
  return {
    current,
    total
  };
}
function _updateUIResultsCount() {
  this._eventBus.dispatch("updatefindmatchescount", {
    source: this,
    matchesCount: pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _requestMatchesCount).call(this)
  });
}
function _updateUIState(state, previous = false) {
  var _classPrivateFieldGet2, _classPrivateFieldGet3, _classPrivateFieldGet4, _classPrivateFieldGet5;
  if (!pdf_find_controller_classPrivateFieldGet(_updateMatchesCountOnProgress, this) && (pdf_find_controller_classPrivateFieldGet(_visitedPagesCount, this) !== this._linkService.pagesCount || state === FindState.PENDING)) {
    return;
  }
  this._eventBus.dispatch("updatefindcontrolstate", {
    source: this,
    state,
    previous,
    entireWord: (_classPrivateFieldGet2 = (_classPrivateFieldGet3 = pdf_find_controller_classPrivateFieldGet(_state, this)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.entireWord) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : null,
    matchesCount: pdf_find_controller_assertClassBrand(_PDFFindController_brand, this, _requestMatchesCount).call(this),
    rawQuery: (_classPrivateFieldGet4 = (_classPrivateFieldGet5 = pdf_find_controller_classPrivateFieldGet(_state, this)) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.query) !== null && _classPrivateFieldGet4 !== void 0 ? _classPrivateFieldGet4 : null
  });
}

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.json.parse.js
var esnext_json_parse = __webpack_require__(8335);
;// ./web/pdf_link_service.js





function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

const DEFAULT_LINK_REL = "noopener noreferrer nofollow";
const LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
class PDFLinkService {
  constructor({
    eventBus,
    externalLinkTarget = null,
    externalLinkRel = null,
    ignoreDestinationZoom = false
  } = {}) {
    _defineProperty(this, "externalLinkEnabled", true);
    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
  }
  setDocument(pdfDocument, baseUrl = null) {
    this.baseUrl = baseUrl;
    this.pdfDocument = pdfDocument;
  }
  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }
  setHistory(pdfHistory) {
    this.pdfHistory = pdfHistory;
  }
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  }
  get page() {
    return this.pdfDocument ? this.pdfViewer.currentPageNumber : 1;
  }
  set page(value) {
    if (this.pdfDocument) {
      this.pdfViewer.currentPageNumber = value;
    }
  }
  get rotation() {
    return this.pdfDocument ? this.pdfViewer.pagesRotation : 0;
  }
  set rotation(value) {
    if (this.pdfDocument) {
      this.pdfViewer.pagesRotation = value;
    }
  }
  get isInPresentationMode() {
    return this.pdfDocument ? this.pdfViewer.isInPresentationMode : false;
  }
  async goToDestination(dest) {
    if (!this.pdfDocument) {
      return;
    }
    let namedDest, explicitDest, pageNumber;
    if (typeof dest === "string") {
      namedDest = dest;
      explicitDest = await this.pdfDocument.getDestination(dest);
    } else {
      namedDest = null;
      explicitDest = await dest;
    }
    if (!Array.isArray(explicitDest)) {
      console.error(`goToDestination: "${explicitDest}" is not a valid destination array, for dest="${dest}".`);
      return;
    }
    const [destRef] = explicitDest;
    if (destRef && typeof destRef === "object") {
      pageNumber = this.pdfDocument.cachedPageNumber(destRef);
      if (!pageNumber) {
        try {
          pageNumber = (await this.pdfDocument.getPageIndex(destRef)) + 1;
        } catch {
          console.error(`goToDestination: "${destRef}" is not a valid page reference, for dest="${dest}".`);
          return;
        }
      }
    } else if (Number.isInteger(destRef)) {
      pageNumber = destRef + 1;
    }
    if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
      console.error(`goToDestination: "${pageNumber}" is not a valid page number, for dest="${dest}".`);
      return;
    }
    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.push({
        namedDest,
        explicitDest,
        pageNumber
      });
    }
    this.pdfViewer.scrollPageIntoView({
      pageNumber,
      destArray: explicitDest,
      ignoreDestinationZoom: this._ignoreDestinationZoom
    });
  }
  goToPage(val) {
    if (!this.pdfDocument) {
      return;
    }
    const pageNumber = typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val) || val | 0;
    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
      console.error(`PDFLinkService.goToPage: "${val}" is not a valid page.`);
      return;
    }
    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.pushPage(pageNumber);
    }
    this.pdfViewer.scrollPageIntoView({
      pageNumber
    });
  }
  addLinkAttributes(link, url, newWindow = false) {
    if (!url || typeof url !== "string") {
      throw new Error('A valid "url" parameter must provided.');
    }
    const target = newWindow ? LinkTarget.BLANK : this.externalLinkTarget,
      rel = this.externalLinkRel;
    if (this.externalLinkEnabled) {
      link.href = link.title = url;
    } else {
      link.href = "";
      link.title = `Disabled: ${url}`;
      link.onclick = () => false;
    }
    let targetStr = "";
    switch (target) {
      case LinkTarget.NONE:
        break;
      case LinkTarget.SELF:
        targetStr = "_self";
        break;
      case LinkTarget.BLANK:
        targetStr = "_blank";
        break;
      case LinkTarget.PARENT:
        targetStr = "_parent";
        break;
      case LinkTarget.TOP:
        targetStr = "_top";
        break;
    }
    link.target = targetStr;
    link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
  }
  getDestinationHash(dest) {
    if (typeof dest === "string") {
      if (dest.length > 0) {
        return this.getAnchorUrl("#" + escape(dest));
      }
    } else if (Array.isArray(dest)) {
      const str = JSON.stringify(dest);
      if (str.length > 0) {
        return this.getAnchorUrl("#" + escape(str));
      }
    }
    return this.getAnchorUrl("");
  }
  getAnchorUrl(anchor) {
    return this.baseUrl ? this.baseUrl + anchor : anchor;
  }
  setHash(hash) {
    if (!this.pdfDocument) {
      return;
    }
    let pageNumber, dest;
    if (hash.includes("=")) {
      const params = parseQueryString(hash);
      if (params.has("search")) {
        const query = params.get("search").replaceAll('"', ""),
          phrase = params.get("phrase") === "true";
        this.eventBus.dispatch("findfromurlhash", {
          source: this,
          query: phrase ? query : query.match(/\S+/g)
        });
      }
      if (params.has("page")) {
        pageNumber = params.get("page") | 0 || 1;
      }
      if (params.has("zoom")) {
        const zoomArgs = params.get("zoom").split(",");
        const zoomArg = zoomArgs[0];
        const zoomArgNumber = parseFloat(zoomArg);
        if (!zoomArg.includes("Fit")) {
          dest = [null, {
            name: "XYZ"
          }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
        } else if (zoomArg === "Fit" || zoomArg === "FitB") {
          dest = [null, {
            name: zoomArg
          }];
        } else if (zoomArg === "FitH" || zoomArg === "FitBH" || zoomArg === "FitV" || zoomArg === "FitBV") {
          dest = [null, {
            name: zoomArg
          }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
        } else if (zoomArg === "FitR") {
          if (zoomArgs.length !== 5) {
            console.error('PDFLinkService.setHash: Not enough parameters for "FitR".');
          } else {
            dest = [null, {
              name: zoomArg
            }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
          }
        } else {
          console.error(`PDFLinkService.setHash: "${zoomArg}" is not a valid zoom value.`);
        }
      }
      if (dest) {
        this.pdfViewer.scrollPageIntoView({
          pageNumber: pageNumber || this.page,
          destArray: dest,
          allowNegativeOffset: true
        });
      } else if (pageNumber) {
        this.page = pageNumber;
      }
      if (params.has("pagemode")) {
        this.eventBus.dispatch("pagemode", {
          source: this,
          mode: params.get("pagemode")
        });
      }
      if (params.has("nameddest")) {
        this.goToDestination(params.get("nameddest"));
      }
      return;
    }
    dest = unescape(hash);
    try {
      dest = JSON.parse(dest);
      if (!Array.isArray(dest)) {
        dest = dest.toString();
      }
    } catch {}
    if (typeof dest === "string" || _isValidExplicitDest.call(PDFLinkService, dest)) {
      this.goToDestination(dest);
      return;
    }
    console.error(`PDFLinkService.setHash: "${unescape(hash)}" is not a valid destination.`);
  }
  executeNamedAction(action) {
    var _this$pdfHistory, _this$pdfHistory2;
    if (!this.pdfDocument) {
      return;
    }
    switch (action) {
      case "GoBack":
        (_this$pdfHistory = this.pdfHistory) === null || _this$pdfHistory === void 0 || _this$pdfHistory.back();
        break;
      case "GoForward":
        (_this$pdfHistory2 = this.pdfHistory) === null || _this$pdfHistory2 === void 0 || _this$pdfHistory2.forward();
        break;
      case "NextPage":
        this.pdfViewer.nextPage();
        break;
      case "PrevPage":
        this.pdfViewer.previousPage();
        break;
      case "LastPage":
        this.page = this.pagesCount;
        break;
      case "FirstPage":
        this.page = 1;
        break;
      default:
        break;
    }
    this.eventBus.dispatch("namedaction", {
      source: this,
      action
    });
  }
  async executeSetOCGState(action) {
    if (!this.pdfDocument) {
      return;
    }
    const pdfDocument = this.pdfDocument,
      optionalContentConfig = await this.pdfViewer.optionalContentConfigPromise;
    if (pdfDocument !== this.pdfDocument) {
      return;
    }
    optionalContentConfig.setOCGState(action);
    this.pdfViewer.optionalContentConfigPromise = Promise.resolve(optionalContentConfig);
  }
}
function _isValidExplicitDest(dest) {
  if (!Array.isArray(dest) || dest.length < 2) {
    return false;
  }
  const [page, zoom, ...args] = dest;
  if (!(typeof page === "object" && Number.isInteger(page === null || page === void 0 ? void 0 : page.num) && Number.isInteger(page === null || page === void 0 ? void 0 : page.gen)) && !Number.isInteger(page)) {
    return false;
  }
  if (!(typeof zoom === "object" && typeof (zoom === null || zoom === void 0 ? void 0 : zoom.name) === "string")) {
    return false;
  }
  const argsLen = args.length;
  let allowNull = true;
  switch (zoom.name) {
    case "XYZ":
      if (argsLen < 2 || argsLen > 3) {
        return false;
      }
      break;
    case "Fit":
    case "FitB":
      return argsLen === 0;
    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (argsLen > 1) {
        return false;
      }
      break;
    case "FitR":
      if (argsLen !== 4) {
        return false;
      }
      allowNull = false;
      break;
    default:
      return false;
  }
  for (const arg of args) {
    if (!(typeof arg === "number" || allowNull && arg === null)) {
      return false;
    }
  }
  return true;
}
class SimpleLinkService extends PDFLinkService {
  setDocument(pdfDocument, baseUrl = null) {}
}

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.global-this.js
var es_global_this = __webpack_require__(5081);
;// ./web/pdfjs.js

const {
  AbortException,
  AnnotationEditorLayer,
  AnnotationEditorParamsType,
  AnnotationEditorType,
  AnnotationEditorUIManager,
  AnnotationLayer,
  AnnotationMode,
  build,
  ColorPicker,
  createValidAbsoluteUrl,
  DOMSVGFactory,
  DrawLayer,
  FeatureTest,
  fetchData,
  getDocument,
  getFilenameFromUrl,
  getPdfFilenameFromUrl,
  getXfaPageViewport,
  GlobalWorkerOptions,
  ImageKind,
  InvalidPDFException,
  isDataScheme,
  isPdfFile,
  MissingPDFException,
  noContextMenu,
  normalizeUnicode,
  OPS,
  OutputScale,
  PasswordResponses,
  PDFDataRangeTransport,
  PDFDateString,
  PDFWorker,
  PermissionFlag,
  PixelsPerInch,
  RenderingCancelledException,
  setLayerDimensions,
  shadow,
  TextLayer,
  UnexpectedResponseException,
  Util,
  VerbosityLevel,
  version,
  XfaLayer
} = globalThis.pdfjsLib;

;// ./web/xfa_layer_builder.js

class XfaLayerBuilder {
  constructor({
    pdfPage,
    annotationStorage = null,
    linkService,
    xfaHtml = null
  }) {
    this.pdfPage = pdfPage;
    this.annotationStorage = annotationStorage;
    this.linkService = linkService;
    this.xfaHtml = xfaHtml;
    this.div = null;
    this._cancelled = false;
  }
  async render(viewport, intent = "display") {
    if (intent === "print") {
      const parameters = {
        viewport: viewport.clone({
          dontFlip: true
        }),
        div: this.div,
        xfaHtml: this.xfaHtml,
        annotationStorage: this.annotationStorage,
        linkService: this.linkService,
        intent
      };
      this.div = document.createElement("div");
      parameters.div = this.div;
      return XfaLayer.render(parameters);
    }
    const xfaHtml = await this.pdfPage.getXfa();
    if (this._cancelled || !xfaHtml) {
      return {
        textDivs: []
      };
    }
    const parameters = {
      viewport: viewport.clone({
        dontFlip: true
      }),
      div: this.div,
      xfaHtml,
      annotationStorage: this.annotationStorage,
      linkService: this.linkService,
      intent
    };
    if (this.div) {
      return XfaLayer.update(parameters);
    }
    this.div = document.createElement("div");
    parameters.div = this.div;
    return XfaLayer.render(parameters);
  }
  cancel() {
    this._cancelled = true;
  }
  hide() {
    if (!this.div) {
      return;
    }
    this.div.hidden = true;
  }
}

;// ./web/print_utils.js



function getXfaHtmlForPrinting(printContainer, pdfDocument) {
  const xfaHtml = pdfDocument.allXfaHtml;
  const linkService = new SimpleLinkService();
  const scale = Math.round(PixelsPerInch.PDF_TO_CSS_UNITS * 100) / 100;
  for (const xfaPage of xfaHtml.children) {
    const page = document.createElement("div");
    page.className = "xfaPrintedPage";
    printContainer.append(page);
    const builder = new XfaLayerBuilder({
      pdfPage: null,
      annotationStorage: pdfDocument.annotationStorage,
      linkService,
      xfaHtml: xfaPage
    });
    const viewport = getXfaPageViewport(xfaPage, {
      scale
    });
    builder.render(viewport, "print");
    page.append(builder.div);
  }
}

;// ./web/annotation_layer_builder.js

function annotation_layer_builder_classPrivateMethodInitSpec(e, a) { annotation_layer_builder_checkPrivateRedeclaration(e, a), a.add(e); }
function annotation_layer_builder_classPrivateFieldInitSpec(e, t, a) { annotation_layer_builder_checkPrivateRedeclaration(e, t), t.set(e, a); }
function annotation_layer_builder_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function annotation_layer_builder_classPrivateFieldGet(s, a) { return s.get(annotation_layer_builder_assertClassBrand(s, a)); }
function annotation_layer_builder_classPrivateFieldSet(s, a, r) { return s.set(annotation_layer_builder_assertClassBrand(s, a), r), r; }
function annotation_layer_builder_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


var _onAppend = /*#__PURE__*/new WeakMap();
var _eventAbortController = /*#__PURE__*/new WeakMap();
var _AnnotationLayerBuilder_brand = /*#__PURE__*/new WeakSet();
class AnnotationLayerBuilder {
  constructor({
    pdfPage,
    linkService,
    downloadManager,
    annotationStorage = null,
    imageResourcesPath = "",
    renderForms = true,
    enableScripting = false,
    hasJSActionsPromise = null,
    fieldObjectsPromise = null,
    annotationCanvasMap = null,
    accessibilityManager = null,
    annotationEditorUIManager = null,
    onAppend = null
  }) {
    annotation_layer_builder_classPrivateMethodInitSpec(this, _AnnotationLayerBuilder_brand);
    annotation_layer_builder_classPrivateFieldInitSpec(this, _onAppend, null);
    annotation_layer_builder_classPrivateFieldInitSpec(this, _eventAbortController, null);
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderForms = renderForms;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise || Promise.resolve(false);
    this._fieldObjectsPromise = fieldObjectsPromise || Promise.resolve(null);
    this._annotationCanvasMap = annotationCanvasMap;
    this._accessibilityManager = accessibilityManager;
    this._annotationEditorUIManager = annotationEditorUIManager;
    annotation_layer_builder_classPrivateFieldSet(_onAppend, this, onAppend);
    this.annotationLayer = null;
    this.div = null;
    this._cancelled = false;
    this._eventBus = linkService.eventBus;
  }
  async render(viewport, options, intent = "display") {
    var _classPrivateFieldGet2;
    if (this.div) {
      if (this._cancelled || !this.annotationLayer) {
        return;
      }
      this.annotationLayer.update({
        viewport: viewport.clone({
          dontFlip: true
        })
      });
      return;
    }
    const [annotations, hasJSActions, fieldObjects] = await Promise.all([this.pdfPage.getAnnotations({
      intent
    }), this._hasJSActionsPromise, this._fieldObjectsPromise]);
    if (this._cancelled) {
      return;
    }
    const div = this.div = document.createElement("div");
    div.className = "annotationLayer";
    (_classPrivateFieldGet2 = annotation_layer_builder_classPrivateFieldGet(_onAppend, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.call(this, div);
    if (annotations.length === 0) {
      this.hide();
      return;
    }
    this.annotationLayer = new AnnotationLayer({
      div,
      accessibilityManager: this._accessibilityManager,
      annotationCanvasMap: this._annotationCanvasMap,
      annotationEditorUIManager: this._annotationEditorUIManager,
      page: this.pdfPage,
      viewport: viewport.clone({
        dontFlip: true
      }),
      structTreeLayer: (options === null || options === void 0 ? void 0 : options.structTreeLayer) || null
    });
    await this.annotationLayer.render({
      annotations,
      imageResourcesPath: this.imageResourcesPath,
      renderForms: this.renderForms,
      linkService: this.linkService,
      downloadManager: this.downloadManager,
      annotationStorage: this.annotationStorage,
      enableScripting: this.enableScripting,
      hasJSActions,
      fieldObjects
    });
    if (this.linkService.isInPresentationMode) {
      annotation_layer_builder_assertClassBrand(_AnnotationLayerBuilder_brand, this, _updatePresentationModeState).call(this, PresentationModeState.FULLSCREEN);
    }
    if (!annotation_layer_builder_classPrivateFieldGet(_eventAbortController, this)) {
      var _this$_eventBus;
      annotation_layer_builder_classPrivateFieldSet(_eventAbortController, this, new AbortController());
      (_this$_eventBus = this._eventBus) === null || _this$_eventBus === void 0 || _this$_eventBus._on("presentationmodechanged", evt => {
        annotation_layer_builder_assertClassBrand(_AnnotationLayerBuilder_brand, this, _updatePresentationModeState).call(this, evt.state);
      }, {
        signal: annotation_layer_builder_classPrivateFieldGet(_eventAbortController, this).signal
      });
    }
  }
  cancel() {
    var _classPrivateFieldGet3;
    this._cancelled = true;
    (_classPrivateFieldGet3 = annotation_layer_builder_classPrivateFieldGet(_eventAbortController, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.abort();
    annotation_layer_builder_classPrivateFieldSet(_eventAbortController, this, null);
  }
  hide() {
    if (!this.div) {
      return;
    }
    this.div.hidden = true;
  }
  hasEditableAnnotations() {
    var _this$annotationLayer;
    return !!((_this$annotationLayer = this.annotationLayer) !== null && _this$annotationLayer !== void 0 && _this$annotationLayer.hasEditableAnnotations());
  }
}
function _updatePresentationModeState(state) {
  if (!this.div) {
    return;
  }
  let disableFormElements = false;
  switch (state) {
    case PresentationModeState.FULLSCREEN:
      disableFormElements = true;
      break;
    case PresentationModeState.NORMAL:
      break;
    default:
      return;
  }
  for (const section of this.div.childNodes) {
    if (section.hasAttribute("data-internal-link")) {
      continue;
    }
    section.inert = disableFormElements;
  }
}

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.to-json.js
var web_url_to_json = __webpack_require__(7208);
;// ./web/download_manager.js
function download_manager_classPrivateFieldInitSpec(e, t, a) { download_manager_checkPrivateRedeclaration(e, t), t.set(e, a); }
function download_manager_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function download_manager_classPrivateFieldGet(s, a) { return s.get(download_manager_assertClassBrand(s, a)); }
function download_manager_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






function download(blobUrl, filename) {
  const a = document.createElement("a");
  if (!a.click) {
    throw new Error('DownloadManager: "a.click()" is not supported.');
  }
  a.href = blobUrl;
  a.target = "_parent";
  if ("download" in a) {
    a.download = filename;
  }
  (document.body || document.documentElement).append(a);
  a.click();
  a.remove();
}
var _openBlobUrls = /*#__PURE__*/new WeakMap();
class DownloadManager {
  constructor() {
    download_manager_classPrivateFieldInitSpec(this, _openBlobUrls, new WeakMap());
  }
  downloadData(data, filename, contentType) {
    const blobUrl = URL.createObjectURL(new Blob([data], {
      type: contentType
    }));
    download(blobUrl, filename);
  }
  openOrDownloadData(data, filename, dest = null) {
    const isPdfData = isPdfFile(filename);
    const contentType = isPdfData ? "application/pdf" : "";
    this.downloadData(data, filename, contentType);
    return false;
  }
  download(data, url, filename) {
    let blobUrl;
    if (data) {
      blobUrl = URL.createObjectURL(new Blob([data], {
        type: "application/pdf"
      }));
    } else {
      if (!createValidAbsoluteUrl(url, "http://example.com")) {
        console.error(`download - not a valid URL: ${url}`);
        return;
      }
      blobUrl = url + "#pdfjs.action=download";
    }
    download(blobUrl, filename);
  }
}

;// ./web/event_utils.js
function event_utils_classPrivateFieldSet(s, a, r) { return s.set(event_utils_assertClassBrand(s, a), r), r; }
function event_utils_classPrivateFieldInitSpec(e, t, a) { event_utils_checkPrivateRedeclaration(e, t), t.set(e, a); }
function event_utils_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function event_utils_classPrivateFieldGet(s, a) { return s.get(event_utils_assertClassBrand(s, a)); }
function event_utils_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



const WaitOnType = {
  EVENT: "event",
  TIMEOUT: "timeout"
};
async function waitOnEventOrTimeout({
  target,
  name,
  delay = 0
}) {
  if (typeof target !== "object" || !(name && typeof name === "string") || !(Number.isInteger(delay) && delay >= 0)) {
    throw new Error("waitOnEventOrTimeout - invalid parameters.");
  }
  const {
    promise,
    resolve
  } = Promise.withResolvers();
  const ac = new AbortController();
  function handler(type) {
    ac.abort();
    clearTimeout(timeout);
    resolve(type);
  }
  const evtMethod = target instanceof EventBus ? "_on" : "addEventListener";
  target[evtMethod](name, handler.bind(null, WaitOnType.EVENT), {
    signal: ac.signal
  });
  const timeout = setTimeout(handler.bind(null, WaitOnType.TIMEOUT), delay);
  return promise;
}
var _listeners = /*#__PURE__*/new WeakMap();
class EventBus {
  constructor() {
    event_utils_classPrivateFieldInitSpec(this, _listeners, Object.create(null));
  }
  on(eventName, listener, options = null) {
    this._on(eventName, listener, {
      external: true,
      once: options === null || options === void 0 ? void 0 : options.once,
      signal: options === null || options === void 0 ? void 0 : options.signal
    });
  }
  off(eventName, listener, options = null) {
    this._off(eventName, listener);
  }
  dispatch(eventName, data) {
    const eventListeners = event_utils_classPrivateFieldGet(_listeners, this)[eventName];
    if (!eventListeners || eventListeners.length === 0) {
      return;
    }
    let externalListeners;
    for (const {
      listener,
      external,
      once
    } of eventListeners.slice(0)) {
      if (once) {
        this._off(eventName, listener);
      }
      if (external) {
        (externalListeners || (externalListeners = [])).push(listener);
        continue;
      }
      listener(data);
    }
    if (externalListeners) {
      for (const listener of externalListeners) {
        listener(data);
      }
      externalListeners = null;
    }
  }
  _on(eventName, listener, options = null) {
    var _classPrivateFieldGet2;
    let rmAbort = null;
    if ((options === null || options === void 0 ? void 0 : options.signal) instanceof AbortSignal) {
      const {
        signal
      } = options;
      if (signal.aborted) {
        console.error("Cannot use an `aborted` signal.");
        return;
      }
      const onAbort = () => this._off(eventName, listener);
      rmAbort = () => signal.removeEventListener("abort", onAbort);
      signal.addEventListener("abort", onAbort);
    }
    const eventListeners = (_classPrivateFieldGet2 = event_utils_classPrivateFieldGet(_listeners, this))[eventName] || (_classPrivateFieldGet2[eventName] = []);
    eventListeners.push({
      listener,
      external: (options === null || options === void 0 ? void 0 : options.external) === true,
      once: (options === null || options === void 0 ? void 0 : options.once) === true,
      rmAbort
    });
  }
  _off(eventName, listener, options = null) {
    const eventListeners = event_utils_classPrivateFieldGet(_listeners, this)[eventName];
    if (!eventListeners) {
      return;
    }
    for (let i = 0, ii = eventListeners.length; i < ii; i++) {
      const evt = eventListeners[i];
      if (evt.listener === listener) {
        var _evt$rmAbort;
        (_evt$rmAbort = evt.rmAbort) === null || _evt$rmAbort === void 0 || _evt$rmAbort.call(evt);
        eventListeners.splice(i, 1);
        return;
      }
    }
  }
}
var _externalServices = /*#__PURE__*/new WeakMap();
var _globalEventNames = /*#__PURE__*/new WeakMap();
var _isInAutomation = /*#__PURE__*/new WeakMap();
class FirefoxEventBus extends EventBus {
  constructor(globalEventNames, externalServices, isInAutomation) {
    super();
    event_utils_classPrivateFieldInitSpec(this, _externalServices, void 0);
    event_utils_classPrivateFieldInitSpec(this, _globalEventNames, void 0);
    event_utils_classPrivateFieldInitSpec(this, _isInAutomation, void 0);
    event_utils_classPrivateFieldSet(_globalEventNames, this, globalEventNames);
    event_utils_classPrivateFieldSet(_externalServices, this, externalServices);
    event_utils_classPrivateFieldSet(_isInAutomation, this, isInAutomation);
  }
  dispatch(eventName, data) {
    var _classPrivateFieldGet3;
    throw new Error("Not implemented: FirefoxEventBus.dispatch");
  }
}

;// ./node_modules/@fluent/bundle/esm/types.js
class FluentType {
  constructor(value) {
    this.value = value;
  }
  valueOf() {
    return this.value;
  }
}
class FluentNone extends FluentType {
  constructor(value = "???") {
    super(value);
  }
  toString(scope) {
    return `{${this.value}}`;
  }
}
class FluentNumber extends FluentType {
  constructor(value, opts = {}) {
    super(value);
    this.opts = opts;
  }
  toString(scope) {
    try {
      const nf = scope.memoizeIntlObject(Intl.NumberFormat, this.opts);
      return nf.format(this.value);
    } catch (err) {
      scope.reportError(err);
      return this.value.toString(10);
    }
  }
}
class FluentDateTime extends FluentType {
  constructor(value, opts = {}) {
    super(value);
    this.opts = opts;
  }
  toString(scope) {
    try {
      const dtf = scope.memoizeIntlObject(Intl.DateTimeFormat, this.opts);
      return dtf.format(this.value);
    } catch (err) {
      scope.reportError(err);
      return new Date(this.value).toISOString();
    }
  }
}
;// ./node_modules/@fluent/bundle/esm/resolver.js



const MAX_PLACEABLES = 100;
const FSI = "\u2068";
const PDI = "\u2069";
function match(scope, selector, key) {
  if (key === selector) {
    return true;
  }
  if (key instanceof FluentNumber && selector instanceof FluentNumber && key.value === selector.value) {
    return true;
  }
  if (selector instanceof FluentNumber && typeof key === "string") {
    let category = scope.memoizeIntlObject(Intl.PluralRules, selector.opts).select(selector.value);
    if (key === category) {
      return true;
    }
  }
  return false;
}
function getDefault(scope, variants, star) {
  if (variants[star]) {
    return resolvePattern(scope, variants[star].value);
  }
  scope.reportError(new RangeError("No default"));
  return new FluentNone();
}
function getArguments(scope, args) {
  const positional = [];
  const named = Object.create(null);
  for (const arg of args) {
    if (arg.type === "narg") {
      named[arg.name] = resolveExpression(scope, arg.value);
    } else {
      positional.push(resolveExpression(scope, arg));
    }
  }
  return {
    positional,
    named
  };
}
function resolveExpression(scope, expr) {
  switch (expr.type) {
    case "str":
      return expr.value;
    case "num":
      return new FluentNumber(expr.value, {
        minimumFractionDigits: expr.precision
      });
    case "var":
      return resolveVariableReference(scope, expr);
    case "mesg":
      return resolveMessageReference(scope, expr);
    case "term":
      return resolveTermReference(scope, expr);
    case "func":
      return resolveFunctionReference(scope, expr);
    case "select":
      return resolveSelectExpression(scope, expr);
    default:
      return new FluentNone();
  }
}
function resolveVariableReference(scope, {
  name
}) {
  let arg;
  if (scope.params) {
    if (Object.prototype.hasOwnProperty.call(scope.params, name)) {
      arg = scope.params[name];
    } else {
      return new FluentNone(`$${name}`);
    }
  } else if (scope.args && Object.prototype.hasOwnProperty.call(scope.args, name)) {
    arg = scope.args[name];
  } else {
    scope.reportError(new ReferenceError(`Unknown variable: $${name}`));
    return new FluentNone(`$${name}`);
  }
  if (arg instanceof FluentType) {
    return arg;
  }
  switch (typeof arg) {
    case "string":
      return arg;
    case "number":
      return new FluentNumber(arg);
    case "object":
      if (arg instanceof Date) {
        return new FluentDateTime(arg.getTime());
      }
    default:
      scope.reportError(new TypeError(`Variable type not supported: $${name}, ${typeof arg}`));
      return new FluentNone(`$${name}`);
  }
}
function resolveMessageReference(scope, {
  name,
  attr
}) {
  const message = scope.bundle._messages.get(name);
  if (!message) {
    scope.reportError(new ReferenceError(`Unknown message: ${name}`));
    return new FluentNone(name);
  }
  if (attr) {
    const attribute = message.attributes[attr];
    if (attribute) {
      return resolvePattern(scope, attribute);
    }
    scope.reportError(new ReferenceError(`Unknown attribute: ${attr}`));
    return new FluentNone(`${name}.${attr}`);
  }
  if (message.value) {
    return resolvePattern(scope, message.value);
  }
  scope.reportError(new ReferenceError(`No value: ${name}`));
  return new FluentNone(name);
}
function resolveTermReference(scope, {
  name,
  attr,
  args
}) {
  const id = `-${name}`;
  const term = scope.bundle._terms.get(id);
  if (!term) {
    scope.reportError(new ReferenceError(`Unknown term: ${id}`));
    return new FluentNone(id);
  }
  if (attr) {
    const attribute = term.attributes[attr];
    if (attribute) {
      scope.params = getArguments(scope, args).named;
      const resolved = resolvePattern(scope, attribute);
      scope.params = null;
      return resolved;
    }
    scope.reportError(new ReferenceError(`Unknown attribute: ${attr}`));
    return new FluentNone(`${id}.${attr}`);
  }
  scope.params = getArguments(scope, args).named;
  const resolved = resolvePattern(scope, term.value);
  scope.params = null;
  return resolved;
}
function resolveFunctionReference(scope, {
  name,
  args
}) {
  let func = scope.bundle._functions[name];
  if (!func) {
    scope.reportError(new ReferenceError(`Unknown function: ${name}()`));
    return new FluentNone(`${name}()`);
  }
  if (typeof func !== "function") {
    scope.reportError(new TypeError(`Function ${name}() is not callable`));
    return new FluentNone(`${name}()`);
  }
  try {
    let resolved = getArguments(scope, args);
    return func(resolved.positional, resolved.named);
  } catch (err) {
    scope.reportError(err);
    return new FluentNone(`${name}()`);
  }
}
function resolveSelectExpression(scope, {
  selector,
  variants,
  star
}) {
  let sel = resolveExpression(scope, selector);
  if (sel instanceof FluentNone) {
    return getDefault(scope, variants, star);
  }
  for (const variant of variants) {
    const key = resolveExpression(scope, variant.key);
    if (match(scope, sel, key)) {
      return resolvePattern(scope, variant.value);
    }
  }
  return getDefault(scope, variants, star);
}
function resolveComplexPattern(scope, ptn) {
  if (scope.dirty.has(ptn)) {
    scope.reportError(new RangeError("Cyclic reference"));
    return new FluentNone();
  }
  scope.dirty.add(ptn);
  const result = [];
  const useIsolating = scope.bundle._useIsolating && ptn.length > 1;
  for (const elem of ptn) {
    if (typeof elem === "string") {
      result.push(scope.bundle._transform(elem));
      continue;
    }
    scope.placeables++;
    if (scope.placeables > MAX_PLACEABLES) {
      scope.dirty.delete(ptn);
      throw new RangeError(`Too many placeables expanded: ${scope.placeables}, ` + `max allowed is ${MAX_PLACEABLES}`);
    }
    if (useIsolating) {
      result.push(FSI);
    }
    result.push(resolveExpression(scope, elem).toString(scope));
    if (useIsolating) {
      result.push(PDI);
    }
  }
  scope.dirty.delete(ptn);
  return result.join("");
}
function resolvePattern(scope, value) {
  if (typeof value === "string") {
    return scope.bundle._transform(value);
  }
  return resolveComplexPattern(scope, value);
}
;// ./node_modules/@fluent/bundle/esm/scope.js



class Scope {
  constructor(bundle, errors, args) {
    this.dirty = new WeakSet();
    this.params = null;
    this.placeables = 0;
    this.bundle = bundle;
    this.errors = errors;
    this.args = args;
  }
  reportError(error) {
    if (!this.errors || !(error instanceof Error)) {
      throw error;
    }
    this.errors.push(error);
  }
  memoizeIntlObject(ctor, opts) {
    let cache = this.bundle._intls.get(ctor);
    if (!cache) {
      cache = {};
      this.bundle._intls.set(ctor, cache);
    }
    let id = JSON.stringify(opts);
    if (!cache[id]) {
      cache[id] = new ctor(this.bundle.locales, opts);
    }
    return cache[id];
  }
}
;// ./node_modules/@fluent/bundle/esm/builtins.js


function values(opts, allowed) {
  const unwrapped = Object.create(null);
  for (const [name, opt] of Object.entries(opts)) {
    if (allowed.includes(name)) {
      unwrapped[name] = opt.valueOf();
    }
  }
  return unwrapped;
}
const NUMBER_ALLOWED = ["unitDisplay", "currencyDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"];
function NUMBER(args, opts) {
  let arg = args[0];
  if (arg instanceof FluentNone) {
    return new FluentNone(`NUMBER(${arg.valueOf()})`);
  }
  if (arg instanceof FluentNumber) {
    return new FluentNumber(arg.valueOf(), {
      ...arg.opts,
      ...values(opts, NUMBER_ALLOWED)
    });
  }
  if (arg instanceof FluentDateTime) {
    return new FluentNumber(arg.valueOf(), {
      ...values(opts, NUMBER_ALLOWED)
    });
  }
  throw new TypeError("Invalid argument to NUMBER");
}
const DATETIME_ALLOWED = ["dateStyle", "timeStyle", "fractionalSecondDigits", "dayPeriod", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"];
function DATETIME(args, opts) {
  let arg = args[0];
  if (arg instanceof FluentNone) {
    return new FluentNone(`DATETIME(${arg.valueOf()})`);
  }
  if (arg instanceof FluentDateTime) {
    return new FluentDateTime(arg.valueOf(), {
      ...arg.opts,
      ...values(opts, DATETIME_ALLOWED)
    });
  }
  if (arg instanceof FluentNumber) {
    return new FluentDateTime(arg.valueOf(), {
      ...values(opts, DATETIME_ALLOWED)
    });
  }
  throw new TypeError("Invalid argument to DATETIME");
}
;// ./node_modules/@fluent/bundle/esm/memoizer.js
const cache = new Map();
function getMemoizerForLocale(locales) {
  const stringLocale = Array.isArray(locales) ? locales.join(" ") : locales;
  let memoizer = cache.get(stringLocale);
  if (memoizer === undefined) {
    memoizer = new Map();
    cache.set(stringLocale, memoizer);
  }
  return memoizer;
}
;// ./node_modules/@fluent/bundle/esm/bundle.js







class FluentBundle {
  constructor(locales, {
    functions,
    useIsolating = true,
    transform = v => v
  } = {}) {
    this._terms = new Map();
    this._messages = new Map();
    this.locales = Array.isArray(locales) ? locales : [locales];
    this._functions = {
      NUMBER: NUMBER,
      DATETIME: DATETIME,
      ...functions
    };
    this._useIsolating = useIsolating;
    this._transform = transform;
    this._intls = getMemoizerForLocale(locales);
  }
  hasMessage(id) {
    return this._messages.has(id);
  }
  getMessage(id) {
    return this._messages.get(id);
  }
  addResource(res, {
    allowOverrides = false
  } = {}) {
    const errors = [];
    for (let i = 0; i < res.body.length; i++) {
      let entry = res.body[i];
      if (entry.id.startsWith("-")) {
        if (allowOverrides === false && this._terms.has(entry.id)) {
          errors.push(new Error(`Attempt to override an existing term: "${entry.id}"`));
          continue;
        }
        this._terms.set(entry.id, entry);
      } else {
        if (allowOverrides === false && this._messages.has(entry.id)) {
          errors.push(new Error(`Attempt to override an existing message: "${entry.id}"`));
          continue;
        }
        this._messages.set(entry.id, entry);
      }
    }
    return errors;
  }
  formatPattern(pattern, args = null, errors = null) {
    if (typeof pattern === "string") {
      return this._transform(pattern);
    }
    let scope = new Scope(this, errors, args);
    try {
      let value = resolveComplexPattern(scope, pattern);
      return value.toString(scope);
    } catch (err) {
      if (scope.errors && err instanceof Error) {
        scope.errors.push(err);
        return new FluentNone().toString(scope);
      }
      throw err;
    }
  }
}
;// ./node_modules/@fluent/bundle/esm/resource.js


const RE_MESSAGE_START = /^(-?[a-zA-Z][\w-]*) *= */gm;
const RE_ATTRIBUTE_START = /\.([a-zA-Z][\w-]*) *= */y;
const RE_VARIANT_START = /\*?\[/y;
const RE_NUMBER_LITERAL = /(-?[0-9]+(?:\.([0-9]+))?)/y;
const RE_IDENTIFIER = /([a-zA-Z][\w-]*)/y;
const RE_REFERENCE = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y;
const RE_FUNCTION_NAME = /^[A-Z][A-Z0-9_-]*$/;
const RE_TEXT_RUN = /([^{}\n\r]+)/y;
const RE_STRING_RUN = /([^\\"\n\r]*)/y;
const RE_STRING_ESCAPE = /\\([\\"])/y;
const RE_UNICODE_ESCAPE = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y;
const RE_LEADING_NEWLINES = /^\n+/;
const RE_TRAILING_SPACES = / +$/;
const RE_BLANK_LINES = / *\r?\n/g;
const RE_INDENT = /( *)$/;
const TOKEN_BRACE_OPEN = /{\s*/y;
const TOKEN_BRACE_CLOSE = /\s*}/y;
const TOKEN_BRACKET_OPEN = /\[\s*/y;
const TOKEN_BRACKET_CLOSE = /\s*] */y;
const TOKEN_PAREN_OPEN = /\s*\(\s*/y;
const TOKEN_ARROW = /\s*->\s*/y;
const TOKEN_COLON = /\s*:\s*/y;
const TOKEN_COMMA = /\s*,?\s*/y;
const TOKEN_BLANK = /\s+/y;
class FluentResource {
  constructor(source) {
    this.body = [];
    RE_MESSAGE_START.lastIndex = 0;
    let cursor = 0;
    while (true) {
      let next = RE_MESSAGE_START.exec(source);
      if (next === null) {
        break;
      }
      cursor = RE_MESSAGE_START.lastIndex;
      try {
        this.body.push(parseMessage(next[1]));
      } catch (err) {
        if (err instanceof SyntaxError) {
          continue;
        }
        throw err;
      }
    }
    function test(re) {
      re.lastIndex = cursor;
      return re.test(source);
    }
    function consumeChar(char, errorClass) {
      if (source[cursor] === char) {
        cursor++;
        return true;
      }
      if (errorClass) {
        throw new errorClass(`Expected ${char}`);
      }
      return false;
    }
    function consumeToken(re, errorClass) {
      if (test(re)) {
        cursor = re.lastIndex;
        return true;
      }
      if (errorClass) {
        throw new errorClass(`Expected ${re.toString()}`);
      }
      return false;
    }
    function match(re) {
      re.lastIndex = cursor;
      let result = re.exec(source);
      if (result === null) {
        throw new SyntaxError(`Expected ${re.toString()}`);
      }
      cursor = re.lastIndex;
      return result;
    }
    function match1(re) {
      return match(re)[1];
    }
    function parseMessage(id) {
      let value = parsePattern();
      let attributes = parseAttributes();
      if (value === null && Object.keys(attributes).length === 0) {
        throw new SyntaxError("Expected message value or attributes");
      }
      return {
        id,
        value,
        attributes
      };
    }
    function parseAttributes() {
      let attrs = Object.create(null);
      while (test(RE_ATTRIBUTE_START)) {
        let name = match1(RE_ATTRIBUTE_START);
        let value = parsePattern();
        if (value === null) {
          throw new SyntaxError("Expected attribute value");
        }
        attrs[name] = value;
      }
      return attrs;
    }
    function parsePattern() {
      let first;
      if (test(RE_TEXT_RUN)) {
        first = match1(RE_TEXT_RUN);
      }
      if (source[cursor] === "{" || source[cursor] === "}") {
        return parsePatternElements(first ? [first] : [], Infinity);
      }
      let indent = parseIndent();
      if (indent) {
        if (first) {
          return parsePatternElements([first, indent], indent.length);
        }
        indent.value = trim(indent.value, RE_LEADING_NEWLINES);
        return parsePatternElements([indent], indent.length);
      }
      if (first) {
        return trim(first, RE_TRAILING_SPACES);
      }
      return null;
    }
    function parsePatternElements(elements = [], commonIndent) {
      while (true) {
        if (test(RE_TEXT_RUN)) {
          elements.push(match1(RE_TEXT_RUN));
          continue;
        }
        if (source[cursor] === "{") {
          elements.push(parsePlaceable());
          continue;
        }
        if (source[cursor] === "}") {
          throw new SyntaxError("Unbalanced closing brace");
        }
        let indent = parseIndent();
        if (indent) {
          elements.push(indent);
          commonIndent = Math.min(commonIndent, indent.length);
          continue;
        }
        break;
      }
      let lastIndex = elements.length - 1;
      let lastElement = elements[lastIndex];
      if (typeof lastElement === "string") {
        elements[lastIndex] = trim(lastElement, RE_TRAILING_SPACES);
      }
      let baked = [];
      for (let element of elements) {
        if (element instanceof Indent) {
          element = element.value.slice(0, element.value.length - commonIndent);
        }
        if (element) {
          baked.push(element);
        }
      }
      return baked;
    }
    function parsePlaceable() {
      consumeToken(TOKEN_BRACE_OPEN, SyntaxError);
      let selector = parseInlineExpression();
      if (consumeToken(TOKEN_BRACE_CLOSE)) {
        return selector;
      }
      if (consumeToken(TOKEN_ARROW)) {
        let variants = parseVariants();
        consumeToken(TOKEN_BRACE_CLOSE, SyntaxError);
        return {
          type: "select",
          selector,
          ...variants
        };
      }
      throw new SyntaxError("Unclosed placeable");
    }
    function parseInlineExpression() {
      if (source[cursor] === "{") {
        return parsePlaceable();
      }
      if (test(RE_REFERENCE)) {
        let [, sigil, name, attr = null] = match(RE_REFERENCE);
        if (sigil === "$") {
          return {
            type: "var",
            name
          };
        }
        if (consumeToken(TOKEN_PAREN_OPEN)) {
          let args = parseArguments();
          if (sigil === "-") {
            return {
              type: "term",
              name,
              attr,
              args
            };
          }
          if (RE_FUNCTION_NAME.test(name)) {
            return {
              type: "func",
              name,
              args
            };
          }
          throw new SyntaxError("Function names must be all upper-case");
        }
        if (sigil === "-") {
          return {
            type: "term",
            name,
            attr,
            args: []
          };
        }
        return {
          type: "mesg",
          name,
          attr
        };
      }
      return parseLiteral();
    }
    function parseArguments() {
      let args = [];
      while (true) {
        switch (source[cursor]) {
          case ")":
            cursor++;
            return args;
          case undefined:
            throw new SyntaxError("Unclosed argument list");
        }
        args.push(parseArgument());
        consumeToken(TOKEN_COMMA);
      }
    }
    function parseArgument() {
      let expr = parseInlineExpression();
      if (expr.type !== "mesg") {
        return expr;
      }
      if (consumeToken(TOKEN_COLON)) {
        return {
          type: "narg",
          name: expr.name,
          value: parseLiteral()
        };
      }
      return expr;
    }
    function parseVariants() {
      let variants = [];
      let count = 0;
      let star;
      while (test(RE_VARIANT_START)) {
        if (consumeChar("*")) {
          star = count;
        }
        let key = parseVariantKey();
        let value = parsePattern();
        if (value === null) {
          throw new SyntaxError("Expected variant value");
        }
        variants[count++] = {
          key,
          value
        };
      }
      if (count === 0) {
        return null;
      }
      if (star === undefined) {
        throw new SyntaxError("Expected default variant");
      }
      return {
        variants,
        star
      };
    }
    function parseVariantKey() {
      consumeToken(TOKEN_BRACKET_OPEN, SyntaxError);
      let key;
      if (test(RE_NUMBER_LITERAL)) {
        key = parseNumberLiteral();
      } else {
        key = {
          type: "str",
          value: match1(RE_IDENTIFIER)
        };
      }
      consumeToken(TOKEN_BRACKET_CLOSE, SyntaxError);
      return key;
    }
    function parseLiteral() {
      if (test(RE_NUMBER_LITERAL)) {
        return parseNumberLiteral();
      }
      if (source[cursor] === '"') {
        return parseStringLiteral();
      }
      throw new SyntaxError("Invalid expression");
    }
    function parseNumberLiteral() {
      let [, value, fraction = ""] = match(RE_NUMBER_LITERAL);
      let precision = fraction.length;
      return {
        type: "num",
        value: parseFloat(value),
        precision
      };
    }
    function parseStringLiteral() {
      consumeChar('"', SyntaxError);
      let value = "";
      while (true) {
        value += match1(RE_STRING_RUN);
        if (source[cursor] === "\\") {
          value += parseEscapeSequence();
          continue;
        }
        if (consumeChar('"')) {
          return {
            type: "str",
            value
          };
        }
        throw new SyntaxError("Unclosed string literal");
      }
    }
    function parseEscapeSequence() {
      if (test(RE_STRING_ESCAPE)) {
        return match1(RE_STRING_ESCAPE);
      }
      if (test(RE_UNICODE_ESCAPE)) {
        let [, codepoint4, codepoint6] = match(RE_UNICODE_ESCAPE);
        let codepoint = parseInt(codepoint4 || codepoint6, 16);
        return codepoint <= 0xd7ff || 0xe000 <= codepoint ? String.fromCodePoint(codepoint) : "�";
      }
      throw new SyntaxError("Unknown escape sequence");
    }
    function parseIndent() {
      let start = cursor;
      consumeToken(TOKEN_BLANK);
      switch (source[cursor]) {
        case ".":
        case "[":
        case "*":
        case "}":
        case undefined:
          return false;
        case "{":
          return makeIndent(source.slice(start, cursor));
      }
      if (source[cursor - 1] === " ") {
        return makeIndent(source.slice(start, cursor));
      }
      return false;
    }
    function trim(text, re) {
      return text.replace(re, "");
    }
    function makeIndent(blank) {
      let value = blank.replace(RE_BLANK_LINES, "\n");
      let length = RE_INDENT.exec(blank)[1].length;
      return new Indent(value, length);
    }
  }
}
class Indent {
  constructor(value, length) {
    this.value = value;
    this.length = length;
  }
}
;// ./node_modules/@fluent/bundle/esm/index.js



;// ./node_modules/@fluent/dom/esm/overlay.js

const reOverlay = /<|&#?\w+;/;
const TEXT_LEVEL_ELEMENTS = {
  "http://www.w3.org/1999/xhtml": ["em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "data", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "bdi", "bdo", "span", "br", "wbr"]
};
const LOCALIZABLE_ATTRIBUTES = {
  "http://www.w3.org/1999/xhtml": {
    global: ["title", "aria-label", "aria-valuetext"],
    a: ["download"],
    area: ["download", "alt"],
    input: ["alt", "placeholder"],
    menuitem: ["label"],
    menu: ["label"],
    optgroup: ["label"],
    option: ["label"],
    track: ["label"],
    img: ["alt"],
    textarea: ["placeholder"],
    th: ["abbr"]
  },
  "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul": {
    global: ["accesskey", "aria-label", "aria-valuetext", "label", "title", "tooltiptext"],
    description: ["value"],
    key: ["key", "keycode"],
    label: ["value"],
    textbox: ["placeholder", "value"]
  }
};
function translateElement(element, translation) {
  const {
    value
  } = translation;
  if (typeof value === "string") {
    if (element.localName === "title" && element.namespaceURI === "http://www.w3.org/1999/xhtml") {
      element.textContent = value;
    } else if (!reOverlay.test(value)) {
      element.textContent = value;
    } else {
      const templateElement = element.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "template");
      templateElement.innerHTML = value;
      overlayChildNodes(templateElement.content, element);
    }
  }
  overlayAttributes(translation, element);
}
function overlayChildNodes(fromFragment, toElement) {
  for (const childNode of fromFragment.childNodes) {
    if (childNode.nodeType === childNode.TEXT_NODE) {
      continue;
    }
    if (childNode.hasAttribute("data-l10n-name")) {
      const sanitized = getNodeForNamedElement(toElement, childNode);
      fromFragment.replaceChild(sanitized, childNode);
      continue;
    }
    if (isElementAllowed(childNode)) {
      const sanitized = createSanitizedElement(childNode);
      fromFragment.replaceChild(sanitized, childNode);
      continue;
    }
    console.warn(`An element of forbidden type "${childNode.localName}" was found in ` + "the translation. Only safe text-level elements and elements with " + "data-l10n-name are allowed.");
    fromFragment.replaceChild(createTextNodeFromTextContent(childNode), childNode);
  }
  toElement.textContent = "";
  toElement.appendChild(fromFragment);
}
function hasAttribute(attributes, name) {
  if (!attributes) {
    return false;
  }
  for (let attr of attributes) {
    if (attr.name === name) {
      return true;
    }
  }
  return false;
}
function overlayAttributes(fromElement, toElement) {
  const explicitlyAllowed = toElement.hasAttribute("data-l10n-attrs") ? toElement.getAttribute("data-l10n-attrs").split(",").map(i => i.trim()) : null;
  for (const attr of Array.from(toElement.attributes)) {
    if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) && !hasAttribute(fromElement.attributes, attr.name)) {
      toElement.removeAttribute(attr.name);
    }
  }
  if (!fromElement.attributes) {
    return;
  }
  for (const attr of Array.from(fromElement.attributes)) {
    if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) && toElement.getAttribute(attr.name) !== attr.value) {
      toElement.setAttribute(attr.name, attr.value);
    }
  }
}
function getNodeForNamedElement(sourceElement, translatedChild) {
  const childName = translatedChild.getAttribute("data-l10n-name");
  const sourceChild = sourceElement.querySelector(`[data-l10n-name="${childName}"]`);
  if (!sourceChild) {
    console.warn(`An element named "${childName}" wasn't found in the source.`);
    return createTextNodeFromTextContent(translatedChild);
  }
  if (sourceChild.localName !== translatedChild.localName) {
    console.warn(`An element named "${childName}" was found in the translation ` + `but its type ${translatedChild.localName} didn't match the ` + `element found in the source (${sourceChild.localName}).`);
    return createTextNodeFromTextContent(translatedChild);
  }
  sourceElement.removeChild(sourceChild);
  const clone = sourceChild.cloneNode(false);
  return shallowPopulateUsing(translatedChild, clone);
}
function createSanitizedElement(element) {
  const clone = element.ownerDocument.createElement(element.localName);
  return shallowPopulateUsing(element, clone);
}
function createTextNodeFromTextContent(element) {
  return element.ownerDocument.createTextNode(element.textContent);
}
function isElementAllowed(element) {
  const allowed = TEXT_LEVEL_ELEMENTS[element.namespaceURI];
  return allowed && allowed.includes(element.localName);
}
function isAttrNameLocalizable(name, element, explicitlyAllowed = null) {
  if (explicitlyAllowed && explicitlyAllowed.includes(name)) {
    return true;
  }
  const allowed = LOCALIZABLE_ATTRIBUTES[element.namespaceURI];
  if (!allowed) {
    return false;
  }
  const attrName = name.toLowerCase();
  const elemName = element.localName;
  if (allowed.global.includes(attrName)) {
    return true;
  }
  if (!allowed[elemName]) {
    return false;
  }
  if (allowed[elemName].includes(attrName)) {
    return true;
  }
  if (element.namespaceURI === "http://www.w3.org/1999/xhtml" && elemName === "input" && attrName === "value") {
    const type = element.type.toLowerCase();
    if (type === "submit" || type === "button" || type === "reset") {
      return true;
    }
  }
  return false;
}
function shallowPopulateUsing(fromElement, toElement) {
  toElement.textContent = fromElement.textContent;
  overlayAttributes(fromElement, toElement);
  return toElement;
}
;// ./node_modules/cached-iterable/src/cached_iterable.mjs
class CachedIterable extends Array {
  static from(iterable) {
    if (iterable instanceof this) {
      return iterable;
    }
    return new this(iterable);
  }
}
;// ./node_modules/cached-iterable/src/cached_sync_iterable.mjs



class CachedSyncIterable extends CachedIterable {
  constructor(iterable) {
    super();
    if (Symbol.iterator in Object(iterable)) {
      this.iterator = iterable[Symbol.iterator]();
    } else {
      throw new TypeError("Argument must implement the iteration protocol.");
    }
  }
  [Symbol.iterator]() {
    const cached = this;
    let cur = 0;
    return {
      next() {
        if (cached.length <= cur) {
          cached.push(cached.iterator.next());
        }
        return cached[cur++];
      }
    };
  }
  touchNext(count = 1) {
    let idx = 0;
    while (idx++ < count) {
      const last = this[this.length - 1];
      if (last && last.done) {
        break;
      }
      this.push(this.iterator.next());
    }
    return this[this.length - 1];
  }
}
;// ./node_modules/cached-iterable/src/cached_async_iterable.mjs



class CachedAsyncIterable extends CachedIterable {
  constructor(iterable) {
    super();
    if (Symbol.asyncIterator in Object(iterable)) {
      this.iterator = iterable[Symbol.asyncIterator]();
    } else if (Symbol.iterator in Object(iterable)) {
      this.iterator = iterable[Symbol.iterator]();
    } else {
      throw new TypeError("Argument must implement the iteration protocol.");
    }
  }
  [Symbol.asyncIterator]() {
    const cached = this;
    let cur = 0;
    return {
      async next() {
        if (cached.length <= cur) {
          cached.push(cached.iterator.next());
        }
        return cached[cur++];
      }
    };
  }
  async touchNext(count = 1) {
    let idx = 0;
    while (idx++ < count) {
      const last = this[this.length - 1];
      if (last && (await last).done) {
        break;
      }
      this.push(this.iterator.next());
    }
    return this[this.length - 1];
  }
}
;// ./node_modules/cached-iterable/src/index.mjs


;// ./node_modules/@fluent/dom/esm/localization.js













class Localization {
  constructor(resourceIds = [], generateBundles) {
    this.resourceIds = resourceIds;
    this.generateBundles = generateBundles;
    this.onChange(true);
  }
  addResourceIds(resourceIds, eager = false) {
    this.resourceIds.push(...resourceIds);
    this.onChange(eager);
    return this.resourceIds.length;
  }
  removeResourceIds(resourceIds) {
    this.resourceIds = this.resourceIds.filter(r => !resourceIds.includes(r));
    this.onChange();
    return this.resourceIds.length;
  }
  async formatWithFallback(keys, method) {
    const translations = [];
    let hasAtLeastOneBundle = false;
    for await (const bundle of this.bundles) {
      hasAtLeastOneBundle = true;
      const missingIds = keysFromBundle(method, bundle, keys, translations);
      if (missingIds.size === 0) {
        break;
      }
      if (typeof console !== "undefined") {
        const locale = bundle.locales[0];
        const ids = Array.from(missingIds).join(", ");
        console.warn(`[fluent] Missing translations in ${locale}: ${ids}`);
      }
    }
    if (!hasAtLeastOneBundle && typeof console !== "undefined") {
      console.warn(`[fluent] Request for keys failed because no resource bundles got generated.
  keys: ${JSON.stringify(keys)}.
  resourceIds: ${JSON.stringify(this.resourceIds)}.`);
    }
    return translations;
  }
  formatMessages(keys) {
    return this.formatWithFallback(keys, messageFromBundle);
  }
  formatValues(keys) {
    return this.formatWithFallback(keys, valueFromBundle);
  }
  async formatValue(id, args) {
    const [val] = await this.formatValues([{
      id,
      args
    }]);
    return val;
  }
  handleEvent() {
    this.onChange();
  }
  onChange(eager = false) {
    this.bundles = CachedAsyncIterable.from(this.generateBundles(this.resourceIds));
    if (eager) {
      this.bundles.touchNext(2);
    }
  }
}
function valueFromBundle(bundle, errors, message, args) {
  if (message.value) {
    return bundle.formatPattern(message.value, args, errors);
  }
  return null;
}
function messageFromBundle(bundle, errors, message, args) {
  const formatted = {
    value: null,
    attributes: null
  };
  if (message.value) {
    formatted.value = bundle.formatPattern(message.value, args, errors);
  }
  let attrNames = Object.keys(message.attributes);
  if (attrNames.length > 0) {
    formatted.attributes = new Array(attrNames.length);
    for (let [i, name] of attrNames.entries()) {
      let value = bundle.formatPattern(message.attributes[name], args, errors);
      formatted.attributes[i] = {
        name,
        value
      };
    }
  }
  return formatted;
}
function keysFromBundle(method, bundle, keys, translations) {
  const messageErrors = [];
  const missingIds = new Set();
  keys.forEach(({
    id,
    args
  }, i) => {
    if (translations[i] !== undefined) {
      return;
    }
    let message = bundle.getMessage(id);
    if (message) {
      messageErrors.length = 0;
      translations[i] = method(bundle, messageErrors, message, args);
      if (messageErrors.length > 0 && typeof console !== "undefined") {
        const locale = bundle.locales[0];
        const errors = messageErrors.join(", ");
        console.warn(`[fluent][resolver] errors in ${locale}/${id}: ${errors}.`);
      }
    } else {
      missingIds.add(id);
    }
  });
  return missingIds;
}
;// ./node_modules/@fluent/dom/esm/dom_localization.js














const L10NID_ATTR_NAME = "data-l10n-id";
const L10NARGS_ATTR_NAME = "data-l10n-args";
const L10N_ELEMENT_QUERY = `[${L10NID_ATTR_NAME}]`;
class DOMLocalization extends Localization {
  constructor(resourceIds, generateBundles) {
    super(resourceIds, generateBundles);
    this.roots = new Set();
    this.pendingrAF = null;
    this.pendingElements = new Set();
    this.windowElement = null;
    this.mutationObserver = null;
    this.observerConfig = {
      attributes: true,
      characterData: false,
      childList: true,
      subtree: true,
      attributeFilter: [L10NID_ATTR_NAME, L10NARGS_ATTR_NAME]
    };
  }
  onChange(eager = false) {
    super.onChange(eager);
    if (this.roots) {
      this.translateRoots();
    }
  }
  setAttributes(element, id, args) {
    element.setAttribute(L10NID_ATTR_NAME, id);
    if (args) {
      element.setAttribute(L10NARGS_ATTR_NAME, JSON.stringify(args));
    } else {
      element.removeAttribute(L10NARGS_ATTR_NAME);
    }
    return element;
  }
  getAttributes(element) {
    return {
      id: element.getAttribute(L10NID_ATTR_NAME),
      args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME) || null)
    };
  }
  connectRoot(newRoot) {
    for (const root of this.roots) {
      if (root === newRoot || root.contains(newRoot) || newRoot.contains(root)) {
        throw new Error("Cannot add a root that overlaps with existing root.");
      }
    }
    if (this.windowElement) {
      if (this.windowElement !== newRoot.ownerDocument.defaultView) {
        throw new Error(`Cannot connect a root:
          DOMLocalization already has a root from a different window.`);
      }
    } else {
      this.windowElement = newRoot.ownerDocument.defaultView;
      this.mutationObserver = new this.windowElement.MutationObserver(mutations => this.translateMutations(mutations));
    }
    this.roots.add(newRoot);
    this.mutationObserver.observe(newRoot, this.observerConfig);
  }
  disconnectRoot(root) {
    this.roots.delete(root);
    this.pauseObserving();
    if (this.roots.size === 0) {
      this.mutationObserver = null;
      if (this.windowElement && this.pendingrAF) {
        this.windowElement.cancelAnimationFrame(this.pendingrAF);
      }
      this.windowElement = null;
      this.pendingrAF = null;
      this.pendingElements.clear();
      return true;
    }
    this.resumeObserving();
    return false;
  }
  translateRoots() {
    const roots = Array.from(this.roots);
    return Promise.all(roots.map(root => this.translateFragment(root)));
  }
  pauseObserving() {
    if (!this.mutationObserver) {
      return;
    }
    this.translateMutations(this.mutationObserver.takeRecords());
    this.mutationObserver.disconnect();
  }
  resumeObserving() {
    if (!this.mutationObserver) {
      return;
    }
    for (const root of this.roots) {
      this.mutationObserver.observe(root, this.observerConfig);
    }
  }
  translateMutations(mutations) {
    for (const mutation of mutations) {
      switch (mutation.type) {
        case "attributes":
          if (mutation.target.hasAttribute("data-l10n-id")) {
            this.pendingElements.add(mutation.target);
          }
          break;
        case "childList":
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === addedNode.ELEMENT_NODE) {
              if (addedNode.childElementCount) {
                for (const element of this.getTranslatables(addedNode)) {
                  this.pendingElements.add(element);
                }
              } else if (addedNode.hasAttribute(L10NID_ATTR_NAME)) {
                this.pendingElements.add(addedNode);
              }
            }
          }
          break;
      }
    }
    if (this.pendingElements.size > 0) {
      if (this.pendingrAF === null) {
        this.pendingrAF = this.windowElement.requestAnimationFrame(() => {
          this.translateElements(Array.from(this.pendingElements));
          this.pendingElements.clear();
          this.pendingrAF = null;
        });
      }
    }
  }
  translateFragment(frag) {
    return this.translateElements(this.getTranslatables(frag));
  }
  async translateElements(elements) {
    if (!elements.length) {
      return undefined;
    }
    const keys = elements.map(this.getKeysForElement);
    const translations = await this.formatMessages(keys);
    return this.applyTranslations(elements, translations);
  }
  applyTranslations(elements, translations) {
    this.pauseObserving();
    for (let i = 0; i < elements.length; i++) {
      if (translations[i] !== undefined) {
        translateElement(elements[i], translations[i]);
      }
    }
    this.resumeObserving();
  }
  getTranslatables(element) {
    const nodes = Array.from(element.querySelectorAll(L10N_ELEMENT_QUERY));
    if (typeof element.hasAttribute === "function" && element.hasAttribute(L10NID_ATTR_NAME)) {
      nodes.push(element);
    }
    return nodes;
  }
  getKeysForElement(element) {
    return {
      id: element.getAttribute(L10NID_ATTR_NAME),
      args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME) || null)
    };
  }
}
;// ./node_modules/@fluent/dom/esm/index.js


;// ./web/l10n.js









function l10n_classPrivateFieldInitSpec(e, t, a) { l10n_checkPrivateRedeclaration(e, t), t.set(e, a); }
function l10n_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function l10n_classPrivateFieldGet(s, a) { return s.get(l10n_assertClassBrand(s, a)); }
function l10n_classPrivateFieldSet(s, a, r) { return s.set(l10n_assertClassBrand(s, a), r), r; }
function l10n_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _dir = /*#__PURE__*/new WeakMap();
var _elements = /*#__PURE__*/new WeakMap();
var _lang = /*#__PURE__*/new WeakMap();
var _l10n = /*#__PURE__*/new WeakMap();
class L10n {
  constructor({
    lang,
    isRTL
  }, l10n = null) {
    l10n_classPrivateFieldInitSpec(this, _dir, void 0);
    l10n_classPrivateFieldInitSpec(this, _elements, void 0);
    l10n_classPrivateFieldInitSpec(this, _lang, void 0);
    l10n_classPrivateFieldInitSpec(this, _l10n, void 0);
    l10n_classPrivateFieldSet(_lang, this, _fixupLangCode.call(L10n, lang));
    l10n_classPrivateFieldSet(_l10n, this, l10n);
    l10n_classPrivateFieldSet(_dir, this, (isRTL !== null && isRTL !== void 0 ? isRTL : _isRTL.call(L10n, l10n_classPrivateFieldGet(_lang, this))) ? "rtl" : "ltr");
  }
  _setL10n(l10n) {
    l10n_classPrivateFieldSet(_l10n, this, l10n);
  }
  getLanguage() {
    return l10n_classPrivateFieldGet(_lang, this);
  }
  getDirection() {
    return l10n_classPrivateFieldGet(_dir, this);
  }
  async get(ids, args = null, fallback) {
    var _messages$;
    if (Array.isArray(ids)) {
      ids = ids.map(id => ({
        id
      }));
      const messages = await l10n_classPrivateFieldGet(_l10n, this).formatMessages(ids);
      return messages.map(message => message.value);
    }
    const messages = await l10n_classPrivateFieldGet(_l10n, this).formatMessages([{
      id: ids,
      args
    }]);
    return ((_messages$ = messages[0]) === null || _messages$ === void 0 ? void 0 : _messages$.value) || fallback;
  }
  async translate(element) {
    (l10n_classPrivateFieldGet(_elements, this) || l10n_classPrivateFieldSet(_elements, this, new Set())).add(element);
    try {
      l10n_classPrivateFieldGet(_l10n, this).connectRoot(element);
      await l10n_classPrivateFieldGet(_l10n, this).translateRoots();
    } catch {}
  }
  async translateOnce(element) {
    try {
      await l10n_classPrivateFieldGet(_l10n, this).translateElements([element]);
    } catch (ex) {
      console.error(`translateOnce: "${ex}".`);
    }
  }
  async destroy() {
    if (l10n_classPrivateFieldGet(_elements, this)) {
      for (const element of l10n_classPrivateFieldGet(_elements, this)) {
        l10n_classPrivateFieldGet(_l10n, this).disconnectRoot(element);
      }
      l10n_classPrivateFieldGet(_elements, this).clear();
      l10n_classPrivateFieldSet(_elements, this, null);
    }
    l10n_classPrivateFieldGet(_l10n, this).pauseObserving();
  }
  pause() {
    l10n_classPrivateFieldGet(_l10n, this).pauseObserving();
  }
  resume() {
    l10n_classPrivateFieldGet(_l10n, this).resumeObserving();
  }
}
function _fixupLangCode(langCode) {
  var _langCode;
  langCode = ((_langCode = langCode) === null || _langCode === void 0 ? void 0 : _langCode.toLowerCase()) || "en-us";
  const PARTIAL_LANG_CODES = {
    en: "en-us",
    es: "es-es",
    fy: "fy-nl",
    ga: "ga-ie",
    gu: "gu-in",
    hi: "hi-in",
    hy: "hy-am",
    nb: "nb-no",
    ne: "ne-np",
    nn: "nn-no",
    pa: "pa-in",
    pt: "pt-pt",
    sv: "sv-se",
    zh: "zh-cn"
  };
  return PARTIAL_LANG_CODES[langCode] || langCode;
}
function _isRTL(lang) {
  const shortCode = lang.split("-", 1)[0];
  return ["ar", "he", "fa", "ps", "ur"].includes(shortCode);
}
const GenericL10n = null;

;// ./web/genericl10n.js
var _GenericL10n;






function genericl10n_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }




function createBundle(lang, text) {
  const resource = new FluentResource(text);
  const bundle = new FluentBundle(lang);
  const errors = bundle.addResource(resource);
  if (errors.length) {
    console.error("L10n errors", errors);
  }
  return bundle;
}
class genericl10n_GenericL10n extends L10n {
  constructor(lang) {
    super({
      lang
    });
    const generateBundles = !lang ? _generateBundlesFallback.bind(genericl10n_GenericL10n, this.getLanguage()) : _generateBundles.bind(genericl10n_GenericL10n, "en-us", this.getLanguage());
    this._setL10n(new DOMLocalization([], generateBundles));
  }
}
_GenericL10n = genericl10n_GenericL10n;
async function* _generateBundles(defaultLang, baseLang) {
  const {
    baseURL,
    paths
  } = await genericl10n_assertClassBrand(_GenericL10n, this, _getPaths).call(this);
  const langs = [baseLang];
  if (defaultLang !== baseLang) {
    const shortLang = baseLang.split("-", 1)[0];
    if (shortLang !== baseLang) {
      langs.push(shortLang);
    }
    langs.push(defaultLang);
  }
  for (const lang of langs) {
    const bundle = await genericl10n_assertClassBrand(_GenericL10n, this, _createBundle).call(this, lang, baseURL, paths);
    if (bundle) {
      yield bundle;
    } else if (lang === "en-us") {
      yield genericl10n_assertClassBrand(_GenericL10n, this, _createBundleFallback).call(this, lang);
    }
  }
}
async function _createBundle(lang, baseURL, paths) {
  const path = paths[lang];
  if (!path) {
    return null;
  }
  const url = new URL(path, baseURL);
  const text = await fetchData(url, "text");
  return createBundle(lang, text);
}
async function _getPaths() {
  try {
    const {
      href
    } = document.querySelector(`link[type="application/l10n"]`);
    const paths = await fetchData(href, "json");
    return {
      baseURL: href.replace(/[^/]*$/, "") || "./",
      paths
    };
  } catch {}
  return {
    baseURL: "./",
    paths: Object.create(null)
  };
}
async function* _generateBundlesFallback(lang) {
  yield genericl10n_assertClassBrand(_GenericL10n, this, _createBundleFallback).call(this, lang);
}
async function _createBundleFallback(lang) {
  const text = "pdfjs-previous-button =\n    .title = Previous Page\npdfjs-previous-button-label = Previous\npdfjs-next-button =\n    .title = Next Page\npdfjs-next-button-label = Next\npdfjs-page-input =\n    .title = Page\npdfjs-of-pages = of { $pagesCount }\npdfjs-page-of-pages = ({ $pageNumber } of { $pagesCount })\npdfjs-zoom-out-button =\n    .title = Zoom Out\npdfjs-zoom-out-button-label = Zoom Out\npdfjs-zoom-in-button =\n    .title = Zoom In\npdfjs-zoom-in-button-label = Zoom In\npdfjs-zoom-select =\n    .title = Zoom\npdfjs-presentation-mode-button =\n    .title = Switch to Presentation Mode\npdfjs-presentation-mode-button-label = Presentation Mode\npdfjs-open-file-button =\n    .title = Open File\npdfjs-open-file-button-label = Open\npdfjs-print-button =\n    .title = Print\npdfjs-print-button-label = Print\npdfjs-save-button =\n    .title = Save\npdfjs-save-button-label = Save\npdfjs-download-button =\n    .title = Download\npdfjs-download-button-label = Download\npdfjs-bookmark-button =\n    .title = Current Page (View URL from Current Page)\npdfjs-bookmark-button-label = Current Page\npdfjs-tools-button =\n    .title = Tools\npdfjs-tools-button-label = Tools\npdfjs-first-page-button =\n    .title = Go to First Page\npdfjs-first-page-button-label = Go to First Page\npdfjs-last-page-button =\n    .title = Go to Last Page\npdfjs-last-page-button-label = Go to Last Page\npdfjs-page-rotate-cw-button =\n    .title = Rotate Clockwise\npdfjs-page-rotate-cw-button-label = Rotate Clockwise\npdfjs-page-rotate-ccw-button =\n    .title = Rotate Counterclockwise\npdfjs-page-rotate-ccw-button-label = Rotate Counterclockwise\npdfjs-cursor-text-select-tool-button =\n    .title = Enable Text Selection Tool\npdfjs-cursor-text-select-tool-button-label = Text Selection Tool\npdfjs-cursor-hand-tool-button =\n    .title = Enable Hand Tool\npdfjs-cursor-hand-tool-button-label = Hand Tool\npdfjs-scroll-page-button =\n    .title = Use Page Scrolling\npdfjs-scroll-page-button-label = Page Scrolling\npdfjs-scroll-vertical-button =\n    .title = Use Vertical Scrolling\npdfjs-scroll-vertical-button-label = Vertical Scrolling\npdfjs-scroll-horizontal-button =\n    .title = Use Horizontal Scrolling\npdfjs-scroll-horizontal-button-label = Horizontal Scrolling\npdfjs-scroll-wrapped-button =\n    .title = Use Wrapped Scrolling\npdfjs-scroll-wrapped-button-label = Wrapped Scrolling\npdfjs-spread-none-button =\n    .title = Do not join page spreads\npdfjs-spread-none-button-label = No Spreads\npdfjs-spread-odd-button =\n    .title = Join page spreads starting with odd-numbered pages\npdfjs-spread-odd-button-label = Odd Spreads\npdfjs-spread-even-button =\n    .title = Join page spreads starting with even-numbered pages\npdfjs-spread-even-button-label = Even Spreads\npdfjs-document-properties-button =\n    .title = Document Properties\u2026\npdfjs-document-properties-button-label = Document Properties\u2026\npdfjs-document-properties-file-name = File name:\npdfjs-document-properties-file-size = File size:\npdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)\npdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)\npdfjs-document-properties-title = Title:\npdfjs-document-properties-author = Author:\npdfjs-document-properties-subject = Subject:\npdfjs-document-properties-keywords = Keywords:\npdfjs-document-properties-creation-date = Creation Date:\npdfjs-document-properties-modification-date = Modification Date:\npdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: \"short\", timeStyle: \"medium\") }\npdfjs-document-properties-creator = Creator:\npdfjs-document-properties-producer = PDF Producer:\npdfjs-document-properties-version = PDF Version:\npdfjs-document-properties-page-count = Page Count:\npdfjs-document-properties-page-size = Page Size:\npdfjs-document-properties-page-size-unit-inches = in\npdfjs-document-properties-page-size-unit-millimeters = mm\npdfjs-document-properties-page-size-orientation-portrait = portrait\npdfjs-document-properties-page-size-orientation-landscape = landscape\npdfjs-document-properties-page-size-name-a-three = A3\npdfjs-document-properties-page-size-name-a-four = A4\npdfjs-document-properties-page-size-name-letter = Letter\npdfjs-document-properties-page-size-name-legal = Legal\npdfjs-document-properties-page-size-dimension-string = { $width } \xD7 { $height } { $unit } ({ $orientation })\npdfjs-document-properties-page-size-dimension-name-string = { $width } \xD7 { $height } { $unit } ({ $name }, { $orientation })\npdfjs-document-properties-linearized = Fast Web View:\npdfjs-document-properties-linearized-yes = Yes\npdfjs-document-properties-linearized-no = No\npdfjs-document-properties-close-button = Close\npdfjs-print-progress-message = Preparing document for printing\u2026\npdfjs-print-progress-percent = { $progress }%\npdfjs-print-progress-close-button = Cancel\npdfjs-printing-not-supported = Warning: Printing is not fully supported by this browser.\npdfjs-printing-not-ready = Warning: The PDF is not fully loaded for printing.\npdfjs-toggle-sidebar-button =\n    .title = Toggle Sidebar\npdfjs-toggle-sidebar-notification-button =\n    .title = Toggle Sidebar (document contains outline/attachments/layers)\npdfjs-toggle-sidebar-button-label = Toggle Sidebar\npdfjs-document-outline-button =\n    .title = Show Document Outline (double-click to expand/collapse all items)\npdfjs-document-outline-button-label = Document Outline\npdfjs-attachments-button =\n    .title = Show Attachments\npdfjs-attachments-button-label = Attachments\npdfjs-layers-button =\n    .title = Show Layers (double-click to reset all layers to the default state)\npdfjs-layers-button-label = Layers\npdfjs-thumbs-button =\n    .title = Show Thumbnails\npdfjs-thumbs-button-label = Thumbnails\npdfjs-current-outline-item-button =\n    .title = Find Current Outline Item\npdfjs-current-outline-item-button-label = Current Outline Item\npdfjs-findbar-button =\n    .title = Find in Document\npdfjs-findbar-button-label = Find\npdfjs-additional-layers = Additional Layers\npdfjs-thumb-page-title =\n    .title = Page { $page }\npdfjs-thumb-page-canvas =\n    .aria-label = Thumbnail of Page { $page }\npdfjs-find-input =\n    .title = Find\n    .placeholder = Find in document\u2026\npdfjs-find-previous-button =\n    .title = Find the previous occurrence of the phrase\npdfjs-find-previous-button-label = Previous\npdfjs-find-next-button =\n    .title = Find the next occurrence of the phrase\npdfjs-find-next-button-label = Next\npdfjs-find-highlight-checkbox = Highlight All\npdfjs-find-match-case-checkbox-label = Match Case\npdfjs-find-match-diacritics-checkbox-label = Match Diacritics\npdfjs-find-entire-word-checkbox-label = Whole Words\npdfjs-find-reached-top = Reached top of document, continued from bottom\npdfjs-find-reached-bottom = Reached end of document, continued from top\npdfjs-find-match-count =\n    { $total ->\n        [one] { $current } of { $total } match\n       *[other] { $current } of { $total } matches\n    }\npdfjs-find-match-count-limit =\n    { $limit ->\n        [one] More than { $limit } match\n       *[other] More than { $limit } matches\n    }\npdfjs-find-not-found = Phrase not found\npdfjs-page-scale-width = Page Width\npdfjs-page-scale-fit = Page Fit\npdfjs-page-scale-auto = Automatic Zoom\npdfjs-page-scale-actual = Actual Size\npdfjs-page-scale-percent = { $scale }%\npdfjs-page-landmark =\n    .aria-label = Page { $page }\npdfjs-loading-error = An error occurred while loading the PDF.\npdfjs-invalid-file-error = Invalid or corrupted PDF file.\npdfjs-missing-file-error = Missing PDF file.\npdfjs-unexpected-response-error = Unexpected server response.\npdfjs-rendering-error = An error occurred while rendering the page.\npdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: \"short\", timeStyle: \"medium\") }\npdfjs-text-annotation-type =\n    .alt = [{ $type } Annotation]\npdfjs-password-label = Enter the password to open this PDF file.\npdfjs-password-invalid = Invalid password. Please try again.\npdfjs-password-ok-button = OK\npdfjs-password-cancel-button = Cancel\npdfjs-web-fonts-disabled = Web fonts are disabled: unable to use embedded PDF fonts.\npdfjs-editor-free-text-button =\n    .title = Text\npdfjs-editor-free-text-button-label = Text\npdfjs-editor-ink-button =\n    .title = Draw\npdfjs-editor-ink-button-label = Draw\npdfjs-editor-stamp-button =\n    .title = Add or edit images\npdfjs-editor-stamp-button-label = Add or edit images\npdfjs-editor-highlight-button =\n    .title = Highlight\npdfjs-editor-highlight-button-label = Highlight\npdfjs-highlight-floating-button1 =\n    .title = Highlight\n    .aria-label = Highlight\npdfjs-highlight-floating-button-label = Highlight\npdfjs-editor-remove-ink-button =\n    .title = Remove drawing\npdfjs-editor-remove-freetext-button =\n    .title = Remove text\npdfjs-editor-remove-stamp-button =\n    .title = Remove image\npdfjs-editor-remove-highlight-button =\n    .title = Remove highlight\npdfjs-editor-free-text-color-input = Color\npdfjs-editor-free-text-size-input = Size\npdfjs-editor-ink-color-input = Color\npdfjs-editor-ink-thickness-input = Thickness\npdfjs-editor-ink-opacity-input = Opacity\npdfjs-editor-stamp-add-image-button =\n    .title = Add image\npdfjs-editor-stamp-add-image-button-label = Add image\npdfjs-editor-free-highlight-thickness-input = Thickness\npdfjs-editor-free-highlight-thickness-title =\n    .title = Change thickness when highlighting items other than text\npdfjs-free-text2 =\n    .aria-label = Text Editor\n    .default-content = Start typing\u2026\npdfjs-ink =\n    .aria-label = Draw Editor\npdfjs-ink-canvas =\n    .aria-label = User-created image\npdfjs-editor-alt-text-button =\n    .aria-label = Alt text\npdfjs-editor-alt-text-button-label = Alt text\npdfjs-editor-alt-text-edit-button =\n    .aria-label = Edit alt text\npdfjs-editor-alt-text-dialog-label = Choose an option\npdfjs-editor-alt-text-dialog-description = Alt text (alternative text) helps when people can\u2019t see the image or when it doesn\u2019t load.\npdfjs-editor-alt-text-add-description-label = Add a description\npdfjs-editor-alt-text-add-description-description = Aim for 1-2 sentences that describe the subject, setting, or actions.\npdfjs-editor-alt-text-mark-decorative-label = Mark as decorative\npdfjs-editor-alt-text-mark-decorative-description = This is used for ornamental images, like borders or watermarks.\npdfjs-editor-alt-text-cancel-button = Cancel\npdfjs-editor-alt-text-save-button = Save\npdfjs-editor-alt-text-decorative-tooltip = Marked as decorative\npdfjs-editor-alt-text-textarea =\n    .placeholder = For example, \u201CA young man sits down at a table to eat a meal\u201D\npdfjs-editor-resizer-top-left =\n    .aria-label = Top left corner \u2014 resize\npdfjs-editor-resizer-top-middle =\n    .aria-label = Top middle \u2014 resize\npdfjs-editor-resizer-top-right =\n    .aria-label = Top right corner \u2014 resize\npdfjs-editor-resizer-middle-right =\n    .aria-label = Middle right \u2014 resize\npdfjs-editor-resizer-bottom-right =\n    .aria-label = Bottom right corner \u2014 resize\npdfjs-editor-resizer-bottom-middle =\n    .aria-label = Bottom middle \u2014 resize\npdfjs-editor-resizer-bottom-left =\n    .aria-label = Bottom left corner \u2014 resize\npdfjs-editor-resizer-middle-left =\n    .aria-label = Middle left \u2014 resize\npdfjs-editor-highlight-colorpicker-label = Highlight color\npdfjs-editor-colorpicker-button =\n    .title = Change color\npdfjs-editor-colorpicker-dropdown =\n    .aria-label = Color choices\npdfjs-editor-colorpicker-yellow =\n    .title = Yellow\npdfjs-editor-colorpicker-green =\n    .title = Green\npdfjs-editor-colorpicker-blue =\n    .title = Blue\npdfjs-editor-colorpicker-pink =\n    .title = Pink\npdfjs-editor-colorpicker-red =\n    .title = Red\npdfjs-editor-highlight-show-all-button-label = Show all\npdfjs-editor-highlight-show-all-button =\n    .title = Show all\npdfjs-editor-new-alt-text-dialog-edit-label = Edit alt text (image description)\npdfjs-editor-new-alt-text-dialog-add-label = Add alt text (image description)\npdfjs-editor-new-alt-text-textarea =\n    .placeholder = Write your description here\u2026\npdfjs-editor-new-alt-text-description = Short description for people who can\u2019t see the image or when the image doesn\u2019t load.\npdfjs-editor-new-alt-text-disclaimer1 = This alt text was created automatically and may be inaccurate.\npdfjs-editor-new-alt-text-disclaimer-learn-more-url = Learn more\npdfjs-editor-new-alt-text-create-automatically-button-label = Create alt text automatically\npdfjs-editor-new-alt-text-not-now-button = Not now\npdfjs-editor-new-alt-text-error-title = Couldn\u2019t create alt text automatically\npdfjs-editor-new-alt-text-error-description = Please write your own alt text or try again later.\npdfjs-editor-new-alt-text-error-close-button = Close\npdfjs-editor-new-alt-text-ai-model-downloading-progress = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)\n    .aria-valuetext = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)\npdfjs-editor-new-alt-text-added-button =\n    .aria-label = Alt text added\npdfjs-editor-new-alt-text-added-button-label = Alt text added\npdfjs-editor-new-alt-text-missing-button =\n    .aria-label = Missing alt text\npdfjs-editor-new-alt-text-missing-button-label = Missing alt text\npdfjs-editor-new-alt-text-to-review-button =\n    .aria-label = Review alt text\npdfjs-editor-new-alt-text-to-review-button-label = Review alt text\npdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer = Created automatically: { $generatedAltText }\npdfjs-image-alt-text-settings-button =\n    .title = Image alt text settings\npdfjs-image-alt-text-settings-button-label = Image alt text settings\npdfjs-editor-alt-text-settings-dialog-label = Image alt text settings\npdfjs-editor-alt-text-settings-automatic-title = Automatic alt text\npdfjs-editor-alt-text-settings-create-model-button-label = Create alt text automatically\npdfjs-editor-alt-text-settings-create-model-description = Suggests descriptions to help people who can\u2019t see the image or when the image doesn\u2019t load.\npdfjs-editor-alt-text-settings-download-model-label = Alt text AI model ({ $totalSize } MB)\npdfjs-editor-alt-text-settings-ai-model-description = Runs locally on your device so your data stays private. Required for automatic alt text.\npdfjs-editor-alt-text-settings-delete-model-button = Delete\npdfjs-editor-alt-text-settings-download-model-button = Download\npdfjs-editor-alt-text-settings-downloading-model-button = Downloading\u2026\npdfjs-editor-alt-text-settings-editor-title = Alt text editor\npdfjs-editor-alt-text-settings-show-dialog-button-label = Show alt text editor right away when adding an image\npdfjs-editor-alt-text-settings-show-dialog-description = Helps you make sure all your images have alt text.\npdfjs-editor-alt-text-settings-close-button = Close";
  return createBundle(lang, text);
}

;// ./web/pdf_history.js


function pdf_history_classPrivateMethodInitSpec(e, a) { pdf_history_checkPrivateRedeclaration(e, a), a.add(e); }
function pdf_history_classPrivateFieldInitSpec(e, t, a) { pdf_history_checkPrivateRedeclaration(e, t), t.set(e, a); }
function pdf_history_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function pdf_history_classPrivateFieldSet(s, a, r) { return s.set(pdf_history_assertClassBrand(s, a), r), r; }
function pdf_history_classPrivateFieldGet(s, a) { return s.get(pdf_history_assertClassBrand(s, a)); }
function pdf_history_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


const HASH_CHANGE_TIMEOUT = 1000;
const POSITION_UPDATED_THRESHOLD = 50;
const UPDATE_VIEWAREA_TIMEOUT = 1000;
function getCurrentHash() {
  return document.location.hash;
}
var pdf_history_eventAbortController = /*#__PURE__*/new WeakMap();
var _PDFHistory_brand = /*#__PURE__*/new WeakSet();
class PDFHistory {
  constructor({
    linkService,
    eventBus
  }) {
    pdf_history_classPrivateMethodInitSpec(this, _PDFHistory_brand);
    pdf_history_classPrivateFieldInitSpec(this, pdf_history_eventAbortController, null);
    this.linkService = linkService;
    this.eventBus = eventBus;
    this._initialized = false;
    this._fingerprint = "";
    this.reset();
    this.eventBus._on("pagesinit", () => {
      this._isPagesLoaded = false;
      this.eventBus._on("pagesloaded", evt => {
        this._isPagesLoaded = !!evt.pagesCount;
      }, {
        once: true
      });
    });
  }
  initialize({
    fingerprint,
    resetHistory = false,
    updateUrl = false
  }) {
    if (!fingerprint || typeof fingerprint !== "string") {
      console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.');
      return;
    }
    if (this._initialized) {
      this.reset();
    }
    const reInitialized = this._fingerprint !== "" && this._fingerprint !== fingerprint;
    this._fingerprint = fingerprint;
    this._updateUrl = updateUrl === true;
    this._initialized = true;
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _bindEvents).call(this);
    const state = window.history.state;
    this._popStateInProgress = false;
    this._blockHashChange = 0;
    this._currentHash = getCurrentHash();
    this._numPositionUpdates = 0;
    this._uid = this._maxUid = 0;
    this._destination = null;
    this._position = null;
    if (!pdf_history_assertClassBrand(_PDFHistory_brand, this, _isValidState).call(this, state, true) || resetHistory) {
      const {
        hash,
        page,
        rotation
      } = pdf_history_assertClassBrand(_PDFHistory_brand, this, _parseCurrentHash).call(this, true);
      if (!hash || reInitialized || resetHistory) {
        pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, null, true);
        return;
      }
      pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, {
        hash,
        page,
        rotation
      }, true);
      return;
    }
    const destination = state.destination;
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _updateInternalState).call(this, destination, state.uid, true);
    if (destination.rotation !== undefined) {
      this._initialRotation = destination.rotation;
    }
    if (destination.dest) {
      this._initialBookmark = JSON.stringify(destination.dest);
      this._destination.page = null;
    } else if (destination.hash) {
      this._initialBookmark = destination.hash;
    } else if (destination.page) {
      this._initialBookmark = `page=${destination.page}`;
    }
  }
  reset() {
    if (this._initialized) {
      pdf_history_assertClassBrand(_PDFHistory_brand, this, _pageHide).call(this);
      this._initialized = false;
      pdf_history_assertClassBrand(_PDFHistory_brand, this, _unbindEvents).call(this);
    }
    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }
    this._initialBookmark = null;
    this._initialRotation = null;
  }
  push({
    namedDest = null,
    explicitDest,
    pageNumber
  }) {
    if (!this._initialized) {
      return;
    }
    if (namedDest && typeof namedDest !== "string") {
      console.error("PDFHistory.push: " + `"${namedDest}" is not a valid namedDest parameter.`);
      return;
    } else if (!Array.isArray(explicitDest)) {
      console.error("PDFHistory.push: " + `"${explicitDest}" is not a valid explicitDest parameter.`);
      return;
    } else if (!pdf_history_assertClassBrand(_PDFHistory_brand, this, _isValidPage).call(this, pageNumber)) {
      if (pageNumber !== null || this._destination) {
        console.error("PDFHistory.push: " + `"${pageNumber}" is not a valid pageNumber parameter.`);
        return;
      }
    }
    const hash = namedDest || JSON.stringify(explicitDest);
    if (!hash) {
      return;
    }
    let forceReplace = false;
    if (this._destination && (isDestHashesEqual(this._destination.hash, hash) || isDestArraysEqual(this._destination.dest, explicitDest))) {
      if (this._destination.page) {
        return;
      }
      forceReplace = true;
    }
    if (this._popStateInProgress && !forceReplace) {
      return;
    }
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, {
      dest: explicitDest,
      hash,
      page: pageNumber,
      rotation: this.linkService.rotation
    }, forceReplace);
    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() => {
        this._popStateInProgress = false;
      });
    }
  }
  pushPage(pageNumber) {
    var _this$_destination;
    if (!this._initialized) {
      return;
    }
    if (!pdf_history_assertClassBrand(_PDFHistory_brand, this, _isValidPage).call(this, pageNumber)) {
      console.error(`PDFHistory.pushPage: "${pageNumber}" is not a valid page number.`);
      return;
    }
    if (((_this$_destination = this._destination) === null || _this$_destination === void 0 ? void 0 : _this$_destination.page) === pageNumber) {
      return;
    }
    if (this._popStateInProgress) {
      return;
    }
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, {
      dest: null,
      hash: `page=${pageNumber}`,
      page: pageNumber,
      rotation: this.linkService.rotation
    });
    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() => {
        this._popStateInProgress = false;
      });
    }
  }
  pushCurrentPosition() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _tryPushCurrentPosition).call(this);
  }
  back() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }
    const state = window.history.state;
    if (pdf_history_assertClassBrand(_PDFHistory_brand, this, _isValidState).call(this, state) && state.uid > 0) {
      window.history.back();
    }
  }
  forward() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }
    const state = window.history.state;
    if (pdf_history_assertClassBrand(_PDFHistory_brand, this, _isValidState).call(this, state) && state.uid < this._maxUid) {
      window.history.forward();
    }
  }
  get popStateInProgress() {
    return this._initialized && (this._popStateInProgress || this._blockHashChange > 0);
  }
  get initialBookmark() {
    return this._initialized ? this._initialBookmark : null;
  }
  get initialRotation() {
    return this._initialized ? this._initialRotation : null;
  }
}
function _pushOrReplaceState(destination, forceReplace = false) {
  var _window$history$state;
  const shouldReplace = forceReplace || !this._destination;
  const newState = {
    fingerprint: this._fingerprint,
    uid: shouldReplace ? this._uid : this._uid + 1,
    destination
  };
  pdf_history_assertClassBrand(_PDFHistory_brand, this, _updateInternalState).call(this, destination, newState.uid);
  let newUrl;
  if (this._updateUrl && destination !== null && destination !== void 0 && destination.hash) {
    const baseUrl = document.location.href.split("#", 1)[0];
    if (!baseUrl.startsWith("file://")) {
      newUrl = `${baseUrl}#${destination.hash}`;
    }
  }
  if (shouldReplace) {
    window.history.replaceState(newState, "", newUrl);
  } else {
    window.history.pushState(newState, "", newUrl);
  }
}
function _tryPushCurrentPosition(temporary = false) {
  if (!this._position) {
    return;
  }
  let position = this._position;
  if (temporary) {
    position = Object.assign(Object.create(null), this._position);
    position.temporary = true;
  }
  if (!this._destination) {
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, position);
    return;
  }
  if (this._destination.temporary) {
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, position, true);
    return;
  }
  if (this._destination.hash === position.hash) {
    return;
  }
  if (!this._destination.page && (POSITION_UPDATED_THRESHOLD <= 0 || this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD)) {
    return;
  }
  let forceReplace = false;
  if (this._destination.page >= position.first && this._destination.page <= position.page) {
    if (this._destination.dest !== undefined || !this._destination.first) {
      return;
    }
    forceReplace = true;
  }
  pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, position, forceReplace);
}
function _isValidPage(val) {
  return Number.isInteger(val) && val > 0 && val <= this.linkService.pagesCount;
}
function _isValidState(state, checkReload = false) {
  if (!state) {
    return false;
  }
  if (state.fingerprint !== this._fingerprint) {
    if (checkReload) {
      if (typeof state.fingerprint !== "string" || state.fingerprint.length !== this._fingerprint.length) {
        return false;
      }
      const [perfEntry] = performance.getEntriesByType("navigation");
      if ((perfEntry === null || perfEntry === void 0 ? void 0 : perfEntry.type) !== "reload") {
        return false;
      }
    } else {
      return false;
    }
  }
  if (!Number.isInteger(state.uid) || state.uid < 0) {
    return false;
  }
  if (state.destination === null || typeof state.destination !== "object") {
    return false;
  }
  return true;
}
function _updateInternalState(destination, uid, removeTemporary = false) {
  if (this._updateViewareaTimeout) {
    clearTimeout(this._updateViewareaTimeout);
    this._updateViewareaTimeout = null;
  }
  if (removeTemporary && destination !== null && destination !== void 0 && destination.temporary) {
    delete destination.temporary;
  }
  this._destination = destination;
  this._uid = uid;
  this._maxUid = Math.max(this._maxUid, uid);
  this._numPositionUpdates = 0;
}
function _parseCurrentHash(checkNameddest = false) {
  const hash = unescape(getCurrentHash()).substring(1);
  const params = parseQueryString(hash);
  const nameddest = params.get("nameddest") || "";
  let page = params.get("page") | 0;
  if (!pdf_history_assertClassBrand(_PDFHistory_brand, this, _isValidPage).call(this, page) || checkNameddest && nameddest.length > 0) {
    page = null;
  }
  return {
    hash,
    page,
    rotation: this.linkService.rotation
  };
}
function _updateViewarea({
  location
}) {
  if (this._updateViewareaTimeout) {
    clearTimeout(this._updateViewareaTimeout);
    this._updateViewareaTimeout = null;
  }
  this._position = {
    hash: location.pdfOpenParams.substring(1),
    page: this.linkService.page,
    first: location.pageNumber,
    rotation: location.rotation
  };
  if (this._popStateInProgress) {
    return;
  }
  if (POSITION_UPDATED_THRESHOLD > 0 && this._isPagesLoaded && this._destination && !this._destination.page) {
    this._numPositionUpdates++;
  }
  if (UPDATE_VIEWAREA_TIMEOUT > 0) {
    this._updateViewareaTimeout = setTimeout(() => {
      if (!this._popStateInProgress) {
        pdf_history_assertClassBrand(_PDFHistory_brand, this, _tryPushCurrentPosition).call(this, true);
      }
      this._updateViewareaTimeout = null;
    }, UPDATE_VIEWAREA_TIMEOUT);
  }
}
function _popState({
  state
}) {
  const newHash = getCurrentHash(),
    hashChanged = this._currentHash !== newHash;
  this._currentHash = newHash;
  if (!state) {
    this._uid++;
    const {
      hash,
      page,
      rotation
    } = pdf_history_assertClassBrand(_PDFHistory_brand, this, _parseCurrentHash).call(this);
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _pushOrReplaceState).call(this, {
      hash,
      page,
      rotation
    }, true);
    return;
  }
  if (!pdf_history_assertClassBrand(_PDFHistory_brand, this, _isValidState).call(this, state)) {
    return;
  }
  this._popStateInProgress = true;
  if (hashChanged) {
    this._blockHashChange++;
    waitOnEventOrTimeout({
      target: window,
      name: "hashchange",
      delay: HASH_CHANGE_TIMEOUT
    }).then(() => {
      this._blockHashChange--;
    });
  }
  const destination = state.destination;
  pdf_history_assertClassBrand(_PDFHistory_brand, this, _updateInternalState).call(this, destination, state.uid, true);
  if (isValidRotation(destination.rotation)) {
    this.linkService.rotation = destination.rotation;
  }
  if (destination.dest) {
    this.linkService.goToDestination(destination.dest);
  } else if (destination.hash) {
    this.linkService.setHash(destination.hash);
  } else if (destination.page) {
    this.linkService.page = destination.page;
  }
  Promise.resolve().then(() => {
    this._popStateInProgress = false;
  });
}
function _pageHide() {
  if (!this._destination || this._destination.temporary) {
    pdf_history_assertClassBrand(_PDFHistory_brand, this, _tryPushCurrentPosition).call(this);
  }
}
function _bindEvents() {
  if (pdf_history_classPrivateFieldGet(pdf_history_eventAbortController, this)) {
    return;
  }
  pdf_history_classPrivateFieldSet(pdf_history_eventAbortController, this, new AbortController());
  const {
    signal
  } = pdf_history_classPrivateFieldGet(pdf_history_eventAbortController, this);
  this.eventBus._on("updateviewarea", pdf_history_assertClassBrand(_PDFHistory_brand, this, _updateViewarea).bind(this), {
    signal
  });
  window.addEventListener("popstate", pdf_history_assertClassBrand(_PDFHistory_brand, this, _popState).bind(this), {
    signal
  });
  window.addEventListener("pagehide", pdf_history_assertClassBrand(_PDFHistory_brand, this, _pageHide).bind(this), {
    signal
  });
}
function _unbindEvents() {
  var _classPrivateFieldGet2;
  (_classPrivateFieldGet2 = pdf_history_classPrivateFieldGet(pdf_history_eventAbortController, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.abort();
  pdf_history_classPrivateFieldSet(pdf_history_eventAbortController, this, null);
}
function isDestHashesEqual(destHash, pushHash) {
  if (typeof destHash !== "string" || typeof pushHash !== "string") {
    return false;
  }
  if (destHash === pushHash) {
    return true;
  }
  const nameddest = parseQueryString(destHash).get("nameddest");
  if (nameddest === pushHash) {
    return true;
  }
  return false;
}
function isDestArraysEqual(firstDest, secondDest) {
  function isEntryEqual(first, second) {
    if (typeof first !== typeof second) {
      return false;
    }
    if (Array.isArray(first) || Array.isArray(second)) {
      return false;
    }
    if (first !== null && typeof first === "object" && second !== null) {
      if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
      }
      for (const key in first) {
        if (!isEntryEqual(first[key], second[key])) {
          return false;
        }
      }
      return true;
    }
    return first === second || Number.isNaN(first) && Number.isNaN(second);
  }
  if (!(Array.isArray(firstDest) && Array.isArray(secondDest))) {
    return false;
  }
  if (firstDest.length !== secondDest.length) {
    return false;
  }
  for (let i = 0, ii = firstDest.length; i < ii; i++) {
    if (!isEntryEqual(firstDest[i], secondDest[i])) {
      return false;
    }
  }
  return true;
}

;// ./web/annotation_editor_layer_builder.js

function annotation_editor_layer_builder_classPrivateFieldInitSpec(e, t, a) { annotation_editor_layer_builder_checkPrivateRedeclaration(e, t), t.set(e, a); }
function annotation_editor_layer_builder_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function annotation_editor_layer_builder_classPrivateFieldGet(s, a) { return s.get(annotation_editor_layer_builder_assertClassBrand(s, a)); }
function annotation_editor_layer_builder_classPrivateFieldSet(s, a, r) { return s.set(annotation_editor_layer_builder_assertClassBrand(s, a), r), r; }
function annotation_editor_layer_builder_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


var _annotationLayer = /*#__PURE__*/new WeakMap();
var _drawLayer = /*#__PURE__*/new WeakMap();
var annotation_editor_layer_builder_onAppend = /*#__PURE__*/new WeakMap();
var _structTreeLayer = /*#__PURE__*/new WeakMap();
var _textLayer = /*#__PURE__*/new WeakMap();
var _uiManager = /*#__PURE__*/new WeakMap();
class AnnotationEditorLayerBuilder {
  constructor(options) {
    annotation_editor_layer_builder_classPrivateFieldInitSpec(this, _annotationLayer, null);
    annotation_editor_layer_builder_classPrivateFieldInitSpec(this, _drawLayer, null);
    annotation_editor_layer_builder_classPrivateFieldInitSpec(this, annotation_editor_layer_builder_onAppend, null);
    annotation_editor_layer_builder_classPrivateFieldInitSpec(this, _structTreeLayer, null);
    annotation_editor_layer_builder_classPrivateFieldInitSpec(this, _textLayer, null);
    annotation_editor_layer_builder_classPrivateFieldInitSpec(this, _uiManager, void 0);
    this.pdfPage = options.pdfPage;
    this.accessibilityManager = options.accessibilityManager;
    this.l10n = options.l10n;
    this.l10n || (this.l10n = new genericl10n_GenericL10n());
    this.annotationEditorLayer = null;
    this.div = null;
    this._cancelled = false;
    annotation_editor_layer_builder_classPrivateFieldSet(_uiManager, this, options.uiManager);
    annotation_editor_layer_builder_classPrivateFieldSet(_annotationLayer, this, options.annotationLayer || null);
    annotation_editor_layer_builder_classPrivateFieldSet(_textLayer, this, options.textLayer || null);
    annotation_editor_layer_builder_classPrivateFieldSet(_drawLayer, this, options.drawLayer || null);
    annotation_editor_layer_builder_classPrivateFieldSet(annotation_editor_layer_builder_onAppend, this, options.onAppend || null);
    annotation_editor_layer_builder_classPrivateFieldSet(_structTreeLayer, this, options.structTreeLayer || null);
  }
  async render(viewport, intent = "display") {
    var _classPrivateFieldGet2;
    if (intent !== "display") {
      return;
    }
    if (this._cancelled) {
      return;
    }
    const clonedViewport = viewport.clone({
      dontFlip: true
    });
    if (this.div) {
      this.annotationEditorLayer.update({
        viewport: clonedViewport
      });
      this.show();
      return;
    }
    const div = this.div = document.createElement("div");
    div.className = "annotationEditorLayer";
    div.hidden = true;
    div.dir = annotation_editor_layer_builder_classPrivateFieldGet(_uiManager, this).direction;
    (_classPrivateFieldGet2 = annotation_editor_layer_builder_classPrivateFieldGet(annotation_editor_layer_builder_onAppend, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.call(this, div);
    this.annotationEditorLayer = new AnnotationEditorLayer({
      uiManager: annotation_editor_layer_builder_classPrivateFieldGet(_uiManager, this),
      div,
      structTreeLayer: annotation_editor_layer_builder_classPrivateFieldGet(_structTreeLayer, this),
      accessibilityManager: this.accessibilityManager,
      pageIndex: this.pdfPage.pageNumber - 1,
      l10n: this.l10n,
      viewport: clonedViewport,
      annotationLayer: annotation_editor_layer_builder_classPrivateFieldGet(_annotationLayer, this),
      textLayer: annotation_editor_layer_builder_classPrivateFieldGet(_textLayer, this),
      drawLayer: annotation_editor_layer_builder_classPrivateFieldGet(_drawLayer, this)
    });
    const parameters = {
      viewport: clonedViewport,
      div,
      annotations: null,
      intent
    };
    this.annotationEditorLayer.render(parameters);
    this.show();
  }
  cancel() {
    this._cancelled = true;
    if (!this.div) {
      return;
    }
    this.annotationEditorLayer.destroy();
  }
  hide() {
    if (!this.div) {
      return;
    }
    this.div.hidden = true;
  }
  show() {
    if (!this.div || this.annotationEditorLayer.isInvisible) {
      return;
    }
    this.div.hidden = false;
  }
}

;// ./web/app_options.js
var _AppOptions;
function app_options_defineProperty(e, r, t) { return (r = app_options_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function app_options_toPropertyKey(t) { var i = app_options_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function app_options_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function app_options_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


{
  var compatParams = new Map();
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const maxTouchPoints = navigator.maxTouchPoints || 1;
  const isAndroid = /Android/.test(userAgent);
  const isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) || platform === "MacIntel" && maxTouchPoints > 1;
  (function () {
    if (isIOS || isAndroid) {
      compatParams.set("maxCanvasPixels", 5242880);
    }
  })();
  (function () {
    if (isAndroid) {
      compatParams.set("useSystemFonts", false);
    }
  })();
}
const OptionKind = {
  BROWSER: 0x01,
  VIEWER: 0x02,
  API: 0x04,
  WORKER: 0x08,
  EVENT_DISPATCH: 0x10,
  PREFERENCE: 0x80
};
const Type = {
  BOOLEAN: 0x01,
  NUMBER: 0x02,
  OBJECT: 0x04,
  STRING: 0x08,
  UNDEFINED: 0x10
};
const defaultOptions = {
  allowedGlobalEvents: {
    value: null,
    kind: OptionKind.BROWSER
  },
  canvasMaxAreaInBytes: {
    value: -1,
    kind: OptionKind.BROWSER + OptionKind.API
  },
  isInAutomation: {
    value: false,
    kind: OptionKind.BROWSER
  },
  localeProperties: {
    value: {
      lang: navigator.language || "en-US"
    },
    kind: OptionKind.BROWSER
  },
  nimbusDataStr: {
    value: "",
    kind: OptionKind.BROWSER
  },
  supportsCaretBrowsingMode: {
    value: false,
    kind: OptionKind.BROWSER
  },
  supportsDocumentFonts: {
    value: true,
    kind: OptionKind.BROWSER
  },
  supportsIntegratedFind: {
    value: false,
    kind: OptionKind.BROWSER
  },
  supportsMouseWheelZoomCtrlKey: {
    value: true,
    kind: OptionKind.BROWSER
  },
  supportsMouseWheelZoomMetaKey: {
    value: true,
    kind: OptionKind.BROWSER
  },
  supportsPinchToZoom: {
    value: true,
    kind: OptionKind.BROWSER
  },
  toolbarDensity: {
    value: 0,
    kind: OptionKind.BROWSER + OptionKind.EVENT_DISPATCH
  },
  altTextLearnMoreUrl: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  annotationEditorMode: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  annotationMode: {
    value: 2,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cursorToolOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  debuggerSrc: {
    value: "./debugger.mjs",
    kind: OptionKind.VIEWER
  },
  defaultZoomDelay: {
    value: 400,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  defaultZoomValue: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  disableHistory: {
    value: false,
    kind: OptionKind.VIEWER
  },
  disablePageLabels: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableAltText: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableAltTextModelDownload: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE + OptionKind.EVENT_DISPATCH
  },
  enableGuessAltText: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE + OptionKind.EVENT_DISPATCH
  },
  enableHighlightFloatingButton: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableNewAltTextWhenAddingImage: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePermissions: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePrintAutoRotate: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableScripting: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableUpdatedAddImage: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  externalLinkRel: {
    value: "noopener noreferrer nofollow",
    kind: OptionKind.VIEWER
  },
  externalLinkTarget: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  highlightEditorColors: {
    value: "yellow=#FFFF98,green=#53FFBC,blue=#80EBFF,pink=#FFCBE6,red=#FF4F5F",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  historyUpdateUrl: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  ignoreDestinationZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  imageResourcesPath: {
    value: "./images/",
    kind: OptionKind.VIEWER
  },
  maxCanvasPixels: {
    value: 2 ** 25,
    kind: OptionKind.VIEWER
  },
  forcePageColors: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pageColorsBackground: {
    value: "Canvas",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pageColorsForeground: {
    value: "CanvasText",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pdfBugEnabled: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  printResolution: {
    value: 150,
    kind: OptionKind.VIEWER
  },
  sidebarViewOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  scrollModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  spreadModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  textLayerMode: {
    value: 1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cMapPacked: {
    value: true,
    kind: OptionKind.API
  },
  cMapUrl: {
    value: "../web/cmaps/",
    kind: OptionKind.API
  },
  disableAutoFetch: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableFontFace: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableRange: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableStream: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  docBaseUrl: {
    value: "",
    kind: OptionKind.API
  },
  enableHWA: {
    value: true,
    kind: OptionKind.API + OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableXfa: {
    value: true,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  fontExtraProperties: {
    value: false,
    kind: OptionKind.API
  },
  isEvalSupported: {
    value: true,
    kind: OptionKind.API
  },
  isOffscreenCanvasSupported: {
    value: true,
    kind: OptionKind.API
  },
  maxImageSize: {
    value: -1,
    kind: OptionKind.API
  },
  pdfBug: {
    value: false,
    kind: OptionKind.API
  },
  standardFontDataUrl: {
    value: "../web/standard_fonts/",
    kind: OptionKind.API
  },
  useSystemFonts: {
    value: undefined,
    kind: OptionKind.API,
    type: Type.BOOLEAN + Type.UNDEFINED
  },
  verbosity: {
    value: 1,
    kind: OptionKind.API
  },
  workerPort: {
    value: null,
    kind: OptionKind.WORKER
  },
  workerSrc: {
    value: "../build/pdf.worker.mjs",
    kind: OptionKind.WORKER
  }
};
{
  defaultOptions.defaultUrl = {
    value: "compressed.tracemonkey-pldi-09.pdf",
    kind: OptionKind.VIEWER
  };
  defaultOptions.sandboxBundleSrc = {
    value: "../build/pdf.sandbox.mjs",
    kind: OptionKind.VIEWER
  };
  defaultOptions.viewerCssTheme = {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  };
  defaultOptions.enableFakeMLManager = {
    value: true,
    kind: OptionKind.VIEWER
  };
}
{
  defaultOptions.disablePreferences = {
    value: false,
    kind: OptionKind.VIEWER
  };
}
class AppOptions {
  static get(name) {
    return app_options_assertClassBrand(AppOptions, this, _opts)._.get(name);
  }
  static getAll(kind = null, defaultOnly = false) {
    const options = Object.create(null);
    for (const name in defaultOptions) {
      const defaultOpt = defaultOptions[name];
      if (kind && !(kind & defaultOpt.kind)) {
        continue;
      }
      options[name] = !defaultOnly ? app_options_assertClassBrand(AppOptions, this, _opts)._.get(name) : defaultOpt.value;
    }
    return options;
  }
  static set(name, value) {
    this.setAll({
      [name]: value
    });
  }
  static setAll(options, prefs = false) {
    this._hasInvokedSet || (this._hasInvokedSet = true);
    let events;
    for (const name in options) {
      const defaultOpt = defaultOptions[name],
        userOpt = options[name];
      if (!defaultOpt || !(typeof userOpt === typeof defaultOpt.value || Type[(typeof userOpt).toUpperCase()] & defaultOpt.type)) {
        continue;
      }
      const {
        kind
      } = defaultOpt;
      if (prefs && !(kind & OptionKind.BROWSER || kind & OptionKind.PREFERENCE)) {
        continue;
      }
      if (this.eventBus && kind & OptionKind.EVENT_DISPATCH) {
        (events || (events = new Map())).set(name, userOpt);
      }
      app_options_assertClassBrand(AppOptions, this, _opts)._.set(name, userOpt);
    }
    if (events) {
      for (const [name, value] of events) {
        this.eventBus.dispatch(name.toLowerCase(), {
          source: this,
          value
        });
      }
    }
  }
}
_AppOptions = AppOptions;
app_options_defineProperty(AppOptions, "eventBus", void 0);
var _opts = {
  _: new Map()
};
(() => {
  for (const name in defaultOptions) {
    app_options_assertClassBrand(_AppOptions, _AppOptions, _opts)._.set(name, defaultOptions[name].value);
  }
  for (const [name, value] of compatParams) {
    app_options_assertClassBrand(_AppOptions, _AppOptions, _opts)._.set(name, value);
  }
  _AppOptions._hasInvokedSet = false;
  _AppOptions._checkDisablePreferences = () => {
    if (_AppOptions.get("disablePreferences")) {
      return true;
    }
    if (_AppOptions._hasInvokedSet) {
      console.warn("The Preferences may override manually set AppOptions; " + 'please use the "disablePreferences"-option to prevent that.');
    }
    return false;
  };
})();

;// ./web/draw_layer_builder.js

function draw_layer_builder_classPrivateFieldInitSpec(e, t, a) { draw_layer_builder_checkPrivateRedeclaration(e, t), t.set(e, a); }
function draw_layer_builder_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function draw_layer_builder_classPrivateFieldSet(s, a, r) { return s.set(draw_layer_builder_assertClassBrand(s, a), r), r; }
function draw_layer_builder_classPrivateFieldGet(s, a) { return s.get(draw_layer_builder_assertClassBrand(s, a)); }
function draw_layer_builder_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var draw_layer_builder_drawLayer = /*#__PURE__*/new WeakMap();
class DrawLayerBuilder {
  constructor(options) {
    draw_layer_builder_classPrivateFieldInitSpec(this, draw_layer_builder_drawLayer, null);
    this.pageIndex = options.pageIndex;
  }
  async render(intent = "display") {
    if (intent !== "display" || draw_layer_builder_classPrivateFieldGet(draw_layer_builder_drawLayer, this) || this._cancelled) {
      return;
    }
    draw_layer_builder_classPrivateFieldSet(draw_layer_builder_drawLayer, this, new DrawLayer({
      pageIndex: this.pageIndex
    }));
  }
  cancel() {
    this._cancelled = true;
    if (!draw_layer_builder_classPrivateFieldGet(draw_layer_builder_drawLayer, this)) {
      return;
    }
    draw_layer_builder_classPrivateFieldGet(draw_layer_builder_drawLayer, this).destroy();
    draw_layer_builder_classPrivateFieldSet(draw_layer_builder_drawLayer, this, null);
  }
  setParent(parent) {
    var _classPrivateFieldGet2;
    (_classPrivateFieldGet2 = draw_layer_builder_classPrivateFieldGet(draw_layer_builder_drawLayer, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.setParent(parent);
  }
  getDrawLayer() {
    return draw_layer_builder_classPrivateFieldGet(draw_layer_builder_drawLayer, this);
  }
}

;// ./web/struct_tree_layer_builder.js


function struct_tree_layer_builder_classPrivateMethodInitSpec(e, a) { struct_tree_layer_builder_checkPrivateRedeclaration(e, a), a.add(e); }
function struct_tree_layer_builder_classPrivateFieldInitSpec(e, t, a) { struct_tree_layer_builder_checkPrivateRedeclaration(e, t), t.set(e, a); }
function struct_tree_layer_builder_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function struct_tree_layer_builder_classPrivateFieldGet(s, a) { return s.get(struct_tree_layer_builder_assertClassBrand(s, a)); }
function struct_tree_layer_builder_classPrivateFieldSet(s, a, r) { return s.set(struct_tree_layer_builder_assertClassBrand(s, a), r), r; }
function struct_tree_layer_builder_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

const PDF_ROLE_TO_HTML_ROLE = {
  Document: null,
  DocumentFragment: null,
  Part: "group",
  Sect: "group",
  Div: "group",
  Aside: "note",
  NonStruct: "none",
  P: null,
  H: "heading",
  Title: null,
  FENote: "note",
  Sub: "group",
  Lbl: null,
  Span: null,
  Em: null,
  Strong: null,
  Link: "link",
  Annot: "note",
  Form: "form",
  Ruby: null,
  RB: null,
  RT: null,
  RP: null,
  Warichu: null,
  WT: null,
  WP: null,
  L: "list",
  LI: "listitem",
  LBody: null,
  Table: "table",
  TR: "row",
  TH: "columnheader",
  TD: "cell",
  THead: "columnheader",
  TBody: null,
  TFoot: null,
  Caption: null,
  Figure: "figure",
  Formula: null,
  Artifact: null
};
const HEADING_PATTERN = /^H(\d+)$/;
var _promise = /*#__PURE__*/new WeakMap();
var _treeDom = /*#__PURE__*/new WeakMap();
var _treePromise = /*#__PURE__*/new WeakMap();
var _elementAttributes = /*#__PURE__*/new WeakMap();
var _rawDims = /*#__PURE__*/new WeakMap();
var _elementsToAddToTextLayer = /*#__PURE__*/new WeakMap();
var _StructTreeLayerBuilder_brand = /*#__PURE__*/new WeakSet();
class StructTreeLayerBuilder {
  constructor(pdfPage, rawDims) {
    struct_tree_layer_builder_classPrivateMethodInitSpec(this, _StructTreeLayerBuilder_brand);
    struct_tree_layer_builder_classPrivateFieldInitSpec(this, _promise, void 0);
    struct_tree_layer_builder_classPrivateFieldInitSpec(this, _treeDom, null);
    struct_tree_layer_builder_classPrivateFieldInitSpec(this, _treePromise, void 0);
    struct_tree_layer_builder_classPrivateFieldInitSpec(this, _elementAttributes, new Map());
    struct_tree_layer_builder_classPrivateFieldInitSpec(this, _rawDims, void 0);
    struct_tree_layer_builder_classPrivateFieldInitSpec(this, _elementsToAddToTextLayer, null);
    struct_tree_layer_builder_classPrivateFieldSet(_promise, this, pdfPage.getStructTree());
    struct_tree_layer_builder_classPrivateFieldSet(_rawDims, this, rawDims);
  }
  async render() {
    var _classPrivateFieldGet2;
    if (struct_tree_layer_builder_classPrivateFieldGet(_treePromise, this)) {
      return struct_tree_layer_builder_classPrivateFieldGet(_treePromise, this);
    }
    const {
      promise,
      resolve,
      reject
    } = Promise.withResolvers();
    struct_tree_layer_builder_classPrivateFieldSet(_treePromise, this, promise);
    try {
      struct_tree_layer_builder_classPrivateFieldSet(_treeDom, this, struct_tree_layer_builder_assertClassBrand(_StructTreeLayerBuilder_brand, this, _walk).call(this, await struct_tree_layer_builder_classPrivateFieldGet(_promise, this)));
    } catch (ex) {
      reject(ex);
    }
    struct_tree_layer_builder_classPrivateFieldSet(_promise, this, null);
    (_classPrivateFieldGet2 = struct_tree_layer_builder_classPrivateFieldGet(_treeDom, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.classList.add("structTree");
    resolve(struct_tree_layer_builder_classPrivateFieldGet(_treeDom, this));
    return promise;
  }
  async getAriaAttributes(annotationId) {
    try {
      await this.render();
      return struct_tree_layer_builder_classPrivateFieldGet(_elementAttributes, this).get(annotationId);
    } catch {}
    return null;
  }
  hide() {
    if (struct_tree_layer_builder_classPrivateFieldGet(_treeDom, this) && !struct_tree_layer_builder_classPrivateFieldGet(_treeDom, this).hidden) {
      struct_tree_layer_builder_classPrivateFieldGet(_treeDom, this).hidden = true;
    }
  }
  show() {
    var _classPrivateFieldGet3;
    if ((_classPrivateFieldGet3 = struct_tree_layer_builder_classPrivateFieldGet(_treeDom, this)) !== null && _classPrivateFieldGet3 !== void 0 && _classPrivateFieldGet3.hidden) {
      struct_tree_layer_builder_classPrivateFieldGet(_treeDom, this).hidden = false;
    }
  }
  addElementsToTextLayer() {
    if (!struct_tree_layer_builder_classPrivateFieldGet(_elementsToAddToTextLayer, this)) {
      return;
    }
    for (const [id, img] of struct_tree_layer_builder_classPrivateFieldGet(_elementsToAddToTextLayer, this)) {
      var _document$getElementB;
      (_document$getElementB = document.getElementById(id)) === null || _document$getElementB === void 0 || _document$getElementB.append(img);
    }
    struct_tree_layer_builder_classPrivateFieldGet(_elementsToAddToTextLayer, this).clear();
    struct_tree_layer_builder_classPrivateFieldSet(_elementsToAddToTextLayer, this, null);
  }
}
function _setAttributes(structElement, htmlElement) {
  const {
    alt,
    id,
    lang
  } = structElement;
  if (alt !== undefined) {
    let added = false;
    const label = removeNullCharacters(alt);
    for (const child of structElement.children) {
      if (child.type === "annotation") {
        let attrs = struct_tree_layer_builder_classPrivateFieldGet(_elementAttributes, this).get(child.id);
        if (!attrs) {
          attrs = new Map();
          struct_tree_layer_builder_classPrivateFieldGet(_elementAttributes, this).set(child.id, attrs);
        }
        attrs.set("aria-label", label);
        added = true;
      }
    }
    if (!added) {
      htmlElement.setAttribute("aria-label", label);
    }
  }
  if (id !== undefined) {
    htmlElement.setAttribute("aria-owns", id);
  }
  if (lang !== undefined) {
    htmlElement.setAttribute("lang", removeNullCharacters(lang, true));
  }
}
function _addImageInTextLayer(node, element) {
  const {
    alt,
    bbox,
    children
  } = node;
  const child = children === null || children === void 0 ? void 0 : children[0];
  if (!struct_tree_layer_builder_classPrivateFieldGet(_rawDims, this) || !alt || !bbox || (child === null || child === void 0 ? void 0 : child.type) !== "content") {
    return false;
  }
  const {
    id
  } = child;
  if (!id) {
    return false;
  }
  element.setAttribute("aria-owns", id);
  const img = document.createElement("span");
  (struct_tree_layer_builder_classPrivateFieldGet(_elementsToAddToTextLayer, this) || struct_tree_layer_builder_classPrivateFieldSet(_elementsToAddToTextLayer, this, new Map())).set(id, img);
  img.setAttribute("role", "img");
  img.setAttribute("aria-label", removeNullCharacters(alt));
  const {
    pageHeight,
    pageX,
    pageY
  } = struct_tree_layer_builder_classPrivateFieldGet(_rawDims, this);
  const calc = "calc(var(--scale-factor)*";
  const {
    style
  } = img;
  style.width = `${calc}${bbox[2] - bbox[0]}px)`;
  style.height = `${calc}${bbox[3] - bbox[1]}px)`;
  style.left = `${calc}${bbox[0] - pageX}px)`;
  style.top = `${calc}${pageHeight - bbox[3] + pageY}px)`;
  return true;
}
function _walk(node) {
  if (!node) {
    return null;
  }
  const element = document.createElement("span");
  if ("role" in node) {
    const {
      role
    } = node;
    const match = role.match(HEADING_PATTERN);
    if (match) {
      element.setAttribute("role", "heading");
      element.setAttribute("aria-level", match[1]);
    } else if (PDF_ROLE_TO_HTML_ROLE[role]) {
      element.setAttribute("role", PDF_ROLE_TO_HTML_ROLE[role]);
    }
    if (role === "Figure" && struct_tree_layer_builder_assertClassBrand(_StructTreeLayerBuilder_brand, this, _addImageInTextLayer).call(this, node, element)) {
      return element;
    }
  }
  struct_tree_layer_builder_assertClassBrand(_StructTreeLayerBuilder_brand, this, _setAttributes).call(this, node, element);
  if (node.children) {
    if (node.children.length === 1 && "id" in node.children[0]) {
      struct_tree_layer_builder_assertClassBrand(_StructTreeLayerBuilder_brand, this, _setAttributes).call(this, node.children[0], element);
    } else {
      for (const kid of node.children) {
        element.append(struct_tree_layer_builder_assertClassBrand(_StructTreeLayerBuilder_brand, this, _walk).call(this, kid));
      }
    }
  }
  return element;
}

;// ./web/text_accessibility.js



function text_accessibility_classPrivateMethodInitSpec(e, a) { text_accessibility_checkPrivateRedeclaration(e, a), a.add(e); }
function text_accessibility_classPrivateFieldInitSpec(e, t, a) { text_accessibility_checkPrivateRedeclaration(e, t), t.set(e, a); }
function text_accessibility_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function text_accessibility_classPrivateFieldGet(s, a) { return s.get(text_accessibility_assertClassBrand(s, a)); }
function text_accessibility_classPrivateFieldSet(s, a, r) { return s.set(text_accessibility_assertClassBrand(s, a), r), r; }
function text_accessibility_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var _enabled = /*#__PURE__*/new WeakMap();
var _textChildren = /*#__PURE__*/new WeakMap();
var _textNodes = /*#__PURE__*/new WeakMap();
var _waitingElements = /*#__PURE__*/new WeakMap();
var _TextAccessibilityManager_brand = /*#__PURE__*/new WeakSet();
class TextAccessibilityManager {
  constructor() {
    text_accessibility_classPrivateMethodInitSpec(this, _TextAccessibilityManager_brand);
    text_accessibility_classPrivateFieldInitSpec(this, _enabled, false);
    text_accessibility_classPrivateFieldInitSpec(this, _textChildren, null);
    text_accessibility_classPrivateFieldInitSpec(this, _textNodes, new Map());
    text_accessibility_classPrivateFieldInitSpec(this, _waitingElements, new Map());
  }
  setTextMapping(textDivs) {
    text_accessibility_classPrivateFieldSet(_textChildren, this, textDivs);
  }
  enable() {
    if (text_accessibility_classPrivateFieldGet(_enabled, this)) {
      throw new Error("TextAccessibilityManager is already enabled.");
    }
    if (!text_accessibility_classPrivateFieldGet(_textChildren, this)) {
      throw new Error("Text divs and strings have not been set.");
    }
    text_accessibility_classPrivateFieldSet(_enabled, this, true);
    text_accessibility_classPrivateFieldSet(_textChildren, this, text_accessibility_classPrivateFieldGet(_textChildren, this).slice());
    text_accessibility_classPrivateFieldGet(_textChildren, this).sort(_compareElementPositions);
    if (text_accessibility_classPrivateFieldGet(_textNodes, this).size > 0) {
      const textChildren = text_accessibility_classPrivateFieldGet(_textChildren, this);
      for (const [id, nodeIndex] of text_accessibility_classPrivateFieldGet(_textNodes, this)) {
        const element = document.getElementById(id);
        if (!element) {
          text_accessibility_classPrivateFieldGet(_textNodes, this).delete(id);
          continue;
        }
        text_accessibility_assertClassBrand(_TextAccessibilityManager_brand, this, _addIdToAriaOwns).call(this, id, textChildren[nodeIndex]);
      }
    }
    for (const [element, isRemovable] of text_accessibility_classPrivateFieldGet(_waitingElements, this)) {
      this.addPointerInTextLayer(element, isRemovable);
    }
    text_accessibility_classPrivateFieldGet(_waitingElements, this).clear();
  }
  disable() {
    if (!text_accessibility_classPrivateFieldGet(_enabled, this)) {
      return;
    }
    text_accessibility_classPrivateFieldGet(_waitingElements, this).clear();
    text_accessibility_classPrivateFieldSet(_textChildren, this, null);
    text_accessibility_classPrivateFieldSet(_enabled, this, false);
  }
  removePointerInTextLayer(element) {
    var _owns;
    if (!text_accessibility_classPrivateFieldGet(_enabled, this)) {
      text_accessibility_classPrivateFieldGet(_waitingElements, this).delete(element);
      return;
    }
    const children = text_accessibility_classPrivateFieldGet(_textChildren, this);
    if (!children || children.length === 0) {
      return;
    }
    const {
      id
    } = element;
    const nodeIndex = text_accessibility_classPrivateFieldGet(_textNodes, this).get(id);
    if (nodeIndex === undefined) {
      return;
    }
    const node = children[nodeIndex];
    text_accessibility_classPrivateFieldGet(_textNodes, this).delete(id);
    let owns = node.getAttribute("aria-owns");
    if ((_owns = owns) !== null && _owns !== void 0 && _owns.includes(id)) {
      owns = owns.split(" ").filter(x => x !== id).join(" ");
      if (owns) {
        node.setAttribute("aria-owns", owns);
      } else {
        node.removeAttribute("aria-owns");
        node.setAttribute("role", "presentation");
      }
    }
  }
  addPointerInTextLayer(element, isRemovable) {
    const {
      id
    } = element;
    if (!id) {
      return null;
    }
    if (!text_accessibility_classPrivateFieldGet(_enabled, this)) {
      text_accessibility_classPrivateFieldGet(_waitingElements, this).set(element, isRemovable);
      return null;
    }
    if (isRemovable) {
      this.removePointerInTextLayer(element);
    }
    const children = text_accessibility_classPrivateFieldGet(_textChildren, this);
    if (!children || children.length === 0) {
      return null;
    }
    const index = binarySearchFirstItem(children, node => _compareElementPositions.call(TextAccessibilityManager, element, node) < 0);
    const nodeIndex = Math.max(0, index - 1);
    const child = children[nodeIndex];
    text_accessibility_assertClassBrand(_TextAccessibilityManager_brand, this, _addIdToAriaOwns).call(this, id, child);
    text_accessibility_classPrivateFieldGet(_textNodes, this).set(id, nodeIndex);
    const parent = child.parentNode;
    return parent !== null && parent !== void 0 && parent.classList.contains("markedContent") ? parent.id : null;
  }
  moveElementInDOM(container, element, contentElement, isRemovable) {
    const id = this.addPointerInTextLayer(contentElement, isRemovable);
    if (!container.hasChildNodes()) {
      container.append(element);
      return id;
    }
    const children = Array.from(container.childNodes).filter(node => node !== element);
    if (children.length === 0) {
      return id;
    }
    const elementToCompare = contentElement || element;
    const index = binarySearchFirstItem(children, node => _compareElementPositions.call(TextAccessibilityManager, elementToCompare, node) < 0);
    if (index === 0) {
      children[0].before(element);
    } else {
      children[index - 1].after(element);
    }
    return id;
  }
}
function _compareElementPositions(e1, e2) {
  const rect1 = e1.getBoundingClientRect();
  const rect2 = e2.getBoundingClientRect();
  if (rect1.width === 0 && rect1.height === 0) {
    return +1;
  }
  if (rect2.width === 0 && rect2.height === 0) {
    return -1;
  }
  const top1 = rect1.y;
  const bot1 = rect1.y + rect1.height;
  const mid1 = rect1.y + rect1.height / 2;
  const top2 = rect2.y;
  const bot2 = rect2.y + rect2.height;
  const mid2 = rect2.y + rect2.height / 2;
  if (mid1 <= top2 && mid2 >= bot1) {
    return -1;
  }
  if (mid2 <= top1 && mid1 >= bot2) {
    return +1;
  }
  const centerX1 = rect1.x + rect1.width / 2;
  const centerX2 = rect2.x + rect2.width / 2;
  return centerX1 - centerX2;
}
function _addIdToAriaOwns(id, node) {
  const owns = node.getAttribute("aria-owns");
  if (!(owns !== null && owns !== void 0 && owns.includes(id))) {
    node.setAttribute("aria-owns", owns ? `${owns} ${id}` : id);
  }
  node.removeAttribute("role");
}

;// ./web/text_highlighter.js


function text_highlighter_classPrivateFieldInitSpec(e, t, a) { text_highlighter_checkPrivateRedeclaration(e, t), t.set(e, a); }
function text_highlighter_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function text_highlighter_classPrivateFieldSet(s, a, r) { return s.set(text_highlighter_assertClassBrand(s, a), r), r; }
function text_highlighter_classPrivateFieldGet(s, a) { return s.get(text_highlighter_assertClassBrand(s, a)); }
function text_highlighter_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var text_highlighter_eventAbortController = /*#__PURE__*/new WeakMap();
class TextHighlighter {
  constructor({
    findController,
    eventBus,
    pageIndex
  }) {
    text_highlighter_classPrivateFieldInitSpec(this, text_highlighter_eventAbortController, null);
    this.findController = findController;
    this.matches = [];
    this.eventBus = eventBus;
    this.pageIdx = pageIndex;
    this.textDivs = null;
    this.textContentItemsStr = null;
    this.enabled = false;
  }
  setTextMapping(divs, texts) {
    this.textDivs = divs;
    this.textContentItemsStr = texts;
  }
  enable() {
    if (!this.textDivs || !this.textContentItemsStr) {
      throw new Error("Text divs and strings have not been set.");
    }
    if (this.enabled) {
      throw new Error("TextHighlighter is already enabled.");
    }
    this.enabled = true;
    if (!text_highlighter_classPrivateFieldGet(text_highlighter_eventAbortController, this)) {
      text_highlighter_classPrivateFieldSet(text_highlighter_eventAbortController, this, new AbortController());
      this.eventBus._on("updatetextlayermatches", evt => {
        if (evt.pageIndex === this.pageIdx || evt.pageIndex === -1) {
          this._updateMatches();
        }
      }, {
        signal: text_highlighter_classPrivateFieldGet(text_highlighter_eventAbortController, this).signal
      });
    }
    this._updateMatches();
  }
  disable() {
    var _classPrivateFieldGet2;
    if (!this.enabled) {
      return;
    }
    this.enabled = false;
    (_classPrivateFieldGet2 = text_highlighter_classPrivateFieldGet(text_highlighter_eventAbortController, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.abort();
    text_highlighter_classPrivateFieldSet(text_highlighter_eventAbortController, this, null);
    this._updateMatches(true);
  }
  _convertMatches(matches, matchesLength) {
    if (!matches) {
      return [];
    }
    const {
      textContentItemsStr
    } = this;
    let i = 0,
      iIndex = 0;
    const end = textContentItemsStr.length - 1;
    const result = [];
    for (let m = 0, mm = matches.length; m < mm; m++) {
      let matchIdx = matches[m];
      while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }
      if (i === textContentItemsStr.length) {
        console.error("Could not find a matching mapping");
      }
      const match = {
        begin: {
          divIdx: i,
          offset: matchIdx - iIndex
        }
      };
      matchIdx += matchesLength[m];
      while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }
      match.end = {
        divIdx: i,
        offset: matchIdx - iIndex
      };
      result.push(match);
    }
    return result;
  }
  _renderMatches(matches) {
    if (matches.length === 0) {
      return;
    }
    const {
      findController,
      pageIdx
    } = this;
    const {
      textContentItemsStr,
      textDivs
    } = this;
    const isSelectedPage = pageIdx === findController.selected.pageIdx;
    const selectedMatchIdx = findController.selected.matchIdx;
    const highlightAll = findController.state.highlightAll;
    let prevEnd = null;
    const infinity = {
      divIdx: -1,
      offset: undefined
    };
    function beginText(begin, className) {
      const divIdx = begin.divIdx;
      textDivs[divIdx].textContent = "";
      return appendTextToDiv(divIdx, 0, begin.offset, className);
    }
    function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
      let div = textDivs[divIdx];
      if (div.nodeType === Node.TEXT_NODE) {
        const span = document.createElement("span");
        div.before(span);
        span.append(div);
        textDivs[divIdx] = span;
        div = span;
      }
      const content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);
      const node = document.createTextNode(content);
      if (className) {
        const span = document.createElement("span");
        span.className = `${className} appended`;
        span.append(node);
        div.append(span);
        return className.includes("selected") ? span.offsetLeft : 0;
      }
      div.append(node);
      return 0;
    }
    let i0 = selectedMatchIdx,
      i1 = i0 + 1;
    if (highlightAll) {
      i0 = 0;
      i1 = matches.length;
    } else if (!isSelectedPage) {
      return;
    }
    let lastDivIdx = -1;
    let lastOffset = -1;
    for (let i = i0; i < i1; i++) {
      const match = matches[i];
      const begin = match.begin;
      if (begin.divIdx === lastDivIdx && begin.offset === lastOffset) {
        continue;
      }
      lastDivIdx = begin.divIdx;
      lastOffset = begin.offset;
      const end = match.end;
      const isSelected = isSelectedPage && i === selectedMatchIdx;
      const highlightSuffix = isSelected ? " selected" : "";
      let selectedLeft = 0;
      if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
        if (prevEnd !== null) {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
        }
        beginText(begin);
      } else {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
      }
      if (begin.divIdx === end.divIdx) {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, end.offset, "highlight" + highlightSuffix);
      } else {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, "highlight begin" + highlightSuffix);
        for (let n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
          textDivs[n0].className = "highlight middle" + highlightSuffix;
        }
        beginText(end, "highlight end" + highlightSuffix);
      }
      prevEnd = end;
      if (isSelected) {
        findController.scrollMatchIntoView({
          element: textDivs[begin.divIdx],
          selectedLeft,
          pageIndex: pageIdx,
          matchIndex: selectedMatchIdx
        });
      }
    }
    if (prevEnd) {
      appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
    }
  }
  _updateMatches(reset = false) {
    if (!this.enabled && !reset) {
      return;
    }
    const {
      findController,
      matches,
      pageIdx
    } = this;
    const {
      textContentItemsStr,
      textDivs
    } = this;
    let clearedUntilDivIdx = -1;
    for (const match of matches) {
      const begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
      for (let n = begin, end = match.end.divIdx; n <= end; n++) {
        const div = textDivs[n];
        div.textContent = textContentItemsStr[n];
        div.className = "";
      }
      clearedUntilDivIdx = match.end.divIdx + 1;
    }
    if (!(findController !== null && findController !== void 0 && findController.highlightMatches) || reset) {
      return;
    }
    const pageMatches = findController.pageMatches[pageIdx] || null;
    const pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
    this.matches = this._convertMatches(pageMatches, pageMatchesLength);
    this._renderMatches(this.matches);
  }
}

;// ./web/text_layer_builder.js
var _TextLayerBuilder;










function text_layer_builder_classPrivateMethodInitSpec(e, a) { text_layer_builder_checkPrivateRedeclaration(e, a), a.add(e); }
function text_layer_builder_classPrivateFieldInitSpec(e, t, a) { text_layer_builder_checkPrivateRedeclaration(e, t), t.set(e, a); }
function text_layer_builder_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function text_layer_builder_classPrivateFieldGet(s, a) { return s.get(text_layer_builder_assertClassBrand(s, a)); }
function text_layer_builder_classPrivateFieldSet(s, a, r) { return s.set(text_layer_builder_assertClassBrand(s, a), r), r; }
function text_layer_builder_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


var _enablePermissions = /*#__PURE__*/new WeakMap();
var text_layer_builder_onAppend = /*#__PURE__*/new WeakMap();
var _renderingDone = /*#__PURE__*/new WeakMap();
var text_layer_builder_textLayer = /*#__PURE__*/new WeakMap();
var _TextLayerBuilder_brand = /*#__PURE__*/new WeakSet();
class TextLayerBuilder {
  constructor({
    pdfPage,
    highlighter = null,
    accessibilityManager = null,
    enablePermissions = false,
    onAppend = null
  }) {
    text_layer_builder_classPrivateMethodInitSpec(this, _TextLayerBuilder_brand);
    text_layer_builder_classPrivateFieldInitSpec(this, _enablePermissions, false);
    text_layer_builder_classPrivateFieldInitSpec(this, text_layer_builder_onAppend, null);
    text_layer_builder_classPrivateFieldInitSpec(this, _renderingDone, false);
    text_layer_builder_classPrivateFieldInitSpec(this, text_layer_builder_textLayer, null);
    this.pdfPage = pdfPage;
    this.highlighter = highlighter;
    this.accessibilityManager = accessibilityManager;
    text_layer_builder_classPrivateFieldSet(_enablePermissions, this, enablePermissions === true);
    text_layer_builder_classPrivateFieldSet(text_layer_builder_onAppend, this, onAppend);
    this.div = document.createElement("div");
    this.div.tabIndex = 0;
    this.div.className = "textLayer";
  }
  async render(viewport, textContentParams = null) {
    var _this$highlighter, _this$accessibilityMa, _classPrivateFieldGet2, _this$highlighter2, _this$accessibilityMa2;
    if (text_layer_builder_classPrivateFieldGet(_renderingDone, this) && text_layer_builder_classPrivateFieldGet(text_layer_builder_textLayer, this)) {
      text_layer_builder_classPrivateFieldGet(text_layer_builder_textLayer, this).update({
        viewport,
        onBefore: this.hide.bind(this)
      });
      this.show();
      return;
    }
    this.cancel();
    text_layer_builder_classPrivateFieldSet(text_layer_builder_textLayer, this, new TextLayer({
      textContentSource: this.pdfPage.streamTextContent(textContentParams || {
        includeMarkedContent: true,
        disableNormalization: true
      }),
      container: this.div,
      viewport
    }));
    const {
      textDivs,
      textContentItemsStr
    } = text_layer_builder_classPrivateFieldGet(text_layer_builder_textLayer, this);
    (_this$highlighter = this.highlighter) === null || _this$highlighter === void 0 || _this$highlighter.setTextMapping(textDivs, textContentItemsStr);
    (_this$accessibilityMa = this.accessibilityManager) === null || _this$accessibilityMa === void 0 || _this$accessibilityMa.setTextMapping(textDivs);
    await text_layer_builder_classPrivateFieldGet(text_layer_builder_textLayer, this).render();
    text_layer_builder_classPrivateFieldSet(_renderingDone, this, true);
    const endOfContent = document.createElement("div");
    endOfContent.className = "endOfContent";
    this.div.append(endOfContent);
    text_layer_builder_assertClassBrand(_TextLayerBuilder_brand, this, _bindMouse).call(this, endOfContent);
    (_classPrivateFieldGet2 = text_layer_builder_classPrivateFieldGet(text_layer_builder_onAppend, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.call(this, this.div);
    (_this$highlighter2 = this.highlighter) === null || _this$highlighter2 === void 0 || _this$highlighter2.enable();
    (_this$accessibilityMa2 = this.accessibilityManager) === null || _this$accessibilityMa2 === void 0 || _this$accessibilityMa2.enable();
  }
  hide() {
    if (!this.div.hidden && text_layer_builder_classPrivateFieldGet(_renderingDone, this)) {
      var _this$highlighter3;
      (_this$highlighter3 = this.highlighter) === null || _this$highlighter3 === void 0 || _this$highlighter3.disable();
      this.div.hidden = true;
    }
  }
  show() {
    if (this.div.hidden && text_layer_builder_classPrivateFieldGet(_renderingDone, this)) {
      var _this$highlighter4;
      this.div.hidden = false;
      (_this$highlighter4 = this.highlighter) === null || _this$highlighter4 === void 0 || _this$highlighter4.enable();
    }
  }
  cancel() {
    var _classPrivateFieldGet3, _this$highlighter5, _this$accessibilityMa3;
    (_classPrivateFieldGet3 = text_layer_builder_classPrivateFieldGet(text_layer_builder_textLayer, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.cancel();
    text_layer_builder_classPrivateFieldSet(text_layer_builder_textLayer, this, null);
    (_this$highlighter5 = this.highlighter) === null || _this$highlighter5 === void 0 || _this$highlighter5.disable();
    (_this$accessibilityMa3 = this.accessibilityManager) === null || _this$accessibilityMa3 === void 0 || _this$accessibilityMa3.disable();
    _removeGlobalSelectionListener.call(TextLayerBuilder, this.div);
  }
}
_TextLayerBuilder = TextLayerBuilder;
function _bindMouse(end) {
  const {
    div
  } = this;
  div.addEventListener("mousedown", () => {
    div.classList.add("selecting");
  });
  div.addEventListener("copy", event => {
    if (!text_layer_builder_classPrivateFieldGet(_enablePermissions, this)) {
      const selection = document.getSelection();
      event.clipboardData.setData("text/plain", removeNullCharacters(normalizeUnicode(selection.toString())));
    }
    event.preventDefault();
    event.stopPropagation();
  });
  _textLayers._.set(div, end);
  _enableGlobalSelectionListener.call(_TextLayerBuilder);
}
function _removeGlobalSelectionListener(textLayerDiv) {
  text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.delete(textLayerDiv);
  if (text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.size === 0) {
    var _assertClassBrand$_;
    (_assertClassBrand$_ = text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _selectionChangeAbortController)._) === null || _assertClassBrand$_ === void 0 || _assertClassBrand$_.abort();
    _selectionChangeAbortController._ = text_layer_builder_assertClassBrand(_TextLayerBuilder, this, null);
  }
}
function _enableGlobalSelectionListener() {
  if (text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _selectionChangeAbortController)._) {
    return;
  }
  _selectionChangeAbortController._ = text_layer_builder_assertClassBrand(_TextLayerBuilder, this, new AbortController());
  const {
    signal
  } = text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _selectionChangeAbortController)._;
  const reset = (end, textLayer) => {
    textLayer.append(end);
    end.style.width = "";
    end.style.height = "";
    textLayer.classList.remove("selecting");
  };
  let isPointerDown = false;
  document.addEventListener("pointerdown", () => {
    isPointerDown = true;
  }, {
    signal
  });
  document.addEventListener("pointerup", () => {
    isPointerDown = false;
    text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.forEach(reset);
  }, {
    signal
  });
  window.addEventListener("blur", () => {
    isPointerDown = false;
    text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.forEach(reset);
  }, {
    signal
  });
  document.addEventListener("keyup", () => {
    if (!isPointerDown) {
      text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.forEach(reset);
    }
  }, {
    signal
  });
  var isFirefox, prevRange;
  document.addEventListener("selectionchange", () => {
    var _anchor$parentElement;
    var _isFirefox;
    const selection = document.getSelection();
    if (selection.rangeCount === 0) {
      text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.forEach(reset);
      return;
    }
    const activeTextLayers = new Set();
    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(i);
      for (const textLayerDiv of text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.keys()) {
        if (!activeTextLayers.has(textLayerDiv) && range.intersectsNode(textLayerDiv)) {
          activeTextLayers.add(textLayerDiv);
        }
      }
    }
    for (const [textLayerDiv, endDiv] of text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._) {
      if (activeTextLayers.has(textLayerDiv)) {
        textLayerDiv.classList.add("selecting");
      } else {
        reset(endDiv, textLayerDiv);
      }
    }
    (_isFirefox = isFirefox) !== null && _isFirefox !== void 0 ? _isFirefox : isFirefox = getComputedStyle(text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.values().next().value).getPropertyValue("-moz-user-select") === "none";
    if (isFirefox) {
      return;
    }
    const range = selection.getRangeAt(0);
    const modifyStart = prevRange && (range.compareBoundaryPoints(Range.END_TO_END, prevRange) === 0 || range.compareBoundaryPoints(Range.START_TO_END, prevRange) === 0);
    let anchor = modifyStart ? range.startContainer : range.endContainer;
    if (anchor.nodeType === Node.TEXT_NODE) {
      anchor = anchor.parentNode;
    }
    const parentTextLayer = (_anchor$parentElement = anchor.parentElement) === null || _anchor$parentElement === void 0 ? void 0 : _anchor$parentElement.closest(".textLayer");
    const endDiv = text_layer_builder_assertClassBrand(_TextLayerBuilder, this, _textLayers)._.get(parentTextLayer);
    if (endDiv) {
      endDiv.style.width = parentTextLayer.style.width;
      endDiv.style.height = parentTextLayer.style.height;
      anchor.parentElement.insertBefore(endDiv, modifyStart ? anchor : anchor.nextSibling);
    }
    prevRange = range.cloneRange();
  }, {
    signal
  });
}
var _textLayers = {
  _: new Map()
};
var _selectionChangeAbortController = {
  _: null
};

;// ./web/pdf_page_view.js



function pdf_page_view_classPrivateMethodInitSpec(e, a) { pdf_page_view_checkPrivateRedeclaration(e, a), a.add(e); }
function pdf_page_view_classPrivateFieldInitSpec(e, t, a) { pdf_page_view_checkPrivateRedeclaration(e, t), t.set(e, a); }
function pdf_page_view_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function pdf_page_view_classPrivateFieldGet(s, a) { return s.get(pdf_page_view_assertClassBrand(s, a)); }
function pdf_page_view_classPrivateFieldSet(s, a, r) { return s.set(pdf_page_view_assertClassBrand(s, a), r), r; }
function pdf_page_view_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }













const DEFAULT_LAYER_PROPERTIES = {
  annotationEditorUIManager: null,
  annotationStorage: null,
  downloadManager: null,
  enableScripting: false,
  fieldObjectsPromise: null,
  findController: null,
  hasJSActionsPromise: null,
  get linkService() {
    return new SimpleLinkService();
  }
};
const LAYERS_ORDER = new Map([["canvasWrapper", 0], ["textLayer", 1], ["annotationLayer", 2], ["annotationEditorLayer", 3], ["xfaLayer", 3]]);
var _annotationMode = /*#__PURE__*/new WeakMap();
var _enableHWA = /*#__PURE__*/new WeakMap();
var _hasRestrictedScaling = /*#__PURE__*/new WeakMap();
var _isEditing = /*#__PURE__*/new WeakMap();
var _layerProperties = /*#__PURE__*/new WeakMap();
var _loadingId = /*#__PURE__*/new WeakMap();
var _previousRotation = /*#__PURE__*/new WeakMap();
var _scaleRoundX = /*#__PURE__*/new WeakMap();
var _scaleRoundY = /*#__PURE__*/new WeakMap();
var _renderError = /*#__PURE__*/new WeakMap();
var _renderingState = /*#__PURE__*/new WeakMap();
var _textLayerMode = /*#__PURE__*/new WeakMap();
var _useThumbnailCanvas = /*#__PURE__*/new WeakMap();
var _viewportMap = /*#__PURE__*/new WeakMap();
var _layers = /*#__PURE__*/new WeakMap();
var _PDFPageView_brand = /*#__PURE__*/new WeakSet();
class PDFPageView {
  constructor(options) {
    var _options$textLayerMod, _options$annotationMo, _options$maxCanvasPix;
    var _this$renderingQueue;
    pdf_page_view_classPrivateMethodInitSpec(this, _PDFPageView_brand);
    pdf_page_view_classPrivateFieldInitSpec(this, _annotationMode, AnnotationMode.ENABLE_FORMS);
    pdf_page_view_classPrivateFieldInitSpec(this, _enableHWA, false);
    pdf_page_view_classPrivateFieldInitSpec(this, _hasRestrictedScaling, false);
    pdf_page_view_classPrivateFieldInitSpec(this, _isEditing, false);
    pdf_page_view_classPrivateFieldInitSpec(this, _layerProperties, null);
    pdf_page_view_classPrivateFieldInitSpec(this, _loadingId, null);
    pdf_page_view_classPrivateFieldInitSpec(this, _previousRotation, null);
    pdf_page_view_classPrivateFieldInitSpec(this, _scaleRoundX, 1);
    pdf_page_view_classPrivateFieldInitSpec(this, _scaleRoundY, 1);
    pdf_page_view_classPrivateFieldInitSpec(this, _renderError, null);
    pdf_page_view_classPrivateFieldInitSpec(this, _renderingState, RenderingStates.INITIAL);
    pdf_page_view_classPrivateFieldInitSpec(this, _textLayerMode, TextLayerMode.ENABLE);
    pdf_page_view_classPrivateFieldInitSpec(this, _useThumbnailCanvas, {
      directDrawing: true,
      initialOptionalContent: true,
      regularAnnotations: true
    });
    pdf_page_view_classPrivateFieldInitSpec(this, _viewportMap, new WeakMap());
    pdf_page_view_classPrivateFieldInitSpec(this, _layers, [null, null, null, null]);
    const container = options.container;
    const defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = "page" + this.id;
    pdf_page_view_classPrivateFieldSet(_layerProperties, this, options.layerProperties || DEFAULT_LAYER_PROPERTIES);
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    pdf_page_view_classPrivateFieldSet(_textLayerMode, this, (_options$textLayerMod = options.textLayerMode) !== null && _options$textLayerMod !== void 0 ? _options$textLayerMod : TextLayerMode.ENABLE);
    pdf_page_view_classPrivateFieldSet(_annotationMode, this, (_options$annotationMo = options.annotationMode) !== null && _options$annotationMo !== void 0 ? _options$annotationMo : AnnotationMode.ENABLE_FORMS);
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.maxCanvasPixels = (_options$maxCanvasPix = options.maxCanvasPixels) !== null && _options$maxCanvasPix !== void 0 ? _options$maxCanvasPix : AppOptions.get("maxCanvasPixels");
    this.pageColors = options.pageColors || null;
    pdf_page_view_classPrivateFieldSet(_enableHWA, this, options.enableHWA || false);
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.l10n = options.l10n;
    this.l10n || (this.l10n = new genericl10n_GenericL10n());
    this.renderTask = null;
    this.resume = null;
    this._isStandalone = !((_this$renderingQueue = this.renderingQueue) !== null && _this$renderingQueue !== void 0 && _this$renderingQueue.hasViewer());
    this._container = container;
    this._annotationCanvasMap = null;
    this.annotationLayer = null;
    this.annotationEditorLayer = null;
    this.textLayer = null;
    this.zoomLayer = null;
    this.xfaLayer = null;
    this.structTreeLayer = null;
    this.drawLayer = null;
    const _div = document.createElement("div");
    _div.className = "page";
    _div.setAttribute("data-page-number", this.id);
    _div.setAttribute("role", "region");
    _div.setAttribute("data-l10n-id", "pdfjs-page-landmark");
    _div.setAttribute("data-l10n-args", JSON.stringify({
      page: this.id
    }));
    this.div = _div;
    pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _setDimensions).call(this);
    container === null || container === void 0 || container.append(_div);
    if (this._isStandalone) {
      var _this$pageColors;
      container === null || container === void 0 || container.style.setProperty("--scale-factor", this.scale * PixelsPerInch.PDF_TO_CSS_UNITS);
      if ((_this$pageColors = this.pageColors) !== null && _this$pageColors !== void 0 && _this$pageColors.background) {
        container === null || container === void 0 || container.style.setProperty("--page-bg-color", this.pageColors.background);
      }
      const {
        optionalContentConfigPromise
      } = options;
      if (optionalContentConfigPromise) {
        optionalContentConfigPromise.then(optionalContentConfig => {
          if (optionalContentConfigPromise !== this._optionalContentConfigPromise) {
            return;
          }
          pdf_page_view_classPrivateFieldGet(_useThumbnailCanvas, this).initialOptionalContent = optionalContentConfig.hasInitialVisibility;
        });
      }
      if (!options.l10n) {
        this.l10n.translate(this.div);
      }
    }
  }
  get renderingState() {
    return pdf_page_view_classPrivateFieldGet(_renderingState, this);
  }
  set renderingState(state) {
    if (state === pdf_page_view_classPrivateFieldGet(_renderingState, this)) {
      return;
    }
    pdf_page_view_classPrivateFieldSet(_renderingState, this, state);
    if (pdf_page_view_classPrivateFieldGet(_loadingId, this)) {
      clearTimeout(pdf_page_view_classPrivateFieldGet(_loadingId, this));
      pdf_page_view_classPrivateFieldSet(_loadingId, this, null);
    }
    switch (state) {
      case RenderingStates.PAUSED:
        this.div.classList.remove("loading");
        break;
      case RenderingStates.RUNNING:
        this.div.classList.add("loadingIcon");
        pdf_page_view_classPrivateFieldSet(_loadingId, this, setTimeout(() => {
          this.div.classList.add("loading");
          pdf_page_view_classPrivateFieldSet(_loadingId, this, null);
        }, 0));
        break;
      case RenderingStates.INITIAL:
      case RenderingStates.FINISHED:
        this.div.classList.remove("loadingIcon", "loading");
        break;
    }
  }
  setPdfPage(pdfPage) {
    var _this$pageColors2, _this$pageColors3;
    if (this._isStandalone && (((_this$pageColors2 = this.pageColors) === null || _this$pageColors2 === void 0 ? void 0 : _this$pageColors2.foreground) === "CanvasText" || ((_this$pageColors3 = this.pageColors) === null || _this$pageColors3 === void 0 ? void 0 : _this$pageColors3.background) === "Canvas")) {
      var _this$_container, _this$_container2;
      (_this$_container = this._container) === null || _this$_container === void 0 || _this$_container.style.setProperty("--hcm-highlight-filter", pdfPage.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight"));
      (_this$_container2 = this._container) === null || _this$_container2 === void 0 || _this$_container2.style.setProperty("--hcm-highlight-selected-filter", pdfPage.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "Highlight"));
    }
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: this.scale * PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    });
    pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _setDimensions).call(this);
    this.reset();
  }
  destroy() {
    var _this$pdfPage;
    this.reset();
    (_this$pdfPage = this.pdfPage) === null || _this$pdfPage === void 0 || _this$pdfPage.cleanup();
  }
  hasEditableAnnotations() {
    var _this$annotationLayer;
    return !!((_this$annotationLayer = this.annotationLayer) !== null && _this$annotationLayer !== void 0 && _this$annotationLayer.hasEditableAnnotations());
  }
  get _textHighlighter() {
    return shadow(this, "_textHighlighter", new TextHighlighter({
      pageIndex: this.id - 1,
      eventBus: this.eventBus,
      findController: pdf_page_view_classPrivateFieldGet(_layerProperties, this).findController
    }));
  }
  _resetZoomLayer(removeFromDOM = false) {
    if (!this.zoomLayer) {
      return;
    }
    const zoomLayerCanvas = this.zoomLayer.firstChild;
    pdf_page_view_classPrivateFieldGet(_viewportMap, this).delete(zoomLayerCanvas);
    zoomLayerCanvas.width = 0;
    zoomLayerCanvas.height = 0;
    if (removeFromDOM) {
      this.zoomLayer.remove();
    }
    this.zoomLayer = null;
  }
  reset({
    keepZoomLayer = false,
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false,
    keepTextLayer = false
  } = {}) {
    var _this$annotationLayer2, _this$annotationEdito, _this$xfaLayer, _this$textLayer, _this$structTreeLayer;
    this.cancelRendering({
      keepAnnotationLayer,
      keepAnnotationEditorLayer,
      keepXfaLayer,
      keepTextLayer
    });
    this.renderingState = RenderingStates.INITIAL;
    const div = this.div;
    const childNodes = div.childNodes,
      zoomLayerNode = keepZoomLayer && this.zoomLayer || null,
      annotationLayerNode = keepAnnotationLayer && ((_this$annotationLayer2 = this.annotationLayer) === null || _this$annotationLayer2 === void 0 ? void 0 : _this$annotationLayer2.div) || null,
      annotationEditorLayerNode = keepAnnotationEditorLayer && ((_this$annotationEdito = this.annotationEditorLayer) === null || _this$annotationEdito === void 0 ? void 0 : _this$annotationEdito.div) || null,
      xfaLayerNode = keepXfaLayer && ((_this$xfaLayer = this.xfaLayer) === null || _this$xfaLayer === void 0 ? void 0 : _this$xfaLayer.div) || null,
      textLayerNode = keepTextLayer && ((_this$textLayer = this.textLayer) === null || _this$textLayer === void 0 ? void 0 : _this$textLayer.div) || null;
    for (let i = childNodes.length - 1; i >= 0; i--) {
      const node = childNodes[i];
      switch (node) {
        case zoomLayerNode:
        case annotationLayerNode:
        case annotationEditorLayerNode:
        case xfaLayerNode:
        case textLayerNode:
          continue;
      }
      node.remove();
      const layerIndex = pdf_page_view_classPrivateFieldGet(_layers, this).indexOf(node);
      if (layerIndex >= 0) {
        pdf_page_view_classPrivateFieldGet(_layers, this)[layerIndex] = null;
      }
    }
    div.removeAttribute("data-loaded");
    if (annotationLayerNode) {
      this.annotationLayer.hide();
    }
    if (annotationEditorLayerNode) {
      this.annotationEditorLayer.hide();
    }
    if (xfaLayerNode) {
      this.xfaLayer.hide();
    }
    if (textLayerNode) {
      this.textLayer.hide();
    }
    (_this$structTreeLayer = this.structTreeLayer) === null || _this$structTreeLayer === void 0 || _this$structTreeLayer.hide();
    if (!zoomLayerNode) {
      if (this.canvas) {
        pdf_page_view_classPrivateFieldGet(_viewportMap, this).delete(this.canvas);
        this.canvas.width = 0;
        this.canvas.height = 0;
        delete this.canvas;
      }
      this._resetZoomLayer();
    }
  }
  toggleEditingMode(isEditing) {
    if (!this.hasEditableAnnotations()) {
      return;
    }
    pdf_page_view_classPrivateFieldSet(_isEditing, this, isEditing);
    this.reset({
      keepZoomLayer: true,
      keepAnnotationLayer: true,
      keepAnnotationEditorLayer: true,
      keepXfaLayer: true,
      keepTextLayer: true
    });
  }
  update({
    scale = 0,
    rotation = null,
    optionalContentConfigPromise = null,
    drawingDelay = -1
  }) {
    this.scale = scale || this.scale;
    if (typeof rotation === "number") {
      this.rotation = rotation;
    }
    if (optionalContentConfigPromise instanceof Promise) {
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      optionalContentConfigPromise.then(optionalContentConfig => {
        if (optionalContentConfigPromise !== this._optionalContentConfigPromise) {
          return;
        }
        pdf_page_view_classPrivateFieldGet(_useThumbnailCanvas, this).initialOptionalContent = optionalContentConfig.hasInitialVisibility;
      });
    }
    pdf_page_view_classPrivateFieldGet(_useThumbnailCanvas, this).directDrawing = true;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: this.scale * PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    });
    pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _setDimensions).call(this);
    if (this._isStandalone) {
      var _this$_container3;
      (_this$_container3 = this._container) === null || _this$_container3 === void 0 || _this$_container3.style.setProperty("--scale-factor", this.viewport.scale);
    }
    if (this.canvas) {
      let onlyCssZoom = false;
      if (pdf_page_view_classPrivateFieldGet(_hasRestrictedScaling, this)) {
        if (this.maxCanvasPixels === 0) {
          onlyCssZoom = true;
        } else if (this.maxCanvasPixels > 0) {
          const {
            width,
            height
          } = this.viewport;
          const {
            sx,
            sy
          } = this.outputScale;
          onlyCssZoom = (Math.floor(width) * sx | 0) * (Math.floor(height) * sy | 0) > this.maxCanvasPixels;
        }
      }
      const postponeDrawing = drawingDelay >= 0 && drawingDelay < 1000;
      if (postponeDrawing || onlyCssZoom) {
        if (postponeDrawing && !onlyCssZoom && this.renderingState !== RenderingStates.FINISHED) {
          this.cancelRendering({
            keepZoomLayer: true,
            keepAnnotationLayer: true,
            keepAnnotationEditorLayer: true,
            keepXfaLayer: true,
            keepTextLayer: true,
            cancelExtraDelay: drawingDelay
          });
          this.renderingState = RenderingStates.FINISHED;
          pdf_page_view_classPrivateFieldGet(_useThumbnailCanvas, this).directDrawing = false;
        }
        this.cssTransform({
          target: this.canvas,
          redrawAnnotationLayer: true,
          redrawAnnotationEditorLayer: true,
          redrawXfaLayer: true,
          redrawTextLayer: !postponeDrawing,
          hideTextLayer: postponeDrawing
        });
        if (postponeDrawing) {
          return;
        }
        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: pdf_page_view_classPrivateFieldGet(_renderError, this)
        });
        return;
      }
      if (!this.zoomLayer && !this.canvas.hidden) {
        this.zoomLayer = this.canvas.parentNode;
        this.zoomLayer.style.position = "absolute";
      }
    }
    if (this.zoomLayer) {
      this.cssTransform({
        target: this.zoomLayer.firstChild
      });
    }
    this.reset({
      keepZoomLayer: true,
      keepAnnotationLayer: true,
      keepAnnotationEditorLayer: true,
      keepXfaLayer: true,
      keepTextLayer: true
    });
  }
  cancelRendering({
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false,
    keepTextLayer = false,
    cancelExtraDelay = 0
  } = {}) {
    if (this.renderTask) {
      this.renderTask.cancel(cancelExtraDelay);
      this.renderTask = null;
    }
    this.resume = null;
    if (this.textLayer && (!keepTextLayer || !this.textLayer.div)) {
      this.textLayer.cancel();
      this.textLayer = null;
    }
    if (this.annotationLayer && (!keepAnnotationLayer || !this.annotationLayer.div)) {
      this.annotationLayer.cancel();
      this.annotationLayer = null;
      this._annotationCanvasMap = null;
    }
    if (this.structTreeLayer && !this.textLayer) {
      this.structTreeLayer = null;
    }
    if (this.annotationEditorLayer && (!keepAnnotationEditorLayer || !this.annotationEditorLayer.div)) {
      if (this.drawLayer) {
        this.drawLayer.cancel();
        this.drawLayer = null;
      }
      this.annotationEditorLayer.cancel();
      this.annotationEditorLayer = null;
    }
    if (this.xfaLayer && (!keepXfaLayer || !this.xfaLayer.div)) {
      var _this$_textHighlighte;
      this.xfaLayer.cancel();
      this.xfaLayer = null;
      (_this$_textHighlighte = this._textHighlighter) === null || _this$_textHighlighte === void 0 || _this$_textHighlighte.disable();
    }
  }
  cssTransform({
    target,
    redrawAnnotationLayer = false,
    redrawAnnotationEditorLayer = false,
    redrawXfaLayer = false,
    redrawTextLayer = false,
    hideTextLayer = false
  }) {
    if (!target.hasAttribute("zooming")) {
      target.setAttribute("zooming", true);
      const {
        style
      } = target;
      style.width = style.height = "";
    }
    const originalViewport = pdf_page_view_classPrivateFieldGet(_viewportMap, this).get(target);
    if (this.viewport !== originalViewport) {
      const relativeRotation = this.viewport.rotation - originalViewport.rotation;
      const absRotation = Math.abs(relativeRotation);
      let scaleX = 1,
        scaleY = 1;
      if (absRotation === 90 || absRotation === 270) {
        const {
          width,
          height
        } = this.viewport;
        scaleX = height / width;
        scaleY = width / height;
      }
      target.style.transform = `rotate(${relativeRotation}deg) scale(${scaleX}, ${scaleY})`;
    }
    if (redrawAnnotationLayer && this.annotationLayer) {
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderAnnotationLayer).call(this);
    }
    if (redrawAnnotationEditorLayer && this.annotationEditorLayer) {
      if (this.drawLayer) {
        pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderDrawLayer).call(this);
      }
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderAnnotationEditorLayer).call(this);
    }
    if (redrawXfaLayer && this.xfaLayer) {
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderXfaLayer).call(this);
    }
    if (this.textLayer) {
      if (hideTextLayer) {
        var _this$structTreeLayer2;
        this.textLayer.hide();
        (_this$structTreeLayer2 = this.structTreeLayer) === null || _this$structTreeLayer2 === void 0 || _this$structTreeLayer2.hide();
      } else if (redrawTextLayer) {
        pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderTextLayer).call(this);
      }
    }
  }
  get width() {
    return this.viewport.width;
  }
  get height() {
    return this.viewport.height;
  }
  getPagePoint(x, y) {
    return this.viewport.convertToPdfPoint(x, y);
  }
  async draw() {
    if (this.renderingState !== RenderingStates.INITIAL) {
      console.error("Must be in new state before drawing");
      this.reset();
    }
    const {
      div,
      l10n,
      pageColors,
      pdfPage,
      viewport
    } = this;
    if (!pdfPage) {
      this.renderingState = RenderingStates.FINISHED;
      throw new Error("pdfPage is not loaded");
    }
    this.renderingState = RenderingStates.RUNNING;
    const canvasWrapper = document.createElement("div");
    canvasWrapper.classList.add("canvasWrapper");
    pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _addLayer).call(this, canvasWrapper, "canvasWrapper");
    if (!this.textLayer && pdf_page_view_classPrivateFieldGet(_textLayerMode, this) !== TextLayerMode.DISABLE && !pdfPage.isPureXfa) {
      this._accessibilityManager || (this._accessibilityManager = new TextAccessibilityManager());
      this.textLayer = new TextLayerBuilder({
        pdfPage,
        highlighter: this._textHighlighter,
        accessibilityManager: this._accessibilityManager,
        enablePermissions: pdf_page_view_classPrivateFieldGet(_textLayerMode, this) === TextLayerMode.ENABLE_PERMISSIONS,
        onAppend: textLayerDiv => {
          this.l10n.pause();
          pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _addLayer).call(this, textLayerDiv, "textLayer");
          this.l10n.resume();
        }
      });
    }
    if (!this.annotationLayer && pdf_page_view_classPrivateFieldGet(_annotationMode, this) !== AnnotationMode.DISABLE) {
      const {
        annotationStorage,
        annotationEditorUIManager,
        downloadManager,
        enableScripting,
        fieldObjectsPromise,
        hasJSActionsPromise,
        linkService
      } = pdf_page_view_classPrivateFieldGet(_layerProperties, this);
      this._annotationCanvasMap || (this._annotationCanvasMap = new Map());
      this.annotationLayer = new AnnotationLayerBuilder({
        pdfPage,
        annotationStorage,
        imageResourcesPath: this.imageResourcesPath,
        renderForms: pdf_page_view_classPrivateFieldGet(_annotationMode, this) === AnnotationMode.ENABLE_FORMS,
        linkService,
        downloadManager,
        enableScripting,
        hasJSActionsPromise,
        fieldObjectsPromise,
        annotationCanvasMap: this._annotationCanvasMap,
        accessibilityManager: this._accessibilityManager,
        annotationEditorUIManager,
        onAppend: annotationLayerDiv => {
          pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _addLayer).call(this, annotationLayerDiv, "annotationLayer");
        }
      });
    }
    const renderContinueCallback = cont => {
      var _showCanvas;
      (_showCanvas = showCanvas) === null || _showCanvas === void 0 || _showCanvas(false);
      if (this.renderingQueue && !this.renderingQueue.isHighestPriority(this)) {
        this.renderingState = RenderingStates.PAUSED;
        this.resume = () => {
          this.renderingState = RenderingStates.RUNNING;
          cont();
        };
        return;
      }
      cont();
    };
    const {
      width,
      height
    } = viewport;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "presentation");
    canvas.hidden = true;
    const hasHCM = !!(pageColors !== null && pageColors !== void 0 && pageColors.background && pageColors !== null && pageColors !== void 0 && pageColors.foreground);
    let showCanvas = isLastShow => {
      if (!hasHCM || isLastShow) {
        canvas.hidden = false;
        showCanvas = null;
      }
    };
    canvasWrapper.append(canvas);
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: !pdf_page_view_classPrivateFieldGet(_enableHWA, this)
    });
    const outputScale = this.outputScale = new OutputScale();
    if (this.maxCanvasPixels === 0) {
      const invScale = 1 / this.scale;
      outputScale.sx *= invScale;
      outputScale.sy *= invScale;
      pdf_page_view_classPrivateFieldSet(_hasRestrictedScaling, this, true);
    } else if (this.maxCanvasPixels > 0) {
      const pixelsInViewport = width * height;
      const maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);
      if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
        outputScale.sx = maxScale;
        outputScale.sy = maxScale;
        pdf_page_view_classPrivateFieldSet(_hasRestrictedScaling, this, true);
      } else {
        pdf_page_view_classPrivateFieldSet(_hasRestrictedScaling, this, false);
      }
    }
    const sfx = approximateFraction(outputScale.sx);
    const sfy = approximateFraction(outputScale.sy);
    const canvasWidth = canvas.width = floorToDivide(calcRound(width * outputScale.sx), sfx[0]);
    const canvasHeight = canvas.height = floorToDivide(calcRound(height * outputScale.sy), sfy[0]);
    const pageWidth = floorToDivide(calcRound(width), sfx[1]);
    const pageHeight = floorToDivide(calcRound(height), sfy[1]);
    outputScale.sx = canvasWidth / pageWidth;
    outputScale.sy = canvasHeight / pageHeight;
    if (pdf_page_view_classPrivateFieldGet(_scaleRoundX, this) !== sfx[1]) {
      div.style.setProperty("--scale-round-x", `${sfx[1]}px`);
      pdf_page_view_classPrivateFieldSet(_scaleRoundX, this, sfx[1]);
    }
    if (pdf_page_view_classPrivateFieldGet(_scaleRoundY, this) !== sfy[1]) {
      div.style.setProperty("--scale-round-y", `${sfy[1]}px`);
      pdf_page_view_classPrivateFieldSet(_scaleRoundY, this, sfy[1]);
    }
    pdf_page_view_classPrivateFieldGet(_viewportMap, this).set(canvas, viewport);
    const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport,
      annotationMode: pdf_page_view_classPrivateFieldGet(_annotationMode, this),
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      annotationCanvasMap: this._annotationCanvasMap,
      pageColors,
      isEditing: pdf_page_view_classPrivateFieldGet(_isEditing, this)
    };
    const renderTask = this.renderTask = pdfPage.render(renderContext);
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then(async () => {
      var _showCanvas2, _this$annotationLayer3;
      (_showCanvas2 = showCanvas) === null || _showCanvas2 === void 0 || _showCanvas2(true);
      await pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _finishRenderTask).call(this, renderTask);
      this.structTreeLayer || (this.structTreeLayer = new StructTreeLayerBuilder(pdfPage, viewport.rawDims));
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderTextLayer).call(this);
      if (this.annotationLayer) {
        await pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderAnnotationLayer).call(this);
      }
      const {
        annotationEditorUIManager
      } = pdf_page_view_classPrivateFieldGet(_layerProperties, this);
      if (!annotationEditorUIManager) {
        return;
      }
      this.drawLayer || (this.drawLayer = new DrawLayerBuilder({
        pageIndex: this.id
      }));
      await pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderDrawLayer).call(this);
      this.drawLayer.setParent(canvasWrapper);
      this.annotationEditorLayer || (this.annotationEditorLayer = new AnnotationEditorLayerBuilder({
        uiManager: annotationEditorUIManager,
        pdfPage,
        l10n,
        structTreeLayer: this.structTreeLayer,
        accessibilityManager: this._accessibilityManager,
        annotationLayer: (_this$annotationLayer3 = this.annotationLayer) === null || _this$annotationLayer3 === void 0 ? void 0 : _this$annotationLayer3.annotationLayer,
        textLayer: this.textLayer,
        drawLayer: this.drawLayer.getDrawLayer(),
        onAppend: annotationEditorLayerDiv => {
          pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _addLayer).call(this, annotationEditorLayerDiv, "annotationEditorLayer");
        }
      }));
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderAnnotationEditorLayer).call(this);
    }, error => {
      if (!(error instanceof RenderingCancelledException)) {
        var _showCanvas3;
        (_showCanvas3 = showCanvas) === null || _showCanvas3 === void 0 || _showCanvas3(true);
      }
      return pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _finishRenderTask).call(this, renderTask, error);
    });
    if (pdfPage.isPureXfa) {
      if (!this.xfaLayer) {
        const {
          annotationStorage,
          linkService
        } = pdf_page_view_classPrivateFieldGet(_layerProperties, this);
        this.xfaLayer = new XfaLayerBuilder({
          pdfPage,
          annotationStorage,
          linkService
        });
      }
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderXfaLayer).call(this);
    }
    div.setAttribute("data-loaded", true);
    this.eventBus.dispatch("pagerender", {
      source: this,
      pageNumber: this.id
    });
    return resultPromise;
  }
  setPageLabel(label) {
    var _this$pageLabel;
    this.pageLabel = typeof label === "string" ? label : null;
    this.div.setAttribute("data-l10n-args", JSON.stringify({
      page: (_this$pageLabel = this.pageLabel) !== null && _this$pageLabel !== void 0 ? _this$pageLabel : this.id
    }));
    if (this.pageLabel !== null) {
      this.div.setAttribute("data-page-label", this.pageLabel);
    } else {
      this.div.removeAttribute("data-page-label");
    }
  }
  get thumbnailCanvas() {
    const {
      directDrawing,
      initialOptionalContent,
      regularAnnotations
    } = pdf_page_view_classPrivateFieldGet(_useThumbnailCanvas, this);
    return directDrawing && initialOptionalContent && regularAnnotations ? this.canvas : null;
  }
}
function _addLayer(div, name) {
  const pos = LAYERS_ORDER.get(name);
  const oldDiv = pdf_page_view_classPrivateFieldGet(_layers, this)[pos];
  pdf_page_view_classPrivateFieldGet(_layers, this)[pos] = div;
  if (oldDiv) {
    oldDiv.replaceWith(div);
    return;
  }
  for (let i = pos - 1; i >= 0; i--) {
    const layer = pdf_page_view_classPrivateFieldGet(_layers, this)[i];
    if (layer) {
      layer.after(div);
      return;
    }
  }
  this.div.prepend(div);
}
function _setDimensions() {
  const {
    viewport
  } = this;
  if (this.pdfPage) {
    if (pdf_page_view_classPrivateFieldGet(_previousRotation, this) === viewport.rotation) {
      return;
    }
    pdf_page_view_classPrivateFieldSet(_previousRotation, this, viewport.rotation);
  }
  setLayerDimensions(this.div, viewport, true, false);
}
function _dispatchLayerRendered(name, error) {
  this.eventBus.dispatch(name, {
    source: this,
    pageNumber: this.id,
    error
  });
}
async function _renderAnnotationLayer() {
  let error = null;
  try {
    await this.annotationLayer.render(this.viewport, {
      structTreeLayer: this.structTreeLayer
    }, "display");
  } catch (ex) {
    console.error(`#renderAnnotationLayer: "${ex}".`);
    error = ex;
  } finally {
    pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _dispatchLayerRendered).call(this, "annotationlayerrendered", error);
  }
}
async function _renderAnnotationEditorLayer() {
  let error = null;
  try {
    await this.annotationEditorLayer.render(this.viewport, "display");
  } catch (ex) {
    console.error(`#renderAnnotationEditorLayer: "${ex}".`);
    error = ex;
  } finally {
    pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _dispatchLayerRendered).call(this, "annotationeditorlayerrendered", error);
  }
}
async function _renderDrawLayer() {
  try {
    await this.drawLayer.render("display");
  } catch (ex) {
    console.error(`#renderDrawLayer: "${ex}".`);
  }
}
async function _renderXfaLayer() {
  let error = null;
  try {
    const result = await this.xfaLayer.render(this.viewport, "display");
    if (result !== null && result !== void 0 && result.textDivs && this._textHighlighter) {
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _buildXfaTextContentItems).call(this, result.textDivs);
    }
  } catch (ex) {
    console.error(`#renderXfaLayer: "${ex}".`);
    error = ex;
  } finally {
    var _this$xfaLayer2;
    if ((_this$xfaLayer2 = this.xfaLayer) !== null && _this$xfaLayer2 !== void 0 && _this$xfaLayer2.div) {
      this.l10n.pause();
      pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _addLayer).call(this, this.xfaLayer.div, "xfaLayer");
      this.l10n.resume();
    }
    pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _dispatchLayerRendered).call(this, "xfalayerrendered", error);
  }
}
async function _renderTextLayer() {
  if (!this.textLayer) {
    return;
  }
  let error = null;
  try {
    await this.textLayer.render(this.viewport);
  } catch (ex) {
    if (ex instanceof AbortException) {
      return;
    }
    console.error(`#renderTextLayer: "${ex}".`);
    error = ex;
  }
  pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _dispatchLayerRendered).call(this, "textlayerrendered", error);
  pdf_page_view_assertClassBrand(_PDFPageView_brand, this, _renderStructTreeLayer).call(this);
}
async function _renderStructTreeLayer() {
  var _this$structTreeLayer3, _this$structTreeLayer5;
  if (!this.textLayer) {
    return;
  }
  const treeDom = await ((_this$structTreeLayer3 = this.structTreeLayer) === null || _this$structTreeLayer3 === void 0 ? void 0 : _this$structTreeLayer3.render());
  if (treeDom) {
    var _this$structTreeLayer4;
    this.l10n.pause();
    (_this$structTreeLayer4 = this.structTreeLayer) === null || _this$structTreeLayer4 === void 0 || _this$structTreeLayer4.addElementsToTextLayer();
    if (this.canvas && treeDom.parentNode !== this.canvas) {
      this.canvas.append(treeDom);
    }
    this.l10n.resume();
  }
  (_this$structTreeLayer5 = this.structTreeLayer) === null || _this$structTreeLayer5 === void 0 || _this$structTreeLayer5.show();
}
async function _buildXfaTextContentItems(textDivs) {
  const text = await this.pdfPage.getTextContent();
  const items = [];
  for (const item of text.items) {
    items.push(item.str);
  }
  this._textHighlighter.setTextMapping(textDivs, items);
  this._textHighlighter.enable();
}
async function _finishRenderTask(renderTask, error = null) {
  if (renderTask === this.renderTask) {
    this.renderTask = null;
  }
  if (error instanceof RenderingCancelledException) {
    pdf_page_view_classPrivateFieldSet(_renderError, this, null);
    return;
  }
  pdf_page_view_classPrivateFieldSet(_renderError, this, error);
  this.renderingState = RenderingStates.FINISHED;
  this._resetZoomLayer(true);
  pdf_page_view_classPrivateFieldGet(_useThumbnailCanvas, this).regularAnnotations = !renderTask.separateAnnots;
  this.eventBus.dispatch("pagerendered", {
    source: this,
    pageNumber: this.id,
    cssTransform: false,
    timestamp: performance.now(),
    error: pdf_page_view_classPrivateFieldGet(_renderError, this)
  });
  if (error) {
    throw error;
  }
}

;// ./web/generic_scripting.js

async function docProperties(pdfDocument) {
  const url = "",
    baseUrl = url.split("#", 1)[0];
  let {
    info,
    metadata,
    contentDispositionFilename,
    contentLength
  } = await pdfDocument.getMetadata();
  if (!contentLength) {
    const {
      length
    } = await pdfDocument.getDownloadInfo();
    contentLength = length;
  }
  return {
    ...info,
    baseURL: baseUrl,
    filesize: contentLength,
    filename: contentDispositionFilename || getPdfFilenameFromUrl(url),
    metadata: metadata === null || metadata === void 0 ? void 0 : metadata.getRaw(),
    authors: metadata === null || metadata === void 0 ? void 0 : metadata.get("dc:creator"),
    numPages: pdfDocument.numPages,
    URL: url
  };
}
class GenericScripting {
  constructor(sandboxBundleSrc) {
    this._ready = new Promise((resolve, reject) => {
      const sandbox = import(/*webpackIgnore: true*/sandboxBundleSrc);
      sandbox.then(pdfjsSandbox => {
        resolve(pdfjsSandbox.QuickJSSandbox());
      }).catch(reject);
    });
  }
  async createSandbox(data) {
    const sandbox = await this._ready;
    sandbox.create(data);
  }
  async dispatchEventInSandbox(event) {
    const sandbox = await this._ready;
    setTimeout(() => sandbox.dispatchEvent(event), 0);
  }
  async destroySandbox() {
    const sandbox = await this._ready;
    sandbox.nukeSandbox();
  }
}

;// ./web/pdf_scripting_manager.js









function pdf_scripting_manager_classPrivateMethodInitSpec(e, a) { pdf_scripting_manager_checkPrivateRedeclaration(e, a), a.add(e); }
function pdf_scripting_manager_classPrivateFieldInitSpec(e, t, a) { pdf_scripting_manager_checkPrivateRedeclaration(e, t), t.set(e, a); }
function pdf_scripting_manager_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function pdf_scripting_manager_classPrivateFieldGet(s, a) { return s.get(pdf_scripting_manager_assertClassBrand(s, a)); }
function pdf_scripting_manager_classPrivateFieldSet(s, a, r) { return s.set(pdf_scripting_manager_assertClassBrand(s, a), r), r; }
function pdf_scripting_manager_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


var _closeCapability = /*#__PURE__*/new WeakMap();
var _destroyCapability = /*#__PURE__*/new WeakMap();
var _docProperties = /*#__PURE__*/new WeakMap();
var pdf_scripting_manager_eventAbortController = /*#__PURE__*/new WeakMap();
var _eventBus = /*#__PURE__*/new WeakMap();
var pdf_scripting_manager_externalServices = /*#__PURE__*/new WeakMap();
var _pdfDocument = /*#__PURE__*/new WeakMap();
var _pdfViewer = /*#__PURE__*/new WeakMap();
var _ready = /*#__PURE__*/new WeakMap();
var _scripting = /*#__PURE__*/new WeakMap();
var _willPrintCapability = /*#__PURE__*/new WeakMap();
var _PDFScriptingManager_brand = /*#__PURE__*/new WeakSet();
class PDFScriptingManager {
  constructor({
    eventBus,
    externalServices = null,
    docProperties = null
  }) {
    pdf_scripting_manager_classPrivateMethodInitSpec(this, _PDFScriptingManager_brand);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _closeCapability, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _destroyCapability, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _docProperties, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, pdf_scripting_manager_eventAbortController, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _eventBus, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, pdf_scripting_manager_externalServices, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _pdfDocument, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _pdfViewer, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _ready, false);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _scripting, null);
    pdf_scripting_manager_classPrivateFieldInitSpec(this, _willPrintCapability, null);
    pdf_scripting_manager_classPrivateFieldSet(_eventBus, this, eventBus);
    pdf_scripting_manager_classPrivateFieldSet(pdf_scripting_manager_externalServices, this, externalServices);
    pdf_scripting_manager_classPrivateFieldSet(_docProperties, this, docProperties);
  }
  setViewer(pdfViewer) {
    pdf_scripting_manager_classPrivateFieldSet(_pdfViewer, this, pdfViewer);
  }
  async setDocument(pdfDocument) {
    var _classPrivateFieldGet6;
    if (pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this)) {
      await pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _destroyScripting).call(this);
    }
    pdf_scripting_manager_classPrivateFieldSet(_pdfDocument, this, pdfDocument);
    if (!pdfDocument) {
      return;
    }
    const [objects, calculationOrder, docActions] = await Promise.all([pdfDocument.getFieldObjects(), pdfDocument.getCalculationOrderIds(), pdfDocument.getJSActions()]);
    if (!objects && !docActions) {
      await pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _destroyScripting).call(this);
      return;
    }
    if (pdfDocument !== pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this)) {
      return;
    }
    try {
      pdf_scripting_manager_classPrivateFieldSet(_scripting, this, pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _initScripting).call(this));
    } catch (error) {
      console.error(`setDocument: "${error.message}".`);
      await pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _destroyScripting).call(this);
      return;
    }
    const eventBus = pdf_scripting_manager_classPrivateFieldGet(_eventBus, this);
    pdf_scripting_manager_classPrivateFieldSet(pdf_scripting_manager_eventAbortController, this, new AbortController());
    const {
      signal
    } = pdf_scripting_manager_classPrivateFieldGet(pdf_scripting_manager_eventAbortController, this);
    eventBus._on("updatefromsandbox", event => {
      if ((event === null || event === void 0 ? void 0 : event.source) === window) {
        pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _updateFromSandbox).call(this, event.detail);
      }
    }, {
      signal
    });
    eventBus._on("dispatcheventinsandbox", event => {
      var _classPrivateFieldGet3;
      (_classPrivateFieldGet3 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.dispatchEventInSandbox(event.detail);
    }, {
      signal
    });
    eventBus._on("pagechanging", ({
      pageNumber,
      previous
    }) => {
      if (pageNumber === previous) {
        return;
      }
      pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _dispatchPageClose).call(this, previous);
      pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _dispatchPageOpen).call(this, pageNumber);
    }, {
      signal
    });
    eventBus._on("pagerendered", ({
      pageNumber
    }) => {
      if (!this._pageOpenPending.has(pageNumber)) {
        return;
      }
      if (pageNumber !== pdf_scripting_manager_classPrivateFieldGet(_pdfViewer, this).currentPageNumber) {
        return;
      }
      pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _dispatchPageOpen).call(this, pageNumber);
    }, {
      signal
    });
    eventBus._on("pagesdestroy", async () => {
      var _classPrivateFieldGet4, _classPrivateFieldGet5;
      await pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _dispatchPageClose).call(this, pdf_scripting_manager_classPrivateFieldGet(_pdfViewer, this).currentPageNumber);
      await ((_classPrivateFieldGet4 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.dispatchEventInSandbox({
        id: "doc",
        name: "WillClose"
      }));
      (_classPrivateFieldGet5 = pdf_scripting_manager_classPrivateFieldGet(_closeCapability, this)) === null || _classPrivateFieldGet5 === void 0 || _classPrivateFieldGet5.resolve();
    }, {
      signal
    });
    try {
      const docProperties = await pdf_scripting_manager_classPrivateFieldGet(_docProperties, this).call(this, pdfDocument);
      if (pdfDocument !== pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this)) {
        return;
      }
      await pdf_scripting_manager_classPrivateFieldGet(_scripting, this).createSandbox({
        objects,
        calculationOrder,
        appInfo: {
          platform: navigator.platform,
          language: navigator.language
        },
        docInfo: {
          ...docProperties,
          actions: docActions
        }
      });
      eventBus.dispatch("sandboxcreated", {
        source: this
      });
    } catch (error) {
      console.error(`setDocument: "${error.message}".`);
      await pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _destroyScripting).call(this);
      return;
    }
    await ((_classPrivateFieldGet6 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet6 === void 0 ? void 0 : _classPrivateFieldGet6.dispatchEventInSandbox({
      id: "doc",
      name: "Open"
    }));
    await pdf_scripting_manager_assertClassBrand(_PDFScriptingManager_brand, this, _dispatchPageOpen).call(this, pdf_scripting_manager_classPrivateFieldGet(_pdfViewer, this).currentPageNumber, true);
    Promise.resolve().then(() => {
      if (pdfDocument === pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this)) {
        pdf_scripting_manager_classPrivateFieldSet(_ready, this, true);
      }
    });
  }
  async dispatchWillSave() {
    var _classPrivateFieldGet7;
    return (_classPrivateFieldGet7 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.dispatchEventInSandbox({
      id: "doc",
      name: "WillSave"
    });
  }
  async dispatchDidSave() {
    var _classPrivateFieldGet8;
    return (_classPrivateFieldGet8 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet8 === void 0 ? void 0 : _classPrivateFieldGet8.dispatchEventInSandbox({
      id: "doc",
      name: "DidSave"
    });
  }
  async dispatchWillPrint() {
    var _classPrivateFieldGet9;
    if (!pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) {
      return;
    }
    await ((_classPrivateFieldGet9 = pdf_scripting_manager_classPrivateFieldGet(_willPrintCapability, this)) === null || _classPrivateFieldGet9 === void 0 ? void 0 : _classPrivateFieldGet9.promise);
    pdf_scripting_manager_classPrivateFieldSet(_willPrintCapability, this, Promise.withResolvers());
    try {
      await pdf_scripting_manager_classPrivateFieldGet(_scripting, this).dispatchEventInSandbox({
        id: "doc",
        name: "WillPrint"
      });
    } catch (ex) {
      pdf_scripting_manager_classPrivateFieldGet(_willPrintCapability, this).resolve();
      pdf_scripting_manager_classPrivateFieldSet(_willPrintCapability, this, null);
      throw ex;
    }
    await pdf_scripting_manager_classPrivateFieldGet(_willPrintCapability, this).promise;
  }
  async dispatchDidPrint() {
    var _classPrivateFieldGet10;
    return (_classPrivateFieldGet10 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet10 === void 0 ? void 0 : _classPrivateFieldGet10.dispatchEventInSandbox({
      id: "doc",
      name: "DidPrint"
    });
  }
  get destroyPromise() {
    var _classPrivateFieldGet11;
    return ((_classPrivateFieldGet11 = pdf_scripting_manager_classPrivateFieldGet(_destroyCapability, this)) === null || _classPrivateFieldGet11 === void 0 ? void 0 : _classPrivateFieldGet11.promise) || null;
  }
  get ready() {
    return pdf_scripting_manager_classPrivateFieldGet(_ready, this);
  }
  get _pageOpenPending() {
    return shadow(this, "_pageOpenPending", new Set());
  }
  get _visitedPages() {
    return shadow(this, "_visitedPages", new Map());
  }
}
async function _updateFromSandbox(detail) {
  var _classPrivateFieldGet12;
  const pdfViewer = pdf_scripting_manager_classPrivateFieldGet(_pdfViewer, this);
  const isInPresentationMode = pdfViewer.isInPresentationMode || pdfViewer.isChangingPresentationMode;
  const {
    id,
    siblings,
    command,
    value
  } = detail;
  if (!id) {
    switch (command) {
      case "clear":
        console.clear();
        break;
      case "error":
        console.error(value);
        break;
      case "layout":
        if (!isInPresentationMode) {
          const modes = apiPageLayoutToViewerModes(value);
          pdfViewer.spreadMode = modes.spreadMode;
        }
        break;
      case "page-num":
        pdfViewer.currentPageNumber = value + 1;
        break;
      case "print":
        await pdfViewer.pagesPromise;
        pdf_scripting_manager_classPrivateFieldGet(_eventBus, this).dispatch("print", {
          source: this
        });
        break;
      case "println":
        console.log(value);
        break;
      case "zoom":
        if (!isInPresentationMode) {
          pdfViewer.currentScaleValue = value;
        }
        break;
      case "SaveAs":
        pdf_scripting_manager_classPrivateFieldGet(_eventBus, this).dispatch("download", {
          source: this
        });
        break;
      case "FirstPage":
        pdfViewer.currentPageNumber = 1;
        break;
      case "LastPage":
        pdfViewer.currentPageNumber = pdfViewer.pagesCount;
        break;
      case "NextPage":
        pdfViewer.nextPage();
        break;
      case "PrevPage":
        pdfViewer.previousPage();
        break;
      case "ZoomViewIn":
        if (!isInPresentationMode) {
          pdfViewer.increaseScale();
        }
        break;
      case "ZoomViewOut":
        if (!isInPresentationMode) {
          pdfViewer.decreaseScale();
        }
        break;
      case "WillPrintFinished":
        (_classPrivateFieldGet12 = pdf_scripting_manager_classPrivateFieldGet(_willPrintCapability, this)) === null || _classPrivateFieldGet12 === void 0 || _classPrivateFieldGet12.resolve();
        pdf_scripting_manager_classPrivateFieldSet(_willPrintCapability, this, null);
        break;
    }
    return;
  }
  if (isInPresentationMode && detail.focus) {
    return;
  }
  delete detail.id;
  delete detail.siblings;
  const ids = siblings ? [id, ...siblings] : [id];
  for (const elementId of ids) {
    const element = document.querySelector(`[data-element-id="${elementId}"]`);
    if (element) {
      element.dispatchEvent(new CustomEvent("updatefromsandbox", {
        detail
      }));
    } else {
      var _classPrivateFieldGet13;
      (_classPrivateFieldGet13 = pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this)) === null || _classPrivateFieldGet13 === void 0 || _classPrivateFieldGet13.annotationStorage.setValue(elementId, detail);
    }
  }
}
async function _dispatchPageOpen(pageNumber, initialize = false) {
  const pdfDocument = pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this),
    visitedPages = this._visitedPages;
  if (initialize) {
    pdf_scripting_manager_classPrivateFieldSet(_closeCapability, this, Promise.withResolvers());
  }
  if (!pdf_scripting_manager_classPrivateFieldGet(_closeCapability, this)) {
    return;
  }
  const pageView = pdf_scripting_manager_classPrivateFieldGet(_pdfViewer, this).getPageView(pageNumber - 1);
  if ((pageView === null || pageView === void 0 ? void 0 : pageView.renderingState) !== RenderingStates.FINISHED) {
    this._pageOpenPending.add(pageNumber);
    return;
  }
  this._pageOpenPending.delete(pageNumber);
  const actionsPromise = (async (_pageView$pdfPage, _classPrivateFieldGet14) => {
    const actions = await (!visitedPages.has(pageNumber) ? (_pageView$pdfPage = pageView.pdfPage) === null || _pageView$pdfPage === void 0 ? void 0 : _pageView$pdfPage.getJSActions() : null);
    if (pdfDocument !== pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this)) {
      return;
    }
    await ((_classPrivateFieldGet14 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet14 === void 0 ? void 0 : _classPrivateFieldGet14.dispatchEventInSandbox({
      id: "page",
      name: "PageOpen",
      pageNumber,
      actions
    }));
  })();
  visitedPages.set(pageNumber, actionsPromise);
}
async function _dispatchPageClose(pageNumber) {
  var _classPrivateFieldGet15;
  const pdfDocument = pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this),
    visitedPages = this._visitedPages;
  if (!pdf_scripting_manager_classPrivateFieldGet(_closeCapability, this)) {
    return;
  }
  if (this._pageOpenPending.has(pageNumber)) {
    return;
  }
  const actionsPromise = visitedPages.get(pageNumber);
  if (!actionsPromise) {
    return;
  }
  visitedPages.set(pageNumber, null);
  await actionsPromise;
  if (pdfDocument !== pdf_scripting_manager_classPrivateFieldGet(_pdfDocument, this)) {
    return;
  }
  await ((_classPrivateFieldGet15 = pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) === null || _classPrivateFieldGet15 === void 0 ? void 0 : _classPrivateFieldGet15.dispatchEventInSandbox({
    id: "page",
    name: "PageClose",
    pageNumber
  }));
}
function _initScripting() {
  pdf_scripting_manager_classPrivateFieldSet(_destroyCapability, this, Promise.withResolvers());
  if (pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) {
    throw new Error("#initScripting: Scripting already exists.");
  }
  return pdf_scripting_manager_classPrivateFieldGet(pdf_scripting_manager_externalServices, this).createScripting();
}
async function _destroyScripting() {
  var _classPrivateFieldGet17, _classPrivateFieldGet18, _classPrivateFieldGet19;
  if (!pdf_scripting_manager_classPrivateFieldGet(_scripting, this)) {
    var _classPrivateFieldGet16;
    pdf_scripting_manager_classPrivateFieldSet(_pdfDocument, this, null);
    (_classPrivateFieldGet16 = pdf_scripting_manager_classPrivateFieldGet(_destroyCapability, this)) === null || _classPrivateFieldGet16 === void 0 || _classPrivateFieldGet16.resolve();
    return;
  }
  if (pdf_scripting_manager_classPrivateFieldGet(_closeCapability, this)) {
    await Promise.race([pdf_scripting_manager_classPrivateFieldGet(_closeCapability, this).promise, new Promise(resolve => {
      setTimeout(resolve, 1000);
    })]).catch(() => {});
    pdf_scripting_manager_classPrivateFieldSet(_closeCapability, this, null);
  }
  pdf_scripting_manager_classPrivateFieldSet(_pdfDocument, this, null);
  try {
    await pdf_scripting_manager_classPrivateFieldGet(_scripting, this).destroySandbox();
  } catch {}
  (_classPrivateFieldGet17 = pdf_scripting_manager_classPrivateFieldGet(_willPrintCapability, this)) === null || _classPrivateFieldGet17 === void 0 || _classPrivateFieldGet17.reject(new Error("Scripting destroyed."));
  pdf_scripting_manager_classPrivateFieldSet(_willPrintCapability, this, null);
  (_classPrivateFieldGet18 = pdf_scripting_manager_classPrivateFieldGet(pdf_scripting_manager_eventAbortController, this)) === null || _classPrivateFieldGet18 === void 0 || _classPrivateFieldGet18.abort();
  pdf_scripting_manager_classPrivateFieldSet(pdf_scripting_manager_eventAbortController, this, null);
  this._pageOpenPending.clear();
  this._visitedPages.clear();
  pdf_scripting_manager_classPrivateFieldSet(_scripting, this, null);
  pdf_scripting_manager_classPrivateFieldSet(_ready, this, false);
  (_classPrivateFieldGet19 = pdf_scripting_manager_classPrivateFieldGet(_destroyCapability, this)) === null || _classPrivateFieldGet19 === void 0 || _classPrivateFieldGet19.resolve();
}

;// ./web/pdf_scripting_manager.component.js


class PDFScriptingManagerComponents extends PDFScriptingManager {
  constructor(options) {
    if (!options.externalServices) {
      window.addEventListener("updatefromsandbox", event => {
        options.eventBus.dispatch("updatefromsandbox", {
          source: window,
          detail: event.detail
        });
      });
    }
    options.externalServices || (options.externalServices = {
      createScripting: () => new GenericScripting(options.sandboxBundleSrc)
    });
    options.docProperties || (options.docProperties = pdfDocument => docProperties(pdfDocument));
    super(options);
  }
}

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.every.js
var esnext_iterator_every = __webpack_require__(3215);
;// ./web/pdf_rendering_queue.js


const CLEANUP_TIMEOUT = 30000;
class PDFRenderingQueue {
  constructor() {
    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
    Object.defineProperty(this, "hasViewer", {
      value: () => !!this.pdfViewer
    });
  }
  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }
  setThumbnailViewer(pdfThumbnailViewer) {
    this.pdfThumbnailViewer = pdfThumbnailViewer;
  }
  isHighestPriority(view) {
    return this.highestPriorityPage === view.renderingId;
  }
  renderHighestPriority(currentlyVisiblePages) {
    var _this$pdfThumbnailVie;
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }
    if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
      return;
    }
    if (this.isThumbnailViewEnabled && (_this$pdfThumbnailVie = this.pdfThumbnailViewer) !== null && _this$pdfThumbnailVie !== void 0 && _this$pdfThumbnailVie.forceRendering()) {
      return;
    }
    if (this.printing) {
      return;
    }
    if (this.onIdle) {
      this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
    }
  }
  getHighestPriority(visible, views, scrolledDown, preRenderExtra = false) {
    const visibleViews = visible.views,
      numVisible = visibleViews.length;
    if (numVisible === 0) {
      return null;
    }
    for (let i = 0; i < numVisible; i++) {
      const view = visibleViews[i].view;
      if (!this.isViewFinished(view)) {
        return view;
      }
    }
    const firstId = visible.first.id,
      lastId = visible.last.id;
    if (lastId - firstId + 1 > numVisible) {
      const visibleIds = visible.ids;
      for (let i = 1, ii = lastId - firstId; i < ii; i++) {
        const holeId = scrolledDown ? firstId + i : lastId - i;
        if (visibleIds.has(holeId)) {
          continue;
        }
        const holeView = views[holeId - 1];
        if (!this.isViewFinished(holeView)) {
          return holeView;
        }
      }
    }
    let preRenderIndex = scrolledDown ? lastId : firstId - 2;
    let preRenderView = views[preRenderIndex];
    if (preRenderView && !this.isViewFinished(preRenderView)) {
      return preRenderView;
    }
    if (preRenderExtra) {
      preRenderIndex += scrolledDown ? 1 : -1;
      preRenderView = views[preRenderIndex];
      if (preRenderView && !this.isViewFinished(preRenderView)) {
        return preRenderView;
      }
    }
    return null;
  }
  isViewFinished(view) {
    return view.renderingState === RenderingStates.FINISHED;
  }
  renderView(view) {
    switch (view.renderingState) {
      case RenderingStates.FINISHED:
        return false;
      case RenderingStates.PAUSED:
        this.highestPriorityPage = view.renderingId;
        view.resume();
        break;
      case RenderingStates.RUNNING:
        this.highestPriorityPage = view.renderingId;
        break;
      case RenderingStates.INITIAL:
        this.highestPriorityPage = view.renderingId;
        view.draw().finally(() => {
          this.renderHighestPriority();
        }).catch(reason => {
          if (reason instanceof RenderingCancelledException) {
            return;
          }
          console.error(`renderView: "${reason}"`);
        });
        break;
    }
    return true;
  }
}

;// ./web/pdf_viewer.js
function pdf_viewer_classPrivateGetter(s, r, a) { return a(pdf_viewer_assertClassBrand(s, r)); }














function pdf_viewer_classPrivateMethodInitSpec(e, a) { pdf_viewer_checkPrivateRedeclaration(e, a), a.add(e); }
function pdf_viewer_classPrivateFieldInitSpec(e, t, a) { pdf_viewer_checkPrivateRedeclaration(e, t), t.set(e, a); }
function pdf_viewer_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function pdf_viewer_classPrivateFieldGet(s, a) { return s.get(pdf_viewer_assertClassBrand(s, a)); }
function pdf_viewer_classPrivateFieldSet(s, a, r) { return s.set(pdf_viewer_assertClassBrand(s, a), r), r; }
function pdf_viewer_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






const DEFAULT_CACHE_SIZE = 10;
const PagesCountLimit = {
  FORCE_SCROLL_MODE_PAGE: 10000,
  FORCE_LAZY_PAGE_INIT: 5000,
  PAUSE_EAGER_PAGE_INIT: 250
};
function isValidAnnotationEditorMode(mode) {
  return Object.values(AnnotationEditorType).includes(mode) && mode !== AnnotationEditorType.DISABLE;
}
var _buf = /*#__PURE__*/new WeakMap();
var _size = /*#__PURE__*/new WeakMap();
var _PDFPageViewBuffer_brand = /*#__PURE__*/new WeakSet();
class PDFPageViewBuffer {
  constructor(size) {
    pdf_viewer_classPrivateMethodInitSpec(this, _PDFPageViewBuffer_brand);
    pdf_viewer_classPrivateFieldInitSpec(this, _buf, new Set());
    pdf_viewer_classPrivateFieldInitSpec(this, _size, 0);
    pdf_viewer_classPrivateFieldSet(_size, this, size);
  }
  push(view) {
    const buf = pdf_viewer_classPrivateFieldGet(_buf, this);
    if (buf.has(view)) {
      buf.delete(view);
    }
    buf.add(view);
    if (buf.size > pdf_viewer_classPrivateFieldGet(_size, this)) {
      pdf_viewer_assertClassBrand(_PDFPageViewBuffer_brand, this, _destroyFirstView).call(this);
    }
  }
  resize(newSize, idsToKeep = null) {
    pdf_viewer_classPrivateFieldSet(_size, this, newSize);
    const buf = pdf_viewer_classPrivateFieldGet(_buf, this);
    if (idsToKeep) {
      const ii = buf.size;
      let i = 1;
      for (const view of buf) {
        if (idsToKeep.has(view.id)) {
          buf.delete(view);
          buf.add(view);
        }
        if (++i > ii) {
          break;
        }
      }
    }
    while (buf.size > pdf_viewer_classPrivateFieldGet(_size, this)) {
      pdf_viewer_assertClassBrand(_PDFPageViewBuffer_brand, this, _destroyFirstView).call(this);
    }
  }
  has(view) {
    return pdf_viewer_classPrivateFieldGet(_buf, this).has(view);
  }
  [Symbol.iterator]() {
    return pdf_viewer_classPrivateFieldGet(_buf, this).keys();
  }
}
function _destroyFirstView() {
  const firstView = pdf_viewer_classPrivateFieldGet(_buf, this).keys().next().value;
  firstView === null || firstView === void 0 || firstView.destroy();
  pdf_viewer_classPrivateFieldGet(_buf, this).delete(firstView);
}
var _buffer = /*#__PURE__*/new WeakMap();
var _altTextManager = /*#__PURE__*/new WeakMap();
var _annotationEditorHighlightColors = /*#__PURE__*/new WeakMap();
var _annotationEditorMode = /*#__PURE__*/new WeakMap();
var _annotationEditorUIManager = /*#__PURE__*/new WeakMap();
var pdf_viewer_annotationMode = /*#__PURE__*/new WeakMap();
var _containerTopLeft = /*#__PURE__*/new WeakMap();
var pdf_viewer_enableHWA = /*#__PURE__*/new WeakMap();
var _enableHighlightFloatingButton = /*#__PURE__*/new WeakMap();
var pdf_viewer_enablePermissions = /*#__PURE__*/new WeakMap();
var _enableUpdatedAddImage = /*#__PURE__*/new WeakMap();
var _enableNewAltTextWhenAddingImage = /*#__PURE__*/new WeakMap();
var pdf_viewer_eventAbortController = /*#__PURE__*/new WeakMap();
var _mlManager = /*#__PURE__*/new WeakMap();
var _switchAnnotationEditorModeAC = /*#__PURE__*/new WeakMap();
var _switchAnnotationEditorModeTimeoutId = /*#__PURE__*/new WeakMap();
var _getAllTextInProgress = /*#__PURE__*/new WeakMap();
var _hiddenCopyElement = /*#__PURE__*/new WeakMap();
var _interruptCopyCondition = /*#__PURE__*/new WeakMap();
var _previousContainerHeight = /*#__PURE__*/new WeakMap();
var _resizeObserver = /*#__PURE__*/new WeakMap();
var _scrollModePageState = /*#__PURE__*/new WeakMap();
var _scaleTimeoutId = /*#__PURE__*/new WeakMap();
var pdf_viewer_textLayerMode = /*#__PURE__*/new WeakMap();
var _PDFViewer_brand = /*#__PURE__*/new WeakSet();
class PDFViewer {
  constructor(_options) {
    var _options$textLayerMod, _options$annotationMo, _options$annotationEd;
    var _this$container, _this$viewer;
    pdf_viewer_classPrivateMethodInitSpec(this, _PDFViewer_brand);
    pdf_viewer_classPrivateFieldInitSpec(this, _buffer, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _altTextManager, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _annotationEditorHighlightColors, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _annotationEditorMode, AnnotationEditorType.NONE);
    pdf_viewer_classPrivateFieldInitSpec(this, _annotationEditorUIManager, null);
    pdf_viewer_classPrivateFieldInitSpec(this, pdf_viewer_annotationMode, AnnotationMode.ENABLE_FORMS);
    pdf_viewer_classPrivateFieldInitSpec(this, _containerTopLeft, null);
    pdf_viewer_classPrivateFieldInitSpec(this, pdf_viewer_enableHWA, false);
    pdf_viewer_classPrivateFieldInitSpec(this, _enableHighlightFloatingButton, false);
    pdf_viewer_classPrivateFieldInitSpec(this, pdf_viewer_enablePermissions, false);
    pdf_viewer_classPrivateFieldInitSpec(this, _enableUpdatedAddImage, false);
    pdf_viewer_classPrivateFieldInitSpec(this, _enableNewAltTextWhenAddingImage, false);
    pdf_viewer_classPrivateFieldInitSpec(this, pdf_viewer_eventAbortController, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _mlManager, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _switchAnnotationEditorModeAC, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _switchAnnotationEditorModeTimeoutId, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _getAllTextInProgress, false);
    pdf_viewer_classPrivateFieldInitSpec(this, _hiddenCopyElement, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _interruptCopyCondition, false);
    pdf_viewer_classPrivateFieldInitSpec(this, _previousContainerHeight, 0);
    pdf_viewer_classPrivateFieldInitSpec(this, _resizeObserver, new ResizeObserver(pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _resizeObserverCallback).bind(this)));
    pdf_viewer_classPrivateFieldInitSpec(this, _scrollModePageState, null);
    pdf_viewer_classPrivateFieldInitSpec(this, _scaleTimeoutId, null);
    pdf_viewer_classPrivateFieldInitSpec(this, pdf_viewer_textLayerMode, TextLayerMode.ENABLE);
    const viewerVersion = "4.9.0";
    if (version !== viewerVersion) {
      throw new Error(`The API version "${version}" does not match the Viewer version "${viewerVersion}".`);
    }
    this.container = _options.container;
    this.viewer = _options.viewer || _options.container.firstElementChild;
    if (((_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.tagName) !== "DIV" || ((_this$viewer = this.viewer) === null || _this$viewer === void 0 ? void 0 : _this$viewer.tagName) !== "DIV") {
      throw new Error("Invalid `container` and/or `viewer` option.");
    }
    if (this.container.offsetParent && getComputedStyle(this.container).position !== "absolute") {
      throw new Error("The `container` must be absolutely positioned.");
    }
    pdf_viewer_classPrivateFieldGet(_resizeObserver, this).observe(this.container);
    this.eventBus = _options.eventBus;
    this.linkService = _options.linkService || new SimpleLinkService();
    this.downloadManager = _options.downloadManager || null;
    this.findController = _options.findController || null;
    pdf_viewer_classPrivateFieldSet(_altTextManager, this, _options.altTextManager || null);
    if (this.findController) {
      this.findController.onIsPageVisible = pageNumber => this._getVisiblePages().ids.has(pageNumber);
    }
    this._scriptingManager = _options.scriptingManager || null;
    pdf_viewer_classPrivateFieldSet(pdf_viewer_textLayerMode, this, (_options$textLayerMod = _options.textLayerMode) !== null && _options$textLayerMod !== void 0 ? _options$textLayerMod : TextLayerMode.ENABLE);
    pdf_viewer_classPrivateFieldSet(pdf_viewer_annotationMode, this, (_options$annotationMo = _options.annotationMode) !== null && _options$annotationMo !== void 0 ? _options$annotationMo : AnnotationMode.ENABLE_FORMS);
    pdf_viewer_classPrivateFieldSet(_annotationEditorMode, this, (_options$annotationEd = _options.annotationEditorMode) !== null && _options$annotationEd !== void 0 ? _options$annotationEd : AnnotationEditorType.NONE);
    pdf_viewer_classPrivateFieldSet(_annotationEditorHighlightColors, this, _options.annotationEditorHighlightColors || null);
    pdf_viewer_classPrivateFieldSet(_enableHighlightFloatingButton, this, _options.enableHighlightFloatingButton === true);
    pdf_viewer_classPrivateFieldSet(_enableUpdatedAddImage, this, _options.enableUpdatedAddImage === true);
    pdf_viewer_classPrivateFieldSet(_enableNewAltTextWhenAddingImage, this, _options.enableNewAltTextWhenAddingImage === true);
    this.imageResourcesPath = _options.imageResourcesPath || "";
    this.enablePrintAutoRotate = _options.enablePrintAutoRotate || false;
    this.removePageBorders = _options.removePageBorders || false;
    this.maxCanvasPixels = _options.maxCanvasPixels;
    this.l10n = _options.l10n;
    this.l10n || (this.l10n = new genericl10n_GenericL10n());
    pdf_viewer_classPrivateFieldSet(pdf_viewer_enablePermissions, this, _options.enablePermissions || false);
    this.pageColors = _options.pageColors || null;
    pdf_viewer_classPrivateFieldSet(_mlManager, this, _options.mlManager || null);
    pdf_viewer_classPrivateFieldSet(pdf_viewer_enableHWA, this, _options.enableHWA || false);
    this.defaultRenderingQueue = !_options.renderingQueue;
    if (this.defaultRenderingQueue) {
      this.renderingQueue = new PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = _options.renderingQueue;
    }
    const {
      abortSignal
    } = _options;
    abortSignal === null || abortSignal === void 0 || abortSignal.addEventListener("abort", () => {
      pdf_viewer_classPrivateFieldGet(_resizeObserver, this).disconnect();
      pdf_viewer_classPrivateFieldSet(_resizeObserver, this, null);
    }, {
      once: true
    });
    this.scroll = watchScroll(this.container, this._scrollUpdate.bind(this), abortSignal);
    this.presentationModeState = PresentationModeState.UNKNOWN;
    this._resetView();
    if (this.removePageBorders) {
      this.viewer.classList.add("removePageBorders");
    }
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _updateContainerHeightCss).call(this);
    this.eventBus._on("thumbnailrendered", ({
      pageNumber,
      pdfPage
    }) => {
      const pageView = this._pages[pageNumber - 1];
      if (!pdf_viewer_classPrivateFieldGet(_buffer, this).has(pageView)) {
        pdfPage === null || pdfPage === void 0 || pdfPage.cleanup();
      }
    });
    if (!_options.l10n) {
      this.l10n.translate(this.container);
    }
  }
  get pagesCount() {
    return this._pages.length;
  }
  getPageView(index) {
    return this._pages[index];
  }
  getCachedPageViews() {
    return new Set(pdf_viewer_classPrivateFieldGet(_buffer, this));
  }
  get pageViewsReady() {
    return this._pages.every(pageView => pageView === null || pageView === void 0 ? void 0 : pageView.pdfPage);
  }
  get renderForms() {
    return pdf_viewer_classPrivateFieldGet(pdf_viewer_annotationMode, this) === AnnotationMode.ENABLE_FORMS;
  }
  get enableScripting() {
    return !!this._scriptingManager;
  }
  get currentPageNumber() {
    return this._currentPageNumber;
  }
  set currentPageNumber(val) {
    if (!Number.isInteger(val)) {
      throw new Error("Invalid page number.");
    }
    if (!this.pdfDocument) {
      return;
    }
    if (!this._setCurrentPageNumber(val, true)) {
      console.error(`currentPageNumber: "${val}" is not a valid page.`);
    }
  }
  _setCurrentPageNumber(val, resetCurrentPageView = false) {
    var _this$_pageLabels, _this$_pageLabels2;
    if (this._currentPageNumber === val) {
      if (resetCurrentPageView) {
        pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _resetCurrentPageView).call(this);
      }
      return true;
    }
    if (!(0 < val && val <= this.pagesCount)) {
      return false;
    }
    const previous = this._currentPageNumber;
    this._currentPageNumber = val;
    this.eventBus.dispatch("pagechanging", {
      source: this,
      pageNumber: val,
      pageLabel: (_this$_pageLabels = (_this$_pageLabels2 = this._pageLabels) === null || _this$_pageLabels2 === void 0 ? void 0 : _this$_pageLabels2[val - 1]) !== null && _this$_pageLabels !== void 0 ? _this$_pageLabels : null,
      previous
    });
    if (resetCurrentPageView) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _resetCurrentPageView).call(this);
    }
    return true;
  }
  get currentPageLabel() {
    var _this$_pageLabels3, _this$_pageLabels4;
    return (_this$_pageLabels3 = (_this$_pageLabels4 = this._pageLabels) === null || _this$_pageLabels4 === void 0 ? void 0 : _this$_pageLabels4[this._currentPageNumber - 1]) !== null && _this$_pageLabels3 !== void 0 ? _this$_pageLabels3 : null;
  }
  set currentPageLabel(val) {
    if (!this.pdfDocument) {
      return;
    }
    let page = val | 0;
    if (this._pageLabels) {
      const i = this._pageLabels.indexOf(val);
      if (i >= 0) {
        page = i + 1;
      }
    }
    if (!this._setCurrentPageNumber(page, true)) {
      console.error(`currentPageLabel: "${val}" is not a valid page.`);
    }
  }
  get currentScale() {
    return this._currentScale !== UNKNOWN_SCALE ? this._currentScale : DEFAULT_SCALE;
  }
  set currentScale(val) {
    if (isNaN(val)) {
      throw new Error("Invalid numeric scale.");
    }
    if (!this.pdfDocument) {
      return;
    }
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScale).call(this, val, {
      noScroll: false
    });
  }
  get currentScaleValue() {
    return this._currentScaleValue;
  }
  set currentScaleValue(val) {
    if (!this.pdfDocument) {
      return;
    }
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScale).call(this, val, {
      noScroll: false
    });
  }
  get pagesRotation() {
    return this._pagesRotation;
  }
  set pagesRotation(rotation) {
    if (!isValidRotation(rotation)) {
      throw new Error("Invalid pages rotation angle.");
    }
    if (!this.pdfDocument) {
      return;
    }
    rotation %= 360;
    if (rotation < 0) {
      rotation += 360;
    }
    if (this._pagesRotation === rotation) {
      return;
    }
    this._pagesRotation = rotation;
    const pageNumber = this._currentPageNumber;
    this.refresh(true, {
      rotation
    });
    if (this._currentScaleValue) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScale).call(this, this._currentScaleValue, {
        noScroll: true
      });
    }
    this.eventBus.dispatch("rotationchanging", {
      source: this,
      pagesRotation: rotation,
      pageNumber
    });
    if (this.defaultRenderingQueue) {
      this.update();
    }
  }
  get firstPagePromise() {
    return this.pdfDocument ? this._firstPageCapability.promise : null;
  }
  get onePageRendered() {
    return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
  }
  get pagesPromise() {
    return this.pdfDocument ? this._pagesCapability.promise : null;
  }
  get _layerProperties() {
    const self = this;
    return shadow(this, "_layerProperties", {
      get annotationEditorUIManager() {
        return pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, self);
      },
      get annotationStorage() {
        var _self$pdfDocument;
        return (_self$pdfDocument = self.pdfDocument) === null || _self$pdfDocument === void 0 ? void 0 : _self$pdfDocument.annotationStorage;
      },
      get downloadManager() {
        return self.downloadManager;
      },
      get enableScripting() {
        return !!self._scriptingManager;
      },
      get fieldObjectsPromise() {
        var _self$pdfDocument2;
        return (_self$pdfDocument2 = self.pdfDocument) === null || _self$pdfDocument2 === void 0 ? void 0 : _self$pdfDocument2.getFieldObjects();
      },
      get findController() {
        return self.findController;
      },
      get hasJSActionsPromise() {
        var _self$pdfDocument3;
        return (_self$pdfDocument3 = self.pdfDocument) === null || _self$pdfDocument3 === void 0 ? void 0 : _self$pdfDocument3.hasJSActions();
      },
      get linkService() {
        return self.linkService;
      }
    });
  }
  async getAllText() {
    const texts = [];
    const buffer = [];
    for (let pageNum = 1, pagesCount = this.pdfDocument.numPages; pageNum <= pagesCount; ++pageNum) {
      if (pdf_viewer_classPrivateFieldGet(_interruptCopyCondition, this)) {
        return null;
      }
      buffer.length = 0;
      const page = await this.pdfDocument.getPage(pageNum);
      const {
        items
      } = await page.getTextContent();
      for (const item of items) {
        if (item.str) {
          buffer.push(item.str);
        }
        if (item.hasEOL) {
          buffer.push("\n");
        }
      }
      texts.push(removeNullCharacters(buffer.join("")));
    }
    return texts.join("\n");
  }
  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      var _this$findController, _this$_scriptingManag, _classPrivateFieldGet2;
      this.eventBus.dispatch("pagesdestroy", {
        source: this
      });
      this._cancelRendering();
      this._resetView();
      (_this$findController = this.findController) === null || _this$findController === void 0 || _this$findController.setDocument(null);
      (_this$_scriptingManag = this._scriptingManager) === null || _this$_scriptingManag === void 0 || _this$_scriptingManag.setDocument(null);
      (_classPrivateFieldGet2 = pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.destroy();
      pdf_viewer_classPrivateFieldSet(_annotationEditorUIManager, this, null);
    }
    this.pdfDocument = pdfDocument;
    if (!pdfDocument) {
      return;
    }
    const pagesCount = pdfDocument.numPages;
    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "display"
    });
    const permissionsPromise = pdf_viewer_classPrivateFieldGet(pdf_viewer_enablePermissions, this) ? pdfDocument.getPermissions() : Promise.resolve();
    const {
      eventBus,
      pageColors,
      viewer
    } = this;
    pdf_viewer_classPrivateFieldSet(pdf_viewer_eventAbortController, this, new AbortController());
    const {
      signal
    } = pdf_viewer_classPrivateFieldGet(pdf_viewer_eventAbortController, this);
    if (pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      console.warn("Forcing PAGE-scrolling for performance reasons, given the length of the document.");
      const mode = this._scrollMode = ScrollMode.PAGE;
      eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode
      });
    }
    this._pagesCapability.promise.then(() => {
      eventBus.dispatch("pagesloaded", {
        source: this,
        pagesCount
      });
    }, () => {});
    const onBeforeDraw = evt => {
      const pageView = this._pages[evt.pageNumber - 1];
      if (!pageView) {
        return;
      }
      pdf_viewer_classPrivateFieldGet(_buffer, this).push(pageView);
    };
    eventBus._on("pagerender", onBeforeDraw, {
      signal
    });
    const onAfterDraw = evt => {
      if (evt.cssTransform) {
        return;
      }
      this._onePageRenderedCapability.resolve({
        timestamp: evt.timestamp
      });
      eventBus._off("pagerendered", onAfterDraw);
    };
    eventBus._on("pagerendered", onAfterDraw, {
      signal
    });
    Promise.all([firstPagePromise, permissionsPromise]).then(([firstPdfPage, permissions]) => {
      var _this$_pages$;
      if (pdfDocument !== this.pdfDocument) {
        return;
      }
      this._firstPageCapability.resolve(firstPdfPage);
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      const {
        annotationEditorMode,
        annotationMode,
        textLayerMode
      } = pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _initializePermissions).call(this, permissions);
      if (textLayerMode !== TextLayerMode.DISABLE) {
        const element = pdf_viewer_classPrivateFieldSet(_hiddenCopyElement, this, document.createElement("div"));
        element.id = "hiddenCopyElement";
        viewer.before(element);
      }
      if (typeof AbortSignal.any === "function" && annotationEditorMode !== AnnotationEditorType.DISABLE) {
        const mode = annotationEditorMode;
        if (pdfDocument.isPureXfa) {
          console.warn("Warning: XFA-editing is not implemented.");
        } else if (isValidAnnotationEditorMode(mode)) {
          pdf_viewer_classPrivateFieldSet(_annotationEditorUIManager, this, new AnnotationEditorUIManager(this.container, viewer, pdf_viewer_classPrivateFieldGet(_altTextManager, this), eventBus, pdfDocument, pageColors, pdf_viewer_classPrivateFieldGet(_annotationEditorHighlightColors, this), pdf_viewer_classPrivateFieldGet(_enableHighlightFloatingButton, this), pdf_viewer_classPrivateFieldGet(_enableUpdatedAddImage, this), pdf_viewer_classPrivateFieldGet(_enableNewAltTextWhenAddingImage, this), pdf_viewer_classPrivateFieldGet(_mlManager, this)));
          eventBus.dispatch("annotationeditoruimanager", {
            source: this,
            uiManager: pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, this)
          });
          if (mode !== AnnotationEditorType.NONE) {
            if (mode === AnnotationEditorType.STAMP) {
              var _classPrivateFieldGet3;
              (_classPrivateFieldGet3 = pdf_viewer_classPrivateFieldGet(_mlManager, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.loadModel("altText");
            }
            pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, this).updateMode(mode);
          }
        } else {
          console.error(`Invalid AnnotationEditor mode: ${mode}`);
        }
      }
      const viewerElement = this._scrollMode === ScrollMode.PAGE ? null : viewer;
      const scale = this.currentScale;
      const viewport = firstPdfPage.getViewport({
        scale: scale * PixelsPerInch.PDF_TO_CSS_UNITS
      });
      viewer.style.setProperty("--scale-factor", viewport.scale);
      if (pageColors !== null && pageColors !== void 0 && pageColors.background) {
        viewer.style.setProperty("--page-bg-color", pageColors.background);
      }
      if ((pageColors === null || pageColors === void 0 ? void 0 : pageColors.foreground) === "CanvasText" || (pageColors === null || pageColors === void 0 ? void 0 : pageColors.background) === "Canvas") {
        viewer.style.setProperty("--hcm-highlight-filter", pdfDocument.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight"));
        viewer.style.setProperty("--hcm-highlight-selected-filter", pdfDocument.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "ButtonText"));
      }
      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        const pageView = new PDFPageView({
          container: viewerElement,
          eventBus,
          id: pageNum,
          scale,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          renderingQueue: this.renderingQueue,
          textLayerMode,
          annotationMode,
          imageResourcesPath: this.imageResourcesPath,
          maxCanvasPixels: this.maxCanvasPixels,
          pageColors,
          l10n: this.l10n,
          layerProperties: this._layerProperties,
          enableHWA: pdf_viewer_classPrivateFieldGet(pdf_viewer_enableHWA, this)
        });
        this._pages.push(pageView);
      }
      (_this$_pages$ = this._pages[0]) === null || _this$_pages$ === void 0 || _this$_pages$.setPdfPage(firstPdfPage);
      if (this._scrollMode === ScrollMode.PAGE) {
        pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _ensurePageViewVisible).call(this);
      } else if (this._spreadMode !== SpreadMode.NONE) {
        this._updateSpreadMode();
      }
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _onePageRenderedOrForceFetch).call(this, signal).then(async () => {
        var _this$findController2, _this$_scriptingManag2;
        if (pdfDocument !== this.pdfDocument) {
          return;
        }
        (_this$findController2 = this.findController) === null || _this$findController2 === void 0 || _this$findController2.setDocument(pdfDocument);
        (_this$_scriptingManag2 = this._scriptingManager) === null || _this$_scriptingManag2 === void 0 || _this$_scriptingManag2.setDocument(pdfDocument);
        if (pdf_viewer_classPrivateFieldGet(_hiddenCopyElement, this)) {
          document.addEventListener("copy", pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _copyCallback).bind(this, textLayerMode), {
            signal
          });
        }
        if (pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, this)) {
          eventBus.dispatch("annotationeditormodechanged", {
            source: this,
            mode: pdf_viewer_classPrivateFieldGet(_annotationEditorMode, this)
          });
        }
        if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > PagesCountLimit.FORCE_LAZY_PAGE_INIT) {
          this._pagesCapability.resolve();
          return;
        }
        let getPagesLeft = pagesCount - 1;
        if (getPagesLeft <= 0) {
          this._pagesCapability.resolve();
          return;
        }
        for (let pageNum = 2; pageNum <= pagesCount; ++pageNum) {
          const promise = pdfDocument.getPage(pageNum).then(pdfPage => {
            const pageView = this._pages[pageNum - 1];
            if (!pageView.pdfPage) {
              pageView.setPdfPage(pdfPage);
            }
            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          }, reason => {
            console.error(`Unable to get page ${pageNum} to initialize viewer`, reason);
            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          });
          if (pageNum % PagesCountLimit.PAUSE_EAGER_PAGE_INIT === 0) {
            await promise;
          }
        }
      });
      eventBus.dispatch("pagesinit", {
        source: this
      });
      pdfDocument.getMetadata().then(({
        info
      }) => {
        if (pdfDocument !== this.pdfDocument) {
          return;
        }
        if (info.Language) {
          viewer.lang = info.Language;
        }
      });
      if (this.defaultRenderingQueue) {
        this.update();
      }
    }).catch(reason => {
      console.error("Unable to initialize viewer", reason);
      this._pagesCapability.reject(reason);
    });
  }
  setPageLabels(labels) {
    if (!this.pdfDocument) {
      return;
    }
    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error(`setPageLabels: Invalid page labels.`);
    } else {
      this._pageLabels = labels;
    }
    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      var _this$_pageLabels$i, _this$_pageLabels5;
      this._pages[i].setPageLabel((_this$_pageLabels$i = (_this$_pageLabels5 = this._pageLabels) === null || _this$_pageLabels5 === void 0 ? void 0 : _this$_pageLabels5[i]) !== null && _this$_pageLabels$i !== void 0 ? _this$_pageLabels$i : null);
    }
  }
  _resetView() {
    var _classPrivateFieldGet4, _classPrivateFieldGet5;
    this._pages = [];
    this._currentPageNumber = 1;
    this._currentScale = UNKNOWN_SCALE;
    this._currentScaleValue = null;
    this._pageLabels = null;
    pdf_viewer_classPrivateFieldSet(_buffer, this, new PDFPageViewBuffer(DEFAULT_CACHE_SIZE));
    this._location = null;
    this._pagesRotation = 0;
    this._optionalContentConfigPromise = null;
    this._firstPageCapability = Promise.withResolvers();
    this._onePageRenderedCapability = Promise.withResolvers();
    this._pagesCapability = Promise.withResolvers();
    this._scrollMode = ScrollMode.VERTICAL;
    this._previousScrollMode = ScrollMode.UNKNOWN;
    this._spreadMode = SpreadMode.NONE;
    pdf_viewer_classPrivateFieldSet(_scrollModePageState, this, {
      previousPageNumber: 1,
      scrollDown: true,
      pages: []
    });
    (_classPrivateFieldGet4 = pdf_viewer_classPrivateFieldGet(pdf_viewer_eventAbortController, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.abort();
    pdf_viewer_classPrivateFieldSet(pdf_viewer_eventAbortController, this, null);
    this.viewer.textContent = "";
    this._updateScrollMode();
    this.viewer.removeAttribute("lang");
    (_classPrivateFieldGet5 = pdf_viewer_classPrivateFieldGet(_hiddenCopyElement, this)) === null || _classPrivateFieldGet5 === void 0 || _classPrivateFieldGet5.remove();
    pdf_viewer_classPrivateFieldSet(_hiddenCopyElement, this, null);
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _cleanupSwitchAnnotationEditorMode).call(this);
  }
  _scrollUpdate() {
    if (this.pagesCount === 0) {
      return;
    }
    this.update();
  }
  pageLabelToPageNumber(label) {
    if (!this._pageLabels) {
      return null;
    }
    const i = this._pageLabels.indexOf(label);
    if (i < 0) {
      return null;
    }
    return i + 1;
  }
  scrollPageIntoView({
    pageNumber,
    destArray = null,
    allowNegativeOffset = false,
    ignoreDestinationZoom = false
  }) {
    if (!this.pdfDocument) {
      return;
    }
    const pageView = Number.isInteger(pageNumber) && this._pages[pageNumber - 1];
    if (!pageView) {
      console.error(`scrollPageIntoView: "${pageNumber}" is not a valid pageNumber parameter.`);
      return;
    }
    if (this.isInPresentationMode || !destArray) {
      this._setCurrentPageNumber(pageNumber, true);
      return;
    }
    let x = 0,
      y = 0;
    let width = 0,
      height = 0,
      widthScale,
      heightScale;
    const changeOrientation = pageView.rotation % 180 !== 0;
    const pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / PixelsPerInch.PDF_TO_CSS_UNITS;
    const pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / PixelsPerInch.PDF_TO_CSS_UNITS;
    let scale = 0;
    switch (destArray[1].name) {
      case "XYZ":
        x = destArray[2];
        y = destArray[3];
        scale = destArray[4];
        x = x !== null ? x : 0;
        y = y !== null ? y : pageHeight;
        break;
      case "Fit":
      case "FitB":
        scale = "page-fit";
        break;
      case "FitH":
      case "FitBH":
        y = destArray[2];
        scale = "page-width";
        if (y === null && this._location) {
          x = this._location.left;
          y = this._location.top;
        } else if (typeof y !== "number" || y < 0) {
          y = pageHeight;
        }
        break;
      case "FitV":
      case "FitBV":
        x = destArray[2];
        width = pageWidth;
        height = pageHeight;
        scale = "page-height";
        break;
      case "FitR":
        x = destArray[2];
        y = destArray[3];
        width = destArray[4] - x;
        height = destArray[5] - y;
        let hPadding = SCROLLBAR_PADDING,
          vPadding = VERTICAL_PADDING;
        if (this.removePageBorders) {
          hPadding = vPadding = 0;
        }
        widthScale = (this.container.clientWidth - hPadding) / width / PixelsPerInch.PDF_TO_CSS_UNITS;
        heightScale = (this.container.clientHeight - vPadding) / height / PixelsPerInch.PDF_TO_CSS_UNITS;
        scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
        break;
      default:
        console.error(`scrollPageIntoView: "${destArray[1].name}" is not a valid destination type.`);
        return;
    }
    if (!ignoreDestinationZoom) {
      if (scale && scale !== this._currentScale) {
        this.currentScaleValue = scale;
      } else if (this._currentScale === UNKNOWN_SCALE) {
        this.currentScaleValue = DEFAULT_SCALE_VALUE;
      }
    }
    if (scale === "page-fit" && !destArray[4]) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _scrollIntoView).call(this, pageView);
      return;
    }
    const boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
    let left = Math.min(boundingRect[0][0], boundingRect[1][0]);
    let top = Math.min(boundingRect[0][1], boundingRect[1][1]);
    if (!allowNegativeOffset) {
      left = Math.max(left, 0);
      top = Math.max(top, 0);
    }
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _scrollIntoView).call(this, pageView, {
      left,
      top
    });
  }
  _updateLocation(firstPage) {
    const currentScale = this._currentScale;
    const currentScaleValue = this._currentScaleValue;
    const normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
    const pageNumber = firstPage.id;
    const currentPageView = this._pages[pageNumber - 1];
    const container = this.container;
    const topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
    const intLeft = Math.round(topLeft[0]);
    const intTop = Math.round(topLeft[1]);
    let pdfOpenParams = `#page=${pageNumber}`;
    if (!this.isInPresentationMode) {
      pdfOpenParams += `&zoom=${normalizedScaleValue},${intLeft},${intTop}`;
    }
    this._location = {
      pageNumber,
      scale: normalizedScaleValue,
      top: intTop,
      left: intLeft,
      rotation: this._pagesRotation,
      pdfOpenParams
    };
  }
  update() {
    const visible = this._getVisiblePages();
    const visiblePages = visible.views,
      numVisiblePages = visiblePages.length;
    if (numVisiblePages === 0) {
      return;
    }
    const newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);
    pdf_viewer_classPrivateFieldGet(_buffer, this).resize(newCacheSize, visible.ids);
    this.renderingQueue.renderHighestPriority(visible);
    const isSimpleLayout = this._spreadMode === SpreadMode.NONE && (this._scrollMode === ScrollMode.PAGE || this._scrollMode === ScrollMode.VERTICAL);
    const currentId = this._currentPageNumber;
    let stillFullyVisible = false;
    for (const page of visiblePages) {
      if (page.percent < 100) {
        break;
      }
      if (page.id === currentId && isSimpleLayout) {
        stillFullyVisible = true;
        break;
      }
    }
    this._setCurrentPageNumber(stillFullyVisible ? currentId : visiblePages[0].id);
    this._updateLocation(visible.first);
    this.eventBus.dispatch("updateviewarea", {
      source: this,
      location: this._location
    });
  }
  containsElement(element) {
    return this.container.contains(element);
  }
  focus() {
    this.container.focus();
  }
  get _isContainerRtl() {
    return getComputedStyle(this.container).direction === "rtl";
  }
  get isInPresentationMode() {
    return this.presentationModeState === PresentationModeState.FULLSCREEN;
  }
  get isChangingPresentationMode() {
    return this.presentationModeState === PresentationModeState.CHANGING;
  }
  get isHorizontalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
  }
  get isVerticalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
  }
  _getVisiblePages() {
    const views = this._scrollMode === ScrollMode.PAGE ? pdf_viewer_classPrivateFieldGet(_scrollModePageState, this).pages : this._pages,
      horizontal = this._scrollMode === ScrollMode.HORIZONTAL,
      rtl = horizontal && this._isContainerRtl;
    return getVisibleElements({
      scrollEl: this.container,
      views,
      sortByVisibility: true,
      horizontal,
      rtl
    });
  }
  cleanup() {
    for (const pageView of this._pages) {
      if (pageView.renderingState !== RenderingStates.FINISHED) {
        pageView.reset();
      }
    }
  }
  _cancelRendering() {
    for (const pageView of this._pages) {
      pageView.cancelRendering();
    }
  }
  forceRendering(currentlyVisiblePages) {
    const visiblePages = currentlyVisiblePages || this._getVisiblePages();
    const scrollAhead = pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _getScrollAhead).call(this, visiblePages);
    const preRenderExtra = this._spreadMode !== SpreadMode.NONE && this._scrollMode !== ScrollMode.HORIZONTAL;
    const pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead, preRenderExtra);
    if (pageView) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _ensurePdfPageLoaded).call(this, pageView).then(() => {
        this.renderingQueue.renderView(pageView);
      });
      return true;
    }
    return false;
  }
  get hasEqualPageSizes() {
    const firstPageView = this._pages[0];
    for (let i = 1, ii = this._pages.length; i < ii; ++i) {
      const pageView = this._pages[i];
      if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
        return false;
      }
    }
    return true;
  }
  getPagesOverview() {
    let initialOrientation;
    return this._pages.map(pageView => {
      const viewport = pageView.pdfPage.getViewport({
        scale: 1
      });
      const orientation = isPortraitOrientation(viewport);
      if (initialOrientation === undefined) {
        initialOrientation = orientation;
      } else if (this.enablePrintAutoRotate && orientation !== initialOrientation) {
        return {
          width: viewport.height,
          height: viewport.width,
          rotation: (viewport.rotation - 90) % 360
        };
      }
      return {
        width: viewport.width,
        height: viewport.height,
        rotation: viewport.rotation
      };
    });
  }
  get optionalContentConfigPromise() {
    if (!this.pdfDocument) {
      return Promise.resolve(null);
    }
    if (!this._optionalContentConfigPromise) {
      console.error("optionalContentConfigPromise: Not initialized yet.");
      return this.pdfDocument.getOptionalContentConfig({
        intent: "display"
      });
    }
    return this._optionalContentConfigPromise;
  }
  set optionalContentConfigPromise(promise) {
    if (!(promise instanceof Promise)) {
      throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);
    }
    if (!this.pdfDocument) {
      return;
    }
    if (!this._optionalContentConfigPromise) {
      return;
    }
    this._optionalContentConfigPromise = promise;
    this.refresh(false, {
      optionalContentConfigPromise: promise
    });
    this.eventBus.dispatch("optionalcontentconfigchanged", {
      source: this,
      promise
    });
  }
  get scrollMode() {
    return this._scrollMode;
  }
  set scrollMode(mode) {
    if (this._scrollMode === mode) {
      return;
    }
    if (!isValidScrollMode(mode)) {
      throw new Error(`Invalid scroll mode: ${mode}`);
    }
    if (this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      return;
    }
    this._previousScrollMode = this._scrollMode;
    this._scrollMode = mode;
    this.eventBus.dispatch("scrollmodechanged", {
      source: this,
      mode
    });
    this._updateScrollMode(this._currentPageNumber);
  }
  _updateScrollMode(pageNumber = null) {
    const scrollMode = this._scrollMode,
      viewer = this.viewer;
    viewer.classList.toggle("scrollHorizontal", scrollMode === ScrollMode.HORIZONTAL);
    viewer.classList.toggle("scrollWrapped", scrollMode === ScrollMode.WRAPPED);
    if (!this.pdfDocument || !pageNumber) {
      return;
    }
    if (scrollMode === ScrollMode.PAGE) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _ensurePageViewVisible).call(this);
    } else if (this._previousScrollMode === ScrollMode.PAGE) {
      this._updateSpreadMode();
    }
    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScale).call(this, this._currentScaleValue, {
        noScroll: true
      });
    }
    this._setCurrentPageNumber(pageNumber, true);
    this.update();
  }
  get spreadMode() {
    return this._spreadMode;
  }
  set spreadMode(mode) {
    if (this._spreadMode === mode) {
      return;
    }
    if (!isValidSpreadMode(mode)) {
      throw new Error(`Invalid spread mode: ${mode}`);
    }
    this._spreadMode = mode;
    this.eventBus.dispatch("spreadmodechanged", {
      source: this,
      mode
    });
    this._updateSpreadMode(this._currentPageNumber);
  }
  _updateSpreadMode(pageNumber = null) {
    if (!this.pdfDocument) {
      return;
    }
    const viewer = this.viewer,
      pages = this._pages;
    if (this._scrollMode === ScrollMode.PAGE) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _ensurePageViewVisible).call(this);
    } else {
      viewer.textContent = "";
      if (this._spreadMode === SpreadMode.NONE) {
        for (const pageView of this._pages) {
          viewer.append(pageView.div);
        }
      } else {
        const parity = this._spreadMode - 1;
        let spread = null;
        for (let i = 0, ii = pages.length; i < ii; ++i) {
          if (spread === null) {
            spread = document.createElement("div");
            spread.className = "spread";
            viewer.append(spread);
          } else if (i % 2 === parity) {
            spread = spread.cloneNode(false);
            viewer.append(spread);
          }
          spread.append(pages[i].div);
        }
      }
    }
    if (!pageNumber) {
      return;
    }
    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScale).call(this, this._currentScaleValue, {
        noScroll: true
      });
    }
    this._setCurrentPageNumber(pageNumber, true);
    this.update();
  }
  _getPageAdvance(currentPageNumber, previous = false) {
    switch (this._scrollMode) {
      case ScrollMode.WRAPPED:
        {
          const {
              views
            } = this._getVisiblePages(),
            pageLayout = new Map();
          for (const {
            id,
            y,
            percent,
            widthPercent
          } of views) {
            if (percent === 0 || widthPercent < 100) {
              continue;
            }
            let yArray = pageLayout.get(y);
            if (!yArray) {
              pageLayout.set(y, yArray || (yArray = []));
            }
            yArray.push(id);
          }
          for (const yArray of pageLayout.values()) {
            const currentIndex = yArray.indexOf(currentPageNumber);
            if (currentIndex === -1) {
              continue;
            }
            const numPages = yArray.length;
            if (numPages === 1) {
              break;
            }
            if (previous) {
              for (let i = currentIndex - 1, ii = 0; i >= ii; i--) {
                const currentId = yArray[i],
                  expectedId = yArray[i + 1] - 1;
                if (currentId < expectedId) {
                  return currentPageNumber - expectedId;
                }
              }
            } else {
              for (let i = currentIndex + 1, ii = numPages; i < ii; i++) {
                const currentId = yArray[i],
                  expectedId = yArray[i - 1] + 1;
                if (currentId > expectedId) {
                  return expectedId - currentPageNumber;
                }
              }
            }
            if (previous) {
              const firstId = yArray[0];
              if (firstId < currentPageNumber) {
                return currentPageNumber - firstId + 1;
              }
            } else {
              const lastId = yArray[numPages - 1];
              if (lastId > currentPageNumber) {
                return lastId - currentPageNumber + 1;
              }
            }
            break;
          }
          break;
        }
      case ScrollMode.HORIZONTAL:
        {
          break;
        }
      case ScrollMode.PAGE:
      case ScrollMode.VERTICAL:
        {
          if (this._spreadMode === SpreadMode.NONE) {
            break;
          }
          const parity = this._spreadMode - 1;
          if (previous && currentPageNumber % 2 !== parity) {
            break;
          } else if (!previous && currentPageNumber % 2 === parity) {
            break;
          }
          const {
              views
            } = this._getVisiblePages(),
            expectedId = previous ? currentPageNumber - 1 : currentPageNumber + 1;
          for (const {
            id,
            percent,
            widthPercent
          } of views) {
            if (id !== expectedId) {
              continue;
            }
            if (percent > 0 && widthPercent === 100) {
              return 2;
            }
            break;
          }
          break;
        }
    }
    return 1;
  }
  nextPage() {
    const currentPageNumber = this._currentPageNumber,
      pagesCount = this.pagesCount;
    if (currentPageNumber >= pagesCount) {
      return false;
    }
    const advance = this._getPageAdvance(currentPageNumber, false) || 1;
    this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
    return true;
  }
  previousPage() {
    const currentPageNumber = this._currentPageNumber;
    if (currentPageNumber <= 1) {
      return false;
    }
    const advance = this._getPageAdvance(currentPageNumber, true) || 1;
    this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
    return true;
  }
  updateScale({
    drawingDelay,
    scaleFactor = null,
    steps = null,
    origin
  }) {
    if (steps === null && scaleFactor === null) {
      throw new Error("Invalid updateScale options: either `steps` or `scaleFactor` must be provided.");
    }
    if (!this.pdfDocument) {
      return;
    }
    let newScale = this._currentScale;
    if (scaleFactor > 0 && scaleFactor !== 1) {
      newScale = Math.round(newScale * scaleFactor * 100) / 100;
    } else if (steps) {
      const delta = steps > 0 ? DEFAULT_SCALE_DELTA : 1 / DEFAULT_SCALE_DELTA;
      const round = steps > 0 ? Math.ceil : Math.floor;
      steps = Math.abs(steps);
      do {
        newScale = round((newScale * delta).toFixed(2) * 10) / 10;
      } while (--steps > 0);
    }
    newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScale).call(this, newScale, {
      noScroll: false,
      drawingDelay,
      origin
    });
  }
  increaseScale(options = {}) {
    var _options$steps;
    this.updateScale({
      ...options,
      steps: (_options$steps = options.steps) !== null && _options$steps !== void 0 ? _options$steps : 1
    });
  }
  decreaseScale(options = {}) {
    var _options$steps2;
    this.updateScale({
      ...options,
      steps: -((_options$steps2 = options.steps) !== null && _options$steps2 !== void 0 ? _options$steps2 : 1)
    });
  }
  get containerTopLeft() {
    return pdf_viewer_classPrivateFieldGet(_containerTopLeft, this) || pdf_viewer_classPrivateFieldSet(_containerTopLeft, this, [this.container.offsetTop, this.container.offsetLeft]);
  }
  get annotationEditorMode() {
    return pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, this) ? pdf_viewer_classPrivateFieldGet(_annotationEditorMode, this) : AnnotationEditorType.DISABLE;
  }
  set annotationEditorMode({
    mode,
    editId = null,
    isFromKeyboard = false
  }) {
    if (!pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, this)) {
      throw new Error(`The AnnotationEditor is not enabled.`);
    }
    if (pdf_viewer_classPrivateFieldGet(_annotationEditorMode, this) === mode) {
      return;
    }
    if (!isValidAnnotationEditorMode(mode)) {
      throw new Error(`Invalid AnnotationEditor mode: ${mode}`);
    }
    if (!this.pdfDocument) {
      return;
    }
    if (mode === AnnotationEditorType.STAMP) {
      var _classPrivateFieldGet6;
      (_classPrivateFieldGet6 = pdf_viewer_classPrivateFieldGet(_mlManager, this)) === null || _classPrivateFieldGet6 === void 0 || _classPrivateFieldGet6.loadModel("altText");
    }
    const {
      eventBus
    } = this;
    const updater = () => {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _cleanupSwitchAnnotationEditorMode).call(this);
      pdf_viewer_classPrivateFieldSet(_annotationEditorMode, this, mode);
      pdf_viewer_classPrivateFieldGet(_annotationEditorUIManager, this).updateMode(mode, editId, isFromKeyboard);
      eventBus.dispatch("annotationeditormodechanged", {
        source: this,
        mode
      });
    };
    if (mode === AnnotationEditorType.NONE || pdf_viewer_classPrivateFieldGet(_annotationEditorMode, this) === AnnotationEditorType.NONE) {
      const isEditing = mode !== AnnotationEditorType.NONE;
      if (!isEditing) {
        this.pdfDocument.annotationStorage.resetModifiedIds();
      }
      for (const pageView of this._pages) {
        pageView.toggleEditingMode(isEditing);
      }
      const idsToRefresh = pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _switchToEditAnnotationMode).call(this);
      if (isEditing && idsToRefresh) {
        pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _cleanupSwitchAnnotationEditorMode).call(this);
        pdf_viewer_classPrivateFieldSet(_switchAnnotationEditorModeAC, this, new AbortController());
        const signal = AbortSignal.any([pdf_viewer_classPrivateFieldGet(pdf_viewer_eventAbortController, this).signal, pdf_viewer_classPrivateFieldGet(_switchAnnotationEditorModeAC, this).signal]);
        eventBus._on("pagerendered", ({
          pageNumber
        }) => {
          idsToRefresh.delete(pageNumber);
          if (idsToRefresh.size === 0) {
            pdf_viewer_classPrivateFieldSet(_switchAnnotationEditorModeTimeoutId, this, setTimeout(updater, 0));
          }
        }, {
          signal
        });
        return;
      }
    }
    updater();
  }
  refresh(noUpdate = false, updateArgs = Object.create(null)) {
    if (!this.pdfDocument) {
      return;
    }
    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }
    if (pdf_viewer_classPrivateFieldGet(_scaleTimeoutId, this) !== null) {
      clearTimeout(pdf_viewer_classPrivateFieldGet(_scaleTimeoutId, this));
      pdf_viewer_classPrivateFieldSet(_scaleTimeoutId, this, null);
    }
    if (!noUpdate) {
      this.update();
    }
  }
}
function _initializePermissions(permissions) {
  const params = {
    annotationEditorMode: pdf_viewer_classPrivateFieldGet(_annotationEditorMode, this),
    annotationMode: pdf_viewer_classPrivateFieldGet(pdf_viewer_annotationMode, this),
    textLayerMode: pdf_viewer_classPrivateFieldGet(pdf_viewer_textLayerMode, this)
  };
  if (!permissions) {
    return params;
  }
  if (!permissions.includes(PermissionFlag.COPY) && pdf_viewer_classPrivateFieldGet(pdf_viewer_textLayerMode, this) === TextLayerMode.ENABLE) {
    params.textLayerMode = TextLayerMode.ENABLE_PERMISSIONS;
  }
  if (!permissions.includes(PermissionFlag.MODIFY_CONTENTS)) {
    params.annotationEditorMode = AnnotationEditorType.DISABLE;
  }
  if (!permissions.includes(PermissionFlag.MODIFY_ANNOTATIONS) && !permissions.includes(PermissionFlag.FILL_INTERACTIVE_FORMS) && pdf_viewer_classPrivateFieldGet(pdf_viewer_annotationMode, this) === AnnotationMode.ENABLE_FORMS) {
    params.annotationMode = AnnotationMode.ENABLE;
  }
  return params;
}
async function _onePageRenderedOrForceFetch(signal) {
  if (document.visibilityState === "hidden" || !this.container.offsetParent || this._getVisiblePages().views.length === 0) {
    return;
  }
  const hiddenCapability = Promise.withResolvers(),
    ac = new AbortController();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      hiddenCapability.resolve();
    }
  }, {
    signal: typeof AbortSignal.any === "function" ? AbortSignal.any([signal, ac.signal]) : signal
  });
  await Promise.race([this._onePageRenderedCapability.promise, hiddenCapability.promise]);
  ac.abort();
}
function _copyCallback(textLayerMode, event) {
  const selection = document.getSelection();
  const {
    focusNode,
    anchorNode
  } = selection;
  if (anchorNode && focusNode && selection.containsNode(pdf_viewer_classPrivateFieldGet(_hiddenCopyElement, this))) {
    if (pdf_viewer_classPrivateFieldGet(_getAllTextInProgress, this) || textLayerMode === TextLayerMode.ENABLE_PERMISSIONS) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    pdf_viewer_classPrivateFieldSet(_getAllTextInProgress, this, true);
    const {
      classList
    } = this.viewer;
    classList.add("copyAll");
    const ac = new AbortController();
    window.addEventListener("keydown", ev => pdf_viewer_classPrivateFieldSet(_interruptCopyCondition, this, ev.key === "Escape"), {
      signal: ac.signal
    });
    this.getAllText().then(async text => {
      if (text !== null) {
        await navigator.clipboard.writeText(text);
      }
    }).catch(reason => {
      console.warn(`Something goes wrong when extracting the text: ${reason.message}`);
    }).finally(() => {
      pdf_viewer_classPrivateFieldSet(_getAllTextInProgress, this, false);
      pdf_viewer_classPrivateFieldSet(_interruptCopyCondition, this, false);
      ac.abort();
      classList.remove("copyAll");
    });
    event.preventDefault();
    event.stopPropagation();
  }
}
function _ensurePageViewVisible() {
  if (this._scrollMode !== ScrollMode.PAGE) {
    throw new Error("#ensurePageViewVisible: Invalid scrollMode value.");
  }
  const pageNumber = this._currentPageNumber,
    state = pdf_viewer_classPrivateFieldGet(_scrollModePageState, this),
    viewer = this.viewer;
  viewer.textContent = "";
  state.pages.length = 0;
  if (this._spreadMode === SpreadMode.NONE && !this.isInPresentationMode) {
    const pageView = this._pages[pageNumber - 1];
    viewer.append(pageView.div);
    state.pages.push(pageView);
  } else {
    const pageIndexSet = new Set(),
      parity = this._spreadMode - 1;
    if (parity === -1) {
      pageIndexSet.add(pageNumber - 1);
    } else if (pageNumber % 2 !== parity) {
      pageIndexSet.add(pageNumber - 1);
      pageIndexSet.add(pageNumber);
    } else {
      pageIndexSet.add(pageNumber - 2);
      pageIndexSet.add(pageNumber - 1);
    }
    const spread = document.createElement("div");
    spread.className = "spread";
    if (this.isInPresentationMode) {
      const dummyPage = document.createElement("div");
      dummyPage.className = "dummyPage";
      spread.append(dummyPage);
    }
    for (const i of pageIndexSet) {
      const pageView = this._pages[i];
      if (!pageView) {
        continue;
      }
      spread.append(pageView.div);
      state.pages.push(pageView);
    }
    viewer.append(spread);
  }
  state.scrollDown = pageNumber >= state.previousPageNumber;
  state.previousPageNumber = pageNumber;
}
function _scrollIntoView(pageView, pageSpot = null) {
  const {
    div,
    id
  } = pageView;
  if (this._currentPageNumber !== id) {
    this._setCurrentPageNumber(id);
  }
  if (this._scrollMode === ScrollMode.PAGE) {
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _ensurePageViewVisible).call(this);
    this.update();
  }
  if (!pageSpot && !this.isInPresentationMode) {
    const left = div.offsetLeft + div.clientLeft,
      right = left + div.clientWidth;
    const {
      scrollLeft,
      clientWidth
    } = this.container;
    if (this._scrollMode === ScrollMode.HORIZONTAL || left < scrollLeft || right > scrollLeft + clientWidth) {
      pageSpot = {
        left: 0,
        top: 0
      };
    }
  }
  scrollIntoView(div, pageSpot);
  if (!this._currentScaleValue && this._location) {
    this._location = null;
  }
}
function _isSameScale(newScale) {
  return newScale === this._currentScale || Math.abs(newScale - this._currentScale) < 1e-15;
}
function _setScaleUpdatePages(newScale, newValue, {
  noScroll = false,
  preset = false,
  drawingDelay = -1,
  origin = null
}) {
  this._currentScaleValue = newValue.toString();
  if (pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _isSameScale).call(this, newScale)) {
    if (preset) {
      this.eventBus.dispatch("scalechanging", {
        source: this,
        scale: newScale,
        presetValue: newValue
      });
    }
    return;
  }
  this.viewer.style.setProperty("--scale-factor", newScale * PixelsPerInch.PDF_TO_CSS_UNITS);
  const postponeDrawing = drawingDelay >= 0 && drawingDelay < 1000;
  this.refresh(true, {
    scale: newScale,
    drawingDelay: postponeDrawing ? drawingDelay : -1
  });
  if (postponeDrawing) {
    pdf_viewer_classPrivateFieldSet(_scaleTimeoutId, this, setTimeout(() => {
      pdf_viewer_classPrivateFieldSet(_scaleTimeoutId, this, null);
      this.refresh();
    }, drawingDelay));
  }
  const previousScale = this._currentScale;
  this._currentScale = newScale;
  if (!noScroll) {
    let page = this._currentPageNumber,
      dest;
    if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
      page = this._location.pageNumber;
      dest = [null, {
        name: "XYZ"
      }, this._location.left, this._location.top, null];
    }
    this.scrollPageIntoView({
      pageNumber: page,
      destArray: dest,
      allowNegativeOffset: true
    });
    if (Array.isArray(origin)) {
      const scaleDiff = newScale / previousScale - 1;
      const [top, left] = this.containerTopLeft;
      this.container.scrollLeft += (origin[0] - left) * scaleDiff;
      this.container.scrollTop += (origin[1] - top) * scaleDiff;
    }
  }
  this.eventBus.dispatch("scalechanging", {
    source: this,
    scale: newScale,
    presetValue: preset ? newValue : undefined
  });
  if (this.defaultRenderingQueue) {
    this.update();
  }
}
function _get_pageWidthScaleFactor(_this) {
  if (_this._spreadMode !== SpreadMode.NONE && _this._scrollMode !== ScrollMode.HORIZONTAL) {
    return 2;
  }
  return 1;
}
function _setScale(value, options) {
  let scale = parseFloat(value);
  if (scale > 0) {
    options.preset = false;
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScaleUpdatePages).call(this, scale, value, options);
  } else {
    const currentPage = this._pages[this._currentPageNumber - 1];
    if (!currentPage) {
      return;
    }
    let hPadding = SCROLLBAR_PADDING,
      vPadding = VERTICAL_PADDING;
    if (this.isInPresentationMode) {
      hPadding = vPadding = 4;
      if (this._spreadMode !== SpreadMode.NONE) {
        hPadding *= 2;
      }
    } else if (this.removePageBorders) {
      hPadding = vPadding = 0;
    } else if (this._scrollMode === ScrollMode.HORIZONTAL) {
      [hPadding, vPadding] = [vPadding, hPadding];
    }
    const pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / pdf_viewer_classPrivateGetter(_PDFViewer_brand, this, _get_pageWidthScaleFactor);
    const pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;
    switch (value) {
      case "page-actual":
        scale = 1;
        break;
      case "page-width":
        scale = pageWidthScale;
        break;
      case "page-height":
        scale = pageHeightScale;
        break;
      case "page-fit":
        scale = Math.min(pageWidthScale, pageHeightScale);
        break;
      case "auto":
        const horizontalScale = isPortraitOrientation(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
        scale = Math.min(MAX_AUTO_SCALE, horizontalScale);
        break;
      default:
        console.error(`#setScale: "${value}" is an unknown zoom value.`);
        return;
    }
    options.preset = true;
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScaleUpdatePages).call(this, scale, value, options);
  }
}
function _resetCurrentPageView() {
  const pageView = this._pages[this._currentPageNumber - 1];
  if (this.isInPresentationMode) {
    pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _setScale).call(this, this._currentScaleValue, {
      noScroll: true
    });
  }
  pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _scrollIntoView).call(this, pageView);
}
function _switchToEditAnnotationMode() {
  const visible = this._getVisiblePages();
  const pagesToRefresh = [];
  const {
    ids,
    views
  } = visible;
  for (const page of views) {
    const {
      view
    } = page;
    if (!view.hasEditableAnnotations()) {
      ids.delete(view.id);
      continue;
    }
    pagesToRefresh.push(page);
  }
  if (pagesToRefresh.length === 0) {
    return null;
  }
  this.renderingQueue.renderHighestPriority({
    first: pagesToRefresh[0],
    last: pagesToRefresh.at(-1),
    views: pagesToRefresh,
    ids
  });
  return ids;
}
async function _ensurePdfPageLoaded(pageView) {
  if (pageView.pdfPage) {
    return pageView.pdfPage;
  }
  try {
    const pdfPage = await this.pdfDocument.getPage(pageView.id);
    if (!pageView.pdfPage) {
      pageView.setPdfPage(pdfPage);
    }
    return pdfPage;
  } catch (reason) {
    console.error("Unable to get page for page view", reason);
    return null;
  }
}
function _getScrollAhead(visible) {
  var _visible$first, _visible$last;
  if (((_visible$first = visible.first) === null || _visible$first === void 0 ? void 0 : _visible$first.id) === 1) {
    return true;
  } else if (((_visible$last = visible.last) === null || _visible$last === void 0 ? void 0 : _visible$last.id) === this.pagesCount) {
    return false;
  }
  switch (this._scrollMode) {
    case ScrollMode.PAGE:
      return pdf_viewer_classPrivateFieldGet(_scrollModePageState, this).scrollDown;
    case ScrollMode.HORIZONTAL:
      return this.scroll.right;
  }
  return this.scroll.down;
}
function _updateContainerHeightCss(height = this.container.clientHeight) {
  if (height !== pdf_viewer_classPrivateFieldGet(_previousContainerHeight, this)) {
    pdf_viewer_classPrivateFieldSet(_previousContainerHeight, this, height);
    docStyle.setProperty("--viewer-container-height", `${height}px`);
  }
}
function _resizeObserverCallback(entries) {
  for (const entry of entries) {
    if (entry.target === this.container) {
      pdf_viewer_assertClassBrand(_PDFViewer_brand, this, _updateContainerHeightCss).call(this, Math.floor(entry.borderBoxSize[0].blockSize));
      pdf_viewer_classPrivateFieldSet(_containerTopLeft, this, null);
      break;
    }
  }
}
function _cleanupSwitchAnnotationEditorMode() {
  var _classPrivateFieldGet7;
  (_classPrivateFieldGet7 = pdf_viewer_classPrivateFieldGet(_switchAnnotationEditorModeAC, this)) === null || _classPrivateFieldGet7 === void 0 || _classPrivateFieldGet7.abort();
  pdf_viewer_classPrivateFieldSet(_switchAnnotationEditorModeAC, this, null);
  if (pdf_viewer_classPrivateFieldGet(_switchAnnotationEditorModeTimeoutId, this) !== null) {
    clearTimeout(pdf_viewer_classPrivateFieldGet(_switchAnnotationEditorModeTimeoutId, this));
    pdf_viewer_classPrivateFieldSet(_switchAnnotationEditorModeTimeoutId, this, null);
  }
}

;// ./web/pdf_single_page_viewer.js


class PDFSinglePageViewer extends PDFViewer {
  _resetView() {
    super._resetView();
    this._scrollMode = ScrollMode.PAGE;
    this._spreadMode = SpreadMode.NONE;
  }
  set scrollMode(mode) {}
  _updateScrollMode() {}
  set spreadMode(mode) {}
  _updateSpreadMode() {}
}

;// ./web/pdf_thumbnail_view.js


function pdf_thumbnail_view_classPrivateMethodInitSpec(e, a) { pdf_thumbnail_view_checkPrivateRedeclaration(e, a), a.add(e); }
function pdf_thumbnail_view_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function pdf_thumbnail_view_classPrivateGetter(s, r, a) { return a(pdf_thumbnail_view_assertClassBrand(s, r)); }
function pdf_thumbnail_view_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


const DRAW_UPSCALE_FACTOR = 2;
const MAX_NUM_SCALING_STEPS = 3;
const THUMBNAIL_WIDTH = 98;
class TempImageFactory {
  static getCanvas(width, height) {
    const tempCanvas = pdf_thumbnail_view_assertClassBrand(TempImageFactory, this, _tempCanvas)._ || (_tempCanvas._ = pdf_thumbnail_view_assertClassBrand(TempImageFactory, this, document.createElement("canvas")));
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext("2d", {
      alpha: false
    });
    ctx.save();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    return [tempCanvas, tempCanvas.getContext("2d")];
  }
  static destroyCanvas() {
    const tempCanvas = pdf_thumbnail_view_assertClassBrand(TempImageFactory, this, _tempCanvas)._;
    if (tempCanvas) {
      tempCanvas.width = 0;
      tempCanvas.height = 0;
    }
    _tempCanvas._ = pdf_thumbnail_view_assertClassBrand(TempImageFactory, this, null);
  }
}
var _tempCanvas = {
  _: null
};
var _PDFThumbnailView_brand = /*#__PURE__*/new WeakSet();
class PDFThumbnailView {
  constructor({
    container,
    eventBus,
    id,
    defaultViewport,
    optionalContentConfigPromise,
    linkService,
    renderingQueue,
    pageColors,
    enableHWA: _enableHWA
  }) {
    pdf_thumbnail_view_classPrivateMethodInitSpec(this, _PDFThumbnailView_brand);
    this.id = id;
    this.renderingId = "thumbnail" + id;
    this.pageLabel = null;
    this.pdfPage = null;
    this.rotation = 0;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = optionalContentConfigPromise || null;
    this.pageColors = pageColors || null;
    this.enableHWA = _enableHWA || false;
    this.eventBus = eventBus;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.renderTask = null;
    this.renderingState = RenderingStates.INITIAL;
    this.resume = null;
    const anchor = document.createElement("a");
    anchor.href = linkService.getAnchorUrl("#page=" + id);
    anchor.setAttribute("data-l10n-id", "pdfjs-thumb-page-title");
    anchor.setAttribute("data-l10n-args", pdf_thumbnail_view_classPrivateGetter(_PDFThumbnailView_brand, this, _get_pageL10nArgs));
    anchor.onclick = function () {
      linkService.goToPage(id);
      return false;
    };
    this.anchor = anchor;
    const div = document.createElement("div");
    div.className = "thumbnail";
    div.setAttribute("data-page-number", this.id);
    this.div = div;
    pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, _updateDims).call(this);
    const _img = document.createElement("div");
    _img.className = "thumbnailImage";
    this._placeholderImg = _img;
    div.append(_img);
    anchor.append(div);
    container.append(anchor);
  }
  setPdfPage(pdfPage) {
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }
  reset() {
    var _this$image;
    this.cancelRendering();
    this.renderingState = RenderingStates.INITIAL;
    this.div.removeAttribute("data-loaded");
    (_this$image = this.image) === null || _this$image === void 0 || _this$image.replaceWith(this._placeholderImg);
    pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, _updateDims).call(this);
    if (this.image) {
      this.image.removeAttribute("src");
      delete this.image;
    }
  }
  update({
    rotation = null
  }) {
    if (typeof rotation === "number") {
      this.rotation = rotation;
    }
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }
  cancelRendering() {
    if (this.renderTask) {
      this.renderTask.cancel();
      this.renderTask = null;
    }
    this.resume = null;
  }
  async draw() {
    if (this.renderingState !== RenderingStates.INITIAL) {
      console.error("Must be in new state before drawing");
      return undefined;
    }
    const {
      pdfPage
    } = this;
    if (!pdfPage) {
      this.renderingState = RenderingStates.FINISHED;
      throw new Error("pdfPage is not loaded");
    }
    this.renderingState = RenderingStates.RUNNING;
    const {
      ctx,
      canvas,
      transform
    } = pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, _getPageDrawContext).call(this, DRAW_UPSCALE_FACTOR);
    const drawViewport = this.viewport.clone({
      scale: DRAW_UPSCALE_FACTOR * this.scale
    });
    const renderContinueCallback = cont => {
      if (!this.renderingQueue.isHighestPriority(this)) {
        this.renderingState = RenderingStates.PAUSED;
        this.resume = () => {
          this.renderingState = RenderingStates.RUNNING;
          cont();
        };
        return;
      }
      cont();
    };
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport: drawViewport,
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      pageColors: this.pageColors
    };
    const renderTask = this.renderTask = pdfPage.render(renderContext);
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then(() => pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, pdf_thumbnail_view_finishRenderTask).call(this, renderTask, canvas), error => pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, pdf_thumbnail_view_finishRenderTask).call(this, renderTask, canvas, error));
    resultPromise.finally(() => {
      canvas.width = 0;
      canvas.height = 0;
      this.eventBus.dispatch("thumbnailrendered", {
        source: this,
        pageNumber: this.id,
        pdfPage: this.pdfPage
      });
    });
    return resultPromise;
  }
  setImage(pageView) {
    if (this.renderingState !== RenderingStates.INITIAL) {
      return;
    }
    const {
      thumbnailCanvas: canvas,
      pdfPage,
      scale
    } = pageView;
    if (!canvas) {
      return;
    }
    if (!this.pdfPage) {
      this.setPdfPage(pdfPage);
    }
    if (scale < this.scale) {
      return;
    }
    this.renderingState = RenderingStates.FINISHED;
    pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, _convertCanvasToImage).call(this, canvas);
  }
  setPageLabel(label) {
    var _this$image2;
    this.pageLabel = typeof label === "string" ? label : null;
    this.anchor.setAttribute("data-l10n-args", pdf_thumbnail_view_classPrivateGetter(_PDFThumbnailView_brand, this, _get_pageL10nArgs));
    if (this.renderingState !== RenderingStates.FINISHED) {
      return;
    }
    (_this$image2 = this.image) === null || _this$image2 === void 0 || _this$image2.setAttribute("data-l10n-args", pdf_thumbnail_view_classPrivateGetter(_PDFThumbnailView_brand, this, _get_pageL10nArgs));
  }
}
function _updateDims() {
  const {
    width,
    height
  } = this.viewport;
  const ratio = width / height;
  this.canvasWidth = THUMBNAIL_WIDTH;
  this.canvasHeight = this.canvasWidth / ratio | 0;
  this.scale = this.canvasWidth / width;
  const {
    style
  } = this.div;
  style.setProperty("--thumbnail-width", `${this.canvasWidth}px`);
  style.setProperty("--thumbnail-height", `${this.canvasHeight}px`);
}
function _getPageDrawContext(upscaleFactor = 1, enableHWA = this.enableHWA) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", {
    alpha: false,
    willReadFrequently: !enableHWA
  });
  const outputScale = new OutputScale();
  canvas.width = upscaleFactor * this.canvasWidth * outputScale.sx | 0;
  canvas.height = upscaleFactor * this.canvasHeight * outputScale.sy | 0;
  const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
  return {
    ctx,
    canvas,
    transform
  };
}
function _convertCanvasToImage(canvas) {
  if (this.renderingState !== RenderingStates.FINISHED) {
    throw new Error("#convertCanvasToImage: Rendering has not finished.");
  }
  const reducedCanvas = pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, _reduceImage).call(this, canvas);
  const image = document.createElement("img");
  image.className = "thumbnailImage";
  image.setAttribute("data-l10n-id", "pdfjs-thumb-page-canvas");
  image.setAttribute("data-l10n-args", pdf_thumbnail_view_classPrivateGetter(_PDFThumbnailView_brand, this, _get_pageL10nArgs));
  image.src = reducedCanvas.toDataURL();
  this.image = image;
  this.div.setAttribute("data-loaded", true);
  this._placeholderImg.replaceWith(image);
  reducedCanvas.width = 0;
  reducedCanvas.height = 0;
}
async function pdf_thumbnail_view_finishRenderTask(renderTask, canvas, error = null) {
  if (renderTask === this.renderTask) {
    this.renderTask = null;
  }
  if (error instanceof RenderingCancelledException) {
    return;
  }
  this.renderingState = RenderingStates.FINISHED;
  pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, _convertCanvasToImage).call(this, canvas);
  if (error) {
    throw error;
  }
}
function _reduceImage(img) {
  const {
    ctx,
    canvas
  } = pdf_thumbnail_view_assertClassBrand(_PDFThumbnailView_brand, this, _getPageDrawContext).call(this, 1, true);
  if (img.width <= 2 * canvas.width) {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  let reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
  let reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
  const [reducedImage, reducedImageCtx] = TempImageFactory.getCanvas(reducedWidth, reducedHeight);
  while (reducedWidth > img.width || reducedHeight > img.height) {
    reducedWidth >>= 1;
    reducedHeight >>= 1;
  }
  reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);
  while (reducedWidth > 2 * canvas.width) {
    reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1);
    reducedWidth >>= 1;
    reducedHeight >>= 1;
  }
  ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);
  return canvas;
}
function _get_pageL10nArgs(_this) {
  var _this$pageLabel;
  return JSON.stringify({
    page: (_this$pageLabel = _this.pageLabel) !== null && _this$pageLabel !== void 0 ? _this$pageLabel : _this.id
  });
}

;// ./web/pdf_thumbnail_viewer.js


function pdf_thumbnail_viewer_classPrivateMethodInitSpec(e, a) { pdf_thumbnail_viewer_checkPrivateRedeclaration(e, a), a.add(e); }
function pdf_thumbnail_viewer_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function pdf_thumbnail_viewer_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }


const THUMBNAIL_SCROLL_MARGIN = -19;
const THUMBNAIL_SELECTED_CLASS = "selected";
var _PDFThumbnailViewer_brand = /*#__PURE__*/new WeakSet();
class PDFThumbnailViewer {
  constructor({
    container,
    eventBus,
    linkService,
    renderingQueue,
    pageColors,
    abortSignal,
    enableHWA
  }) {
    pdf_thumbnail_viewer_classPrivateMethodInitSpec(this, _PDFThumbnailViewer_brand);
    this.container = container;
    this.eventBus = eventBus;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.pageColors = pageColors || null;
    this.enableHWA = enableHWA || false;
    this.scroll = watchScroll(this.container, pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, _scrollUpdated).bind(this), abortSignal);
    pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, _resetView).call(this);
  }
  getThumbnail(index) {
    return this._thumbnails[index];
  }
  scrollThumbnailIntoView(pageNumber) {
    if (!this.pdfDocument) {
      return;
    }
    const thumbnailView = this._thumbnails[pageNumber - 1];
    if (!thumbnailView) {
      console.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.');
      return;
    }
    if (pageNumber !== this._currentPageNumber) {
      const prevThumbnailView = this._thumbnails[this._currentPageNumber - 1];
      prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }
    const {
      first,
      last,
      views
    } = pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, _getVisibleThumbs).call(this);
    if (views.length > 0) {
      let shouldScroll = false;
      if (pageNumber <= first.id || pageNumber >= last.id) {
        shouldScroll = true;
      } else {
        for (const {
          id,
          percent
        } of views) {
          if (id !== pageNumber) {
            continue;
          }
          shouldScroll = percent < 100;
          break;
        }
      }
      if (shouldScroll) {
        scrollIntoView(thumbnailView.div, {
          top: THUMBNAIL_SCROLL_MARGIN
        });
      }
    }
    this._currentPageNumber = pageNumber;
  }
  get pagesRotation() {
    return this._pagesRotation;
  }
  set pagesRotation(rotation) {
    if (!isValidRotation(rotation)) {
      throw new Error("Invalid thumbnails rotation angle.");
    }
    if (!this.pdfDocument) {
      return;
    }
    if (this._pagesRotation === rotation) {
      return;
    }
    this._pagesRotation = rotation;
    const updateArgs = {
      rotation
    };
    for (const thumbnail of this._thumbnails) {
      thumbnail.update(updateArgs);
    }
  }
  cleanup() {
    for (const thumbnail of this._thumbnails) {
      if (thumbnail.renderingState !== RenderingStates.FINISHED) {
        thumbnail.reset();
      }
    }
    TempImageFactory.destroyCanvas();
  }
  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, _cancelRendering).call(this);
      pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, _resetView).call(this);
    }
    this.pdfDocument = pdfDocument;
    if (!pdfDocument) {
      return;
    }
    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "display"
    });
    firstPagePromise.then(firstPdfPage => {
      var _this$_thumbnails$;
      const pagesCount = pdfDocument.numPages;
      const viewport = firstPdfPage.getViewport({
        scale: 1
      });
      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        const thumbnail = new PDFThumbnailView({
          container: this.container,
          eventBus: this.eventBus,
          id: pageNum,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          linkService: this.linkService,
          renderingQueue: this.renderingQueue,
          pageColors: this.pageColors,
          enableHWA: this.enableHWA
        });
        this._thumbnails.push(thumbnail);
      }
      (_this$_thumbnails$ = this._thumbnails[0]) === null || _this$_thumbnails$ === void 0 || _this$_thumbnails$.setPdfPage(firstPdfPage);
      const thumbnailView = this._thumbnails[this._currentPageNumber - 1];
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }).catch(reason => {
      console.error("Unable to initialize thumbnail viewer", reason);
    });
  }
  setPageLabels(labels) {
    if (!this.pdfDocument) {
      return;
    }
    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.");
    } else {
      this._pageLabels = labels;
    }
    for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
      var _this$_pageLabels$i, _this$_pageLabels;
      this._thumbnails[i].setPageLabel((_this$_pageLabels$i = (_this$_pageLabels = this._pageLabels) === null || _this$_pageLabels === void 0 ? void 0 : _this$_pageLabels[i]) !== null && _this$_pageLabels$i !== void 0 ? _this$_pageLabels$i : null);
    }
  }
  forceRendering() {
    const visibleThumbs = pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, _getVisibleThumbs).call(this);
    const scrollAhead = pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, pdf_thumbnail_viewer_getScrollAhead).call(this, visibleThumbs);
    const thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this._thumbnails, scrollAhead);
    if (thumbView) {
      pdf_thumbnail_viewer_assertClassBrand(_PDFThumbnailViewer_brand, this, pdf_thumbnail_viewer_ensurePdfPageLoaded).call(this, thumbView).then(() => {
        this.renderingQueue.renderView(thumbView);
      });
      return true;
    }
    return false;
  }
}
function _scrollUpdated() {
  this.renderingQueue.renderHighestPriority();
}
function _getVisibleThumbs() {
  return getVisibleElements({
    scrollEl: this.container,
    views: this._thumbnails
  });
}
function _resetView() {
  this._thumbnails = [];
  this._currentPageNumber = 1;
  this._pageLabels = null;
  this._pagesRotation = 0;
  this.container.textContent = "";
}
function _cancelRendering() {
  for (const thumbnail of this._thumbnails) {
    thumbnail.cancelRendering();
  }
}
async function pdf_thumbnail_viewer_ensurePdfPageLoaded(thumbView) {
  if (thumbView.pdfPage) {
    return thumbView.pdfPage;
  }
  try {
    const pdfPage = await this.pdfDocument.getPage(thumbView.id);
    if (!thumbView.pdfPage) {
      thumbView.setPdfPage(pdfPage);
    }
    return pdfPage;
  } catch (reason) {
    console.error("Unable to get page for thumb view", reason);
    return null;
  }
}
function pdf_thumbnail_viewer_getScrollAhead(visible) {
  var _visible$first, _visible$last;
  if (((_visible$first = visible.first) === null || _visible$first === void 0 ? void 0 : _visible$first.id) === 1) {
    return true;
  } else if (((_visible$last = visible.last) === null || _visible$last === void 0 ? void 0 : _visible$last.id) === this._thumbnails.length) {
    return false;
  }
  return this.scroll.down;
}

;// ./web/pdf_viewer.component.js


















const pdfjsVersion = "4.9.0";
const pdfjsBuild = "2aaf00423";

var __webpack_exports__AnnotationLayerBuilder = __webpack_exports__.AnnotationLayerBuilder;
var __webpack_exports__DownloadManager = __webpack_exports__.DownloadManager;
var __webpack_exports__EventBus = __webpack_exports__.EventBus;
var __webpack_exports__FindState = __webpack_exports__.FindState;
var __webpack_exports__GenericL10n = __webpack_exports__.GenericL10n;
var __webpack_exports__LinkTarget = __webpack_exports__.LinkTarget;
var __webpack_exports__PDFFindController = __webpack_exports__.PDFFindController;
var __webpack_exports__PDFHistory = __webpack_exports__.PDFHistory;
var __webpack_exports__PDFLinkService = __webpack_exports__.PDFLinkService;
var __webpack_exports__PDFPageView = __webpack_exports__.PDFPageView;
var __webpack_exports__PDFScriptingManager = __webpack_exports__.PDFScriptingManager;
var __webpack_exports__PDFSinglePageViewer = __webpack_exports__.PDFSinglePageViewer;
var __webpack_exports__PDFThumbnailView = __webpack_exports__.PDFThumbnailView;
var __webpack_exports__PDFThumbnailViewer = __webpack_exports__.PDFThumbnailViewer;
var __webpack_exports__PDFViewer = __webpack_exports__.PDFViewer;
var __webpack_exports__ProgressBar = __webpack_exports__.ProgressBar;
var __webpack_exports__RenderingStates = __webpack_exports__.RenderingStates;
var __webpack_exports__ScrollMode = __webpack_exports__.ScrollMode;
var __webpack_exports__SimpleLinkService = __webpack_exports__.SimpleLinkService;
var __webpack_exports__SpreadMode = __webpack_exports__.SpreadMode;
var __webpack_exports__StructTreeLayerBuilder = __webpack_exports__.StructTreeLayerBuilder;
var __webpack_exports__TextLayerBuilder = __webpack_exports__.TextLayerBuilder;
var __webpack_exports__XfaLayerBuilder = __webpack_exports__.XfaLayerBuilder;
var __webpack_exports__getVisibleElements = __webpack_exports__.getVisibleElements;
var __webpack_exports__getXfaHtmlForPrinting = __webpack_exports__.getXfaHtmlForPrinting;
var __webpack_exports__isValidRotation = __webpack_exports__.isValidRotation;
var __webpack_exports__parseQueryString = __webpack_exports__.parseQueryString;
var __webpack_exports__scrollIntoView = __webpack_exports__.scrollIntoView;
var __webpack_exports__watchScroll = __webpack_exports__.watchScroll;
export { __webpack_exports__AnnotationLayerBuilder as AnnotationLayerBuilder, __webpack_exports__DownloadManager as DownloadManager, __webpack_exports__EventBus as EventBus, __webpack_exports__FindState as FindState, __webpack_exports__GenericL10n as GenericL10n, __webpack_exports__LinkTarget as LinkTarget, __webpack_exports__PDFFindController as PDFFindController, __webpack_exports__PDFHistory as PDFHistory, __webpack_exports__PDFLinkService as PDFLinkService, __webpack_exports__PDFPageView as PDFPageView, __webpack_exports__PDFScriptingManager as PDFScriptingManager, __webpack_exports__PDFSinglePageViewer as PDFSinglePageViewer, __webpack_exports__PDFThumbnailView as PDFThumbnailView, __webpack_exports__PDFThumbnailViewer as PDFThumbnailViewer, __webpack_exports__PDFViewer as PDFViewer, __webpack_exports__ProgressBar as ProgressBar, __webpack_exports__RenderingStates as RenderingStates, __webpack_exports__ScrollMode as ScrollMode, __webpack_exports__SimpleLinkService as SimpleLinkService, __webpack_exports__SpreadMode as SpreadMode, __webpack_exports__StructTreeLayerBuilder as StructTreeLayerBuilder, __webpack_exports__TextLayerBuilder as TextLayerBuilder, __webpack_exports__XfaLayerBuilder as XfaLayerBuilder, __webpack_exports__getVisibleElements as getVisibleElements, __webpack_exports__getXfaHtmlForPrinting as getXfaHtmlForPrinting, __webpack_exports__isValidRotation as isValidRotation, __webpack_exports__parseQueryString as parseQueryString, __webpack_exports__scrollIntoView as scrollIntoView, __webpack_exports__watchScroll as watchScroll };

//# sourceMappingURL=pdf_viewer.mjs.map