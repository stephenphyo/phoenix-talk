import React, { useContext } from 'react';

/* MUI Imports */
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

/* Context Imports */
import ChatContext from 'contexts/ChatContext';

function ChatSidebarHeader() {

    /* useContext */
    const { createRoom, setCreateRoom } = useContext(ChatContext);

    return (
        <section className='chat_sidebar_header'>
            <div className='chat_sidebar_header_search'>
                <SearchRoundedIcon id='search' />
                <input type='text'
                    placeholder='Search'
                    // value={search}
                />
            </div>
            <BorderColorRoundedIcon id='create'
                onClick={() => setCreateRoom(true)} />
        </section>
    );
}

export default ChatSidebarHeader;