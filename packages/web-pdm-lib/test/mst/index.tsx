import React from 'react'
import ReactDom from 'react-dom'
import ModelTest from '../g6-test/mock/model-test'
import ModuleTest from '../g6-test/mock/module-test'
import WebPdm from '../../src'
import CodePdm from '../../../../docs/type-erd'
import { toModels, toModules } from '../g6-test/trantor/datamap'
const models = toModels()
const modules = toModules()
import { Input, Button, Dropdown, Menu, Select, Tooltip, Tree } from '@terminus/nusi'
import './style.less'
const components = {
  // Input, Button, Dropdown, Menu, Select, Tooltip, Tree
}

// alert(models.length)
//        //if() return fPre

function confirmEnding(str, target) {
  // 请把你的代码写在这里
  if(str.substr(str.length-target.length,target.length)==target)
    return true;
  else 
    return false;
}

const onIgnoreEdge = (field ) => {
   return field?.typeMeta?.relationModel === 'base_User' && (confirmEnding(field.name, 'createdBy') || confirmEnding(field.name,'updatedBy')  ) 
}
ReactDom.render(
  <WebPdm components={components} models={models} modules={modules} erdkey={'demo'} onIgnoreEdge={onIgnoreEdge} />, 
  document.getElementById('app')||document.getElementById('root')
)
