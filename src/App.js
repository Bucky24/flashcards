import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './styles.css';

import Cards from './views/Cards';
import Settings from './views/Settings';
import Footer from './components/Footer';
import List from './views/List';

export default function App() {
	return (<BrowserRouter>
		<div className={styles.appRoot}>
			<Routes>
				<Route path="/" element={<Cards />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/list" element={<List />} />
			</Routes>
			<Footer />
		</div>
	</BrowserRouter>);
}