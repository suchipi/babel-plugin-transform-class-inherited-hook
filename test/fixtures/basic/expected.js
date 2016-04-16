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
  (0, _inherits3.default)(Apple, _Fruit);

  function Apple() {
    (0, _classCallCheck3.default)(this, Apple);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Apple).apply(this, arguments));
  }

  (0, _createClass3.default)(Apple, [{
    key: "tastiness",
    value: function tastiness() {
      return 7;
    }
  }]);
  return Apple;
}(Fruit);

if (Fruit.hasOwnProperty("onInherited")) {
  if (typeof Fruit.onInherited == 'function') {
    Fruit.onInherited(Apple);
  } else {
    throw new TypeError("Attempted to call onInherited, but it was not a function");
  }
}
