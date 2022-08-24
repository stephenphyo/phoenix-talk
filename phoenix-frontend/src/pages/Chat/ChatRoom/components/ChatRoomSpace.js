import React, { useEffect, useState } from 'react';

/* MUI Imports */
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

/*** Component Imports ***/
/* Main Components */
import ChatMessage from './ChatMessage';
/* UI Components */
import ScrollToBottom from 'components/ui/SPScrollToBottom';

/* API Imports */
import Axios from 'apis/Axios';

/* Hook Imports */
import useOnScreen from 'hooks/useOnScreen';

function ChatRoomSpace({ room }) {

    /*  useState */
    const [messages, setMessages] = useState([]);

    /* Custom Hooks */
    const [endRef, isEnd] = useOnScreen();

    /*** useEffect ***/
    /* Initial Fetching */
    useEffect(() => {
        const controller = new AbortController();
        Axios.get(`/rooms/${room?._id}/messages`, {
            signal: controller.signal
        })
            .then(res => {
                console.log(res.data)
                setMessages(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })

        return () => { controller.abort() }
    }, [room]);

    return (
        <section className='chat_room_space'>
            <ScrollToBottom className='chat_room_space_wrapper'>
                {
                    messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))
                }
                <div ref={endRef}></div>
            </ScrollToBottom>
            <div className={`scroll2end ${!isEnd ? 'show' : ''}`}
                onClick={() => endRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                <KeyboardArrowDownRoundedIcon />
            </div>
        </section>
    );
}

export default ChatRoomSpace;