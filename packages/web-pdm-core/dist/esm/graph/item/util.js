function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
export var setNodeStateAttr = function setNodeStateAttr(state, s, cfg) {
  if (cfg.config.styleConfig[state]) {
    Object.entries(cfg.config.styleConfig[state].node).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];
      s.attr(k, v);
    });
  }
};

// const mapNodeStateAttr = (state, s, cfg, isMap) => {
//   if (cfg.config.styleConfig[state]) {
//   Object.entries(cfg.config.styleConfig[state].node).forEach(([k, v]) => {
//     s.attr(k, v)
//   })
// }
// }

export var isEng = function isEng(str) {
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    if (charCode < 0 || charCode > 128) {
      return false;
    }
  }
  return true;
};
export var getSplitStrings = function getSplitStrings(str) {
  if (isEng(str)) return getEngGroup(str);
  var reg = /.{5}/g;
  var rs = str.match(reg) || [str];
  rs.push(str.substring(rs.join('').length));
  return rs;
};
export var getEngGroup = function getEngGroup(str) {
  var regExp = new RegExp("(?<!^)([A-Z]", 'g');
  var strs = str.replace(regExp, "-$1");
  return strs.split('-');
};
export var getLen = function getLen(str) {
  /// <summary>获得字符串实际长度，中文2，英文1</summary>
  /// <param name="str">要获得长度的字符串</param>
  // tslint:disable-next-line: one-variable-per-declaration
  var realLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;else realLength += 2;
  }
  return realLength;
}; // tslint:disable-next-line: interface-over-type-literal

export var getTopAnch = function getTopAnch(num) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var res = [];
  for (var i = 0; i < num; i++) {
    res.push([(i + 1) / num, y]);
  }
  return res;
};
export var getBottomAnch = function getBottomAnch(num) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var res = [];
  for (var i = 0; i <= num; i++) {
    res.push([i / num, y]);
  }
  return res;
};
export var getLeftAnch = function getLeftAnch(num) {
  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var res = [];
  for (var i = 0; i < num; i++) {
    res.push([x, (i + 1) / num]);
  }
  return res;
};
export var getRightAnch = function getRightAnch(num) {
  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var res = [];
  for (var i = 0; i <= num; i++) {
    res.push([x, i / num]);
  }
  return res;
};
export var getLength = function getLength(length) {
  return length >= 8 ? length : 8;
};