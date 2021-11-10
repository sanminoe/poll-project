import React, { useState, useContext, useEffect } from 'react';
import BackDrop from '../../components/BackDrop/BackDrop';
import PollCreationWindow from '../PollCreationWindow/PollCreationWindow';
import { v4 as uuid } from 'uuid';
import AuthContext from '../../Store/auth-context';
import PollCard from '../../components/PollCard/PollCard';
const MyPollsPage = (props) => {
	let [ polls, setPolls ] = useState([]);
	let [ isCreateWindowOpen, setIsCreateWindowOpen ] = useState(false);
	let authCtx = useContext(AuthContext);

	let createPollHandler = (data) => {
		let p = [ ...polls ];
		if (data.pollTitle.length > 3) {
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			let yyyy = today.getFullYear();
			today = dd + '/' + mm + '/' + yyyy;
			let poll = {
				id: uuid(),
				votes: 0,
				completed: false,
				options: [ ...data.pollOptions ],
				open: true,
				pollTitle: data.pollTitle,
				created: today
			};

			let pollFormatted = {
				id: poll.id,
				votes: poll.votes,
				completed: false,
				options: poll.options,
				pollTitle: data.pollTitle,
				createdBy: authCtx.user.id,
				ownerUsername: authCtx.user.username,
				created: poll.created
			};
			p.push(poll);
			fetch(
				`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/polls.json?auth=${authCtx.token}`,
				{
					method: 'POST',
					body: JSON.stringify(pollFormatted)
				}
			);

			authCtx.setVotes();

			setPolls(p);
			setIsCreateWindowOpen(false);
		}
	};

	let getPollCreatedByUser = async (userId) => {
		let poll = [];
		if (!!authCtx.user && !!authCtx.user.id) {
			let res = await fetch(
				`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/polls.json?auth=${authCtx.token}&orderBy="createdBy"&equalTo="${authCtx
					.user.id}"`
			);
			let data = await res.json();

			for (const key in data) {
				let p = data[key];
				p.key = key;
				poll.push(p);
			}
			authCtx.setVotes();
		}
		setPolls(poll);
	};

	useEffect(() => {
		getPollCreatedByUser();
	}, []);
	let pollsElement = polls.map((poll) => (
		<PollCard
			key={poll.id}
			pollTitle={poll.pollTitle}
			votes={poll.votes}
			completed={poll.completed}
			id={poll.id}
			owner={poll.ownerUsername}
			options={poll.options}
			created={poll.created}
		/>
	));

	return (
		<div className="flex flex-col items-center">
			{isCreateWindowOpen ? (
				<PollCreationWindow
					onCancel={() => setIsCreateWindowOpen(false)}
					onClose={() => setIsCreateWindowOpen(false)}
					onCreatePoll={createPollHandler}
				/>
			) : null}

			{isCreateWindowOpen ? <BackDrop /> : null}
			<section className="flex flex-col md:flex-row items-center w-3/4 mt-6 md:justify-between bg-yellow-400">
				<section className="flex flex-col md:flex-row items-center">
					<div className="md:flex-1 md:ml-6">
						<h3 className="text-3xl">My Polls</h3>
					</div>
				</section>
				<div>
					<button
						className="p-4 my-4 md:my-0 bg-blue-600 text-white"
						onClick={() => setIsCreateWindowOpen(true)}
					>
						Create Poll
					</button>
				</div>
			</section>
			<div className="flex flex-col items-center w-3/4 mt-3">
				{pollsElement.length > 0 ? (
					pollsElement
				) : (
					<div className="w-full h-24 text-center rounded mt-5 text-2xl border flex items-center justify-center bg-gray-100">
						<p>Nothing Here!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MyPollsPage;
