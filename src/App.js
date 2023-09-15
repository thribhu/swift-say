import React, { useState, useEffect } from 'react';
import './App.css';
import SDK from 'casdoor-js-sdk';
import { config } from "./Setting";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sdk] = useState(new SDK(config));
  const [tokenReceived, setTokenReceived] = useState(false);

  useEffect(() => {
    if (window.location.href.indexOf('code') !== -1) {
      if (!sessionStorage.getItem('token')) {
        sdk.signin("http://localhost:8080").then(res => {
          sessionStorage.setItem('token', res.token);
          setTokenReceived(true);
        });
      }
    }
  }, [sdk]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getInfo().then(res => setInfo(res));

      async function getInfo() {
        let token = sessionStorage.getItem('token');
        if (!token) {
          return;
        }
        else {
          return fetch(`http://localhost:8080/api/getUserInfo?token=${token}`).then(res => res.json());
        }
      }

      function setInfo(res) {
        let userinfo = res;
        setUsername(userinfo.name);
        setIsLoggedIn(true);
      }
    }
  }, [tokenReceived])

  function gotoSignInPage() {
    document.getElementById('loginMethod').value === "signin"
    ? window.location.href = sdk.getSigninUrl()
    : sdk.popupSignin("http://localhost:8080");
  }

  function signOut() {
    sessionStorage.removeItem("token");
    setTokenReceived(false);
    window.location.href = "http://localhost:9000";
  }

  return (
    <div className="login" style={{ textAlign: "center" }}>
      {
        <span id="result">userName: <span className="username">{username}</span></span>
      }
      <div style={{ width: "300px", height: "100px" }}>
        {
          isLoggedIn
            ? <button id="signOut" style={{ width: "200px", height: "50px" }} onClick={signOut}>Logout</button>
            : <div>
                <select id="loginMethod" className="login-select">
                  <option value="signin">Signin</option>
                  <option value="popupSignin">PopupSignin</option>
                </select>
                <button id="signIn" style={{ width: "200px", height: "50px" }} onClick={gotoSignInPage}>Login with Casdoor</button>
              </div>
        }
      </div>
    </div>
  );
}

export default App;
