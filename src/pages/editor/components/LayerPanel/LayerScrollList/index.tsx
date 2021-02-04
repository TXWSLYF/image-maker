import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reverse } from 'lodash';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { selectCurImageId, selectCurLayerIds, setCurLayers, setEchoLayerId } from 'src/features/editor/editorSlice';
import { setImageLayerIds, setLayersName } from 'src/features/project/projectUndoableSlice';
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
  // TODO: 替换图标
  GROUP: PictureIcon,
};

const LayerScrollList = ({ layers }: LayerScrollListProps) => {
  const dispatch = useDispatch();
  const curLayerIds = useSelector(selectCurLayerIds);
  const imageId = useSelector(selectCurImageId);
  const [editingNameLayerId, setEditingNameLayerId] = useState<IBaseLayer['id']>('');
  const editingTextarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingNameLayerId && editingTextarea.current) {
      editingTextarea.current.focus();
      editingTextarea.current.select();
    }
  }, [editingNameLayerId]);

  const handleClickLayerItem = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: IBaseLayer['id'], isSelected: boolean) => {
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

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const layerIds = layers.map((layer) => layer.id);
      const [removed] = layerIds.splice(result.source.index, 1);
      layerIds.splice(result.destination.index, 0, removed);

      dispatch(
        setImageLayerIds({
          imageId,
          layerIds: reverse(layerIds),
        }),
      );
    },
    [dispatch, imageId, layers],
  );

  return useMemo(() => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div className={styles.layerScrollList} ref={droppableProvided.innerRef}>
              {layers.map((layer, index) => {
                const { type, name, id } = layer;
                const SvgIcon = layerIconMap[type];
                const isActive = !!curLayerIds.find((layerId) => layerId === id);
                const isEditing = editingNameLayerId === id;

                return (
                  <Draggable key={layer.id} draggableId={layer.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <div
                          className={styles.layerItemWrap}
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
                                  ref={editingTextarea}
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
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }, [
    curLayerIds,
    editingNameLayerId,
    handleBlur,
    handleClickLayerItem,
    handleDoubleClickLayerItem,
    handleDragEnd,
    handleLayerNameChange,
    handleMouseEnter,
    handleMouseLeave,
    layers,
  ]);
};

export default LayerScrollList;
