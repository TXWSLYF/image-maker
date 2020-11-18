import React, { useCallback, useRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import useClickAway from './useClickAway';

const UseClickAwayExample = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const handleClickAway = useCallback(() => {
    setCount((count) => count + 1);
  }, [setCount]);

  useClickAway(ref, handleClickAway);

  return (
    <div style={{ width: 400, height: 400 }}>
      <div data-testid="count">{count}</div>
      <div data-testid="target" style={{ width: 200, height: 200 }} ref={ref}></div>
    </div>
  );
};

it('useClickAway hook', () => {
  render(<UseClickAwayExample />);

  const count = screen.getByTestId('count');

  // 初始 count 为 0
  expect(count.textContent).toBe('0');

  act(() => {
    userEvent.click(count);
  });
  // 预期此时 count 为 1
  expect(count.textContent).toBe('1');

  act(() => {
    userEvent.click(count);
    userEvent.click(count);
  });
  // 预期此时 count 为 3
  expect(count.textContent).toBe('3');
});
