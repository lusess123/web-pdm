import { EllipsisOutlined } from '@ant-design/icons'
import { debounce, sortBy } from 'lodash'

// import { Tree } from '../../tree'
import { TModel } from '../../type/model'
import { RootInstance } from '../../type'
// import _ from 'lodash'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import Scroll from 'react-custom-scrollbars'
import { CreateComponent } from '../../util'
import { useMst } from '../../context'
import './style.scss'
// import mst from '@antv/g6/lib/algorithm/mst';

console.log('hezk test =======');

type IModelNaviProps = {
    modules?: []
    model?: []
}

const getTreeNodeTitle = (
    model: TModel,
    root: RootInstance,
    OptionBuilder: any
) => {
    return (
        <OptionBuilder
            data={{
                title: root.renderModelTitle(model),

                options: [
                    {
                        title: <span> {root.intl('定位模型')}</span>,
                        key: 1,
                        click: e => {
                            root.sys.centerCurrentModel([model.id])
                            e.stopPropagation()
                        }
                    },
                    {
                        key: 2,
                        title: <span> {root.intl('查看')}</span>,
                        click: e => {
                            root.sys.openModel(model.id)
                            e.stopPropagation()
                        }
                    }
                    // {
                    //   title: <span> {intlLiteral('移除')}</span>
                    // },
                ]
            }}
        />
    )
}

const ModuleIcon = () => {
    return <svg t="1615261964381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4848" width="14" ><path d="M512 549.76a34.56 34.56 0 0 1-16-3.84L295.04 429.44a30.72 30.72 0 0 1-16-27.52V169.6a30.72 30.72 0 0 1 16-27.52L496 26.24a32 32 0 0 1 32 0l200.96 115.84a30.72 30.72 0 0 1 16 27.52v232.32a30.72 30.72 0 0 1-16 27.52L528 545.92a34.56 34.56 0 0 1-16 3.84zM343.04 384L512 481.28 680.96 384V188.16L512 90.24 343.04 188.16zM256 992a27.52 27.52 0 0 1-16-4.48l-204.8-115.84a33.28 33.28 0 0 1-16-28.16V611.84a33.28 33.28 0 0 1 16-28.16L236.8 467.84a32 32 0 0 1 32 0l200.96 115.84a33.28 33.28 0 0 1 16 28.16v231.68a33.28 33.28 0 0 1-16 28.16L268.8 987.52a30.08 30.08 0 0 1-12.8 4.48z m-172.8-166.4L256 922.88l165.76-97.28V630.4L256 532.48 83.2 630.4zM771.2 992a30.08 30.08 0 0 1-16-4.48l-200.96-115.84a33.28 33.28 0 0 1-16-28.16V611.84a33.28 33.28 0 0 1 16-28.16l200.96-115.84a32 32 0 0 1 32 0l201.6 115.84a33.28 33.28 0 0 1 16 28.16v231.68a33.28 33.28 0 0 1-16 28.16l-201.6 115.84a27.52 27.52 0 0 1-16 4.48z m-168.96-166.4l168.96 97.28 169.6-97.28V630.4l-169.6-97.92-168.96 97.92z" fill="#323333" p-id="4849">
        </path></svg>
}

