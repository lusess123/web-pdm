import React from 'react';
export var renderModelTitle = function renderModelTitle(title, searchValue, showNameOrLabel, originalKey) {
  if (showNameOrLabel) {
    return renderTitle(originalKey, searchValue);
  } else {
    return renderTitle(title, searchValue);
  }
};
var renderLabel = function renderLabel(isSpec, beforeStr, afterStr, searchValue) {
  var greenStyle = isSpec ? {
    color: 'green'
  } : {};
  var searchStyle = {
    color: '#f50'
  };
  return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: greenStyle
  }, beforeStr), /*#__PURE__*/React.createElement("span", {
    style: searchStyle
  }, searchValue), /*#__PURE__*/React.createElement("span", {
    style: greenStyle
  }, afterStr));
};
var renderTitle = function renderTitle(title) {
  var searchValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var isSpec = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!searchValue) return title;
  var index = title.indexOf(searchValue);
  var beforeStr = title.substr(0, index);
  var afterStr = title.substr(index + searchValue.length);
  var titleFilter = index > -1 ? renderLabel(isSpec, beforeStr, afterStr, searchValue) : renderTitleGreen(isSpec, title);
  return titleFilter;
};
var renderTitleGreen = function renderTitleGreen(isSpec, title) {
  var greenStyle = isSpec ? {
    color: 'green'
  } : {};
  return /*#__PURE__*/React.createElement("span", {
    style: greenStyle
  }, title);
};