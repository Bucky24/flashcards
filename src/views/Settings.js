import React, { useContext } from 'react';
import { useNavigate, use } from 'react-router-dom';

import styles from '../styles.css';

import Flashcards from '../../assets/flashcards.png';
import SettingsContext from '../contexts/SettingsContext';
import dutchData from '../data/dutch.json';

export default function Settings({ setShowSettings }) {
	const { settings, initialized, setSetting } = useContext(SettingsContext);
	const navigate = useNavigate();

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
        </>
    );
}