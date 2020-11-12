import React from 'react';
import { FileTextOutlined, FileImageOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Button, message } from 'antd';
import styles from './index.module.scss';
import { textLayer, imgLayer } from 'src/layer';
import {
  addLayer,
  selectProjectPastLength,
  selectProjectFutureLength,
  selectProject,
} from 'src/features/project/projectSlice';
import { selectCurImageId, setCurLayers } from 'src/features/editor/editorSlice';
import projectApi from 'src/api/project';

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
  const project = useSelector(selectProject);
  const curImageId = useSelector(selectCurImageId);
  const projectPastLength = useSelector(selectProjectPastLength);
  const projectFutureLength = useSelector(selectProjectFutureLength);

  const handleClickSave = async () => {
    const { id, ...data } = project;
    try {
      await projectApi.update({ id, data: JSON.stringify(data) });
      message.success('保存成功');
    } catch (error) {}
  };

  return (
    <header className={styles.topBar}>
      {/* 撤销重做按钮区 */}
      <div className={styles.undoRedo}>
        <Button
          type="primary"
          onClick={() => {
            dispatch(setCurLayers([]));
            dispatch(ActionCreators.undo());
          }}
          disabled={projectPastLength === 0}
        >
          撤销
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={() => {
            dispatch(setCurLayers([]));
            dispatch(ActionCreators.redo());
          }}
          disabled={projectFutureLength === 0}
        >
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
                dispatch(addLayer({ imageId: curImageId, layer: initialClass() }));
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
        <Button color="primary" type="primary" onClick={handleClickSave}>
          保存
        </Button>
        <Button color="primary" style={{ marginLeft: 10 }} type="primary">
          导出
        </Button>
      </div>
    </header>
  );
}

export default TopBar;
