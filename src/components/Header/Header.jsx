import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
const Header = (props) => {
	const authCtx = useContext(AuthContext);
	let navigate = useNavigate();

	const isLoggedIn = authCtx.isLoggedIn;

	const logoutHandler = () => {
		authCtx.logout();
		navigate('/');
	};

	return (
		<div className="h-16 flex justify-between items-center border-b">
			<div className="flex justify-center w-full md:w-auto md:ml-4">
				<Link to="/">
					<p className="text-lg">Poll Web</p>
				</Link>
			</div>
			<section className="hidden md:flex items-center h-full">
				<ul className="flex justify-evenly items-center h-full mr-6">
					<li className="mr-4 hover:cursor-pointer">
						<Link to="/">Home</Link>
					</li>
					<li className="mr-4">
						<Link to="/explore">Explore</Link>
					</li>
					{isLoggedIn && (
						<li>
							<Link to="/mypolls">My Polls</Link>
						</li>
					)}
				</ul>
				{isLoggedIn ? (
					<button className="mr-3 border-2 border-black pl-6 pr-6" onClick={logoutHandler}>
						Log out
					</button>
				) : (
					<button className="mr-3 border-2 border-black pl-6 pr-6" onClick={() => navigate('/auth')}>
						Log in
					</button>
				)}
			</section>
		</div>
	);
};

export default Header;
