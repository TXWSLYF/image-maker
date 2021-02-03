import React, { useState } from 'react';
import { Tree } from 'antd';
import MyInputNumber from 'src/components/MyInputNumber';

const treeData = [
  {
    title: '群组',
    key: '0c91976554d6',
    children: [
      { title: '我看你是一点也不懂', key: '1860566566f1' },
      {
        title: '图片4',
        key: 'c66b9ba2382a',
        children: [
          { title: 'akua', key: '52b018d6602ed' },
          { title: '图片1', key: '9367337be3ed9c' },
        ],
      },
    ],
  },
  { title: 'akua', key: '52b08d6602ed' },
  { title: '图片1', key: '93677be3ed9c' },
  { title: '图片2', key: 'dbd4dfce164e' },
];

function PlayPage() {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [val] = useState(0);

  const onExpand = (expandedKeys: React.Key[]) => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
  };

  const onSelect = (selectedKeys: React.Key[]) => {
    setSelectedKeys(selectedKeys);
  };

  return (
    <div
      style={{
        marginLeft: 100,
      }}
    >
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />

      <MyInputNumber text="X" value={val} />
    </div>
  );
}

export default PlayPage;
