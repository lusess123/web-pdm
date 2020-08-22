import React from 'react'
import { Provider, rootStore  } from '../../src/mst/context'
import Page, { SmartTodo } from './page'

export default () => {
    return <Provider value={rootStore}>
     <Page />
    </Provider>
}