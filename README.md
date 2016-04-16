# babel-plugin-transform-class-inherited-hook

Babel plugin that transforms class declarations with superclasses to call superclass.onInherited after declaration (if present).

## Example

Before:
```javascript
class Apple extends Fruit {
	constructor() {
		console.log("Yum!");
	}
}
```
After:
```javascript
var Apple = function (_Fruit) {
  var _Apple = class extends _Fruit {
    constructor() {
      console.log("Yum!");
    }
  }

  if (_Fruit.hasOwnProperty("onInherited")) {
    if (typeof _Fruit.onInherited == 'function') {
      var _Apple2 = _Fruit.onInherited(_Apple) || _Apple;
    } else {
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }
  return _Apple2;
}(Fruit);
```

## What?

Every class declaration with a superClass gets transformed into an expression that:
* Creates the class
* calls `SuperClass.onInherited(ChildClass)` if present
* evaluates to the return value of `SuperClass.onInherited(ChildClass)` if available, otherwise the created class

This lets you hook class inheritance:
```javascript
class LoggedItem {
	static onInherited(child) {
		console.log("A new logged item type was created:", child);
	}
}
```

It also lets you transform classes at inheritance time:
```javascript
class Polyfill {
  static needsToBeShimmed() {
    return true;
  }

  static nativeClass() {
    return null;
  }

  static onInherited(child) {
    let { needsToBeShimmed, nativeClass } = child || this;

    if (!needsToBeShimmed()) {
      // If we return a value from onInherited, it will be used
      // as the value of the class declaration instead of child
      return nativeClass();
    }
  }
}

class Promise extends Polyfill {
  static needsToBeShimmed() {
    return !window.Promise;
  }

  static nativeClass() {
    return window.Promise;
  }

  constructor(func) {
    ...
  }
}

// Promise now refers to either window.Promise or the class defined by
// the Promise class declaration above, depending on if needsToBeShimmed()
// evaluated to true or false
```

## Installation

```sh
$ npm install babel-plugin-transform-class-inherited-hook
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
	"plugins": ["transform-class-inherited-hook"]
}
```

### Via CLI

```sh
$ babel --plugins transform-class-inherited-hook script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
	plugins: ['transform-class-inherited-hook']
});
```

## Thanks

[RReverser/babel-plugin-hello-world](https://github.com/rreverser/babel-plugin-hello-world) for the great babel plugin template
