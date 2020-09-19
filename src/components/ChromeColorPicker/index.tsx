import React, { useState } from 'react';
import { ChromePicker } from 'react-color'
import styles from './index.module.scss'

function ChromeColorPicker({ color }: { color: string }) {
    const [visible, setVisible] = useState(false);

    return <div className={styles.chromeColorPicker}>
        <div
            className={styles.thumbnail}
            style={{ backgroundColor: color }}
            onClick={() => { setVisible(true) }}>
        </div>
        <div
            className={styles.colorPickerContainer}
            // style={{ display: visible ? 'block' : 'none' }}
        >
            <ChromePicker color={color} />
        </div>
    </div>
}

export default ChromeColorPicker;