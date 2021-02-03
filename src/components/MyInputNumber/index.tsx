import React, { useCallback, useRef } from 'react';
import { useMemo } from 'react';
import { useToggle } from 'react-use';
import styles from './index.module.scss';

type MyInputNumberProps = {
  text?: string;
  width?: number;
};

const MyInputNumber = ({ text, width = 50 }: MyInputNumberProps) => {
  const [isFocus, setIsFocus] = useToggle(false);
  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, [setIsFocus]);
  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, [setIsFocus]);

  return useMemo(() => {
    return (
      <div className={styles.myInputNumber}>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width,
          }}
        />
        {!isFocus && text ? <label className={styles.myInputNumberText}>{text}</label> : null}
      </div>
    );
  }, [handleBlur, handleFocus, isFocus, text, width]);
};

export default MyInputNumber;
