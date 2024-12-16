import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "../services/tmdb";
import { Clock, Star, DollarSign, Loader, Calendar } from "lucide-react";
import CastList from "../components/movie/CastList";

const MoviePage = () => {
	const { id } = useParams<{ id: string }>();

	const { data: movie, isLoading: isLoadingMovie } = useQuery({
		queryKey: ["movie", id],
		queryFn: () => tmdb.getMovie(Number(id)),
	});

	const { data: credits, isLoading: isLoadingCredits } = useQuery({
		queryKey: ["movie-credits", id],
		queryFn: () => tmdb.getMovieCredits(Number(id)),
		enabled: !!id,
	});

	const isLoading = isLoadingMovie || isLoadingCredits;

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
								<h3 className='text-gray-400 mb-2'>Genres</h3>
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
									<h3 className='text-gray-400 mb-2'>Budget</h3>
									<div className='flex items-center gap-2'>
										<DollarSign size={20} />
										<span>{movie.budget.toLocaleString()}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{credits?.cast && credits.cast.length > 0 && (
					<CastList cast={credits.cast} />
				)}
			</div>
		</div>
	);
};

export default MoviePage;
