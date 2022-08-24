/* Documentation
    <SPButton
        variant=<variant style of the button> [Default: 'filled']
            {'filled', 'outlined', 'text', 'filled-on-hover'}

        style={
            width:<width of the button> [Default: 'fit-content']
            height:<height of the button> [Default: '30px']
            fontFamily:<font type of the text in the button> [Default: 'Helvetica Neue']
            fontSize:<font size of the text in the button> [Default: '13px']
            textColor:<color of the text in the button> [Default: 'white']
            backgroundColor:<background color of the button> [Default: '#4285f4']
        }
    </SPButton>
*/

import React from 'react';

/* CSS Imports */
import './SPButton.css';

function SPButton(props) {
    return (
        <button
            className={`btn ${props.variant || 'filled'} ${props.disabled ? 'disabled' : ''}`}
            {...props}>
            {props.children}
        </button>
    );
}

export default SPButton;