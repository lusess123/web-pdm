import React from 'react'
import ReactDom from 'react-dom'
import ModelTest from '../g6-test/mock/model-test'
import ModuleTest from '../g6-test/mock/module-test'
import WebPdm from '../../src'
import CodePdm from '../../../../docs/type-erd'
import { toModels, toModules } from '../g6-test/trantor/datamap'
// import TestModel from '../g6-test/trantor/mock/models-data.json'
// import TestModule from '../g6-test/trantor/mock/modules-data.json'
import TestModel from '../g6-test/trantor/gw/model.json'
import TestModule from '../g6-test/trantor/gw/module.json'
// import Models from '../g6-test/trantor/model'
// import Modules from '../g6-test/trantor/module'
// console.log(TestModel)
// console.log(TestModule)

import { Input, Button, Dropdown, Menu, Select, Tooltip, Tree, Popover } from '@terminus/nusi'
import './style.less'
const components = {
  Input, Button, Dropdown, Menu, Select, Tooltip, Tree, Popover
}

const models = toModels(TestModel.res.map( a=> a.model )).filter((a,i)=> i < 10000)
const modules = toModules(TestModule.res)

console.log(models, modules)

// alert(models.length)
//        //if() return fPre
// alert(models.length)

function confirmEnding(str, target) {
  if(str.substr(str.length-target.length,target.length)==target)
    return true;
  else 
    return false;
}

const onIgnoreEdge = (field ) => {
   return field?.typeMeta?.relationModel === 'base_User' && (confirmEnding(field.name, 'createdBy') || confirmEnding(field.name,'updatedBy')  ) 
}
ReactDom.render(
  <WebPdm 
  themeColor='green' 
  darkness={false} 
  components={components} 
  models={models} 
  modules={modules} 
  erdkey={'demo'} 
  onModelDetail={(a) => {
   alert(`打开模型${a.label}(${a.name}) 的查看链接`)
  }
  } 
  onIgnoreEdge={onIgnoreEdge} />, 
  document.getElementById('app')||document.getElementById('root')
)
