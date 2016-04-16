"use strict";

import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";

var Apple = function (_Fruit) {
  var _Apple = function (_Fruit2) {
    _inherits(_Apple, _Fruit2);

    function _Apple() {
      _classCallCheck(this, _Apple);

      return _possibleConstructorReturn(this, _Object$getPrototypeOf(_Apple).apply(this, arguments));
    }

    _createClass(_Apple, [{
      key: "tastiness",
      value: function tastiness() {
        return 7;
      }
    }]);

    return _Apple;
  }(_Fruit);

  if (_Fruit.hasOwnProperty("onInherited")) {
    if (typeof _Fruit.onInherited == 'function') {
      var _Apple2 = _Fruit.onInherited(_Apple) || _Apple;
    } else {
      throw new TypeError("Attempted to call onInherited, but it was not a function");
    }
  }
  return _Apple2;
}(Fruit);
