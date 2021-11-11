import PollCard from '../../components/PollCard/PollCard';
import React, { useState, useEffect, useContext } from 'react';
import BackDrop from '../../components/BackDrop/BackDrop';
import useBackdrop from '../../helpers/useBackDrop';
import Modal from '../../components/Modal/Modal';
import Poll from '../../components/Poll/Poll';
import AuthContext from '../../Store/auth-context';

const ExplorePage = (props) => {
	let [ pollsData, setPollsData ] = useState([]);
	const [ isOpen, setIsOpen ] = useBackdrop();
	const authCtx = useContext(AuthContext);
	let [ selectedPoll, setSelectedPoll ] = useState();

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
		setPollsData(p);
		authCtx.setVotes();
	};
	// Get all polls
	useEffect(() => {
		getAllPolls();
		authCtx.setVotes();
	}, []);
	useEffect(
		() => {
			if (selectedPoll) {
				selectPollHandler(selectedPoll.id);
			}
		},
		[ pollsData ]
	);

	let selectPollHandler = (id) => {
		setIsOpen(true);
		let p = [ ...pollsData ];

		let selected = p.find((e) => e.id === id);

		setSelectedPoll(selected);
	};
	let pollsCard = pollsData.map((poll) => (
		<PollCard
			key={poll.id}
			pollTitle={poll.pollTitle}
			votes={poll.votes}
			completed={poll.completed}
			id={poll.id}
			owner={poll.ownerUsername}
			onBtnClick={() => selectPollHandler(poll.id)}
			options={poll.options}
			showBtn={true}
			created={poll.created}
		/>
	));
	let closeModalHandler = () => {
		setIsOpen(false);
		setSelectedPoll({});
	};
	return (
		<div className="flex flex-col items-center">
			<div className="mt-2 w-4/5 md:w-3/4 border-b border-gray-400">
				<div className="ml-2 m-4">
					<h2 className="text-3xl">Explore</h2>
				</div>
			</div>
			<div className="flex flex-col items-center w-3/4 mt-3">{pollsCard}</div>
			{isOpen && <BackDrop />}
			{isOpen && (
				<Modal onClose={closeModalHandler} modalTitle={selectedPoll.pollTitle}>
					<Poll
						votes={selectedPoll.votes}
						owner={selectedPoll.ownerUsername}
						completed={selectedPoll.completed}
						id={selectedPoll.id}
						options={selectedPoll.options}
						closeModal={closeModalHandler}
						keyPoll={selectedPoll.key}
						onVote={getAllPolls}
						created={selectedPoll.created}
					/>
				</Modal>
			)}
		</div>
	);
};

export default ExplorePage;
