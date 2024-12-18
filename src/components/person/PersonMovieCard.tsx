import { Link } from "react-router";
import { Calendar } from "lucide-react";
import { tmdb } from "../../services/tmdb";

interface PersonMovieCardProps {
	movie: {
		id: number;
		title: string;
		poster_path: string | null;
		character: string;
		release_date: string;
	};
}

const PersonMovieCard = ({ movie }: PersonMovieCardProps) => {
	const posterUrl = tmdb.getPosterUrl(movie.poster_path);
	const releaseYear = movie.release_date
		? new Date(movie.release_date).getFullYear()
		: null;
	const releaseDate = movie.release_date
		? new Date(movie.release_date)
		: null;
	const isFutureRelease = releaseDate ? releaseDate > new Date() : false;

	return (
		<Link
			to={`/movie/${movie.id}`}
			className='bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105 relative'>
			{isFutureRelease && (
				<div className='absolute inset-x-0 top-0 bg-blue-500 text-center text-white font-bold py-1'>
					Coming Soon
				</div>
			)}
			{posterUrl ? (
				<img
					src={posterUrl}
					alt={movie.title}
					className='w-full aspect-[2/3] object-cover'
				/>
			) : (
				<div className='w-full aspect-[2/3] bg-gray-700 flex items-center justify-center'>
					<span className='text-gray-500'>No Image</span>
				</div>
			)}
			<div className='p-3'>
				<h3 className='font-medium text-sm'>{movie.title}</h3>
				<p className='text-sm text-gray-400 mt-1'>{movie.character}</p>
				{releaseYear && (
					<div className='flex items-center gap-1 text-gray-500 text-sm mt-2'>
						<Calendar size={14} />
						<span>{releaseYear}</span>
					</div>
				)}
			</div>
		</Link>
	);
};

export default PersonMovieCard;

