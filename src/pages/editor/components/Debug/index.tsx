import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParam } from 'react-use';
import { selectRotateCenterCoordinate } from 'src/features/editor/editorSlice';

const Debug = () => {
  const debug = useSearchParam('debug');
  console.log(debug);
  const rotateCenterCoordinate = useSelector(selectRotateCenterCoordinate);

  return useMemo(() => {
    if (!debug) return null;

    return (
      <div
        style={{
          position: 'fixed',
          width: 4,
          height: 4,
          background: 'blue',
          left: rotateCenterCoordinate.x,
          top: rotateCenterCoordinate.y,
          zIndex: 100,
        }}
      ></div>
    );
  }, [debug, rotateCenterCoordinate.x, rotateCenterCoordinate.y]);
};

export default Debug;
