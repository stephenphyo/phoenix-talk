import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);

  const sel_login_form = () => {
    setLoginForm(true);
    setRegisterForm(false);
    console.log("Login Form");
  }

  const sel_register_form = () => {
    setLoginForm(false);
    setRegisterForm(true);
    console.log("Register Form");
  }

  const login = (e) => {
    console.log("Login");
    e.preventDefault();
  }

  /* FORM OBJECTS */
  function LoginForm() {
    return (
      <div className="form-area">
        <div className="form-header">
            Login to Account
        </div>
        <div className="form-body login">
          <div className="input-group login">
            <input type="text" placeholder="Enter Username" />
            <input type="password" placeholder="Enter Password" />
          </div>
          <div className="submit">
            <input type="submit" value="Login" onClick={login} />
          </div>
        </div>
          <div className="form-footer">
            <a>Forget your password?</a>
          </div>
      </div>
    );
  }

  function RegisterForm() {
    const [regUsername, setRegUsername] = useState("");
    const [regInitPwd, setRegInitPwd] = useState("");
    const [regCfmPwd, setRegCfmPwd] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [err, setErr] = useState({});

    let showErr = {};
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augusy', 'September', 'October', 'November', 'December'];

    // Functions
    const checkUsername = () => {
      if (regUsername == "") {
        showErr["username"] = "Username must not be empty";
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
      if (regInitPwd=="") {
        showErr["initPwd"] = "Password must not be empty";
      }
      else if (regInitPwd.length < 8) {
        showErr["initPwd"] = "Password length must be 8 or above";
      }
      else if (regInitPwd != "" && regInitPwd != regCfmPwd) {
        showErr["cfmPwd"] = "Passwords do not match"
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
      if (regEmail == "") {
        showErr["email"] = "Email must not be empty";
      }
    }

    const validateRegister = (e) => {
      e.preventDefault();
      console.log(regUsername, regInitPwd, regCfmPwd, regEmail);

      // Error Checking
      checkUsername();
      checkPassword();
      checkEmail();

      // Error Processing
      if (Object.keys(showErr).length == 0) {
        console.log("No Error");
      } else {
        setErr(showErr);
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
              label="First Name" />
            <input type="text" placeholder="Last Name" />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter Username"
                value={regUsername}
                onChange={onUsernameChange} />
              {"username" in err && <a>{err["username"]}</a>}
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Set Password"
                value={regInitPwd}
                onChange={onInitPwdChange} />
              {"initPwd" in err && <a>{err["initPwd"]}</a>}
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Confirm Password"
                value={regCfmPwd}
                onChange={onCfmPwdChange} />
              {"cfmPwd" in err && <a>{err["cfmPwd"]}</a>}
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter Email Address"
                value={regEmail}
                onChange={e => (setRegEmail(e.target.value))} />
              {"email" in err && <a>{err["email"]}</a>}
            </div>
            <div className="dob">
              <input
                type="text"
                placeholder="Day"
                id="day"
                value={day}
                onChange={e => setDay(e.target.value)} />
              <select required>
                <option value="" selected disabled hidden>Month</option>
                {months.map(ele => (
                  <option value={ele}>{ele}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Year"
                id='year'
                value={year}
                onChange={e => setYear(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <select required>
                <option value="" selected disabled hidden>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nogen">Not want to say</option>
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
  );
}

export default App;