import { RefObject, useEffect, useRef } from 'react';

/**
 * @description 注意这里的 event 不能是 click
 */
const defaultEvents = ['mousedown', 'touchstart'];

const useClickAway = <E extends Event = Event>(ref: RefObject<HTMLElement | null>, onClickAway: (event: E) => void) => {
  const savedOnClickAway = useRef(onClickAway);

  useEffect(() => {
    savedOnClickAway.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event: any) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedOnClickAway.current(event);
    };

    defaultEvents.forEach((event) => {
      document.addEventListener(event, handler);
    });

    return () => {
      defaultEvents.forEach((event) => {
        document.removeEventListener(event, handler);
      });
    };
  }, [ref]);
};

export default useClickAway;
