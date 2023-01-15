import React, { useState, useEffect } from 'react';

const SettingsContext = React.createContext();
export default SettingsContext;

export function SettingsProvider({ children }) {
    const [initialized, setInitialized] = useState(false);
    const [settings, setSettings] = useState({});

    const reload = () => {
        setInitialized(false);
        let hidden = localStorage.getItem("hiddenCategories");
        if (!hidden) {
            hidden = "";
        }
        setSettings({
            hiddenCategories: hidden.split(","),
        });
        setInitialized(true);
    }

    useEffect(() => {
        reload();
    }, []);

    const value = {
        initialized,
        settings,
        setSetting: (setting, value) => {
            if (setting === "hiddenCategories") {
                localStorage.setItem("hiddenCategories", value.join(","));
            }
            reload();
        },
    };

    return <SettingsContext.Provider value={value}>
        {children}
    </SettingsContext.Provider>
}