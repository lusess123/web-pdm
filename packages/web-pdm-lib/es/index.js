import React, { useEffect, useState } from 'react';
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone';
import { useMst } from './context';
import { observer } from 'mobx-react-lite';
import { Provider, createRootStore } from './context';
import MSTPage from './components';
export * from './type/config';
export const Page = observer(({ models, modules, erdkey, className, style, height, onIgnoreEdge }) => {
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
            withoutUndo(() => {
                applySnapshot(data, sdata);
                data.sys.setOnIgnoreEdge(onIgnoreEdge);
            });
        }
    }, []);
    return React.createElement(MSTPage, { className: className, style: style });
});
const WebPDM = (props) => {
    const [rootStore] = useState(() => {
        return createRootStore({
            sys: {
                height: props.height,
                onIgnoreEdge: props.onIgnoreEdge
            },
            components: props.components
        });
    });
    return React.createElement(Provider, { value: rootStore },
        React.createElement(Page, Object.assign({}, props)));
};
export default WebPDM;
