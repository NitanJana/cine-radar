export interface Person {
	id: number;
	name: string;
	biography: string;
	profile_path: string | null;
	birthday: string | null;
	deathday: string | null;
	place_of_birth: string | null;
	known_for_department: string;
	also_known_as: string[];
}

export interface PersonCredits {
	id: number;
	cast: {
		id: number;
		title: string;
		poster_path: string | null;
		character: string;
		release_date: string;
	}[];
}
