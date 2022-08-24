import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* CSS Imports */
import './App.css';

/* Page Imports */
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import Chat from 'pages/Chat/Chat';
import ChatRoom from 'pages/Chat/ChatRoom/ChatRoom';

function App() {
    return (
        <Router>
            <main className='app'>
                <Routes>
                    <Route path='/'>
                        {/* Public Routes */}
                        <Route path='/' element={<Home />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />

                        {/* Protected Routes */}
                        {/* <Route element={<RequireAuth />}></Route> */}
                        <Route path='/rooms' element={<Chat />}>
                            <Route path=':id' element={<ChatRoom />} />
                        </Route>
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}

export default App;