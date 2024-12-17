import axios from "axios";
import { siteConfig } from "../config/site";
import { MovieCredits } from "../types/cast";
import { Movie, MovieListResponse } from "../types/movie";
import { Person, PersonCredits } from "../types/person";
import { VideoResponse } from "../types/video";
const { ACCESS_TOKEN, BASE_URL, IMAGE_BASE_URL } = siteConfig;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${ACCESS_TOKEN}`,
		accept: "application/json",
	},
});

export const tmdb = {
	async getTrending() {
		const { data } = await api.get<MovieListResponse>("/trending/movie/week");
		return data;
	},

	async getPopular(page = 1) {
		const { data } = await api.get<MovieListResponse>("/movie/popular", {
			params: { page },
		});
		return data;
	},

	async searchMovies(query: string, page = 1) {
		const { data } = await api.get<MovieListResponse>("/search/movie", {
			params: { query, page },
		});
		return data;
	},

	async getMovie(id: number) {
		const { data } = await api.get<Movie>(`/movie/${id}`);
		return data;
	},

	async getMovieVideos(id: number) {
		const { data } = await api.get<VideoResponse>(`/movie/${id}/videos`);
		return data;
	},

	async getMovieCredits(id: number) {
		const { data } = await api.get<MovieCredits>(`/movie/${id}/credits`);
		return data;
	},

	async getPersonDetails(id: number) {
		const { data } = await api.get<Person>(`/person/${id}`);
		return data;
	},

	async getPersonCredits(id: number) {
		const { data } = await api.get<PersonCredits>(
			`/person/${id}/movie_credits`
		);
		return data;
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
