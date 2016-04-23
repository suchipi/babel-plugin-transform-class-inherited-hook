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

var Apple = function () {
  var _Banana = function (_Fruit) {
    (0, _inherits3.default)(_Banana, _Fruit);

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
  }(Fruit);

  Object.defineProperty(_Banana, "name", {
    value: "Banana",
    configurable: true
  });

  if ("onInherited" in Fruit) {
    if (typeof Fruit.onInherited == 'function') {
      var _Banana2 = Fruit.onInherited(_Banana);

      if (_Banana2 !== void 0) {
        if (typeof _Banana2 == 'function' && _Banana2.name !== "Banana") {
          Object.defineProperty(_Banana2, "name", {
            value: "Banana",
            configurable: true
          });
        }

        _Banana = _Banana2;
      }
    } else {
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }

  return _Banana;
}();