export default CreateComponent<IModelNaviProps>({
    render(_) {
        const mst = useMst()
        const intl = mst.intl
        const { Input, Button, Dropdown, Menu, Select, Tree } = mst.Ui as any
        const { TreeNode, OptionBuilder } = Tree as any
        const treeNodes = useMemo(
            () =>
                !mst.sys.tabOrTree
                    ? mst.moduleList.map(m => {
                        return (
                            <TreeNode
                                title={
                                    <span><ModuleIcon />  {mst.sys.showNameOrLabel ? m.name : m.label}</span>
                                }
                                key={m.id}
                                icon={ModuleIcon}
                            >
                                <TreeNode  key={m.id + "-models"} title="模型" selectable={false}>
                                {[...m.models.values()]
                                    .filter(model => model.filterModel() && model.type === "model")
                                    .map(model => {
                                        return (
                                            <TreeNode
                                                key={model.id}
                                                title={getTreeNodeTitle(
                                                    model,
                                                    mst,
                                                    OptionBuilder
                                                )}
                                            />
                                        )
                                    })}
                                </TreeNode>
                                <TreeNode  key={m.id + "-dicts"} title="字典" selectable={false}>
                                {[...m.models.values()]
                                    .filter(model => model.filterModel() && model.type === "dict")
                                    .map(model => {
                                        return (
                                            <TreeNode
                                                key={model.id}
                                                title={getTreeNodeTitle(
                                                    model,
                                                    mst,
                                                    OptionBuilder
                                                )}
                                            />
                                        )
                                    })}
                                </TreeNode>
                              
                            </TreeNode>
                        )
                    })
                    : [...mst.Models.values()]
                        .filter(
                            model =>
                                (!mst.sys.currentModule ||
                                    model.moduleId ===
                                    mst.sys.currentModule) &&
                                model.filterModel()
                        )
                        .map(model => {
                            return (
                                <TreeNode
                                    key={model.id}
                                    title={getTreeNodeTitle(
                                        model,
                                        mst,
                                        OptionBuilder
                                    )}
                                />
                            )
                        }),
            [
                mst.sys.tabOrTree,
                mst.moduleList,
                mst.sys.showNameOrLabel,
                mst.sys.currentModule,
                mst.sys.search //打包后没有执行，添加search确保执行
            ]
        )

        useEffect(() => { }, [mst.Ui.update])


        const {
            search,
            onExpand,
            checkAllFun,
            checkAllCancleFun,
            toggleShowNameOrLabel,
            toggleTabOrTree,
            Sys,
            changeModuleValue,
            setSearch
        } = useLocal()
        return (
            <div
                className='console-models-tree'
                style={{ height: mst.sys.height }}
            >
                <div className='header'>
                    <div className='console-erd-search'>
                        <Input
                            allowClear
                            value={search}
                            size='small'
                            onChange={e => setSearch(e.target.value)}
                            addonAfter={
                                Sys.tabOrTree && (
                                    <Select
                                        size='small'
                                        defaultValue={Sys.currentModule}
                                        value={Sys.currentModule}
                                        className='select-after'
                                        onChange={changeModuleValue}
                                    >
                                        {[
                                            <Select.Option value={''}>
                                                {intl('所有')}
                                            </Select.Option>,
                                            ...[...mst.Modules.values()].map(
                                                module => {
                                                    return (
                                                        <Select.Option
                                                            value={module.id}
                                                            key={module.id}
                                                        >
                                                            {module.label}
                                                        </Select.Option>
                                                    )
                                                }
                                            )
                                        ]}
                                    </Select>
                                )
                            }
                        />
                    </div>
                    <div className='console-erd-search btns'>
                        {mst.sys.tabOrTree && (
                            <Button
                                size='small'
                                type='text'
                                onClick={checkAllFun}
                            >
                                {intl('选择所有')}
                            </Button>
                        )}
                        {mst.sys.tabOrTree && (
                            <Button
                                size='small'
                                type='text'
                                onClick={checkAllCancleFun}
                            >
                                {intl('清除所有')}
                            </Button>
                        )}
                        {/* {!mst.sys.tabOrTree && <Button size="small" type="link" onClick={toggleTabOrTree}>{mst.sys.tabOrTree?'分类':'树形'}模式</Button>} */}
                        <Button
                            size='small'
                            type='text'
                            onClick={toggleShowNameOrLabel}
                        >
                            {intl('显示')}
                            {!mst.sys.showNameOrLabel
                                ? intl('名称')
                                : intl('标签')}
                        </Button>
                        {
                            !Sys.onlyMode && <Dropdown
                                className='right'
                                overlay={
                                    <Menu>
                                        <Menu.Item
                                            key='1'
                                            onClick={toggleTabOrTree}
                                        >
                                            {!Sys.tabOrTree
                                                ? intl('分类')
                                                : intl('树形')}{' '}
                                            {intl('模式')}
                                        </Menu.Item>
                                    </Menu>
                                }
                            >
                                <span>
                                    <EllipsisOutlined />
                                </span>
                            </Dropdown>
                        }
                    </div>
                </div>
                <div className='navitree-warp'>
                    <Scroll
                        autoHide
                        autoHeight
                        autoHideTimeout={1000}
                        autoHideDuration={200}
                        autoHeightMin={'100%'}
                        autoHeightMax={'100%'}
                    >
                        <Tree
                            showIcon={false}
                            // showIcon
                            // showLine
                            // blockNode
                            className='console-models-tree-tree'
                            onSelect={mst.sys.setCurrentModel.bind(mst.sys)}
                            selectedKeys={[mst.sys.currentModel]}
                            checkedKeys={[...mst.sys.checkedKeys]}
                            onCheck={mst.setCheckedKeys.bind(mst)}
                            checkable
                            onExpand={onExpand}
                            multiple
                            expandedKeys={[...mst.sys.expandedKeys]}
                        >
                            {treeNodes}
                        </Tree>
                    </Scroll>
                </div>
            </div>
        )
    },
    displayName: 'navi'
})

const useLocal = () => {
    const mst = useMst()
    const [text, setText] = useState(mst.sys.search)
    const [texting, setTexting] = useState(false)
    // 重复setText 导致快速输入时inputValue显示异常
    // useEffect(() => {
    //     if (!texting) debounce(() => {
    //         setText(mst.sys.search);

    //     }, 1000)()//时间设置太长导致input框未能即使更新设置值
    // }, [mst.sys.search])

    const setSearch = useCallback(
        val => {
            setTexting(true)
            setText(val)
            debounce(() => {
                mst.sys.setSearch(val)
                setTexting(false)
            }, 500)()
        },
        [mst.sys.setSearch, setText]
    )
    // const setSearch = mst.sys.setSearch;
    return {
        search: text,
        get modules() {
            return mst.moduleList
        },
        onExpand(expandedKeys: string[]) {
            mst.sys.setExpandedKeys(expandedKeys)
        },

        get expandedKeys() {
            return mst.sys.expandedKeys
        },
        checkAllFun() {
            return mst.checkAllFun()
        },
        checkAllCancleFun() {
            return mst.checkAllCancleFun()
        },
        toggleShowNameOrLabel: mst.sys.toggleShowNameOrLabel,
        toggleTabOrTree: mst.sys.toggleTabOrTree.bind(mst.sys),
        get Sys() {
            return mst.sys
        },
        changeModuleValue: mst.sys.changeModuleValue.bind(mst.sys),
        setSearch
    }
}
