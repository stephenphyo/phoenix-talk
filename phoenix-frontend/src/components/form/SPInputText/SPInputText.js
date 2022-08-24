/*
    <InputText
        label=<form input label>
        error=<form error message>

        style={
            width:<width of the form input> [Default: '100%']
            minWidth:<minimum width of the form input> [Default: '100px']
            maxWidth:<maximum width of the form input> [Default: '100%']
            height:<height of the form input> [Default: '35px']
            transition:<transition delay of the form input in seconds> [Default: '0.2s']

            // Label
            labelFont:<font type of the label> [Default: 'Helvetica Neue']
            labelFontSize:<font size of the label> [Default: '13px']
            labelColor:<font color of the label> [Default: '#000000']

            // Input
            padding:<padding of the form input> [Default: '0 12px']
            font:<font type of the form input> [Default: 'Helvetica Neue']
            fontSize:<font size of the form input> [Default: '15px']
            color:<text color of the form input> [Default: '#000000']
            border:<border of the form input> [Default: '1px solid lightgray']
            borderRadius:<border radius of the form input> [Default: '5px']
            borderFocusColor:<border color of the form input on focus> [Default: '#8ad4ee']
            backgroundColor:<background color of the form input> [Default: '#ffffff']

            // Error
            errorFont:<font type of the error> [Default: 'Helvetica Neue']
            errorFontSize:<font size of the error> [Default: '11px']
            errorColor:<font color of the error> [Default: '#8B0000']
        }
    />
*/

import React, { forwardRef } from 'react';

/* CSS Imports */
import './SPInputText.css';

/* MUI Imports */
import ErrorIcon from '@mui/icons-material/Error';

const InputText = forwardRef((props, ref) => {

    /* Default Style Properties */
    const style = {
        '--width': (props.style && props.style.width) || '100%',
        '--min-width': (props.style && props.style.minWidth) || '100px',
        '--max-width': (props.style && props.style.maxWidth) || '100%',
        '--height': (props.style && props.style.height) || '35px',
        '--transition': (props.style && props.style.transition) || '0.2s',

        '--label-font': (props.style && props.style.labelFont) || 'Helvetica Neue',
        '--label-font-size': (props.style && props.style.labelFontSize) || '13px',
        '--label-color': (props.style && props.style.labelColor) || '#000000',

        '--input-padding': (props.style && props.style.padding) || '0 12px',
        '--input-font': (props.style && props.style.font) || 'Helvetica Neue',
        '--input-font-size': (props.style && props.style.fontSize) || '15px',
        '--input-text-color': (props.style && props.style.color) || '#000000',
        '--input-border': (props.style && props.style.border) || '1px solid lightgray',
        '--input-border-radius': (props.style && props.style.borderRadius) || '5px',
        '--input-border-focus-color': (props.style && props.style.borderFocusColor) || '#8ad4ee',
        '--input-background-color': (props.style && props.style.backgroundColor) || '#ffffff',

        '--error-font': (props.style && props.style.errorFont) || 'Helvetica Neue',
        '--error-font-size': (props.style && props.style.errorFontSize) || '11px',
        '--error-color': (props.style && props.style.errorColor) || '#8B0000',
    }

    return (
        <div
            className={`form_input_text ${props.error ? 'error' : ''}`}
            style={style}>
            <label>{props.label}</label>
            <input
                type='text'
                ref={ref}
                {...props} />
            {
                props.error &&
                    <div className={`form_input_text_error ${props.error && 'visible'}`}>
                        <ErrorIcon />
                        <p>{props.error}</p>
                    </div>
            }
        </div>
    );
})

export default InputText;