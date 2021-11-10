import React, { useEffect, useState } from 'react';
import BackDrop from '../../components/BackDrop/BackDrop';
import PollCreationWindow from '../PollCreationWindow/PollCreationWindow';
import { v4 as uuid } from 'uuid';
import PollCard from '../../components/PollCard/PollCard';

// https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/
const MyPollsPage = (props) => {
	let [ polls, setPolls ] = useState([]);
	let [ isCreateWindowOpen, setIsCreateWindowOpen ] = useState(false);

	let createPollHandler = (data) => {
		let p = [ ...polls ];
		let poll = {
			id: uuid(),
			votes: 0,
			completed: false,
			options: [ ...data.pollOptions ],
			open: true,
			pollTitle: data.pollTitle
		};
		let pollFormatted = {
			id: poll.id,
			votes: poll.votes,
			completed: false,
			options: poll.options,
			pollTitle: data.pollTitle
		};
		p.push(poll);
		fetch(`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/polls.json`, {
			method: 'POST',
			body: JSON.stringify(pollFormatted)
		}).then((res) => {
			console.log(res.json());
		});
		setPolls(p);
		setIsCreateWindowOpen(false);
	};
	let pollsElement = polls.map((poll) => (
		<PollCard
			key={poll.id}
			pollTitle={poll.pollTitle}
			votes={poll.votes}
			completed={poll.completed}
			open={poll.open}
			options={poll.options}
		/>
	));

	return (
		<div className="flex flex-col items-center">
			{isCreateWindowOpen ? (
				<PollCreationWindow onCancel={() => setIsCreateWindowOpen(false)} onCreatePoll={createPollHandler} />
			) : null}
			{isCreateWindowOpen ? <BackDrop /> : null}
			<section className="flex flex-col md:flex-row items-center w-3/4 mt-6 md:justify-between bg-yellow-400">
				<section className="flex flex-col md:flex-row items-center">
					<div className="md:flex-1 md:ml-6">
						<h3 className="text-3xl">My Polls</h3>
					</div>
				</section>
				<div>
					<button className="border p-4 bg-blue-700 text-white" onClick={() => setIsCreateWindowOpen(true)}>
						Create Poll
					</button>
				</div>
			</section>
			<div className="flex flex-col items-center w-3/4 mt-3">{pollsElement}</div>
		</div>
	);
};

export default MyPollsPage;
