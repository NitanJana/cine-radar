import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "../services/tmdb";
import {
	Clock,
	Star,
	DollarSign,
	Loader,
	Calendar,
	Clapperboard,
} from "lucide-react";
import CastList from "../components/movie/CastList";
import { useEffect, useState } from "react";

const MoviePage = () => {
	const { id } = useParams<{ id: string }>();

	const [trailerKey, setTrailerKey] = useState<string | null>(null);
	const [showTrailer, setShowTrailer] = useState(false);

	const { data: movie, isLoading: isLoadingMovie } = useQuery({
		queryKey: ["movie", id],
		queryFn: () => tmdb.getMovie(Number(id)),
		enabled: !!id,
	});

	const { data: credits, isLoading: isLoadingCredits } = useQuery({
		queryKey: ["movie-credits", id],
		queryFn: () => tmdb.getMovieCredits(Number(id)),
		enabled: !!id,
	});

	const { data: videos, isLoading: isLoadingVideos } = useQuery({
		queryKey: ["movie-videos", id],
		queryFn: () => tmdb.getMovieVideos(Number(id)),
		enabled: !!id,
	});

	useEffect(() => {
		if (videos?.results) {
			const trailer = videos.results.find(
				(video) => video.site === "YouTube" && video.type === "Trailer"
			);
			if (trailer) setTrailerKey(trailer.key);
		}
	}, [videos]);

	const isLoading = isLoadingMovie || isLoadingCredits || isLoadingVideos;

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen bg-gray-900'>
				<Loader className='h-8 w-8 animate-spin text-blue-500' />
			</div>
		);
	}

	if (!movie) return null;

	return (
		<div className='min-h-screen bg-gray-900 text-white pb-6'>
			<div
				className='relative h-[70vh] bg-cover bg-center'
				style={{
					backgroundImage: `url(${tmdb.getBackdropUrl(movie.backdrop_path)})`,
				}}>
				<div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent' />
			</div>

			<div className='container -mt-32 relative z-10'>
				<div className='flex flex-col md:flex-row gap-8'>
					<img
						src={tmdb.getPosterUrl(movie.poster_path) ?? ""}
						alt={movie.title}
						className='rounded-lg shadow-xl w-64 mx-auto md:mx-0'
					/>
					<div className='flex-1'>
						<h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
						{movie.tagline && (
							<p className='text-xl text-gray-400 mb-4 italic'>
								&quot;{movie.tagline}&quot;
							</p>
						)}

						<div className='flex gap-6 mb-6'>
							<div className='flex items-center gap-2'>
								<Star
									className='text-yellow-400'
									size={20}
								/>
								<span>{movie.vote_average.toFixed(1)}</span>
							</div>
							<div className='flex items-center gap-2'>
								<Clock size={20} />
								<span>{movie.runtime} min</span>
							</div>
							<div className='flex items-center gap-2'>
								<Calendar size={20} />
								<span>{new Date(movie.release_date).getFullYear()}</span>
							</div>
						</div>

						<p className='text-lg mb-6'>{movie.overview}</p>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<h2 className='text-gray-400 mb-2'>Genres</h2>
								<div className='flex flex-wrap gap-2'>
									{movie.genres.map((genre) => (
										<span
											key={genre.id}
											className='px-3 py-1 bg-blue-500/20 rounded-full text-sm'>
											{genre.name}
										</span>
									))}
								</div>
							</div>

							{movie.budget > 0 && (
								<div>
									<h2 className='text-gray-400 mb-2'>Budget</h2>
									<div className='flex items-center gap-2'>
										<DollarSign size={20} />
										<span>{movie.budget.toLocaleString()}</span>
									</div>
								</div>
							)}
						</div>

						{/* Watch Trailer Button */}
						{trailerKey && (
							<button
								onClick={() => setShowTrailer(true)}
								className='flex items-center gap-3 py-2 px-4 mt-6 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transform transition-all duration-300 border-b-4 border-red-500 hover:border-red-600'>
								<Clapperboard
									size={20}
									strokeWidth={2}
								/>
								<span className='text-lg'>Watch Trailer</span>
							</button>
						)}
					</div>
				</div>

				{credits?.cast && credits.cast.length > 0 && (
					<CastList cast={credits.cast} />
				)}
			</div>

			{/* Trailer Modal */}
			{showTrailer && trailerKey && (
				<div
					className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50'
					onClick={(e) => {
						if (e.target === e.currentTarget) setShowTrailer(false);
					}}>
					<dialog
						open
						className='relative w-[90%] md:w-[70%] aspect-video rounded-lg'
						onClose={() => setShowTrailer(false)}>
						<iframe
							width='100%'
							height='100%'
							src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&modestbranding=1&showinfo=0&controls=1`}
							allowFullScreen
							title='YouTube video player'></iframe>
					</dialog>
				</div>
			)}
		</div>
	);
};

export default MoviePage;
