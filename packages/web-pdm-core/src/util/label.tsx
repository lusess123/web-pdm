import React from 'react'

export const renderModelTitle = (
    title: string,
    searchValue: string,
    showNameOrLabel: boolean,
    originalKey: string
) => {
    if (showNameOrLabel) {
        return renderTitle(originalKey, searchValue)
    } else {
        return renderTitle(title, searchValue)
    }
}

const renderLabel = (
    isSpec: boolean,
    beforeStr: string,
    afterStr: string,
    searchValue: string
) => {
    const greenStyle = isSpec ? { color: 'green' } : {}
    const searchStyle = {
        color: '#f50'
    }
    return (
        <span>
            <span style={greenStyle}>{beforeStr}</span>
            <span style={searchStyle}>{searchValue}</span>
            <span style={greenStyle}>{afterStr}</span>
        </span>
    )
}

const renderTitle = (title: string, searchValue = '', isSpec = false) => {
    if (!searchValue) return title
    const index = title.indexOf(searchValue)
    const beforeStr = title.substr(0, index)
    const afterStr = title.substr(index + searchValue.length)
    const titleFilter =
        index > -1
            ? renderLabel(isSpec, beforeStr, afterStr, searchValue)
            : renderTitleGreen(isSpec, title)
    return titleFilter
}

const renderTitleGreen = (isSpec: boolean, title: string) => {
    const greenStyle = isSpec ? { color: 'green' } : {}
    return <span style={greenStyle}>{title}</span>
}
