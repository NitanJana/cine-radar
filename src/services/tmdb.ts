import { siteConfig } from "../config/site";

export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	vote_average: number;
	genre_ids: number[];
	runtime?: number;
}

export interface MovieResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export const tmdbApi = {
	async getTrending() {
		const response = await fetch(
			`${siteConfig.tmdbBaseUrl}/trending/movie/week?api_key=${siteConfig.tmdbApiKey}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch trending movies");
		}
		return response.json() as Promise<MovieResponse>;
	},

	async getPopular(page = 1) {
		const response = await fetch(
			`${siteConfig.tmdbBaseUrl}/movie/popular?api_key=${siteConfig.tmdbApiKey}&page=${page}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch popular movies");
		}
		return response.json() as Promise<MovieResponse>;
	},

	async getMovie(id: string) {
		const response = await fetch(
			`${siteConfig.tmdbBaseUrl}/movie/${id}?api_key=${siteConfig.tmdbApiKey}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch movie details");
		}
		return response.json() as Promise<Movie>;
	},


  async searchMovies(query: string, page = 1) {
		const response = await fetch(
			`${siteConfig.tmdbBaseUrl}/search/movie?api_key=${
				siteConfig.tmdbApiKey
			}&query=${encodeURIComponent(query)}&page=${page}`
		);
		if (!response.ok) {
			throw new Error("Failed to search movies");
		}
		return response.json() as Promise<MovieResponse>;
	},
};
