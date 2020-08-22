
import { Input } from 'antd'
import { Tree } from '../../../tree'
import _ from 'lodash'
import React, { useState } from 'react'
import Scroll from 'react-custom-scrollbars'
import { CreateComponent, renderJson } from '../../util'
import { useMst } from '../../context'
import './style.scss'

const { TreeNode, OptionBuilder } = Tree


type IModelNaviProps = {
  modules: [],
  model: []
}


export default CreateComponent<IModelNaviProps>(
  {
    render(props) {
      const mst = useMst()
      const { modules, onExpand } = useLocal()
      return <div className='console-models-tree'>
        <div className='header'>
          <div className='console-erd-search'>
            <Input allowClear size="small" />
          </div>
        </div>
        <div className='navitree-warp'>
          <Scroll autoHide autoHeight autoHideTimeout={1000} autoHideDuration={200} autoHeightMin={'100%'} autoHeightMax={'100%'} >
           <Tree className='console-models-tree-tree' checkedKeys={[...mst.sys.checkedKeys]} onCheck={mst.sys.setCheckedKeys}  checkable onExpand={onExpand}  multiple  expandedKeys={[...mst.sys.expandedKeys]} >
              {
                mst.moduleList.map(m => {
                  return (
                    <TreeNode title={m.label} key={m.id}>
                       {[...m.models.values()].map(model => {
                         return  <TreeNode key={model.id} title={model.label}></TreeNode>
                       })}
                    </TreeNode>
                  )
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
    }
  }
}
