import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurLayerIds, setCurLayers, setEchoLayerId } from 'src/features/editor/editorSlice';
import { ReactComponent as TextIcon } from 'src/assets/svg/text.svg';
import { ReactComponent as PictureIcon } from 'src/assets/svg/picture.svg';
import { setLayersName } from 'src/features/project/projectSlice';
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
  const [editingNameLayerId, setEditingNameLayerId] = useState<IBaseLayer['id']>('');
  const handleClickLayerItem = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: IBaseLayer['id'], isSelected: boolean) => {
      // TODO:判断图层是否在人眼可视范围内，不在的话将图层移动至画布中间
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
  const handleDoubleClickLayerItem = useCallback((id: IBaseLayer['id']) => {
    setEditingNameLayerId(id);
  }, []);

  const handleMouseEnter = useCallback(
    (id: IBaseLayer['id']) => {
      dispatch(setEchoLayerId(id));
    },
    [dispatch],
  );
  const handleMouseLeave = useCallback(
    (id: IBaseLayer['id']) => {
      dispatch(setEchoLayerId(''));
    },
    [dispatch],
  );

  const handleBlur = useCallback(() => {
    setEditingNameLayerId('');
  }, []);

  const handleLayerNameChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>, id: IBaseLayer['id']) => {
      dispatch(
        setLayersName({
          ids: [id],
          name: e.target.value,
        }),
      );
    },
    [dispatch],
  );

  return useMemo(() => {
    return (
      <div className={styles.layerScrollList}>
        <ul>
          {layers.map((layer) => {
            const { type, name, id } = layer;
            const SvgIcon = layerIconMap[type];
            const isActive = !!curLayerIds.find((layerId) => layerId === id);
            const isEditing = editingNameLayerId === id;

            return (
              <li
                key={layer.id}
                onClick={(e) => {
                  handleClickLayerItem(e, id, isActive);
                }}
                onDoubleClick={() => {
                  handleDoubleClickLayerItem(id);
                }}
                onMouseEnter={() => {
                  handleMouseEnter(id);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(id);
                }}
              >
                <div className={`${styles.layerItem} ${isActive ? styles.active : ''}`}>
                  <div className={styles.layerItemIcon}>
                    <SvgIcon />
                  </div>
                  <div className={`${styles.layerItemName} ${isEditing ? styles.isEditing : ''}`}>
                    {isEditing ? (
                      <textarea
                        value={name}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleLayerNameChange(e, id);
                        }}
                      />
                    ) : (
                      name
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [
    curLayerIds,
    editingNameLayerId,
    handleBlur,
    handleClickLayerItem,
    handleDoubleClickLayerItem,
    handleLayerNameChange,
    handleMouseEnter,
    handleMouseLeave,
    layers,
  ]);
};

export default LayerScrollList;
