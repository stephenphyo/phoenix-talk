import './App.css';
import RegisterPopup from './RegisterPopup';
import React, { useState, useEffect } from "react";
import Axios from './Axios';
const sha256 = require('crypto-js/sha256');

function App() {

  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);

  const sel_login_form = () => {
    setLoginForm(true);
    setRegisterForm(false);
  }

  const sel_register_form = () => {
    setLoginForm(false);
    setRegisterForm(true);
  }

  /* LOGIN FORM */
  function LoginForm() {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPwd, setLoginPwd] = useState("");
    const [loginErr, setLoginErr] = useState([]);

    const validateLogin = (e) => {
      e.preventDefault();

      Axios.post('/login', {
        email: loginUsername,
        password: loginPwd
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err.response);
        if (err.response.status == 403) {
          console.log(err.response.data)
        }
      })
    }

    return (
      <div className="form-area">
        <div className="form-header">
          Login to Account
        </div>
        <div className="form-body login">
          <div className="input-group login">
            <div className={`input-wrapper ${"username" in loginErr && "error"}`}>
              <input
                type="text"
                placeholder="Enter Username"
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)} />
              {"email" in loginErr && <a>{loginErr["email"]}</a>}
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Enter Password"
                value={loginPwd}
                onChange={e => setLoginPwd(e.target.value)} />
              {"password" in loginErr && <a>{loginErr["password"]}</a>}
            </div>
          </div>
          <div className="submit">
            <input type="submit" value="Login" onClick={validateLogin} />
          </div>
        </div>
        <div className="form-footer">
          <a>Forget your password?</a>
        </div>
      </div>
    );
  }

  /* REGISTER FORM */
  function RegisterForm() {
    const [regFirstName, setRegFirstName] = useState("");
    const [regLastName, setRegLastName] = useState("");
    const [regUsername, setRegUsername] = useState("");
    const [regInitPwd, setRegInitPwd] = useState("");
    const [regCfmPwd, setRegCfmPwd] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [regGender, setRegGender] = useState("");
    const [err, setErr] = useState({});

    let errObj = {};
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augusy', 'September', 'October', 'November', 'December'];

    // Functions
    const checkUsername = () => {
      if (regUsername == "") {
        errObj["username"] = "Username must not be empty";
      }
    }

    const onUsernameChange = (e) => {
      setRegUsername(e.target.value);
      if ("username" in err) {
        delete err["username"];
        setErr(err);
      }
    }

    const checkPassword = () => {
      if (regInitPwd == "") {
        errObj["initPwd"] = "Password must not be empty";
      }
      else if (regInitPwd.length < 8) {
        errObj["initPwd"] = "Password length must be 8 or above";
      }
      else if (regInitPwd != "" && regInitPwd != regCfmPwd) {
        errObj["cfmPwd"] = "Passwords do not match"
      }
    }

    const onInitPwdChange = (e) => {
      setRegInitPwd(e.target.value);
      if ("initPwd" in err) {
        delete err["initPwd"];
        setErr(err);
      }
    }

    const onCfmPwdChange = (e) => {
      setRegCfmPwd(e.target.value);
      if ("cfmPwd" in err) {
        delete err["cfmPwd"];
        setErr(err);
      }
    }

    const checkEmail = () => {
      var regex = /\S+@\S+.[a-z]{2,}$/;

      if (regEmail == "") {
        errObj["email"] = "Email must not be empty";
      }
      else if (!regex.test(regEmail)) {
        errObj["email"] = "Please enter valid email address";
      };
    }

    const onEmailChange = (e) => {
      setRegEmail(e.target.value);
      if ("email" in err) {
        delete err["email"];
        setErr(err);
      }
    }

    const submitRegister = (e) => {
      setRegisterPopup(true);

      // Hashing with SHA256
      var finalPwd = sha256(regCfmPwd).toString();

      const regDob = `${day}-${month.substring(0, 3)}-${year}`;

      // API POST
      Axios.post('/register', {
        firstName: regFirstName,
        lastName: regLastName,
        username: regUsername,
        password: finalPwd,
        email: regEmail,
        dob: regDob,
        gender: regGender,
      }).then((res) => {
        console.log(res)
      });
    }

    const validateRegister = (e) => {
      e.preventDefault();
      console.log(regUsername, regInitPwd, regCfmPwd, regEmail);

      // Error Checking
      checkUsername();
      checkPassword();
      checkEmail();

      // Error Processing
      if (Object.keys(errObj).length == 0) {
        submitRegister();
      } else {
        setErr(errObj);
        setRegInitPwd("");
        setRegCfmPwd("");
      }
    }

    return (
      <div className="form-area">
        <div className="form-header">
          Register Account
        </div>
        <div className="form-body register">
          <div className="input-group register">
            <div className="input-wrapper firstRow">
              <input
                type="text"
                placeholder="First Name"
                label="First Name"
                onChange={e => setRegFirstName(e.target.value)} />
              <input
                type="text"
                placeholder="Last Name"
                onChange={e => setRegLastName(e.target.value)} />
            </div>
            <div className={`input-wrapper ${"username" in err && "error"}`}>
              <input
                type="text"
                placeholder="Enter Username"
                value={regUsername}
                onChange={onUsernameChange} />
              {"username" in err && <a>{err["username"]}</a>}
            </div>
            <div className={`input-wrapper ${"initPwd" in err && "error"}`}>
              <input
                type="password"
                placeholder="Set Password"
                value={regInitPwd}
                onChange={onInitPwdChange} />
              {"initPwd" in err && <a>{err["initPwd"]}</a>}
            </div>
            <div className={`input-wrapper ${"cfmPwd" in err && "error"}`}>
              <input
                type="password"
                placeholder="Confirm Password"
                value={regCfmPwd}
                onChange={onCfmPwdChange} />
              {"cfmPwd" in err && <a>{err["cfmPwd"]}</a>}
            </div>
            <div className={`input-wrapper ${"email" in err && "error"}`}>
              <input
                name="email"
                type="text"
                placeholder="Enter Email Address"
                value={regEmail}
                autoComplete="on"
                onChange={onEmailChange} />
              {"email" in err && <a>{err["email"]}</a>}
            </div>
            <div className="dob">
              <input
                type="text"
                placeholder="Day"
                id="day"
                value={day}
                onChange={e => setDay(e.target.value)} />
              <select required onChange={e => setMonth(e.target.value)}>
                <option value="" hidden>Month</option>
                {months.map(ele => (
                  <option value={ele} key={ele} id="valid">{ele}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Year"
                id='year'
                value={year}
                onChange={e => setYear(e.target.value)} />
            </div>
            <div className={`input-wrapper ${"username" in err && "error"}`}>
              <select onChange={e => setRegGender(e.target.value)} required>
                <option value="" hidden>Gender</option>
                <option value="M" id="valid">Male</option>
                <option value="F" id="valid">Female</option>
                <option value="O" id="valid">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div className="submit">
            <input
              type="submit"
              value="Register"
              onClick={validateRegister} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <div className="container">
        <div className="form-container">
          <div className="controller-bar">
            <div className="controller-wrapper">
              <div className={`controller ${loginForm ? "active" : ""}`} onClick={sel_login_form}>
                Login
              </div>
              <div className={`controller ${!loginForm ? "active" : ""}`} onClick={sel_register_form}>
                Register
              </div>
            </div>
          </div>
          {loginForm && <LoginForm />}
          {registerForm && <RegisterForm />}
        </div>
      </div>
      {registerPopup &&
        <div className="container popup">
          <RegisterPopup setRegisterPopup={setRegisterPopup} sel_login_form={sel_login_form} />
        </div>
      }
    </div>
  );
}

export default App;