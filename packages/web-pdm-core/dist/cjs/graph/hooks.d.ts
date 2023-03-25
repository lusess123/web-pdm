import { Graph } from '@antv/g6/dist/g6.min.js';
export declare type IUseUpdateItem = {
    currentModel: string;
    graph: Graph;
    showNameOrLabel: boolean;
    zoom: number;
    checkNum: number;
    themeColor: string;
    darkness: boolean;
};
export declare const useUpdateItem: ({ currentModel, graph, showNameOrLabel, zoom, themeColor, darkness }: IUseUpdateItem) => void;
