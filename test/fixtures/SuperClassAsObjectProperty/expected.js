"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fruits = {
  Apple: function Apple() {
    (0, _classCallCheck3.default)(this, Apple);
  },
  Banana: function Banana() {
    (0, _classCallCheck3.default)(this, Banana);
  }
};

var RedDelicious = function () {
  var _RedDelicious = function (_Fruits$Apple) {
    (0, _inherits3.default)(_RedDelicious, _Fruits$Apple);

    function _RedDelicious() {
      (0, _classCallCheck3.default)(this, _RedDelicious);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_RedDelicious).apply(this, arguments));
    }

    (0, _createClass3.default)(_RedDelicious, [{
      key: "redness",
      value: function redness() {
        return 46;
      }
    }]);
    return _RedDelicious;
  }(Fruits.Apple);

  Object.defineProperty(_RedDelicious, "name", {
    value: "RedDelicious",
    configurable: true
  });

  if ("onInherited" in Fruits.Apple) {
    if (typeof Fruits.Apple.onInherited == 'function') {
      var _RedDelicious2 = Fruits.Apple.onInherited(_RedDelicious);

      if (_RedDelicious2 !== void 0) {
        if (typeof _RedDelicious2 == 'function' && _RedDelicious2.name !== "RedDelicious") {
          Object.defineProperty(_RedDelicious2, "name", {
            value: "RedDelicious",
            configurable: true
          });
        }

        _RedDelicious = _RedDelicious2;
      }
    } else {
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }

  return _RedDelicious;
}();
