// import { Tree } from '../../tree'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMst } from '../../context';
import { createThemeCssVariables } from '../../theme';
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
            title: <span> {root.intl('navigation.locateModel')}</span>,
            key: 1,
            click: (e) => {
              root.sys.centerCurrentModel([model.id]);
              e.stopPropagation();
            },
          },
          {
            key: 2,
            title: <span> {root.intl('navigation.viewDetails')}</span>,
            click: (e) => {
              root.sys.openModel(model.id);
              e.stopPropagation();
            },
          },
        ],
      }}
    />
  );
};

export default CreateComponent<IModelNaviProps>({
  render(_) {
    const mst = useMst();
    const intl = mst.intl;
    const webPdmUi = {
      style: createThemeCssVariables(mst.Ui.palette),
      t: mst.intl,
      theme: mst.Ui.theme,
    };
    const { Input, Button, Dropdown, Menu, Select, Tree } = mst.Ui as any;
    const { TreeNode, OptionBuilder } = Tree as any;
    const treeNodes = useMemo(
      () =>
        !mst.sys.tabOrTree
          ? mst.moduleList.map((m) => {
              return (
                <TreeNode
                  eventKey={m.id}
                  title={mst.sys.showNameOrLabel ? m.name : m.label}
                  key={m.id}
                >
                  {[...m.models.values()]
                    .filter((model) => model.filterModel())
                    .map((model) => {
                      return (
                        <TreeNode
                          eventKey={model.id}
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
                    eventKey={model.id}
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
        mst.sys.intl,
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
              aria-label={intl('navigation.searchPlaceholder')}
              allowClear
              placeholder={intl('navigation.searchPlaceholder')}
              webPdmUi={webPdmUi}
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
                    webPdmUi={webPdmUi}
                  >
                    {[
                      <Select.Option value={''}>
                        {intl('navigation.allModules')}
                      </Select.Option>,
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
                {intl('navigation.selectAll')}
              </Button>
            )}
            {mst.sys.tabOrTree && (
              <Button size="small" type="text" onClick={checkAllCancleFun}>
                {intl('navigation.clearAll')}
              </Button>
            )}
            <Button size="small" type="text" onClick={toggleShowNameOrLabel}>
              {intl(
                !mst.sys.showNameOrLabel
                  ? 'navigation.showName'
                  : 'navigation.showLabel',
              )}
            </Button>
            {!Sys.onlyMode && (
              <Dropdown
                className="right"
                webPdmUi={webPdmUi}
                overlay={
                  <Menu>
                    <Menu.Item key="1" onClick={toggleTabOrTree}>
                      {intl(
                        !Sys.tabOrTree
                          ? 'navigation.categoryMode'
                          : 'navigation.treeMode',
                      )}
                    </Menu.Item>
                  </Menu>
                }
              >
                <button aria-label={intl('tree.moreActions')} type="button">
                  <span aria-hidden="true">⋯</span>
                </button>
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
              webPdmUi={webPdmUi}
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
  const searchTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
    },
    [],
  );

  const setSearch = useCallback(
    (val) => {
      setText(val);
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
      searchTimer.current = window.setTimeout(() => {
        mst.sys.setSearch(val);
      }, 500);
    },
    [mst.sys],
  );
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
