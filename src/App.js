import React, { useState, useEffect } from 'react';
import SDK from 'casdoor-js-sdk';
import { config } from './Setting';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//styles
import GlobalStyle from './styles/globalStyle';
//components and pages
import Sidebar from './Pages/Dashboard/Sidebar';
import Navbar from './Components/Navbar';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sdk] = useState(new SDK(config));
  const [tokenReceived, setTokenReceived] = useState(false);

  useEffect(() => {
    if (window.location.href.indexOf('code') !== -1) {
      if (!sessionStorage.getItem('token')) {
        sdk.signin('http://localhost:8080').then((res) => {
          sessionStorage.setItem('token', res.token);
          setTokenReceived(true);
        });
      }
    }
  }, [sdk]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getInfo().then((res) => setInfo(res));

      async function getInfo() {
        let token = sessionStorage.getItem('token');
        if (!token) {
          return;
        } else {
          return fetch(
            `http://localhost:8080/api/getUserInfo?token=${token}`
          ).then((res) => res.json());
        }
      }

      function setInfo(res) {
        let userinfo = res;
        setUsername(userinfo.name);
        setIsLoggedIn(true);
      }
    }
  }, [tokenReceived]);

  //!Note:for ease we are setting the default signin method
  function gotoSignInPage() {
    // document.getElementById('loginMethod').value === 'signin'
    //   ? (window.location.href = sdk.getSigninUrl())
    //   : sdk.popupSignin('http://localhost:8080');
    window.location.href = sdk.getSigninUrl();
  }

  function signOut() {
    sessionStorage.removeItem('token');
    setTokenReceived(false);
    window.location.href = 'http://localhost:9000';
  }

  return (
    <React.StrictMode>
      <GlobalStyle />
      {isLoggedIn ? (
        <>
          <Sidebar signout={signOut} />
        </>
      ) : (
        <Navbar signin={gotoSignInPage} />
      )}
    </React.StrictMode>
  );
}

export default App;
