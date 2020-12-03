import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';
import NumericInputNumber from 'src/components/NumericInputNumber';
import styles from './index.module.css';

function PlayPage() {
  const [value, setValue] = useState(0);

  return (
    <div className={styles.playPage}>
      <Button>haha</Button>
      <NumericInputNumber value={value} onBlur={setValue} onPressEnter={setValue} />

      <InputNumber
        value={value}
        onBlur={(e) => {
          console.log(e.target.value);
          setValue(Number(e.target.value));
        }}
        onPressEnter={(e) => {
          // @ts-ignore
          setValue(Number(e.target.value));
        }}
      ></InputNumber>
    </div>
  );
}

export default PlayPage;
