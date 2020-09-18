
import React, { useEffect } from 'react'
import classnames from 'classnames'
import { CreateComponent } from '../util'
import ModelNavi from './model-navi'
import GraphPage from '../graph'
import { useMst } from '../context'

export type IPagePros = {
    style ?: any ,
    className? : string
    height?: number
}


export default CreateComponent<IPagePros>({
    displayName: 'page',
    render(props) {
        const mst = useMst()
        
        // alert( mst.sys.height)
        // debugger
        return <div className={classnames('console-g6-page',props.className )} style={{height: mst.sys.height}} >
            <div className='console-erd-fps' />
            <div className='g6-modelnavi'>
                <ModelNavi />
            </div>
            <div className='g6-graph'>
                <GraphPage  />
            </div>
        </div>
    }
})
