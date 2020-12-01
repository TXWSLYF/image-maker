import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTopBarHeight } from 'src/features/editor/editorSlice';
import TopBarLeft from './components/TopBarLeft';
import TopBarCenter from './components/TopBarCenter';
import TopBarRight from './components/TopBarRight';
import styles from './index.module.scss';

const TopBar = React.memo(() => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      dispatch(setTopBarHeight(height));
    }
  }, [dispatch]);

  return (
    <header className={styles.topBar} ref={ref}>
      <TopBarLeft />
      <TopBarCenter />
      <TopBarRight />
    </header>
  );
});

export default TopBar;
