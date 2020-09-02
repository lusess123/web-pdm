
import { Input, Button, Dropdown, Menu,Select } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons';
import { Tree } from '../../../tree'
import _ from 'lodash'
import React, { useCallback } from 'react'
import Scroll from 'react-custom-scrollbars'
import { CreateComponent, renderJson } from '../../util'
import { useMst } from '../../context'
import './style.scss'

const { TreeNode, OptionBuilder } = Tree


type IModelNaviProps = {
  modules?: [],
  model?: []
}


export default CreateComponent<IModelNaviProps>(
  {
    render(props) {
      const mst = useMst()
      const { modules, onExpand, checkAllFun, checkAllCancleFun, toggleShowNameOrLabel, toggleTabOrTree, Sys, changeModuleValue, setSearch } = useLocal()
      return <div className='console-models-tree'>
        <div className='header'>
          <div className='console-erd-search'>
            <Input allowClear value={mst.sys.search}  size="small" onChange={setSearch} addonAfter={
                Sys.tabOrTree && <Select defaultValue={Sys.currentModule} value={Sys.currentModule}  className="select-after" onChange={changeModuleValue}>
                {
                  [
                    <Option value={''}>所有</Option>,
                    ...([...mst.Modules.values()].map((module) => {
                    return  <Option value={module.id} key={module.id}>{module.label}</Option>
                    }))
                  ]
                }
              </Select>
            } />
          </div>
          <div className='console-erd-search btns'>
            {mst.sys.tabOrTree && <Button size="small" type="link" onClick={checkAllFun} >选择所有</Button>}
            {mst.sys.tabOrTree && <Button size="small" type="link" onClick={checkAllCancleFun}>清除所有</Button>}
            {/* {!mst.sys.tabOrTree && <Button size="small" type="link" onClick={toggleTabOrTree}>{mst.sys.tabOrTree?'分类':'树形'}模式</Button>} */}
            <Button size="small" type="link" onClick={toggleShowNameOrLabel}>显示{!mst.sys.showNameOrLabel?'名称':'标签'}</Button>
            {<Dropdown  className='right' overlay={<Menu>
            <Menu.Item key="1" onClick={toggleTabOrTree}>{Sys.tabOrTree?'分类':'树形'}模式</Menu.Item>
             </Menu>}>
             <Button size="small" type="link" icon={<EllipsisOutlined/>} />
            </Dropdown>}
          </div>
        </div>
        <div className='navitree-warp'>
          <Scroll autoHide autoHeight autoHideTimeout={1000} autoHideDuration={200} autoHeightMin={'100%'} autoHeightMax={'100%'} >
           <Tree className='console-models-tree-tree' onSelect={mst.sys.setCurrentModel} selectedKeys={[mst.sys.currentModel]} checkedKeys={[...mst.sys.checkedKeys]} onCheck={mst.sys.setCheckedKeys}  checkable onExpand={onExpand}  multiple  expandedKeys={[...mst.sys.expandedKeys]} >
              {
                !mst.sys.tabOrTree && mst.moduleList.map(m => {
                  return (
                    <TreeNode title={m.label} key={m.id}>
                       {[...m.models.values()].filter(model => model.filterModel() ).map(model => {
                         return  <TreeNode key={model.id} title={model.renderModelTitle()}></TreeNode>
                       })}
                    </TreeNode>
                  )
                })
              }
              {  
                mst.sys.tabOrTree && [...mst.Models.values()].filter(model=> ((!mst.sys.currentModule || model.moduleId === mst.sys.currentModule) && model.filterModel())).map(model => {
                  return  <TreeNode key={model.id} title={model.renderModelTitle()}></TreeNode>
                })
              }
            </Tree>
          
          </Scroll>
        </div>
      </div>

    },
    displayName: 'navi'
  }
)

const useLocal = () => {
  const mst = useMst()
  return {
    get modules() { 
        return mst.moduleList
      },
   onExpand(expandedKeys) {
      mst.sys.setExpandedKeys(expandedKeys)
    },

    get expandedKeys() {
      return mst.sys.expandedKeys
    },
    checkAllFun() {

    },
    checkAllCancleFun() {

    },
    toggleShowNameOrLabel() {

    },
    toggleTabOrTree : mst.sys.toggleTabOrTree,
    get Sys() {
       return mst.sys
    },
    changeModuleValue: mst.sys.changeModuleValue,
    setSearch :  useCallback( (e) =>  { mst.sys.setSearch(e.target.value ) } , []) 

  }
}
