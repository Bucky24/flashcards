import React from 'react';

import styles from '../styles.css';

import Flashcards from '../../assets/flashcards.png';

export default function Settings({ setShowSettings }) {
    return (
        <>
            <div className={styles.cardHolder}>
                Settings
            </div>
            <div
				style={{
					position: 'fixed',
					bottom: 0,
					right: 0,
					padding: 10,
					cursor: 'pointer',
				}}
				onClick={() => {
					setShowSettings(false);
				}}
			>
				<img
					src={Flashcards}
					style={{
						width: 64,
					}}
				/>
			</div>
        </>
    );
}