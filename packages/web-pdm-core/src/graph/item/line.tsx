import G6 from '@antv/g6'
export default () => {
    G6.registerEdge(
        'console-line',
        {
            labelAutoRotate: true,
            label: 'cubic-vertical',
        },
        'line'
    )

    G6.registerEdge(
        'console-arrange-line',
        {
            labelAutoRotate: true
        },
        'line'
    )
}
