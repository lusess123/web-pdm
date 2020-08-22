import React, { useState, isValidElement, useEffect } from 'react'
import { useMst } from '../../src/mst/context'
import { observer, useLocalStore, useObserver } from 'mobx-react-lite'
import { CreateComponent, renderJson } from '../../src/mst/util'
import ModelTest from '../g6-test/mock/model-test'
import ModuleTest from '../g6-test/mock/module-test'
import Page from '../../src/mst/components'


export default observer(() => {
  const data = useMst()
  useEffect(() => {
    data.init({ modelData: ModelTest, moduleData: ModuleTest })
  }, [])
  return  [...data.Modules.values()].length && <Page />
})
