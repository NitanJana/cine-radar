import { Link } from "react-router";
import { User2 } from "lucide-react";
import { tmdb } from "../../services/tmdb";
import { Cast } from "../../types/cast";

const CastMember = ({ member }: { member: Cast }) => {
	const profileUrl = tmdb.getProfileUrl(member.profile_path);

	return (
		<Link
			to={`/person/${member.id}`}
			className='bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105'>
			<div className='aspect-[2/3] relative'>
				{profileUrl ? (
					<img
						src={profileUrl}
						alt={member.name}
						className='w-full h-full object-cover'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center bg-gray-700'>
						<User2
							size={32}
							className='text-gray-400'
						/>
					</div>
				)}
			</div>
			<div className='p-3'>
				<h3 className='font-medium text-sm'>{member.name}</h3>
				<p className='text-sm text-gray-400 mt-1'>{member.character}</p>
			</div>
		</Link>
	);
};

export default CastMember;
