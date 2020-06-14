import React, { useReducer } from 'react'
import ReactDom from 'react-dom'
import { PageModel } from '../../src/hook'

const PageComp = () => {
    const { state  } = PageModel.useContainer()
    return <div>{JSON.stringify(state)}</div>
}

const PageRender = (PageCompp = PageComp) => <div>
  <PageModel.Provider>
      <PageCompp />
  </PageModel.Provider>
</div>

export default (PageCompp) => {
    ReactDom.render(PageRender(PageCompp), document.getElementById("app"))
}

