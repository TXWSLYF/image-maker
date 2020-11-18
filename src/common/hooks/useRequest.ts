import { useEffect, useRef, useState } from 'react';

export type FetcherFn<T> = (...args: any) => Promise<T>;

const useRequest = <T = any, Error = any>(fn: FetcherFn<T>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const savedFetcherFn = useRef(fn);

  useEffect(() => {
    savedFetcherFn.current = fn;
  }, [fn]);

  useEffect(() => {
    savedFetcherFn
      .current()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return { data, error };
};

export default useRequest;
