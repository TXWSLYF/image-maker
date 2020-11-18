import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import sleep from '../utils/sleep';
import useRequest from './useRequest';

const TEST_ID = 'container';
const ERROR_TEXT = 'error';
const LOADING_TEXT = 'loading';

const UseRequestExample = ({ isError }: { isError: boolean }) => {
  const { data, error } = useRequest(() => {
    return new Promise<{ value: number }>((resolve, reject) => {
      if (isError) {
        reject(new Error('error'));
      } else {
        resolve({ value: 1 });
      }
    });
  });

  if (error) {
    return <div data-testid={TEST_ID}>{ERROR_TEXT}</div>;
  }

  if (!data) {
    return <div data-testid={TEST_ID}>{LOADING_TEXT}</div>;
  }

  return <div data-testid={TEST_ID}>{data.value}</div>;
};

it('useRequest hook', async () => {
  // 测试正常情况
  render(<UseRequestExample isError={false} />);

  const containerSuccess = screen.getByTestId(TEST_ID);
  expect(containerSuccess.textContent).toBe(LOADING_TEXT);

  await act(async () => {
    await sleep(100);
  });
  expect(containerSuccess.textContent).toBe('1');

  // 清空 screen
  cleanup();

  // 测试出错情况
  render(<UseRequestExample isError={true} />);
  const containerError = screen.getByTestId(TEST_ID);

  expect(containerError.textContent).toBe(LOADING_TEXT);

  await act(async () => {
    await sleep(100);
  });

  expect(containerError.textContent).toBe(ERROR_TEXT);
});
