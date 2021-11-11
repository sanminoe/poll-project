import React, { useState, useContext } from 'react';
import AuthContext from '../../Store/auth-context';
import PollBar from '../PollBar/PollBar';

const Poll = (props) => {
	let authCtx = useContext(AuthContext);
	let [ optionsData, setOptionData ] = useState([ ...props.options ]);
	let [ selectedData, setSelectedData ] = useState({ optionId: '', pollId: props.id });
	let [ canSeeResult, setCanSeeResult ] = useState(false);

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

		setSelectedData({ optionId: optionId, pollId: props.id });
		setOptionData(selected);
	};
	let voteHandler = async () => {
		let options = [ ...optionsData ];
		if (!!selectedData.optionId) {
			let newOptions = options.map((e) => {
				if (e.selected) {
					e.votes += 1;
				}
				delete e.selected;
				return e;
			});

			// uodate Vote count
			await fetch(
				`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/polls/${props.keyPoll}.json?auth=${authCtx.token}`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						votes: props.votes + 1,
						options: newOptions
					})
				}
			);
			let votes = [ ...authCtx.votes ];
			votes.push(selectedData);
			await fetch(
				`https://voting-app-4e43b-default-rtdb.europe-west1.firebasedatabase.app/users/${authCtx.user
					.key}.json?auth=${authCtx.token}`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						votes: votes
					})
				}
			);

			setSelectedData({});
			setCanSeeResult(true);
			props.onVote();
		}
	};
	let options = optionsData.map((opt, i) => (
		<PollBar
			key={opt.id}
			optionName={opt.value}
			votes={opt.votes}
			totalVotes={props.votes}
			completed={canSeeResult}
			onVoteSelection={() => selectOptionHandler(opt.id)}
			selected={opt.selected}
		/>
	));

	return (
		<div className=" w-full mt-3 mb-3 flex flex-col items-center">
			<div className="w-full">
				<div className="w-full mt-2 flex items-center">
					<div className="w-full md:mr-6 flex flex-col md:flex-row items-center md:justify-between">
						<p className="md:ml-6">Created by {props.owner}</p>
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
					<p>Created: {props.created}</p>
				</div>
				{!canSeeResult && (
					<div className="w-auto md:mr-4 flex flex-col">
						<button
							disabled={!authCtx.isLoggedIn}
							className={`w-32 py-4 md:px-12 md:py-2 text-white ${authCtx.isLoggedIn
								? 'bg-green-400'
								: 'bg-gray-800'}`}
							onClick={voteHandler}
						>
							Vote
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Poll;
