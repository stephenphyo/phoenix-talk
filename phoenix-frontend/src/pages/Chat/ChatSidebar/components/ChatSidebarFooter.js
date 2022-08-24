import React from 'react';

/* MUI Imports */
import Avatar from '@mui/material/Avatar';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

/* Hook Imports */
import useAuth from 'hooks/useAuth';

function ChatSidebarFooter() {

    /* Custom Hooks */
    const { auth } = useAuth();

    return (
        <section className='chat_sidebar_footer'>
            <Avatar className='avatar'
                src={auth?.avatar} alt='' />
            <CallRoundedIcon />
            <SmsRoundedIcon />
            <SettingsRoundedIcon />
        </section>
    );
}

export default ChatSidebarFooter;