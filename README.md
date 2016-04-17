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

  var _Apple2 = _Apple;

  if (_Fruit.hasOwnProperty("onInherited")) {
    if (typeof _Fruit.onInherited == 'function') {
      _Apple2 = _Fruit.onInherited(_Apple) || _Apple;
    } else {
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }
  return _Apple2;
}(Fruit);
```

## What?

Every class declaration with a superClass gets transformed into an expression that:
* Creates the child class
* calls `SuperClass.onInherited(ChildClass)` if present
* evaluates to the return value of `SuperClass.onInherited(ChildClass)` if any, otherwise the created child class

## Why?

This lets you hook class inheritance:
```javascript
function register(klass){ ... } // Add to a map, wire things up, etc

class LoggedItem {
  static onInherited(child) {
    console.log("A new logged item type was created:", child);
    register(child);
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

## No really, what are some practical uses?

Ok, how about automatically calling react-redux's `connect` method?
```javascript
import React from 'react';
import { connect } from 'react-redux';

class ReduxContainer extends React.Component {
  static onInherited(child) {
    let { mapStateToProps, mapDispatchToProps, mergeProps } = child;
    return connect(mapStateToProps, mapDispatchToProps, mergeProps)(child);
    }
  }
}

class SomeContainer extends ReduxContainer {
  static mapStateToProps(state, ownProps) { ... }
}
// SomeContainer has already been connected to the store
```

Or maybe generating a reducer from a class with action handler methods?
```javascript
import { handleActions } from 'redux-actions';

class Reducer {
  static onInherited(child) {
    // The return value of onInherited doesn't have to be a class
    return handleActions(child.prototype);
  }
}

class Todos extends Reducer {
  ADD_TODO(state, action) { ... }
  REMOVE_TODO(state, action) { ... }
}
// Todos is a reducer function that will handle ADD_TODO and REMOVE_TODO actions
```

You could even do the unthinkable...
```javascript
let ActiveRecord = {
  Base: class {
    static onInherited(child) {
      associateWithDatabaseTable(child, child.tableName);
      definePropertyAccessorsUsingAttributes(child, child.tableName);
      child.find = createDatabaseFinderMethod(child, child.tableName);
    }

    save() { ... }
  }
};

class User extends ActiveRecord.Base {
  static tableName = "users";
}

User.find(1).name === "Bob";

```

## But this makes class extension untrustworthy and changes the semantics of a well-defined system!

Yeah, it does. But it can help create a little bit of structure in an otherwise anything-goes pure functional world.

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

[RReverser/babel-plugin-hello-world](https://github.com/rreverser/babel-plugin-hello-world) for the great babel plugin template
[thejameskyle/babel-handbook](https://github.com/thejameskyle/babel-handbook) for the documentation to get me started
