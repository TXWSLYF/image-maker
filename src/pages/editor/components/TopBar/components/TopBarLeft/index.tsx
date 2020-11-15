import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from 'react-use';
import { Input } from 'antd';
import { selectProjectName, setProjectName } from 'src/features/project/projectSlice';
import { ReactComponent as LeftOutlined } from 'src/assets/svg/leftOutlined.svg';
import styles from './index.module.scss';

const TopBarLeft = () => {
  const ref = useRef<Input>(null);
  const dispatch = useDispatch();
  const [on, toggle] = useToggle(false);
  const projectName = useSelector(selectProjectName);

  const handleBlur = useCallback(() => {
    toggle(false);
  }, [toggle]);

  const handleDoubleClick = useCallback(() => {
    toggle(true);

    // 需要等到输入框渲染完成，否则 ref.current 为 null
    setTimeout(() => {
      // 输入框聚焦
      ref.current?.focus();

      // 全选所有文本
      ref.current?.select();
    });
  }, [toggle]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setProjectName(e.target.value));
    },
    [dispatch],
  );

  return useMemo(() => {
    return (
      <div className={styles.topBarLeft}>
        <div className={styles.backIcon}>
          <LeftOutlined />
        </div>
        {on ? (
          <Input ref={ref} value={projectName} onBlur={handleBlur} onChange={handleChange} />
        ) : (
          <span className={styles.projectName} onDoubleClick={handleDoubleClick}>
            {projectName}
          </span>
        )}
      </div>
    );
  }, [projectName, on, handleBlur, handleChange, handleDoubleClick]);
};

export default TopBarLeft;
