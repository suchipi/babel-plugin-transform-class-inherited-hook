# babel-plugin-transform-class-inherited-hook

Babel plugin that transforms subclass declarations to call superclass.onInherited afterwards (if present).

## Example

Before:
```javascript
class Apple extends Fruit {
  tastiness() {
    return 7;
  }
}
```
After:
```javascript
var Apple = function () {
  // Declare the Apple class as an anonymous class _Apple.
  var _Apple = class extends Fruit {
    tastiness() {
      return 7;
    }
  }

  // Set _Apple's name property to 'Apple'.
  Object.defineProperty(_Apple, "name", { value: "Apple", configurable: true });

  // If Fruit has a property called onInherited,
  if ("onInherited" in Fruit) {
    // and it's a function,
    if (typeof Fruit.onInherited == 'function') {
      // call it and save the returned value.
      var _Apple2 = Fruit.onInherited(_Apple);

      // If Fruit.onInherited returned a value,
      if (_Apple2 !== undefined) {
        // if it's a function, define its name property as 'Apple', if it didn't have that already.
        if (typeof _Apple2 == 'function' && _Apple2.name !== "Apple") {
          Object.defineProperty(_Apple2, "name", { value: "Apple", configurable: true });
        }

        // Use the returned value as the class instead of the declared one
        _Apple = _Apple2;
      }
    // If Fruit.onInherited is present but not a function,
    } else {
      // complain about it
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }

  // Return the class so it gets set as the variable
  return _Apple;
}();
```
**NOTE:** Actual implementation uses a helper function so this logic isn't repeated every single class declaration.

## What?

Every class declaration with a superClass gets transformed into an expression that:
* Creates the child class
* calls `SuperClass.onInherited(ChildClass)` if present
* evaluates to the return value of `SuperClass.onInherited(ChildClass)` if any, otherwise the created child class

## Why?

This lets you hook class inheritance:
```javascript
function register(klass){ ... } // Add to a map, wire things up, etc

class RegisteredItem {
  static onInherited(child) {
    console.log(`A new registered item class was created: ${child.name}`);
    register(child);
  }
}
```

It also lets you transform classes at inheritance time:
```javascript
class Polyfill {
  // Whether we need to shim the native behavior
  static needsToBeShimmed() {
    return true;
  }

  // If we don't need to shim the native behavior, then
  // this is the native class that should be used instead
  static nativeClass() {
    return null;
  }

  static onInherited(child) {
    let { needsToBeShimmed, nativeClass } = child;

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

## No really, what are some practical uses?

Ok, how about automatically calling react-redux's `connect` method?
```javascript
import React from 'react';
import { connect } from 'react-redux';

class ConnectedContainer extends React.Component {
  static onInherited(child) {
    let { mapStateToProps, mapDispatchToProps, mergeProps } = child;
    return connect(mapStateToProps, mapDispatchToProps, mergeProps)(child);
    }
  }
}

class NiceFlowerbed extends ConnectedContainer {
  static mapStateToProps(state, ownProps) { ... }
}
// NiceFlowerbed has already been connected to the store
```

Or maybe generating a reducer from a class with action handler methods?
```javascript
import { handleActions } from 'redux-actions';

class Reducer {
  static onInherited(child) {
    // The return value of onInherited doesn't have
    // to be a class; in this case, it's just a function.
    return handleActions(child.prototype);
  }
}

class Magic extends Reducer {
  CAST_SPELL(state, action) { ... }
  LEARN_SPELL(state, action) { ... }
}
// Magic is a reducer function that will handle actions of type CAST_SPELL and LEARN_SPELL
```

You could even do the unthinkable...
```javascript
let ActiveRecord = {
  Base: class {
    static onInherited(child) {
      associateWithDatabaseTable(child, child.name);
      definePropertyAccessorsUsingAttributes(child, child.name);
      child.find = createDatabaseFinderMethod(child, child.name);
    }

    save() { ... }
  }
};

class User extends ActiveRecord.Base {}

assert(User.find(1).name === "Bob");

```

## But this makes class extension untrustworthy and changes the semantics of a well-defined system!

Yeah, it does. But it can help provide a little bit of structure and get rid of a little boilerplate.

## Installation

```sh
$ npm install --save babel-plugin-transform-class-inherited-hook
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
require('babel-core').transform('code', {
  plugins: ['transform-class-inherited-hook']
});
```

## Thanks

* [RReverser/babel-plugin-hello-world](https://github.com/rreverser/babel-plugin-hello-world) for the great babel plugin template
* [thejameskyle/babel-handbook](https://github.com/thejameskyle/babel-handbook) for the documentation to get me started
