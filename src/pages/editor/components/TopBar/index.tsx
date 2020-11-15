import React from 'react';
import TopBarLeft from './components/TopBarLeft';
import TopBarCenter from './components/TopBarCenter';
import TopBarRight from './components/TopBarRight';
import styles from './index.module.scss';

const TopBar = React.memo(() => {
  return (
    <header className={styles.topBar}>
      <TopBarLeft />
      <TopBarCenter />
      <TopBarRight />
    </header>
  );
});

export default TopBar;
