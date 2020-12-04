export interface ITreeNode {
  id: string;
  properties: {
    children?: ITreeNode['id'][];
  };
}

export interface ITree {
  [key: string]: ITreeNode;
}

/**
 * @description walk through a tree
 */
const treeWalker = (treeNodeId: ITreeNode['id'], tree: ITree, callback: (id: ITreeNode['id']) => void) => {
  const {
    id,
    properties: { children },
  } = tree[treeNodeId];
  callback(id);

  children && children.forEach((id) => treeWalker(id, tree, callback));
};

export default treeWalker;
