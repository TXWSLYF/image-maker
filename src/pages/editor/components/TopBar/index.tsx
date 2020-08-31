import React from 'react';
import { FileTextOutlined, FileImageOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { textLayer, imgLayer } from '../../../../layer';
import styles from './index.module.scss';
import { addLayer } from '../../../../features/project/projectSlice';

const layerList = [
  {
    name: '文字',
    initialClass: textLayer,
    Icon: FileTextOutlined,
  },
  {
    name: '图片',
    initialClass: imgLayer,
    Icon: FileImageOutlined,
  },
];

function TopBar() {
  const dispatch = useDispatch();

  return (
    <header className={styles.topBar}>
      {/* 撤销重做按钮区 */}
      <div className={styles.undoRedo}>
        <Button color="primary" variant="outlined">
          撤销
        </Button>
        <Button color="primary" variant="outlined" style={{ marginLeft: 10 }}>
          重做
        </Button>
      </div>

      {/* 组件选项区 */}
      <div className={styles.layerList}>
        {layerList.map(({ name, initialClass, Icon }) => {
          return (
            <div
              className={styles.layerItem}
              key={name}
              onClick={() => {
                dispatch(addLayer(initialClass()));
              }}
            >
              <Icon style={{ fontSize: 35 }} />
              <div className={styles.layerItemName}>{name}</div>
            </div>
          );
        })}
      </div>

      {/* 操作区 */}
      <div className={styles.operations}>
        <Button color="primary" variant="outlined">
          保存
        </Button>
        <Button color="primary" variant="outlined" style={{ marginLeft: 10 }}>
          导出
        </Button>
      </div>
    </header>
  );
}

export default TopBar;