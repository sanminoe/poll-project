import PollCard from '../../components/PollCard/PollCard';
import React, { useState, useEffect } from 'react';

/* 
	user:{
		id:"",
		pollsidvoted:[],
		polls:[] // indexed
	}
	polls:{} // all
*/

const ExplorePage = (props) => {
	let [ pollsData, setPollsData ] = useState([]);
	let blockVotingHandler = (id) => {
		let p = [ ...pollsData ];
		let pIndex = p.findIndex((e) => e.id === id);
		p[pIndex].completed = true;
		p[pIndex].votes += 1;
		setPollsData(p);
	};
	let getAllPolls = async () => {
		let res = await fetch(`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/polls.json`);
		let data = await res.json();
		let p = [];
		for (const key in data) {
			let poll = data[key];
			poll.open = true;
			poll.key = key;
			p.push(poll);
		}
		console.log(p);
		setPollsData(p);
	};
	// Get all polls
	useEffect(() => {
		getAllPolls();
	}, []);
	let polls = pollsData.map((poll) => (
		<PollCard
			data={poll}
			key={poll.id}
			pollTitle={poll.pollTitle}
			votes={poll.votes}
			completed={poll.completed}
			// open={poll.open}
			id={poll.id}
			options={poll.options}
			keyPoll={poll.key}
			onVote={blockVotingHandler}
		/>
	));
	return (
		<div className="flex flex-col items-center">
			<div className="mt-2 w-4/5 md:w-3/4 border-b bg-yellow-400">
				<div className="ml-2 mt-2">
					<h2 className="text-3xl">Explore</h2>
				</div>
			</div>
			<div className="flex flex-col items-center w-3/4 mt-3">{polls}</div>
		</div>
	);
};

export default ExplorePage;
