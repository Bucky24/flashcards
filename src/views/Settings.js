import React, { useContext } from 'react';

import styles from '../styles.css';

import Flashcards from '../../assets/flashcards.png';
import SettingsContext from '../contexts/SettingsContext';
import dutchData from '../data/dutch.json';

export default function Settings({ setShowSettings }) {
	const { settings, initialized, setSetting } = useContext(SettingsContext);

    return (
        <>
            <div className={styles.cardHolder}>
                Settings
				{initialized && <>
					<div>
						<span>Categories</span>
						{Object.keys(dutchData).map((key) => {
							const disabled = settings.hiddenCategories.includes(key);
							return (
								<div style={{cursor: 'pointer'}} onClick={() => {
									const newCategories = [...settings.hiddenCategories];
									if (newCategories.includes(key)) {
										const index = newCategories.indexOf(key);
										newCategories.splice(index, 1);
									} else {
										newCategories.push(key);
									}
									setSetting("hiddenCategories", newCategories);
								}}>
									<input type="checkbox" checked={!disabled} /> {key}
								</div>
							)
						})}
					</div>
				</>}
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