import React, { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useToggle } from 'react-use';
import styles from './index.module.scss';

type MyInputNumberProps = {
  value: number;
  text?: string;
  width?: number;
  onPressEnter?: (value: number) => void;
  onBlur?: (value: number) => void;
};

const reg = /^-?\d*(\.\d*)?$/;

const MyInputNumber = ({ onPressEnter, onBlur, value, text, width = 50 }: MyInputNumberProps) => {
  const [innerValue, setInnerValue] = useState<string>(value + '');
  const [isFocus, setIsFocus] = useToggle(false);

  useEffect(() => {
    setInnerValue(value + '');
  }, [value]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '' || value === '-') {
      setInnerValue(value);
    } else if (reg.test(value)) {
      if (value.endsWith('.') || value.startsWith('-')) {
        setInnerValue(value);
      } else {
        setInnerValue(Number(value) + '');
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // TODO:监听键盘上下箭头事件
      if (event.key === 'ArrowUp') {
        event.preventDefault();
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        const out = Number(innerValue);
        if (typeof out === 'number' && !Number.isNaN(out)) {
          onPressEnter && onPressEnter(Number(innerValue));
          setInnerValue(out + '');
        } else {
          setInnerValue(value + '');
        }
      }
    },
    [innerValue, onPressEnter, value],
  );

  const handleBlur = useCallback(() => {
    setIsFocus(false);

    const out = Number(innerValue);
    if (typeof out === 'number' && !Number.isNaN(out)) {
      onBlur && onBlur(Number(innerValue));
      setInnerValue(out + '');
    } else {
      setInnerValue(value + '');
    }
  }, [innerValue, onBlur, setIsFocus, value]);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, [setIsFocus]);

  return useMemo(() => {
    return (
      <div className={`${styles.myInputNumber} ${isFocus ? styles.myInputNumberFocus : ''}`}>
        <input
          value={innerValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            width,
          }}
        />

        {text ? <span className={styles.myInputNumberText}>{text}</span> : null}
      </div>
    );
  }, [handleBlur, handleChange, handleFocus, handleKeyDown, innerValue, isFocus, text, width]);
};

export default MyInputNumber;
