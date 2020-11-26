import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurLayerIds, setCurLayers } from 'src/features/editor/editorSlice';
import { ReactComponent as TextIcon } from 'src/assets/svg/text.svg';
import { ReactComponent as PictureIcon } from 'src/assets/svg/picture.svg';
import styles from './index.module.scss';

export interface LayerScrollListProps {
  layers: ILayer[];
}

const layerIconMap: Record<
  IBaseLayer['type'],
  React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >
> = {
  TEXT: TextIcon,
  IMG: PictureIcon,
};

const LayerScrollList = ({ layers }: LayerScrollListProps) => {
  const dispatch = useDispatch();
  const curLayerIds = useSelector(selectCurLayerIds);
  const handleClickLayerItem = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: IBaseLayer['id'], isSelected: boolean) => {
      if (e.metaKey) {
        if (isSelected) {
          dispatch(setCurLayers(curLayerIds.filter((layerId) => layerId !== id)));
        } else {
          dispatch(setCurLayers(curLayerIds.concat(id)));
        }
      } else {
        dispatch(setCurLayers(id));
      }
    },
    [curLayerIds, dispatch],
  );

  return useMemo(() => {
    return (
      <div className={styles.layerScrollList}>
        <ul>
          {layers.map((layer) => {
            const { type, name, id } = layer;
            const SvgIcon = layerIconMap[type];
            const isActive = !!curLayerIds.find((layerId) => layerId === id);

            return (
              <li
                key={layer.id}
                onClick={(e) => {
                  handleClickLayerItem(e, id, isActive);
                }}
              >
                <div className={`${styles.layerItem} ${isActive ? styles.active : ''}`}>
                  <div className={styles.layerItemIcon}>
                    <SvgIcon />
                  </div>
                  <div className={styles.layerItemName}>{name}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [curLayerIds, handleClickLayerItem, layers]);
};

export default LayerScrollList;
