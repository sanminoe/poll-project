import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router';

import AuthContext from '../../Store/auth-context';
const Auth = (props) => {
	const [ isLoginMode, setIsLoginMode ] = useState(false);
	let navigate = useNavigate();
	let emailRef = useRef('');
	let passwordRef = useRef('');

	const authCtx = useContext(AuthContext);

	let authSubmitHandler = (e) => {
		let url;
		e.preventDefault();
		if (isLoginMode) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env
				.REACT_APP_F_KEY}`;
		}
		else {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_F_KEY}`;
		}
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				returnSecureToken: true
			})
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				else {
					return res.json().then((data) => {
						let errorMessage = 'Authentication failed';
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
				authCtx.login(data.idToken, expirationTime.toISOString());
				navigate('/');

				console.log(authCtx.token);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<div className="flex justify-center">
			<div>
				<form onSubmit={authSubmitHandler}>
					<div className="flex flex-col">
						<label>Email</label>
						<input ref={emailRef} className="border border-black" />
					</div>
					<div className="flex flex-col">
						<label>Password</label>
						<input ref={passwordRef} className="border border-black" />
					</div>
					<div className="w-full justify-self-end mt-4">
						<button className="self-end justify-self-end border px-6 border-black" type="submit">
							{isLoginMode ? 'Login' : 'Register'}
						</button>
					</div>
				</form>
				<div className="flex justify-center mt-3 underline">
					<p onClick={() => setIsLoginMode(!isLoginMode)}>
						Or {isLoginMode ? 'Sign Up here!' : 'Sign In here!'}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Auth;
