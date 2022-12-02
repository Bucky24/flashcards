import React, { useState } from 'react';

import styles from './styles.css';

import Cards from './views/Cards';
import Settings from './views/Settings';

export default function App() {
	const [showSettings, setShowSettings] = useState(false);

	return (<div className={styles.appRoot}>
		{!showSettings && <>
			<Cards setShowSettings={setShowSettings} />
		</>}
		{showSettings && <>
			<Settings setShowSettings={setShowSettings} />
		</>}
	</div>);
}