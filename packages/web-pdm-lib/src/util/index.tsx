import React, { SFC, createContext, useContext, isValidElement } from 'react'
import { observer, useObserver, Observer, useLocalStore } from 'mobx-react-lite'

export interface IComponentOptions<T> {
     setup : SFC<T>,
     displayName?: string
}
export interface IComponent {
    <T>(options:IComponentOptions<T>) : SFC<T>
}

export const defineComponent : IComponent = ({ setup, displayName }) =>  { setup.displayName = displayName  ; return setup ;} 

export const ObComponent: IComponent = ({ setup, displayName } ) => {
    // const useSetUp = setup
    // const render = () => {
    //    return <
    // }
    return observer(defineComponent({ setup, displayName }))
}

export interface IComponentCreateOptions<T> {
     useLocal?: any ,
     useSetup? : any ,
     render :  SFC<T>,
     displayName?: string

}
export interface IComponentCreate {
  <T>(options:IComponentCreateOptions<T>) : SFC<T>
}

export const CreateComponent: IComponentCreate = ({ useLocal, useSetup, render, displayName }) =>  {
     const Render = observer(render)
    //  const Render = render
    //  const setUp = useSetup
    //  const useLocalState = (props) => {
    //      return useLocalStore(setUp, props)
    //  }
     const finnalRender = Render
     finnalRender.displayName = displayName
     return finnalRender
}


export const json = (obj, replacer?, space?) => {
    const _replacer = replacer || null;
  
    const _space = space || 2;
  
    return JSON.stringify(obj, _replacer, _space);
  };
  
  const handleCircular = () => {
    const cache : any[] = [];
    const keyCache: any[] = [];
    return (key :any , value: any) => {
      if (typeof value === 'object' && value !== null) {
          if(isValidElement(value)) {
              return reactString(value)
          }
        const index = cache.indexOf(value);
  
        if (index !== -1) {
          return `[Circular ${keyCache[index]}]`;
        }
  
        cache.push(value);
        keyCache.push(key || 'root');
      }
  
      return value;
    };
  };
  
  export const renderJson = (value: any , replacer? :any , space?: any) => {
    const _replacer = replacer || handleCircular();
  
    const _json = JSON.stringify(value, _replacer, space);
  
    const _res = JSON.parse(_json);
  
    return <pre><code>{json(_res)}</code></pre>;
  };


  export function mapToArrary<T>(mapObj: Map<string,T>) {
      return  [ ...mapObj.values()]

  }

  export const intlLiteral = (text: string) => {
     return text
  }

  export const changeTwoDecimal_f = (x) => {
    　　let f_x = parseFloat(x)
    　　if (isNaN(f_x)) {
    　　　　return 0
    　　}
      f_x = Math.round(x * 100) / 100
    　　let s_x = f_x.toString()
    　　let pos_decimal = s_x.indexOf('.')
    　　if (pos_decimal < 0) {
    　　　　pos_decimal = s_x.length
    　　  s_x += '.'
    　　}
    　　while (s_x.length <= pos_decimal + 2) {
    　　　　s_x += '0'
    　　}
      if(s_x >= 100) return 100
    　　return s_x
    }