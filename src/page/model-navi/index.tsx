
import { Input, Tree } from 'antd'
import { useDispatch, useSelector } from 'dva'
import _ from 'lodash'
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Scroll from 'react-scrollbars-custom'

import { useLoadData } from '../hooks/callback'
import './style.scss'
import intl from './../../g6/util/intel'

const renderLabel = (isSpec, beforeStr, afterStr, searchValue) => {

  const greenStyle = isSpec ? { color: 'green'} : {}
  const searchStyle = {
    color: '#f50',
  }
  return (
          <span>
            <span style={greenStyle}>{beforeStr}</span>
            <span style={searchStyle}>{searchValue}</span>
            <span style={greenStyle}>{afterStr}</span>
          </span>)
}

const renderTitleGreen = (isSpec, title) => {
  const greenStyle = isSpec ? { color: 'green'} : {}
  return (
    <span style={greenStyle}>{title}</span>
  )
}

const renderTitle = (title, searchValue = '', isSpec = false) => {
  if (!searchValue) return title
  const index = title.indexOf(searchValue)
  const beforeStr = title.substr(0, index)
  const afterStr = title.substr(index + searchValue.length)
  const titleFilter = index > -1 ? renderLabel(isSpec, beforeStr, afterStr, searchValue) : renderTitleGreen(isSpec, title)
  return titleFilter
}

export interface IProps {
  namespace: any
  moduleKey: any
  getModels: any
  getModules: any
  clickModelNode: any
  toolBarCommand: any
}

const createItem = (conditionFun , createItemFun) => {
    if (conditionFun && conditionFun()) {
      const item = createItemFun()
      return [item]
    } else {
      return[]
    }
}

export default forwardRef((props: any, ref) => {
  const {
    namespace,
    getModels,
    getModules,
    clickModelNode,
    toolBarCommand,
    primaryColor,
    Pdm,
  } = props
  const {
    store,
    consoleModelsRef,
    dispatch,
  } = useLocal({
    namespace,
    getModels,
    getModules,
    clickModelNode,
    primaryColor,
  })

  const searchDispatch = useCallback(_.debounce((value) => {
    dispatch({
      type: `${namespace}/search`,
      text: value,
    })

  }, 500), [dispatch])

  const fun = (value) => {
    // console.log(e)
    setSearchText(value)
    searchDispatch(value)

   }

  const [searchText, setSearchText] = useState(store.search)

  const searchOnChange = useCallback(fun , [dispatch])

  const NaviTree = (props.Tree || Tree)
  const NaviInput = (props.Input || Input)
  const {
    TreeNode,
    OptionBuilder,
  } = NaviTree

  return useMemo(() => (
  <div className='console-models-tree tree-erd' ref={(refDiv) => {
    consoleModelsRef.current = refDiv
  }}>
    <div className='header'>

        <div className='console-erd-search'>

          <NaviInput allowClear onChange={(e) => {searchOnChange(e.target.value) }} placeholder={intl.get('模型筛选').d('模型筛选')} />
          {/* <Button className='console-erd-add' type='text' icon='plus'  onClick={() => { toolBarCommand('insertModel') }} /> */}
          </div>

          </div>
      <Scroll>
        <NaviTree className='console-models-tree-tree'  ref={ref} expandedKeys={store.expandedKeys} onCheck={(checkKeys) => {
      dispatch({
        type: `${namespace}/onCheck`,
        checkKeys,
      })
    }} onExpand={(_, {
      expanded,
      node,
    }) => {
      dispatch({
        type: `${namespace}/onExpand`,
        expanded,
        node,
      })
    }} checkable multiple selectedKeys={[store.currentModel]} onSelect={(keys , e) => {
      // clickModelNodeFun(keys[0])
      // alert()
      // alert(JSON.stringify(keys))
      dispatch({
        type: `${namespace}/currentModel`,
        model: e.node.props['data-key'],
      })

    }} checkedKeys={store.checkedKeys}>
        <TreeNode key='allmodels' title={<OptionBuilder data={{
        title: intl.get('所有模型').d('所有模型'),
      }} />}>
         {store.modules.map((module) => {
          return <TreeNode key={'module-' + module.key} title={
            <OptionBuilder data={{
              title:  renderTitle(module.name, store.search),
              options: [
                {
                  title: <span> {intl.get('移除').d('移除')}</span>,
                  click: () => {
                    toolBarCommand('click', {
                      node: 'module-' + module.key,
                      // arg: '',
                      click: 'delModule',
                    })
                  },
                },
              ],
             }} />

            }>
                {store.models.filter((m) => m.moduleKey === module.key && !m.delete).filter((m) => !store.search || m.name.indexOf(store.search) >= 0).map((m) => {
              return <TreeNode title={<OptionBuilder data={{
                title: renderTitle(m.name, store.search),
                options: [{
                  title: <span> {intl.get('定位模型').d('定位模型')}</span>,
                  click: () => {
                    toolBarCommand('centerModel', {
                      node: 'model-' + m.key,
                    })
                  },
                },
                {
                  title: <span> {intl.get('查看').d('查看')}</span>,
                  click: () => {
                    toolBarCommand('click', {
                      node: 'model-' + m.key,
                      // arg: '',
                      click: 'modelEdit',
                    })
                  },
                },
                ...createItem(() => (!!m.aggregateModelKey), () => {
                  return {
                  title: <span> {intl.get('查看聚合关系').d('查看聚合关系')}</span>,
                  click: () => {
                    toolBarCommand('click', {
                      node: 'model-' + m.key,
                      // arg: '',
                      click: 'arrangeShow',
                      arg: m.aggregateModelKey,
                    })
                  },
                  }
                }),
                {
                  title: <span> {intl.get('移除').d('移除')}</span>,
                  click: () => {
                    toolBarCommand('click', {
                      node: 'model-' + m.key,
                      // arg: '',
                      click: 'delModel',
                    })
                  },
                },
              ],
              }} />} data-key={'model-' + m.key} key={'model-' + m.key} isLeaf />
            })}
              </TreeNode>
        })}
        </TreeNode>
      </NaviTree></Scroll>
  </div>), [store.checkedKeys, store.currentModel, store.expandedKeys, store.modules, store.models, store.search])
})

const useLocal = ({
  namespace,
  getModels,
  getModules,
  clickModelNode,
  primaryColor,
}) => {
  const store = useSelector((s) => s[namespace])
  const consoleModelsRef = useRef(null)
  const dispatch = useDispatch()
  const {
    loadData,
  } = useLoadData({
    dispatch,
    namespace,
    getModels,
    getModules,
    primaryColor,
  })
  useEffect(() => {
    loadData()
  }, [])
  useEffect(() => {
    const modelsDiv = consoleModelsRef.current

    if (modelsDiv && store.currentModel) {
      const lis: any = document.querySelector(`li[data-key=\'${store.currentModel}\']`)
      if (lis && lis.offsetTop) modelsDiv.scrollTop = lis.offsetTop
    }
  }, [store.currentModel])
  const clickModelNodeFun = useCallback((key) => {
    if (clickModelNode) {
      clickModelNode(key)
    }
  }, [clickModelNode])
  return {
    store,
    consoleModelsRef,
    dispatch,
    clickModelNodeFun,
  }
}
