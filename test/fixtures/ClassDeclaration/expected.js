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
  var _Apple = function (_Fruit) {
    (0, _inherits3.default)(_Apple, _Fruit);

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
  }(Fruit);

  Object.defineProperty(_Apple, "name", {
    value: "Apple",
    configurable: true
  });

  if ("onInherited" in Fruit) {
    if (typeof Fruit.onInherited == 'function') {
      var _Apple2 = Fruit.onInherited(_Apple);

      if (_Apple2 !== void 0) {
        if (typeof _Apple2 == 'function' && _Apple2.name !== "Apple") {
          Object.defineProperty(_Apple2, "name", {
            value: "Apple",
            configurable: true
          });
        }

        _Apple = _Apple2;
      }
    } else {
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }

  return _Apple;
}();
