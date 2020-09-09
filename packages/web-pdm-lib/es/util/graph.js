export const toCenter = (item, graph) => {
    if (!item)
        return;
    graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
        node.getContainer().show();
    });
    graph.zoomTo(0.8);
    graph.focusItem(item);
    // 聚焦当前点击的节点（把节点放到视口中心）
    let matrix = item.get('group').getMatrix();
    let point = {
        x: matrix[6],
        y: matrix[7],
    };
    let width = graph.get('width');
    let height = graph.get('height'); // 找到视口中心
    const itemHight = item.getKeyShape().attr('height');
    const graphHeight = height / 2;
    graph.translate(0, (-graphHeight + itemHight / 2 + 120));
};
