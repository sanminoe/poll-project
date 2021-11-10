const Card = ({ titleFeature, descriptionFeature, icon }) => {
	return (
		<div className="flex flex-col items-center w-64 mt-5 mb-5 rounded-t border-r border-l border-gray-300">
			<div className="w-full text-center text-black text-3xl">
				<p className="p-2 font-light">{titleFeature}</p>
			</div>
			<div className="mt-3">{icon}</div>
			<div className="w-full mt-3">
				<p className="mx-4 text-center">{descriptionFeature}</p>
			</div>
		</div>
	);
};

export default Card;
