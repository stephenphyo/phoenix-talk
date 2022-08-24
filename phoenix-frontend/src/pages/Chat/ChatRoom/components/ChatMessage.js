import React from 'react';

/* MUI Imports */
import Avatar from '@mui/material/Avatar';

/* Hook Imports */
import useAuth from 'hooks/useAuth';

/* Utility Imports */
import formatDateTime from 'utils/formatDateTime';
import getDateTimeInLocalTimeZone from 'utils/getDateTimeInLocalTimeZone';

function ChatMessage({ message }) {

    /* Custom Hooks */
    const { auth } = useAuth();

    /* Data Conversion */
    const time = formatDateTime(getDateTimeInLocalTimeZone(message.timestamp));

    return (
        <div className={message.author.email === auth.email ? 'chat_room_message sender' : 'chat_room_message'}>
            <Avatar id='avatar' src={message.author.avatar} />
            <div className='chat_room_message_content'>
                <p id='author'>{`${message.author.firstName} ${message.author.lastName}`}</p>
                <p id='message'>{message.content}</p>
                <p id='timestamp'>{`${time.HH}:${time.mm}`}</p>
            </div>
        </div>
    );
}

export default ChatMessage;