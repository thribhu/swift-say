import React, { useState, useEffect } from 'react';
import SDK from 'casdoor-js-sdk';
import { config } from './Setting';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//utils
import axiosInstance from './api/api.config';
//styles
import GlobalStyle from './styles/globalStyle';
//components and pages
import Sidebar from './Pages/Dashboard/Sidebar';
import Navbar from './Components/Navbar';

function App() {
  const [_, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
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
        try {
          const response = await axiosInstance.get('users');
          return response.data.user;
        } catch (err) {
          throw err;
        }
      }
      function setInfo(userinfo) {
        setUsername(userinfo.name);
        setDisplayName(userinfo.displayName);
        setUserAvatar(userinfo.avatar);
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
          <Sidebar name={displayName} avatar={userAvatar} signout={signOut} />
        </>
      ) : (
        <Navbar signin={gotoSignInPage} />
      )}
    </React.StrictMode>
  );
}

export default App;
