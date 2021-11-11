import React, { useContext } from 'react';
import AuthContext from '../../Store/auth-context';
import PollBar from '../PollBar/PollBar';
const PollCard = (props) => {
	let authCtx = useContext(AuthContext);
	let canVote;
	if (authCtx.votes) {
		canVote = !!authCtx.votes.find((e) => e.pollId === props.id);
	}
	let options = props.options.map((opt, i) => (
		<PollBar
			key={opt.id}
			optionName={opt.value}
			votes={opt.votes}
			totalVotes={props.votes}
			completed={canVote}
			selected={opt.selected}
		/>
	));
	return (
		<div className="w-full md:w-10/12 mt-3 mb-3 border-b border-gray-900  flex flex-col items-center">
			<div className="w-full">
				<div className="w-full bg-yellow-400 mt-2 border-b flex flex-col md:flex-row md:justify-between items-center">
					<div className="flex items-center">
						<div className="flex justify-center items-center text-2xl ">
							<p className="ml-6">{props.pollTitle}</p>
						</div>
					</div>
					<div className="md:mr-6 flex flex-col items-center">
						<p>Created by {props.owner}</p>
						<p>
							{props.votes}
							{props.votes > 1 ? ' Votes' : ' Vote'}
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center w-full">{canVote && options}</div>
			<div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 w-full">
				<div className="ml-4">
					<p>Created: {props.created}</p>
				</div>
				{!canVote && (
					<div className="w-auto md:w-auto md:mr-4 flex justify-between items-center">
						{!authCtx.isLoggedIn && <span>You must be logged in to vote</span>}
						{authCtx.isLoggedIn &&
							(props.showBtn && (
								<button
									className="w-32 py-4 md:px-12 md:py-2 text-white bg-green-400"
									onClick={props.onBtnClick}
								>
									Vote
								</button>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default PollCard;
