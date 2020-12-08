/**
 * @description walk through a tree
 */
const treeWalker = (treeNodeId: IBaseLayer['id'], tree: ILayersById, callback: (id: IBaseLayer['id']) => void) => {
  const treeNode = tree[treeNodeId];
  const { id } = treeNode;

  callback(id);

  if (treeNode.type === 'GROUP') {
    treeNode.properties.children.forEach((child) => treeWalker(child, tree, callback));
  }
};

export default treeWalker;
