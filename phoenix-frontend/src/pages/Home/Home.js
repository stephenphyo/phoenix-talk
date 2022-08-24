import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* CSS Imports */
import './Home.css';

/* Asset Imports */
import logo from 'assets/images/logo.png';

function Home() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [click, setClick] = useState(false);

    return (
        <section className='home'>
            <img src={logo} alt='logo' id='logo' />
            <p id='logo_text'>Phoenix Talk</p>
            <button
                className={`${click ? 'click' : ''}`}
                onClick={() => {
                    navigate('/login');
                    setClick(true);
                }}>
                Start Messaging
            </button>
        </section>
    );
}

export default Home;