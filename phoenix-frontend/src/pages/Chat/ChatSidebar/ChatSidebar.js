import React, { useContext, useEffect, useRef } from 'react';

/* CSS Imports */
import './styles/ChatSidebar.css';

/* API Imports */
import Axios from 'apis/Axios';

/* Context Imports */
import DataContext from 'contexts/DataContext';
import SidebarContext from 'contexts/SidebarContext';

/* Hook Imports */
import useAuth from 'hooks/useAuth';
import useWindowSize from 'hooks/useWindowSize';

/* Component Imports */
import ChatSidebarLogo from './components/ChatSidebarLogo';
import ChatSidebarHeader from './components/ChatSidebarHeader';
import ChatSidebarFooter from './components/ChatSidebarFooter';
import ChatSidebarThread from './components/ChatSidebarThread';

function ChatSidebar() {

    /* useRef */
    const sidebarRef = useRef();

    /* useContext */
    const { rooms, setRooms } = useContext(DataContext);
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

    /* Custom Hooks */
    const { auth } = useAuth();
    const windowSize = useWindowSize();

    /* useEffect */
    // Initial Fetching
    useEffect(() => {
        const controller = new AbortController();
        Axios.get(`/users/${auth._id}/rooms`, {
            signal: controller.signal
        })
            .then(res => {
                if (res.status === 200) {
                    setRooms(res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
                }
            })
            .catch(err => {
                console.log(err);
            })

        return () => { controller.abort() }
    }, []);

    // Close Sidebar in Float Mode
    useEffect(() => {
        const listener = (e) => {
            if (sidebarRef.current
                && !sidebarRef.current.contains(e.target)) {
                setSidebarOpen(false);
            }
        }
        sidebarOpen && windowSize.width < 1000 && document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        }
    }, [sidebarOpen]);

    /* Testing */
    useEffect(() => {
        console.log(rooms);
    }, [rooms]);

    useEffect(() => {
        console.log(windowSize);
    }, [windowSize]);

    return (
        <nav ref={sidebarRef}
            className={`${windowSize.width < 1000 ? 'chat_sidebar float' : 'chat_sidebar fixed'} ${sidebarOpen ? 'open' : 'close'}`}>
            <ChatSidebarLogo />
            <ChatSidebarHeader />
                <div className='chat_sidebar_body'>
                {
                    rooms.map((item, index) => (
                        <ChatSidebarThread key={index} data={item} />
                    ))
                }
                </div>
            <ChatSidebarFooter />
        </nav>
    );
}

export default ChatSidebar;