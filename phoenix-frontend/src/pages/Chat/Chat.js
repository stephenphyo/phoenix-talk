import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams, Outlet } from 'react-router-dom';

/* Hook Imports */
import useAuth from 'hooks/useAuth';

/*** Component Imports ***/
import ChatSidebar from './ChatSidebar/ChatSidebar';
import ChatHome from './ChatHome/components/ChatHome';
import ChatCreateRoom from './ChatSidebar/components/ChatCreateRoom';

/* Context Imports */
import { SidebarContextProvider } from 'contexts/SidebarContext';

function Chat() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useLocation */
    const location = useLocation();

    /* Custom Hooks */
    const { auth } = useAuth();

    /* Testing */
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, [params]);

    /* useEffect */
    useEffect(() => {
        Object.keys(auth).length === 0
            && navigate('/login', { state: { from: location } })
    }, []);

    return (
        <main style={{ display: 'flex', overflowX: 'hidden', position: 'relative', width: '100vw', height: '100vh' }}>
            <SidebarContextProvider>
                <ChatSidebar />
                {!params.id ? <ChatHome /> : <Outlet />}
                <ChatCreateRoom />
            </SidebarContextProvider>
        </main>
    );
}

export default Chat;