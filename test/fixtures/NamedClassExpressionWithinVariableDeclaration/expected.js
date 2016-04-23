"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Apple = function (_Fruit) {
  var _Banana = function (_Fruit2) {
    (0, _inherits3.default)(_Banana, _Fruit2);

    function _Banana() {
      (0, _classCallCheck3.default)(this, _Banana);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_Banana).apply(this, arguments));
    }

    (0, _createClass3.default)(_Banana, [{
      key: "tastiness",
      value: function tastiness() {
        return 7;
      }
    }]);
    return _Banana;
  }(_Fruit);

  if (typeof _Banana == 'function') {
    Object.defineProperty(_Banana, "name", {
      value: "Banana",
      configurable: true
    });
  }

  var _Banana2 = _Banana;

  if ("onInherited" in _Fruit) {
    if (typeof _Fruit.onInherited == 'function') {
      _Banana2 = _Fruit.onInherited(_Banana) || _Banana;
    } else {
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }

  if (typeof _Banana2 == 'function') {
    Object.defineProperty(_Banana2, "name", {
      value: "Banana",
      configurable: true
    });
  }
  return _Banana2;
}(Fruit);
