import { Cast } from "../../types/cast";
import CastMember from "./CastMember";

const CastList = ({ cast }: { cast: Cast[] }) => {
	return (
		<div className='mt-12'>
			<h2 className='text-2xl font-bold mb-6'>Cast</h2>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
				{cast.slice(0, 12).map((member) => (
					<CastMember
						key={member.id}
						member={member}
					/>
				))}
			</div>
		</div>
	);
};

export default CastList;
