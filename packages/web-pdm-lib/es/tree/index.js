import { Dropdown, Menu, Tree as AntTree } from 'antd';
import React, { useState, useCallback } from 'react';
// import 'antd/dist/antd.less'
import './style.scss';
// const click = () => alert()
const OptionBuilder = ({ data }) => {
    const { title, options = [] } = data;
    const [showMenu, setShowMenu] = useState(false);
    const onShowMenu = useCallback(val => () => {
        setShowMenu(val);
    }, []);
    const menu = (React.createElement(Menu, null, options.map(option => {
        return (React.createElement(Menu.Item, { key: option },
            React.createElement("a", { onClick: option.click }, option.title)));
    })));
    return (React.createElement("div", { className: 'tree-node-title', onMouseEnter: onShowMenu(true), onMouseLeave: onShowMenu(false) },
        React.createElement("span", { className: 'tree-node-title-title' }, title),
        !!options.length && showMenu && (React.createElement(Dropdown, { overlay: menu },
            React.createElement("span", { className: 'tree-node-title-options' }, "...")))));
};
// alert()
AntTree['OptionBuilder'] = OptionBuilder;
export const Tree = AntTree;
