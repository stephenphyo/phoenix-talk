import React from 'react';

/* Asset Imports */
import logo from 'assets/images/logo.png';

function ChatSidebarLogo() {
    return (
        <section className='chat_sidebar_logo'>
            <img src={logo} alt='' />
            <p>Phoenix Talk</p>
        </section>
    );
}

export default ChatSidebarLogo;