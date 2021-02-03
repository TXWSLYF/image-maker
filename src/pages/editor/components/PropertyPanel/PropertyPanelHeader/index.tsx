import React, { useMemo } from 'react';
import styles from './index.module.scss';

const PropertyPanelHeader = ({ text }: { text: string }) => {
  return useMemo(() => {
    return <header className={styles.propertyPanelHeader}>{text}</header>;
  }, [text]);
};

export default PropertyPanelHeader;
