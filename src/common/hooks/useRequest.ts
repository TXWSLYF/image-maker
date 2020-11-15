import { useEffect, useState } from 'react';

type fetcherFn<T> = (...args: any) => Promise<T>;

const useRequest = <T = any, Error = any>(fn: fetcherFn<T>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fn()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [fn]);

  return { data, error };
};

export default useRequest;
