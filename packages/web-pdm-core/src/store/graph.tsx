import { useMemo } from 'react'
import { useStore } from '.'
import { createData } from '../graph/data'

export const useGraph = () => {
    const store = useStore();


    return {
        Nodes: useMemo(() => {
            return createData(store)
        }, []),
        edges: []
    }


}