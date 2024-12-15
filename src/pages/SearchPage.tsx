import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader } from "lucide-react";
import { MovieCard } from "../components/movie/MovieCard";
import { tmdb } from "../services/tmdb";
import SearchPagination from "../components/search/SearchPagination";

const SearchPage = () => {
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [debouncedQuery]);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 400);

		return () => {
			clearTimeout(handler);
		};
	}, [query]);

	const { data, isLoading } = useQuery({
		queryKey: ["search", debouncedQuery, page],
		queryFn: () => tmdb.searchMovies(debouncedQuery, page),
		enabled: debouncedQuery.length > 0,
	});

	const searchResults = data?.results ?? [];

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<div className='container py-6'>
			<div className='mb-8'>
				<div className='relative'>
					<Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
					<input
						type='text'
						placeholder='Search movies...'
						value={query}
						onInput={(e) => setQuery(e.currentTarget.value)}
						className='w-full rounded-lg bg-gray-800 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>
			</div>

			{debouncedQuery.length > 0 && (
				<div className='flex flex-col gap-2 items-center justify-center py-2'>
					{isLoading && (
						<Loader className='h-8 w-8 animate-spin text-blue-500' />
					)}

					{!isLoading && searchResults.length === 0 && (
						<p className='text-2xl font-bold text-white'>Movie not found</p>
					)}

					{!isLoading && searchResults.length > 0 && (
						<>
							<SearchPagination
								page={page}
								totalPages={data?.total_pages}
								onPageChange={handlePageChange}
							/>

							<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
								{searchResults.map((movie) => (
									<MovieCard
										key={movie.id}
										movie={movie}
									/>
								))}
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchPage;
