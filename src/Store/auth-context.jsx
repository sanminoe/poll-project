import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
	user: null,
	setUser: (id, username) => {},
	votes: [],
	setVotes: () => {}
});

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationDate = localStorage.getItem('expirationTime');
	const storedUserId = localStorage.getItem('userId');
	const storedUserName = localStorage.getItem('username');
	const storedKey = localStorage.getItem('key');
	const remainingTime = calculateRemainingTime(storedExpirationDate);

	if (remainingTime <= 3600) {
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('key');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
		userId: storedUserId,
		username: storedUserName,
		key: storedKey
	};
};

export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();

	let initialToken;
	let initialUser;
	if (tokenData) {
		initialToken = tokenData.token;
	}
	if (initialToken) {
		initialUser = { id: tokenData.userId, username: tokenData.username, key: tokenData.key };
	}
	const [ token, setToken ] = useState(initialToken);
	const [ user, setUser ] = useState(initialUser);

	const [ votes, setVotes ] = useState([]);

	const setUserVotesHandler = async () => {
		if (user) {
			let res = await fetch(
				`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/users/${user.key}.json?`
			);

			let data = await res.json();
			if (data !== null) {
				setVotes(data.votes ? data.votes : []);
			}
		}
	};
	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);
		setUser({});
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		localStorage.removeItem('userId');
		localStorage.removeItem('key');
		localStorage.removeItem('username');

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('expirationTime', expirationTime);

		const remainingTime = calculateRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	const setUserHandler = (userId, username, key) => {
		localStorage.setItem('username', username);
		localStorage.setItem('userId', userId);
		localStorage.setItem('key', key);
		setUser({ id: userId, username: username, key: key });
	};

	useEffect(
		() => {
			if (tokenData) {
				logoutTimer = setTimeout(logoutHandler, tokenData.duration);
			}
		},
		[ tokenData, logoutHandler ]
	);

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		user: user,
		setUser: setUserHandler,
		votes: votes,
		setVotes: setUserVotesHandler
	};

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
