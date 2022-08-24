import React from 'react';
import { useNavigate } from 'react-router-dom';

/* MUI Imports */
import Avatar from '@mui/material/Avatar';

function ChatSidebarThread({ data }) {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div className='chat_sidebar_thread'
            onClick={() => navigate(`/rooms/${data._id}`)}>
            <Avatar className='avatar' />
            <div className='chat_sidebar_thread_description'>
                <p id='name'>{data.name}</p>
                <p id='msg'>Message</p>
            </div>
        </div>
    );
}

export default ChatSidebarThread;