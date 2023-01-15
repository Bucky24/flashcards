import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { SettingsProvider } from './contexts/SettingsContext';

ReactDOM.render(
    <SettingsProvider>
        <App />
    </SettingsProvider>
, document.getElementById('root'));
