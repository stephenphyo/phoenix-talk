/* Documentation
    <Modal
        modal=<state of the modal using useState() hook> [Compulsory]
        setModal=<setState of the modal using useState() hook> [Compulsory]
        width=<width of the modal container>
            {'small' | 'medium' | 'large' | width value in px} [Default: '400px']
        margin=<margin of the container relative to its parent component> [Default: '50px 0']
        borderRadius=<border radius of the container> [Default: '5px']
        transitionDelay=<transition delay of the animation of the container> [Default: '0.5s']
    </Modal>

    <Modal.Header
        height=<height of the modal header> [Default: '45px']
        textMargin=<left margin of the header title> [Default: '20px']
        fontFamily=<font family of the header title> [Default: 'Helvetica Neue']
        fontSize=<font size of the header title> [Default: '16px']
        color=<text color of the header title> [Default: 'white']>
        backgroundColor=<background color of the header> [Default: '#33b5e5']
    </Modal.Header>

    <Modal.Body
        variant=<specify whether the modal has fixed height or is fit content> [Compulsory]
            {'fixed' | 'fit'}
            (If 'fixed', the height of Modal Body must be specified, else default is '150px')
            (If 'fit', the minimum height of Modal Body is defaulted to '150px')
        height=<height of the modal body> [Default: '150px']
        padding=<padding> [Default: '20px']
        backgroundColor=<background color of the body> [Default: '#ffffff']
    </Modal.Body>

    <Modal.Footer
        height=<height of the modal footer> [Default: '50px']
        justifyContent=<justification of child components> [Default: 'right']
        padding=<padding> [Default: '0 5%']
        gap=<gap between child components> [Default: '15px']>
        backgroundColor=<background color of the header> [Default: '#ffffff']
    </Modal.Footer>
*/

import React, { useRef, useEffect } from 'react';

/* CSS Import */
import './SPModal.css';

function Modal(props) {

    /* useRef */
    const modalRef = useRef();

    /* Event Listener */
    const listener = (e) => {
        if (props.modal
            && modalRef.current
            && !modalRef.current.contains(e.target)
        ) { props.setModal(false) }
    };

    useEffect(() => {
        props.modal && document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        }
    }, [props.modal]);

    /* Default Style Properties */
    let width;
    if (props.width) {
        if (props.width === 'large') {
            width = '600px'
        } else if (props.width === 'medium') {
            width = '450px'
        } else if (props.width === 'small') {
            width = '300px'
        } else {
            width = props.width
        }
    };

    const style = {
        '--width': props.width || '400px',
        '--margin': props.margin || '50px 0',
        '--border-radius': props.borderRadius || '5px',
        '--transition-delay': props.transitionDelay || '0.5s',
    }

    if (!'modal' in props || !props.setModal) {
        return console.error('Modal must be have both \'modal\' and \'setModal\' properties');
    } else {
        return (
            <div
                className={`modal fade ${props.modal ? 'show' : ''}`}
                style={style}>
                <div
                    ref={modalRef}
                    className={`modal_container slideY ${props.modal ? 'show' : ''}`}>
                    {props.children}
                </div>
            </div>
        );
    }
}

/* Modal Header */
Modal.Header = (props) => {

    // Default Style Properties
    const style = {
        '--height': props.height || '45px',
        '--text-margin': props.textMargin || '20px',
        '--font-family': props.fontFamily || 'Helvetica Neue',
        '--font-size': props.fontSize || '16px',
        '--color': props.color || 'white',
        '--background-color': props.backgroundColor || '#33b5e5',
    }

    return (
        <div
            className='modal_header'
            style={style}>
            <p>{props.children}</p>
        </div>
    )
};

/* Modal Body */
Modal.Body = (props) => {

    // Default Style Properties
    const style = {
        '--height': props.height || '150px',
        '--padding': props.padding || '20px',
        '--background-color': props.backgroundColor || '#ffffff'
    }

    if (!props.variant) {
        return console.error('Modal Body must have \'variant\' property');
    } else {
        return (
            <div
                className={`modal_body ${props.variant}`}
                style={style}>
                <div className='modal_body_content'>
                    {props.children}
                </div>
            </div>
        )
    }
};

/* Modal Footer */
Modal.Footer = (props) => {

    // Default Style Properties
    const style = {
        '--height': props.height || '50px',
        '--justify-content': props.justifyContent || 'right',
        '--padding': props.padding || '0 5%',
        '--gap': props.gap || '15px',
        '--background-color': props.backgroundColor || '#ffffff'
    }

    return (
        <div
            className = 'modal_footer'
            style={style}>
                { props.children }
        </div >
    )
};

export default Modal;