import { siteConfig } from "../config/site";
import { MovieCredits } from "../types/cast";
import { Movie, MovieResponse } from "../types/movie";
const { API_KEY, BASE_URL, IMAGE_BASE_URL } = siteConfig;

export const tmdb = {
	async getTrending() {
		const response = await fetch(
			`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch trending movies");
		}
		return response.json() as Promise<MovieResponse>;
	},

	async getPopular(page = 1) {
		const response = await fetch(
			`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch popular movies");
		}
		return response.json() as Promise<MovieResponse>;
	},

	async getMovie(id: number) {
		const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
		if (!response.ok) {
			throw new Error("Failed to fetch movie details");
		}
		return response.json() as Promise<Movie>;
	},
	async getMovieCredits(id: number) {
		const response = await fetch(
			`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch movie credit details");
		}
		return response.json() as Promise<MovieCredits>;
	},

	async searchMovies(query: string, page = 1) {
		const response = await fetch(
			`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
				query
			)}&page=${page}`
		);
		if (!response.ok) {
			throw new Error("Failed to search movies");
		}
		return response.json() as Promise<MovieResponse>;
	},

	getPosterUrl(path: string | null, size: "w500" | "original" = "w500") {
		if (!path) return null;
		return `${IMAGE_BASE_URL}/${size}${path}`;
	},

	getBackdropUrl(path: string | null, size: "w1280" | "original" = "w1280") {
		if (!path) return null;
		return `${IMAGE_BASE_URL}/${size}${path}`;
	},

	getProfileUrl(path: string | null, size: "w185" | "h632" = "w185") {
		if (!path) return null;
		return `${IMAGE_BASE_URL}/${size}${path}`;
	},
};
