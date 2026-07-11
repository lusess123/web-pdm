import {
  Download,
  Focus,
  GitBranch,
  Image,
  ImageOff,
  Maximize2,
  Minimize2,
  Moon,
  Palette,
  Redo2,
  RefreshCw,
  Sun,
  Undo2,
} from 'lucide-react';
import React from 'react';
import WebPdmCore, { IWebPdmProps } from 'web-pdm-core';
export * from 'web-pdm-core';

import {
  Button,
  Dropdown,
  Input,
  Menu,
  Popover,
  Select,
  Tooltip,
  Tree,
} from './ui';
import './ui/styles.scss';

const IconRenders = {
  undo: <Undo2 />,
  redo: <Redo2 />,
  min: <Minimize2 />,
  max: <Maximize2 />,
  full: <Focus />,
  miniMap: <Image />,
  miniMapNo: <ImageOff />,
  dagreLayout: <GitBranch />,
  relationLayout: <GitBranch style={{ transform: 'rotate(90deg)' }} />,
  reload: <RefreshCw />,
  image: <Download />,
  darkness: <Moon />,
  light: <Sun />,
  colorClose: <Palette />,
  colorOpen: <Palette />,
};

const WebPdm: React.FunctionComponent<IWebPdmProps> = (props) => {
  return (
    <WebPdmCore
      IconRenders={IconRenders}
      components={{
        Input,
        Button,
        Dropdown,
        Menu,
        Select,
        Tooltip,
        Tree,
        Popover,
      }}
      {...props}
    />
  );
};
export default WebPdm;
