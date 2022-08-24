import React, { useEffect, useState } from 'react';

/* MUI Imports */
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';

/*** Component Imports ***/
/* UI Components */
import Tooltip from 'components/ui/Tooltip';

/* API Imports */
import Axios from 'apis/Axios';

/* Hook Imports */
import useAudio from 'hooks/useAudio';
import useAuth from 'hooks/useAuth';

/* Asset Imports */
import SendMessage from 'assets/audios/SendMessage.ogg';

function ChatRoomFooter({ room }) {

    /* useState */
    const [message, setMessage] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
    const [playSendMessage, setPlaySendMessage] = useState(false);

    /* Custom Hooks */
    const { auth } = useAuth();
    const [_, sendMessageAudio] = useAudio(SendMessage);

    /* Functions */
    const send = () => {
        sendMessageAudio();
        Axios.post(
            `/rooms/${room._id}/messages/new`,
            { author: auth?._id, content: message },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(res => {
                if (res.status === 201 && res.data.success) {
                    console.log(res.data.data);
                    setMessage('');
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    /* Testing */
    const listenKeyPress = (e) => {

    };
    // Key Press Listener
    useEffect(() => {
        if (inputFocus) {
            document.addEventListener('keydown', listenKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', listenKeyPress);
        }
    }, [inputFocus]);

    return (
        <footer className='chat_room_footer'>
            <div className='chat_room_footer_wrapper'>
                <div className='chat_room_footer_options'>
                    <AddCircleRoundedIcon />
                    <InsertPhotoRoundedIcon />
                </div>
                <input type='text'
                    placeholder='Type a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {send()}
                    }} />
                <div className='chat_room_footer_options'>
                    <Tooltip content='Send'><SendRoundedIcon /></Tooltip>
                    <MicRoundedIcon />
                </div>
            </div>
        </footer>
    );
}

export default ChatRoomFooter;