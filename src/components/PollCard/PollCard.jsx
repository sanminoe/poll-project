import React, { useState } from 'react';

import PollBar from '../PollBar/PollBar';
import { AiOutlineArrowDown } from 'react-icons/ai';

const PollCard = (props) => {
	let [ optionsData, setOptionData ] = useState([ ...props.options ]);
	let selectOptionHandler = (optionId) => {
		let opt = [ ...optionsData ];
		let selected = opt.map((o) => {
			if (o.id === optionId) {
				o.selected = true;
			}
			else {
				o.selected = false;
			}
			return o;
		});
		setOptionData(selected);
	};
	let voteHandler = async () => {
		let options = [ ...optionsData ];
		let newOptions = options.map((e) => {
			if (e.selected) {
				e.votes += 1;
			}
			delete e.selected;
			return e;
		});

		let res = await fetch(
			`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/polls/${props.keyPoll}.json`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					votes: props.votes + 1,
					options: newOptions
				})
			}
		);
		console.log(await res.json());
		props.onVote(props.id);
	};
	let options = optionsData.map((opt, i) => (
		<PollBar
			key={opt.id}
			optionName={opt.value}
			votes={opt.votes}
			totalVotes={props.votes}
			completed={props.completed}
			onVoteSelection={() => selectOptionHandler(opt.id)}
			selected={opt.selected}
		/>
	));

	return (
		<div className="w-full md:w-10/12 mt-3 mb-3 border shadow-md flex flex-col items-center">
			<div className="w-full">
				<div className="w-full mt-2 border-b flex justify-between items-center">
					<div className="flex items-center">
						<div className="flex justify-center items-center text-3xl ">
							<p className="ml-6">{props.pollTitle}</p>
						</div>
					</div>
					<div className="mr-6">
						<p>Status: {props.completed ? 'You have already voted.' : null}</p>
						<p>
							{props.votes}
							{props.votes > 1 ? ' Votes' : ' Vote'}
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center w-full">{options}</div>
			</div>
			<div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 w-full">
				<div className="ml-4">
					<p>Created: 14/01/21</p>
				</div>
				{!props.completed && (
					<div className="w-full md:w-auto md:mr-4">
						<button className="w-full md:px-12 md:py-2 text-white bg-green-400" onClick={voteHandler}>
							Vote
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default PollCard;
