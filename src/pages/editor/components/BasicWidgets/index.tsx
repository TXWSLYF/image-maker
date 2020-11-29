import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'src/components/Tooltip';
import {
  selectCurImageId,
  selectIsLeftPanelVisible,
  setBasicWidgetsPanelWidth,
  setIsLeftPanelVisible,
} from 'src/features/editor/editorSlice';
import { addLayer } from 'src/features/project/projectUndoableSlice';
import { imgLayer, textLayer } from 'src/layer';
import { ReactComponent as TextSvg } from 'src/assets/svg/text.svg';
import { ReactComponent as PictureSvg } from 'src/assets/svg/picture.svg';
import { ReactComponent as DobuleLeftSvg } from 'src/assets/svg/dobuleLeft.svg';
import styles from './index.module.scss';

// 基础组件配置列表
const basicWidgets = [
  {
    name: '文字',
    initialClass: textLayer,
    SvgComponent: TextSvg,
    hotkey: 'T',
  },
  {
    name: '图片',
    initialClass: imgLayer,
    SvgComponent: PictureSvg,
  },
];

const BasicWidgets = () => {
  const dispatch = useDispatch();
  const curImageId = useSelector(selectCurImageId);
  const isLeftPanelVisible = useSelector(selectIsLeftPanelVisible);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      dispatch(setBasicWidgetsPanelWidth(width));
    }
  }, [dispatch]);

  // 添加图层
  const handleAddLayer = useCallback(
    (initialClass) => {
      dispatch(addLayer({ imageId: curImageId, layer: initialClass() }));
    },
    [dispatch, curImageId],
  );

  // 切换页面列表收起展开状态
  const handleSetIsLeftPanelVisible = useCallback(() => {
    dispatch(setIsLeftPanelVisible(!isLeftPanelVisible));
  }, [dispatch, isLeftPanelVisible]);

  const toolTipTitle = isLeftPanelVisible ? '收起' : '展开';
  const rotateDeg = isLeftPanelVisible ? 0 : 180;

  return useMemo(() => {
    return (
      <div className={styles.basicWidgets} ref={ref}>
        <ul>
          {basicWidgets.map((basicWidget) => {
            const { name, initialClass, SvgComponent } = basicWidget;

            return (
              <li
                key={name}
                onClick={() => {
                  handleAddLayer(initialClass);
                }}
              >
                <SvgComponent />
              </li>
            );
          })}
        </ul>

        <div className={styles.navFooter}>
          <Tooltip placement="right" title={toolTipTitle} align={{ offset: [5, 0] }}>
            <div className={styles.iconWrapper} onClick={handleSetIsLeftPanelVisible}>
              <DobuleLeftSvg style={{ transform: `rotate(${rotateDeg}deg)` }} />
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }, [handleAddLayer, handleSetIsLeftPanelVisible, toolTipTitle, rotateDeg]);
};

export default BasicWidgets;
