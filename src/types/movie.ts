export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	vote_average: number;
	genre_ids: number[];
	runtime: number;
	tagline: string;
	genres: { id: number; name: string }[];
	budget: number;
	popularity: number;
	adult: boolean;
}

export interface MovieListResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}
