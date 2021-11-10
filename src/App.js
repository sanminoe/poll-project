import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import ExplorePage from './containers/ExplorePage/ExplorePage';
import HomePage from './containers/HomePage/HomePage';
import MyPollsPage from './containers/MyPollsPage/MyPollsPage';
import { Link } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import AuthContext from './Store/auth-context';
function App() {
	const authCtx = useContext(AuthContext);
	return (
		<div className="App">
			<Header />
			<section>
				<ul className="flex flex-col md:hidden items-center w-full h-full mt-2 mb-2 mr-6">
					<li className="hover:cursor-pointer border-b mb-1">
						<Link to="/">Home</Link>
					</li>
					<li className="border-b mb-1">
						<Link to="/explore">Explore</Link>
					</li>
					<li className="border-b">
						<Link to="/mypolls">My Polls</Link>
					</li>
				</ul>
			</section>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route
					path="/mypolls"
					element={authCtx.isLoggedIn ? <MyPollsPage /> : <Navigate replace to="/auth" />}
				/>
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
