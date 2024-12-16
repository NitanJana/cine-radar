import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { tmdb } from "../services/tmdb";
import { MovieCard } from "../components/movie/MovieCard";

function LoadingGrid() {
	return (
		<div className='flex items-center justify-center py-12'>
			<Loader className='h-8 w-8 animate-spin text-blue-500' />
		</div>
	);
}

const HomePage = () => {
	const { data: trending, isLoading: trendingLoading } = useQuery({
		queryKey: ["trending"],
		queryFn: () => tmdb.getTrending(),
	});

	const { data: popular, isLoading: popularLoading } = useQuery({
		queryKey: ["popular"],
		queryFn: () => tmdb.getPopular(),
	});

	return (
		<div className='container py-6'>
			<section className='mb-12'>
				<h2 className='mb-6 text-2xl font-bold text-white'>
					Trending This Week
				</h2>
				{trendingLoading ? (
					<LoadingGrid />
				) : (
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
						{trending?.results?.slice(0, 5).map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
							/>
						))}
					</div>
				)}
			</section>

			<section>
				<h2 className='mb-6 text-2xl font-bold text-white'>Popular Movies</h2>
				{popularLoading ? (
					<LoadingGrid />
				) : (
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
						{popular?.results?.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
							/>
						))}
					</div>
				)}
			</section>
		</div>
	);
};

export default HomePage;
