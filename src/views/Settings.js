import React, { useContext } from 'react';
import { useNavigate, use } from 'react-router-dom';

import styles from '../styles.css';

import SettingsContext from '../contexts/SettingsContext';
import DataContext from '../contexts/DataContext';

export default function Settings() {
	const { settings, initialized, setSetting } = useContext(SettingsContext);
	const { data } = useContext(DataContext);

    return (
        <>
            <div className={styles.cardHolder}>
                Settings
				{initialized && <>
					<div>
						<span>Categories</span>
						{Object.keys(data).map((key) => {
							const disabled = settings.hiddenCategories.includes(key);
							return (
								<div key={key} style={{cursor: 'pointer'}} onClick={() => {
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