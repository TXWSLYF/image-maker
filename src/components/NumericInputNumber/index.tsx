import React, { useCallback, useEffect, useMemo, useState } from 'react';

export interface NumericInputNumberProps {
  value: number;
  style?: React.CSSProperties;
  onPressEnter?: (value: number) => void;
  onBlur?: (value: number) => void;
}

// const reg = /^-?\d{1,}(\.\d*)?$/;
const reg = /^-?\d*(\.\d*)?$/;

// TODO:抽离数字校验逻辑，增加组件单元测试
const NumericInputNumber = ({ value, style, onPressEnter, onBlur }: NumericInputNumberProps) => {
  const [innerValue, setInnerValue] = useState<string>(value + '');

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
    const out = Number(innerValue);
    if (typeof out === 'number' && !Number.isNaN(out)) {
      onBlur && onBlur(Number(innerValue));
      setInnerValue(out + '');
    } else {
      setInnerValue(value + '');
    }
  }, [innerValue, onBlur, value]);

  return useMemo(() => {
    return (
      <div className="ant-input-number" style={style}>
        {/* TODO: */}
        {/* <div className="ant-input-number-handler-wrap">
          <span
            unselectable="on"
            role="button"
            aria-label="Increase Value"
            className="ant-input-number-handler ant-input-number-handler-up"
          >
            <span role="img" aria-label="up" className="anticon anticon-up ant-input-number-handler-up-inner">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="up"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
              </svg>
            </span>
          </span>
          <span
            unselectable="on"
            role="button"
            aria-label="Decrease Value"
            className="ant-input-number-handler ant-input-number-handler-down"
          >
            <span role="img" aria-label="down" className="anticon anticon-down ant-input-number-handler-down-inner">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="down"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
          </span>
        </div> */}

        <div className="ant-input-number-input-wrap">
          <input
            className="ant-input-number-input"
            value={innerValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
      </div>
    );
  }, [handleBlur, handleChange, handleKeyDown, innerValue, style]);
};

export default NumericInputNumber;
