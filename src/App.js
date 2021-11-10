import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import ExplorePage from './containers/ExplorePage/ExplorePage';
import HomePage from './containers/HomePage/HomePage';
import MyPollsPage from './containers/MyPollsPage/MyPollsPage';
import { Link, useNavigate } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import AuthContext from './Store/auth-context';
function App() {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const logoutHandler = () => {
		authCtx.logout();
		navigate('/');
	};
	return (
		<div className="App">
			<Header onLogOut={logoutHandler} />
			<section className="flex flex-col md:hidden items-center mb-4">
				<ul className="flex flex-col items-center w-full h-full mt-2 mb-2">
					<li className="hover:cursor-pointer border-b mb-1">
						<Link to="/">Home</Link>
					</li>
					<li className="border-b mb-1">
						<Link to="/explore">Explore</Link>
					</li>
					{authCtx.isLoggedIn && (
						<li className="border-b">
							<Link to="/mypolls">My Polls</Link>
						</li>
					)}
				</ul>
				{authCtx.isLoggedIn ? (
					<button className="border-2 border-black pl-6 pr-6" onClick={logoutHandler}>
						Log out
					</button>
				) : (
					<button className="border-2 border-black pl-6 pr-6" onClick={() => navigate('/auth')}>
						Log in
					</button>
				)}
			</section>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route
					path="/mypolls"
					element={authCtx.isLoggedIn ? <MyPollsPage /> : <Navigate replace to="/auth" />}
				/>
				<Route path="/auth" element={authCtx.isLoggedIn ? <Navigate replace to="/mypolls" /> : <Auth />} />
			</Routes>
		</div>
	);
}

export default App;
