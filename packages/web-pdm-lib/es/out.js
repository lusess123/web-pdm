import "antd/es/popover/style/css";
import _Popover from "antd/es/popover";
import "antd/es/tooltip/style/css";
import _Tooltip from "antd/es/tooltip";
import "antd/es/select/style/css";
import _Select from "antd/es/select";
import "antd/es/menu/style/css";
import _Menu from "antd/es/menu";
import "antd/es/dropdown/style/css";
import _Dropdown from "antd/es/dropdown";
import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/input/style/css";
import _Input from "antd/es/input";
import React from 'react';
export * from 'web-pdm-core';
import WebPdmCore from 'web-pdm-core';
import { // FileMarkdownOutlined,
ReloadOutlined // CloseCircleFilled,
, PictureOutlined, PictureFilled, SnippetsFilled, SnippetsOutlined, DownloadOutlined, PartitionOutlined, UngroupOutlined, RollbackOutlined, BgColorsOutlined // UnlockOutlined,
// LockOutlined,
, ZoomOutOutlined, ZoomInOutlined, BorderOutlined } from '@ant-design/icons';
import { Tree } from './tree';
var IconRenders = {
  undo: /*#__PURE__*/React.createElement(RollbackOutlined, null),
  redo: /*#__PURE__*/React.createElement(RollbackOutlined, {
    style: {
      transform: 'scaleX(-1)'
    }
  }),
  min: /*#__PURE__*/React.createElement(ZoomOutOutlined, null),
  max: /*#__PURE__*/React.createElement(ZoomInOutlined, null),
  full: /*#__PURE__*/React.createElement(BorderOutlined, null),
  miniMap: /*#__PURE__*/React.createElement(PictureFilled, null),
  miniMapNo: /*#__PURE__*/React.createElement(PictureOutlined, null),
  dagreLayout: /*#__PURE__*/React.createElement(PartitionOutlined, null),
  relationLayout: /*#__PURE__*/React.createElement(UngroupOutlined, null),
  reload: /*#__PURE__*/React.createElement(ReloadOutlined, null),
  image: /*#__PURE__*/React.createElement(DownloadOutlined, null),
  darkness: /*#__PURE__*/React.createElement(SnippetsFilled, null),
  light: /*#__PURE__*/React.createElement(SnippetsOutlined, null),
  colorClose: /*#__PURE__*/React.createElement(BgColorsOutlined, null),
  colorOpen: /*#__PURE__*/React.createElement(BgColorsOutlined, null)
};

var WebPdm = function WebPdm(props) {
  return /*#__PURE__*/React.createElement(WebPdmCore, Object.assign({
    IconRenders: IconRenders,
    components: {
      Input: _Input,
      Button: _Button,
      Dropdown: _Dropdown,
      Menu: _Menu,
      Select: _Select,
      Tooltip: _Tooltip,
      Tree: Tree,
      Popover: _Popover
    }
  }, props));
};

export default WebPdm;