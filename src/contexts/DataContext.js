import React, { useState } from 'react';

import dutchData from '../data/dutch.json';

const DataContext = React.createContext({});
export default DataContext;

const dataByName = {
    "Dutch": dutchData,
}

export function DataProvider({ children }) {
    const [selectedCategory, setSelectedCategory] = useState('Dutch');

    const value = {
        categories: Object.keys(dataByName),
        selectCategory: (cat) => setSelectedCategory(cat),
        selectedCategory,
        data: dataByName[selectedCategory] || {},
    };

    return <DataContext.Provider value={value}>
        {children}
    </DataContext.Provider>;
}