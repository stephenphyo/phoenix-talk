import React, { useState, createContext } from 'react';

/* Context */
const ChatContext = createContext();
export default ChatContext;

/* Context Provider */
export const ChatContextProvider = (props) => {

    /* useState */
    const [search, setSearch] = useState();
    const [createRoom, setCreateRoom] = useState(false);

    /* Context Values */
    const value = {
        createRoom, setCreateRoom,
    };

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    )
};