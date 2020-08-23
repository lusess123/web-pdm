import { Empty, Spin } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { CreateComponent } from '../util'
import ModelNavi from './model-navi'
import GraphPage from '../graph'

export default CreateComponent({
    displayName: 'page',
    render(props: any) {
        return <div className='console-g6-page'>
            <div className='console-erd-fps' />
            <div className='g6-modelnavi'>
                <ModelNavi />
            </div>
            <div className='g6-graph'>
                {/* <Spin tip='layout...'>
                    <Empty style={{ textAlign: 'center' }} description='正在绘制模型图...' />
                </Spin> */}
                <GraphPage />
            </div>
        </div>
    }
})
