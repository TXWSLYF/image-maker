import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from 'src/components/Tooltip';
import { ReactComponent as AddSvg } from 'src/assets/svg/add.svg';
import { addPage } from 'src/features/project/projectSlice';
import styles from './index.module.scss';

const PageListHeader = () => {
  const dispatch = useDispatch();
  const handleAddPage = useCallback(() => {
    dispatch(addPage());
  }, []);

  return useMemo(() => {
    return (
      <div className={styles.pageListHeader}>
        <Tooltip title={'页面'} placement="top">
          <AddSvg onClick={handleAddPage} />
        </Tooltip>
      </div>
    );
  }, []);
};

export default PageListHeader;
