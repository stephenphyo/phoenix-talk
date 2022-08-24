import React, { useState, useContext } from 'react';

/* MUI Imports */
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

/* Hook Imports */
import useWindowSize from 'hooks/useWindowSize';

/* Context Imports */
import SidebarContext from 'contexts/SidebarContext';

/* Temp Imports */
import ChatRoomInfo from './ChatRoomInfo';

function ChatRoomHeader({ room }) {

    /* useState */
    const [openInfo, setOpenInfo] = useState(false);

    /* useContext */
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

    /* Custom Hooks */
    const windowSize = useWindowSize();

    return (
        <header className='chat_room_header'>
            {
                windowSize.width < 800 &&
                <MenuRoundedIcon id='menu'
                    onClick={() => setSidebarOpen(!sidebarOpen)} />
            }
            <Avatar />
            <div className='chat_room_header_description'>
                <p id='name'>{room?.name}</p>
                <p id='info'>Last seen at</p>
            </div>
            <div className='chat_room_header_options'>
                <IconButton>
                    <SearchRoundedIcon />
                </IconButton>
                <IconButton onClick={() => setOpenInfo(true)}>
                    <MoreVertRoundedIcon />
                </IconButton>
            </div>
            <ChatRoomInfo open={openInfo} setOpen={setOpenInfo} />
        </header>
    );
}

export default ChatRoomHeader;