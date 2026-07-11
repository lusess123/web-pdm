import { debounce } from 'lodash-es';

// import { Tree } from '../../tree'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMst } from '../../context';
import { RootInstance } from '../../type';
import { TModel } from '../../type/model';
import { CreateComponent } from '../../util';
import './style.scss';
// import mst from '@antv/g6/lib/algorithm/mst';

type IModelNaviProps = {
  modules?: [];
  model?: [];
};

const getTreeNodeTitle = (
  model: TModel,
  root: RootInstance,
  OptionBuilder: any,
) => {
  return (
    <OptionBuilder
      data={{
        title: root.renderModelTitle(model),

        options: [
          {
            title: <span> {root.intl('定位模型')}</span>,
            key: 1,
            click: (e) => {
              root.sys.centerCurrentModel([model.id]);
              e.stopPropagation();
            },
          },
          {
            key: 2,
            title: <span> {root.intl('查看')}</span>,
            click: (e) => {
              root.sys.openModel(model.id);
              e.stopPropagation();
            },
          },
          // {
          //   title: <span> {intlLiteral('移除')}</span>
          // },
        ],
      }}
    />
  );
};

export default CreateComponent<IModelNaviProps>({
  render(_) {
    const mst = useMst();
    const intl = mst.intl;
    const { Input, Button, Dropdown, Menu, Select, Tree } = mst.Ui as any;
    const { TreeNode, OptionBuilder } = Tree as any;
    const treeNodes = useMemo(
      () =>
        !mst.sys.tabOrTree
          ? mst.moduleList.map((m) => {
              return (
                <TreeNode
                  title={mst.sys.showNameOrLabel ? m.name : m.label}
                  key={m.id}
                >
                  {[...m.models.values()]
                    .filter((model) => model.filterModel())
                    .map((model) => {
                      return (
                        <TreeNode
                          key={model.id}
                          title={getTreeNodeTitle(model, mst, OptionBuilder)}
                        />
                      );
                    })}
                </TreeNode>
              );
            })
          : [...mst.Models.values()]
              .filter(
                (model) =>
                  (!mst.sys.currentModule ||
                    model.moduleId === mst.sys.currentModule) &&
                  model.filterModel(),
              )
              .map((model) => {
                return (
                  <TreeNode
                    key={model.id}
                    title={getTreeNodeTitle(model, mst, OptionBuilder)}
                  />
                );
              }),
      [
        mst.sys.tabOrTree,
        mst.moduleList,
        mst.sys.showNameOrLabel,
        mst.sys.currentModule,
        mst.sys.search, //打包后没有执行，添加search确保执行
      ],
    );

    useEffect(() => {}, [mst.Ui.update]);

    const {
      search,
      onExpand,
      checkAllFun,
      checkAllCancleFun,
      toggleShowNameOrLabel,
      toggleTabOrTree,
      Sys,
      changeModuleValue,
      setSearch,
    } = useLocal();
    return (
      <div className="console-models-tree" style={{ height: mst.sys.height }}>
        <div className="header">
          <div className="console-erd-search">
            <Input
              allowClear
              value={search}
              size="small"
              onChange={(e) => setSearch(e.target.value)}
              addonAfter={
                Sys.tabOrTree && (
                  <Select
                    size="small"
                    defaultValue={Sys.currentModule}
                    value={Sys.currentModule}
                    className="select-after"
                    onChange={changeModuleValue}
                  >
                    {[
                      <Select.Option value={''}>{intl('所有')}</Select.Option>,
                      ...[...mst.Modules.values()].map((module) => {
                        return (
                          <Select.Option value={module.id} key={module.id}>
                            {module.label}
                          </Select.Option>
                        );
                      }),
                    ]}
                  </Select>
                )
              }
            />
          </div>
          <div className="console-erd-search btns">
            {mst.sys.tabOrTree && (
              <Button size="small" type="text" onClick={checkAllFun}>
                {intl('选择所有')}
              </Button>
            )}
            {mst.sys.tabOrTree && (
              <Button size="small" type="text" onClick={checkAllCancleFun}>
                {intl('清除所有')}
              </Button>
            )}
            {/* {!mst.sys.tabOrTree && <Button size="small" type="link" onClick={toggleTabOrTree}>{mst.sys.tabOrTree?'分类':'树形'}模式</Button>} */}
            <Button size="small" type="text" onClick={toggleShowNameOrLabel}>
              {intl('显示')}
              {!mst.sys.showNameOrLabel ? intl('名称') : intl('标签')}
            </Button>
            {!Sys.onlyMode && (
              <Dropdown
                className="right"
                overlay={
                  <Menu>
                    <Menu.Item key="1" onClick={toggleTabOrTree}>
                      {!Sys.tabOrTree ? intl('分类') : intl('树形')}{' '}
                      {intl('模式')}
                    </Menu.Item>
                  </Menu>
                }
              >
                <span>
                  <span aria-hidden="true">⋯</span>
                </span>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="navitree-warp">
          <div className="navitree-scroll">
            <Tree
              showIcon={false}
              className="console-models-tree-tree"
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
          </div>
        </div>
      </div>
    );
  },
  displayName: 'navi',
});

const useLocal = () => {
  const mst = useMst();
  const [text, setText] = useState(mst.sys.search);
  // 重复setText 导致快速输入时inputValue显示异常
  // useEffect(() => {
  //     if (!texting) debounce(() => {
  //         setText(mst.sys.search);

  //     }, 1000)()//时间设置太长导致input框未能即使更新设置值
  // }, [mst.sys.search])

  const setSearch = useCallback(
    (val) => {
      setText(val);
      debounce(() => {
        mst.sys.setSearch(val);
      }, 500)();
    },
    [mst.sys.setSearch, setText],
  );
  // const setSearch = mst.sys.setSearch;
  return {
    search: text,
    get modules() {
      return mst.moduleList;
    },
    onExpand(expandedKeys: string[]) {
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
    setSearch,
  };
};
