import React from 'react';

import styles from '../styles.css';

export default function Settings({ setShowSettings }) {
    return (
        <div className={styles.cardHolder}>
            Settings
            <button onClick={() => { setShowSettings(false) }}>Back</button>
        </div>
    );
}