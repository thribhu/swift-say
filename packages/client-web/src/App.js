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
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';

function App() {
	const [, setUsername] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [userAvatar, setUserAvatar] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [sdk] = useState(new SDK(config));
	const [tokenReceived, setTokenReceived] = useState(false);

	/**
	 * @async
	 * @returns {Object}  Returns casdoor authenticated user object
	 */
	async function getInfo() {
		const response = await axiosInstance.get('users');
		return response.data;
	}

	/**
	 *
	 * @param {Object} userinfo
	 * @param {string} userinfo.name - Casdoor username
	 * @param {string} userinfo.displayName - Casdoor display name
	 * @param {string} userinfo.avatar - Casdoor avatar URI
	 */
	function setInfo(userinfo) {
		setUsername(userinfo.name);
		setDisplayName(userinfo.displayName);
		setUserAvatar(userinfo.avatar);
		setIsLoggedIn(true);
	}

	useEffect(() => {
		if (window.location.href.indexOf('code') !== -1) {
			if (!sessionStorage.getItem('token')) {
				sdk.signin('http://localhost:8080').then((res) => {
					sessionStorage.setItem('token', res.token);
					sessionStorage.setItem('refreshToken', res.refreshToken);
					setTokenReceived(true);
				});
			}
		}
	}, [sdk]);

	useEffect(() => {
		if (sessionStorage.getItem('token')) {
			getInfo().then((name, displayName, avatar) => {
				setInfo({ name, displayName, avatar });
			});
		}
	}, [tokenReceived]);

	//!Note:for ease we are setting the default signin method
	function gotoSignInPage() {
		window.location.href = sdk.getSigninUrl();
	}

	function signOut() {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('refreshToken');
		setTokenReceived(false);
		window.location.href = 'http://localhost:9000';
	}
	return (
		<React.StrictMode>
			<GlobalStyle />
			{isLoggedIn ? (
				<>
					<Dashboard name={displayName} avatar={userAvatar} signout={signOut} />
				</>
			) : (
				<Navbar signin={gotoSignInPage} />
			)}
		</React.StrictMode>
	);
}

export default App;
