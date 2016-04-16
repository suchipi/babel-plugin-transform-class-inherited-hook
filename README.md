# babel-plugin-transform-class-inherited-hook

Babel plugin that transforms class declarations with superclasses to call superclass.onInherited after declaration (if present).

## Example

Before:
```javascript
class Apple extends Fruit {
	constructor() {
		console.log("Yum!")
	}
}
```
After:
```javascript
class Apple extends Fruit {
	constructor() {
		console.log("Yum!")
	}
}

if (Fruit.hasOwnProperty("onInherited")) {
  if (typeof Fruit.onInherited == 'function') {
    Fruit.onInherited(Apple);
  } else {
    throw new TypeError("Attempted to call onInherited, but it was not a function");
  }
}
```

This lets you do, for example:
```javascript
class Fruit {
	static onInherited(child) {
		registerFruitType(child);
	}
}
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
	"plugins": ["on-inherited-hook"]
}
```

### Via CLI

```sh
$ babel --plugins on-inherited-hook script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
	plugins: ['on-inherited-hook']
});
```

## Thanks

[RReverser/babel-plugin-hello-world](https://github.com/rreverser/babel-plugin-hello-world) for the great babel plugin template
