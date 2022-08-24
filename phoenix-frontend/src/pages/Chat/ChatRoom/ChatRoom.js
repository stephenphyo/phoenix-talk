import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* CSS Imports */
import './styles/ChatRoom.css';

/* Component Imports */
import ChatRoomHeader from './components/ChatRoomHeader';
import ChatRoomSpace from './components/ChatRoomSpace';
import ChatRoomFooter from './components/ChatRoomFooter';

/* Context Imports */
import DataContext from 'contexts/DataContext';

function ChatRoom() {

    /* useParams */
    const params = useParams();

    /* useState */
    const [room, setRoom] = useState();

    /* useContext */
    const { rooms } = useContext(DataContext);

    /* Test */
    useEffect(() => {
        setRoom(rooms.find(room => room._id === params.id))
    }, [params, rooms]);

    return (
        <section className='chat_room'>
            <ChatRoomHeader room={room} />
            <ChatRoomSpace room={room} />
            <ChatRoomFooter room={room} />
        </section>
    );
}

export default ChatRoom;