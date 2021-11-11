import { useNavigate } from 'react-router';
import Card from '../../components/Card/Card';
import { BsShare } from 'react-icons/bs';
import { MdOutlineWhereToVote, MdOutlineCreate } from 'react-icons/md';

const HomePage = (props) => {
	const navigate = useNavigate();
	return (
		<main>
			<div className="relative flex flex-col bg-yellow-400">
				<div className="w-full flex flex-col items-center">
					<div className="flex flex-col mt-12 items-center">
						<h1 className="text-3xl md:text-4xl">Create your polls now!</h1>
						<p className="text-xl mt-2">Create, Vote and Share!</p>
					</div>
					<article className="mt-6  flex justify-center w-full ">
						<button
							className="bg-green-500 px-9 py-3 my-4 mb-6 text-white"
							onClick={() => navigate('/explore')}
						>
							Start Here!
						</button>
					</article>
				</div>
				<div className="hidden md:flex flex-col w-48 h-24 absolute top-3/4 md:top-2/3 self-end  items-end z-20">
					<div className="bg-red-600 w-1/5 h-12 rounded-l" />
					<div className="bg-green-500 w-3/5 h-12 rounded-l" />
					<div className="bg-blue-600 w-full h-12 rounded-l" />
				</div>
			</div>
			<section id="features" className="flex flex-col items-center mt-10 z-40">
				<article className="flex flex-col md:flex-row justify-center">
					<Card
						titleFeature="Create"
						descriptionFeature="Create your own polls."
						icon={<MdOutlineCreate className="text-2xl" />}
					/>
					<Card
						titleFeature="Share"
						descriptionFeature="Share with other people!"
						icon={<BsShare className="text-2xl" />}
					/>
					<Card
						titleFeature="Vote"
						descriptionFeature="Vote one time per poll (Log-in required to vote)"
						icon={<MdOutlineWhereToVote className="text-2xl" />}
					/>
				</article>
			</section>
		</main>
	);
};

export default HomePage;
