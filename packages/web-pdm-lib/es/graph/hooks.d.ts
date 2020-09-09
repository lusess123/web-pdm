import { Graph } from '@antv/g6';
export declare type IUseUpdateItem = {
    currentModel: string;
    graph: Graph;
    showNameOrLabel: boolean;
    zoom: number;
};
export declare const useUpdateItem: ({ currentModel, graph, showNameOrLabel, zoom }: IUseUpdateItem) => void;
