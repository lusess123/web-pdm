import React from 'react';
export const renderModelTitle = (title, searchValue, showNameOrLabel, originalKey) => {
    if (showNameOrLabel) {
        return renderTitle(originalKey, searchValue);
    }
    else {
        return renderTitle(title, searchValue);
    }
};
const renderLabel = (isSpec, beforeStr, afterStr, searchValue) => {
    const greenStyle = isSpec ? { color: 'green' } : {};
    const searchStyle = {
        color: '#f50',
    };
    return (React.createElement("span", null,
        React.createElement("span", { style: greenStyle }, beforeStr),
        React.createElement("span", { style: searchStyle }, searchValue),
        React.createElement("span", { style: greenStyle }, afterStr)));
};
const renderTitle = (title, searchValue = '', isSpec = false) => {
    if (!searchValue)
        return title;
    const index = title.indexOf(searchValue);
    const beforeStr = title.substr(0, index);
    const afterStr = title.substr(index + searchValue.length);
    const titleFilter = index > -1 ? renderLabel(isSpec, beforeStr, afterStr, searchValue) : renderTitleGreen(isSpec, title);
    return titleFilter;
};
const renderTitleGreen = (isSpec, title) => {
    const greenStyle = isSpec ? { color: 'green' } : {};
    return (React.createElement("span", { style: greenStyle }, title));
};
