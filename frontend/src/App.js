import React, { useState, useEffect } from 'react';
import axios from 'axios';
import crypto from 'crypto';
import logo from './logo.svg';
import './App.css';

function App() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const sendLoginRequest = () => {
		const challenge = crypto.randomBytes(32).toString('hex');

		const requestOptions = {
			method: 'post',
			url: 'http://localhost:8000/login',
			data: { username: username, challenge: challenge },
		}

		axios(requestOptions).then((response) => { console.log(response.data); }).catch((error) => { console.log(error); });
	}

  	return (
    	<div className="App">
      		<header className="App-header">
        		<img src={logo} className="App-logo" alt="logo" />
				<div>
					<input placeholder='Username' type={'text'} value={username} onChange={(event) => setUsername(event.target.value)}/>
					<input placeholder='Password' type={'password'} value={password} onChange={(event) => setPassword(event.target.value)}/>
					<button onClick={() => sendLoginRequest()}>Login</button>
				</div>
      		</header>
    	</div>
  	);
}

export default App;
