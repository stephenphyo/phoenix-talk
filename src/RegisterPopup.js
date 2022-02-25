import React from 'react';
import './RegisterPopup.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function RegisterPopup({setRegisterPopup, sel_login_form}) {

const onGoClick = () => {
        setRegisterPopup(false);
        sel_login_form();
};

  return (
    <div className="popup-root">
        <div className="popup-box">
            <div className="popup-icon">
                <CheckCircleIcon
                    style={{ fontSize: 85, color: 'green'}}/>
            </div>
            <div className="popup-message">
                Account has been created successfully
            </div>
            <div className="popup-button">
                <input
                    type="submit"
                    value="Go to Login"
                    onClick={() => onGoClick()} />
            </div>
        </div>
    </div>
  )
};

export default RegisterPopup;