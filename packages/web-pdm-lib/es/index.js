import React, { useEffect, useState } from 'react';
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone';
import { useMst } from './context';
import { observer } from 'mobx-react-lite';
import { Provider, createRootStore } from './context';
import MSTPage from './components';
export * from './type/config';
export const Page = observer(({ models, modules, erdkey, className, style, height }) => {
    const data = useMst();
    useEffect(() => {
        onSnapshot(data, snapshot => {
            sessionStorage.setItem('web-pdm' + erdkey, JSON.stringify(snapshot));
        });
        const localdata = sessionStorage.getItem('web-pdm' + erdkey);
        if (!localdata) {
            withoutUndo(() => data.initData(models, modules));
        }
        else {
            const sdata = JSON.parse(localdata);
            sdata.sys.height = height;
            withoutUndo(() => applySnapshot(data, sdata));
        }
    }, []);
    return React.createElement(MSTPage, { className: className, style: style });
});
const WebPDM = ({ models, modules, erdkey, className, onIgnoreEdge, style, height }) => {
    const [rootStore] = useState(() => {
        return createRootStore({
            sys: {
                height,
                onIgnoreEdge
            }
        });
    });
    return React.createElement(Provider, { value: rootStore },
        React.createElement(Page, { models: models, modules: modules, erdkey: erdkey, className: className, style: style, height: height }));
};
export default WebPDM;
