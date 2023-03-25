import { Dropdown, Menu, Tree as AntTree } from 'antd'
import React, { useState, useCallback } from 'react'
// import 'antd/dist/antd.less'
import './style.scss'
// const click = () => alert()
const OptionBuilder = ({ data }) => {
    const { title, options = [] } = data
    const [showMenu, setShowMenu] = useState(false)
    const onShowMenu = useCallback(
        val => () => {
            setShowMenu(val)
        },
        []
    )

    const menu = (
        <Menu>
            {options.map(option => {
                return (
                    <Menu.Item key={option}>
                        <a onClick={option.click}>{option.title}</a>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
    return (
        <div
            className='tree-node-title'
            onMouseEnter={onShowMenu(true)}
            
            // onMouseLeave={onShowMenu(false)}
        >
            <span className='tree-node-title-title'>{title}</span>
            {!!options.length && showMenu && (
                <Dropdown overlay={menu}>
                    <span className='tree-node-title-options'>...</span>
                </Dropdown>
            )}
        </div>
    )
}
// alert()
AntTree['OptionBuilder'] = OptionBuilder

export const Tree: any = AntTree
