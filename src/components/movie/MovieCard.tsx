import { useState } from "react";
import { Link } from "react-router";
import { Star } from "lucide-react";
import { tmdb } from "../../services/tmdb";
import { Movie } from "../../types/movie";

interface MovieCardProps {
	movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	return (
		<Link
			to={`/movie/${movie.id}`}
			className='group relative overflow-hidden rounded-lg bg-gray-900 transition-all hover:scale-105'>
			{/* Placeholder image */}
			{(!isImageLoaded || !movie.poster_path) && (
				<div
					className={`absolute inset-0 bg-gray-800 flex items-center justify-center ${
						movie.poster_path ? "animate-pulse" : ""
					}`}>
					<svg
						className='w-1/2 h-full text-gray-600'
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
							clipRule='evenodd'
						/>
					</svg>
				</div>
			)}

			{/* Actual image */}
			<img
				src={tmdb.getPosterUrl(movie.poster_path) ?? ""}
				alt={movie.poster_path ? movie.title : ""}
				className={`h-full w-full object-cover transition-all 
          ${!isImageLoaded ? "opacity-0" : "opacity-100"} 
          group-hover:opacity-50`}
				loading='lazy'
				onLoad={() => setIsImageLoaded(true)}
			/>

			<div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100'>
				<h3 className='text-lg font-bold text-white'>{movie.title}</h3>
				<div className='flex items-center gap-2'>
					<Star className='h-4 w-4 text-yellow-400' />
					<span className='text-sm text-white'>
						{movie.vote_average?.toFixed(1) || "N/A"}
					</span>
				</div>
			</div>
		</Link>
	);
}
