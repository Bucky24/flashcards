import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { SettingsProvider } from './contexts/SettingsContext';
import { DataProvider } from './contexts/DataContext';

ReactDOM.render(
    <SettingsProvider>
        <DataProvider>
            <App />
        </DataProvider>
    </SettingsProvider>
, document.getElementById('root'));
