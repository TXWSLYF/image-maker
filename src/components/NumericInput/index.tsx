import { Input } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export interface NumericInputProps {
  value: number;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  onPressEnter?: (value: string) => void;
  suffix?: React.ReactNode;
}

/**
 * @description 数字输入框
 */
const NumericInput = ({ value, style, onChange, onPressEnter, suffix }: NumericInputProps) => {
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    setInnerValue(value + '');
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(value) || value === '' || value === '-') {
        setInnerValue(value);
        onChange && onChange(value);
      }
    },
    [onChange],
  );

  const handlePressEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { value } = event.target as HTMLInputElement;
      onPressEnter && onPressEnter(value);
    },
    [onPressEnter],
  );

  return useMemo(() => {
    return (
      <Input value={innerValue} style={style} onChange={handleChange} onPressEnter={handlePressEnter} suffix={suffix} />
    );
  }, [handleChange, handlePressEnter, innerValue, style, suffix]);
};

export default NumericInput;
