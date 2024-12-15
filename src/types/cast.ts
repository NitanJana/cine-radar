export interface Cast {
	id: number;
	name: string;
	character: string;
	profile_path: string | null;
	order: number;
}

export interface MovieCredits {
	id: number;
	cast: Cast[];
}
