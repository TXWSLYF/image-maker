import React, { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useToggle } from 'react-use';
import { ReactComponent as ArrowUpSvg } from 'src/assets/svg/arrowUp.svg';
import { ReactComponent as ArrowDownSvg } from 'src/assets/svg/arrowDown.svg';
import styles from './index.module.scss';

type MyInputNumberProps = {
  value: number;
  text?: string;
  width?: number;
  onPressEnter?: (value: number) => void;
  onBlur?: (value: number) => void;
};

type Direction = 'up' | 'down';

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
      const out = Number(innerValue);
      if (event.key === 'ArrowUp') {
        if (typeof out === 'number' && !Number.isNaN(out)) {
          onPressEnter && onPressEnter(out + 1);
          setInnerValue(out + 1 + '');
        } else {
          setInnerValue(value + '');
        }
        event.preventDefault();
      }
      if (event.key === 'ArrowDown') {
        if (typeof out === 'number' && !Number.isNaN(out)) {
          onPressEnter && onPressEnter(out - 1);
          setInnerValue(out - 1 + '');
        } else {
          setInnerValue(value + '');
        }
        event.preventDefault();
      }

      if (event.key === 'Enter') {
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

  const handleMyInputNumberHandleMouseDown = useCallback(
    (direction: Direction) => {
      const out = Number(innerValue);

      switch (direction) {
        case 'up': {
          if (typeof out === 'number' && !Number.isNaN(out)) {
            onPressEnter && onPressEnter(out + 1);
            setInnerValue(out + 1 + '');
          } else {
            setInnerValue(value + '');
          }

          break;
        }
        case 'down': {
          if (typeof out === 'number' && !Number.isNaN(out)) {
            onPressEnter && onPressEnter(out - 1);
            setInnerValue(out - 1 + '');
          } else {
            setInnerValue(value + '');
          }
          break;
        }
        default: {
          break;
        }
      }
    },
    [innerValue, onPressEnter, value],
  );
  const handleMyInputNumberHandleMouseUp = useCallback(() => {}, []);

  const handleMyInputNumberHandleUpMouseDown = useCallback(() => {
    handleMyInputNumberHandleMouseDown('up');
  }, [handleMyInputNumberHandleMouseDown]);

  const handleMyInputNumberHandleDownMouseDown = useCallback(() => {
    handleMyInputNumberHandleMouseDown('down');
  }, [handleMyInputNumberHandleMouseDown]);

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
        <div className={styles.myInputNumberHandleWrap}>
          <span
            className={`${styles.myInputNumberHandle} ${styles.myInputNumberHandleUp}`}
            onMouseDown={handleMyInputNumberHandleUpMouseDown}
            onMouseUp={handleMyInputNumberHandleMouseUp}
          >
            <ArrowUpSvg />
          </span>
          <span
            className={`${styles.myInputNumberHandle} ${styles.myInputNumberHandleDown}`}
            onMouseDown={handleMyInputNumberHandleDownMouseDown}
            onMouseUp={handleMyInputNumberHandleMouseUp}
          >
            <ArrowDownSvg />
          </span>
        </div>

        {text ? <span className={styles.myInputNumberText}>{text}</span> : null}
      </div>
    );
  }, [
    handleBlur,
    handleChange,
    handleFocus,
    handleKeyDown,
    handleMyInputNumberHandleDownMouseDown,
    handleMyInputNumberHandleMouseUp,
    handleMyInputNumberHandleUpMouseDown,
    innerValue,
    isFocus,
    text,
    width,
  ]);
};

export default MyInputNumber;
