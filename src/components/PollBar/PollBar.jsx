const PollBar = (props) => {
	let percentage = 0;
	if (props.votes > 0 && props.totalVotes > 0) {
		percentage = (props.votes / props.totalVotes * 100).toFixed(2);
	}

	return (
		<div className="flex items-center w-10/12" onClick={props.onVoteSelection}>
			<div className={`w-full mt-5 h-10 flex items-center border border-gray-600 relative`}>
				{!props.completed ? (
					<div className="ml-2">
						<div
							className={`w-6 h-6 rounded-full border border-gray-800 ${props.selected && 'bg-blue-600'}`}
							id="voteSelection"
						/>
					</div>
				) : null}
				<div className="z-40 flex justify-between w-full">
					<p className="ml-4">{props.optionName}</p>
					{props.completed && (
						<div className="flex items-center z-40 mr-3">
							<p>{percentage}%</p>
						</div>
					)}
				</div>
				<div
					style={props.completed ? { width: +percentage + '%' } : null}
					className={`${props.completed ? 'bg-green-500' : 'bg-white'} z-20 h-full absolute`}
				/>
			</div>
		</div>
	);
};

export default PollBar;
