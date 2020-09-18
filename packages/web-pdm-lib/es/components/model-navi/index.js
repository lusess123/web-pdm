import { EllipsisOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
// import _ from 'lodash'
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Scroll from 'react-custom-scrollbars';
import { CreateComponent, intlLiteral } from '../../util';
import { useMst } from '../../context';
import './style.scss';
const getTreeNodeTitle = (model, root, OptionBuilder) => {
    return React.createElement(OptionBuilder, { data: {
            title: root.renderModelTitle(model),
            options: [{
                    title: React.createElement("span", null,
                        " ",
                        intlLiteral('定位模型')),
                    click: (e) => { root.sys.centerCurrentModel([model.id]); e.stopPropagation(); },
                },
                {
                    title: React.createElement("span", null,
                        " ",
                        intlLiteral('查看'))
                },
            ],
        } });
};
export default CreateComponent({
    render(_) {
        const mst = useMst();
        const { Input, Button, Dropdown, Menu, Select, Tree } = mst.Ui;
        const { TreeNode, OptionBuilder } = Tree;
        const treeNodes = useMemo(() => !mst.sys.tabOrTree ? mst.moduleList.map(m => {
            return (React.createElement(TreeNode, { title: mst.sys.showNameOrLabel ? m.name : m.label, key: m.id }, [...m.models.values()].filter(model => model.filterModel()).map(model => {
                return React.createElement(TreeNode, { key: model.id, title: getTreeNodeTitle(model, mst, OptionBuilder) });
            })));
        }) :
            [...mst.Models.values()].filter(model => ((!mst.sys.currentModule || model.moduleId === mst.sys.currentModule) && model.filterModel())).map(model => {
                return React.createElement(TreeNode, { key: model.id, title: getTreeNodeTitle(model, mst, OptionBuilder) });
            }), [mst.sys.tabOrTree, mst.moduleList, mst.sys.showNameOrLabel, mst.sys.currentModule]);
        useEffect(() => { }, [mst.Ui.update]);
        const { search, onExpand, checkAllFun, checkAllCancleFun, toggleShowNameOrLabel, toggleTabOrTree, Sys, changeModuleValue, setSearch } = useLocal();
        return React.createElement("div", { className: 'console-models-tree', style: { height: mst.sys.height } },
            React.createElement("div", { className: 'header' },
                React.createElement("div", { className: 'console-erd-search' },
                    React.createElement(Input, { allowClear: true, value: search, size: "small", onChange: (e) => setSearch(e.target.value), addonAfter: Sys.tabOrTree && React.createElement(Select, { size: "small", defaultValue: Sys.currentModule, value: Sys.currentModule, className: "select-after", onChange: changeModuleValue }, [
                            React.createElement(Select.Option, { value: '' }, "\u6240\u6709"),
                            ...([...mst.Modules.values()].map((module) => {
                                return React.createElement(Select.Option, { value: module.id, key: module.id }, module.label);
                            }))
                        ]) })),
                React.createElement("div", { className: 'console-erd-search btns' },
                    mst.sys.tabOrTree && React.createElement(Button, { size: "small", type: "text", onClick: checkAllFun }, "\u9009\u62E9\u6240\u6709"),
                    mst.sys.tabOrTree && React.createElement(Button, { size: "small", type: "text", onClick: checkAllCancleFun }, "\u6E05\u9664\u6240\u6709"),
                    React.createElement(Button, { size: "small", type: "text", onClick: toggleShowNameOrLabel },
                        "\u663E\u793A",
                        !mst.sys.showNameOrLabel ? '名称' : '标签'),
                    React.createElement(Dropdown, { className: 'right', overlay: React.createElement(Menu, null,
                            React.createElement(Menu.Item, { key: "1", onClick: toggleTabOrTree },
                                Sys.tabOrTree ? '分类' : '树形',
                                "\u6A21\u5F0F")) },
                        React.createElement("span", null,
                            React.createElement(EllipsisOutlined, null))))),
            React.createElement("div", { className: 'navitree-warp' },
                React.createElement(Scroll, { autoHide: true, autoHeight: true, autoHideTimeout: 1000, autoHideDuration: 200, autoHeightMin: '100%', autoHeightMax: '100%' },
                    React.createElement(Tree, { showIcon: false, className: 'console-models-tree-tree', onSelect: mst.sys.setCurrentModel.bind(mst.sys), selectedKeys: [mst.sys.currentModel], checkedKeys: [...mst.sys.checkedKeys], onCheck: mst.setCheckedKeys.bind(mst), checkable: true, onExpand: onExpand, multiple: true, expandedKeys: [...mst.sys.expandedKeys] }, treeNodes))));
    },
    displayName: 'navi'
});
const useLocal = () => {
    const mst = useMst();
    const [text, setText] = useState(mst.sys.search);
    const [texting, setTexting] = useState(false);
    useEffect(() => { if (!texting)
        debounce(() => setText(mst.sys.search), 1000)(); }, [mst.sys.search]);
    const setSearch = useCallback((val) => {
        setTexting(true);
        setText(val);
        debounce(() => {
            mst.sys.setSearch(val);
            setTexting(false);
        }, 500)();
    }, [mst.sys.setSearch, setText]);
    // const setSearch = mst.sys.setSearch;
    return {
        search: text,
        get modules() {
            return mst.moduleList;
        },
        onExpand(expandedKeys) {
            mst.sys.setExpandedKeys(expandedKeys);
        },
        get expandedKeys() {
            return mst.sys.expandedKeys;
        },
        checkAllFun() {
            return mst.checkAllFun();
        },
        checkAllCancleFun() {
            return mst.checkAllCancleFun();
        },
        toggleShowNameOrLabel: mst.sys.toggleShowNameOrLabel,
        toggleTabOrTree: mst.sys.toggleTabOrTree.bind(mst.sys),
        get Sys() {
            return mst.sys;
        },
        changeModuleValue: mst.sys.changeModuleValue.bind(mst.sys),
        setSearch
    };
};
