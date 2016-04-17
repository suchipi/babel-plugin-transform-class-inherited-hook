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
  var _Apple = function (_Fruit2) {
    (0, _inherits3.default)(_Apple, _Fruit2);

    function _Apple() {
      (0, _classCallCheck3.default)(this, _Apple);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_Apple).apply(this, arguments));
    }

    (0, _createClass3.default)(_Apple, [{
      key: "tastiness",
      value: function tastiness() {
        return 7;
      }
    }]);
    return _Apple;
  }(_Fruit);

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
