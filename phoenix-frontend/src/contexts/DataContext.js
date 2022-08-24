import { createContext, useState } from 'react';

/* Context */
const DataContext = createContext();
export default DataContext;

/* Context Provider */
export const DataContextProvider = (props) => {

    /* useState */
    const [rooms, setRooms] = useState([]);

    /* Context Values */
    const value = {
        rooms, setRooms
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
};