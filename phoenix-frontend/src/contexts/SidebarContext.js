import React, { useState, createContext } from 'react';

/* Context */
const SidebarContext = createContext();
export default SidebarContext;

/* Context Provider */
export const SidebarContextProvider = (props) => {

    /* useState */
    const [sidebarOpen, setSidebarOpen] = useState(true);

    /* Context Values */
    const value = {
        sidebarOpen, setSidebarOpen
    };

    return (
        <SidebarContext.Provider value={value}>
            {props.children}
        </SidebarContext.Provider>
    )
};