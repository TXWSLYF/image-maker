import React, { useRef, useState } from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';
import { useClickAway } from 'react-use';
import styles from './index.module.scss';

function ChromeColorPicker({ color, onChange }: { color: string; onChange: ColorChangeHandler }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setVisible(false);
  });

  return (
    <div className={styles.chromeColorPicker}>
      <div ref={ref} className={styles.colorPickerContainer} style={{ display: visible ? 'block' : 'none' }}>
        <ChromePicker color={color} onChange={onChange} />
      </div>
      <div
        className={styles.thumbnail}
        style={{ backgroundColor: color }}
        onClick={() => {
          setVisible(true);
        }}
      ></div>
    </div>
  );
}

export default ChromeColorPicker;
