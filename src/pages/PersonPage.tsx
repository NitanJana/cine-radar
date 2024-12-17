import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Cake, Loader, MapPin, User2 } from "lucide-react";
import { tmdb } from "../services/tmdb";
import PersonMovieCard from "../components/person/PersonMovieCard";

const PersonPage = () => {
	const { id } = useParams<{ id: string }>();

	const { data: person, isLoading: isLoadingPerson } = useQuery({
		queryKey: ["person", id],
		queryFn: () => tmdb.getPersonDetails(Number(id)),
		enabled: !!id,
	});

	const { data: credits, isLoading: isLoadingCredits } = useQuery({
		queryKey: ["person-credits", id],
		queryFn: () => tmdb.getPersonCredits(Number(id)),
		enabled: !!id,
	});

	const isLoading = isLoadingPerson || isLoadingCredits;

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen bg-gray-900'>
				<Loader className='h-8 w-8 animate-spin text-blue-500' />
			</div>
		);
	}

	if (!person) return null;

	const sortedMovies = credits?.cast
		.sort((a, b) => {
			if (!a.release_date || !b.release_date) return 0;
			return (
				new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
			);
		})
		.filter((movie) => movie.poster_path);

	const profileUrl = tmdb.getProfileUrl(person.profile_path, "h632") ?? "";

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='container py-8'>
				<div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8'>
					<div>
						<div className='sticky top-20 aspect-[2/3]'>
							{profileUrl ? (
								<img
									src={profileUrl}
									alt={person.name}
									className='w-full h-full object-cover rounded-lg shadow-xl mb-6'
								/>
							) : (
								<div className='w-full h-full rounded-lg flex items-center justify-center bg-gray-700'>
									<User2
										size={32}
										className='text-gray-400'
									/>
								</div>
							)}

							<div className='space-y-4'>
								{person.birthday && (
									<div className='flex items-center gap-2 text-gray-400'>
										<Cake size={20} />
										<span>
											{new Date(person.birthday).toLocaleDateString()}
										</span>
										{person.deathday && (
											<>
												<span>-</span>
												<span>
													{new Date(person.deathday).toLocaleDateString()}
												</span>
											</>
										)}
									</div>
								)}

								{person.place_of_birth && (
									<div className='flex items-center gap-2 text-gray-400'>
										<MapPin size={20} />
										<span>{person.place_of_birth}</span>
									</div>
								)}
							</div>
						</div>
					</div>

					<div>
						<h1 className='text-4xl font-bold mb-4'>{person.name}</h1>

						{person.also_known_as.length > 0 && (
							<div className='mb-4'>
								<h2 className='text-xl text-gray-400 mb-2'>Also Known As</h2>
								<div className='flex flex-wrap gap-2'>
									{person.also_known_as.map((name, index) => (
										<span
											key={index}
											className='px-3 py-1 bg-gray-800 rounded-full text-sm'>
											{name}
										</span>
									))}
								</div>
							</div>
						)}

						{person.biography && (
							<div className='mb-8'>
								<h2 className='text-xl text-gray-400 mb-2'>Biography</h2>
								<p className='text-gray-300 whitespace-pre-line'>
									{person.biography}
								</p>
							</div>
						)}

						{sortedMovies && sortedMovies.length > 0 && (
							<div>
								<h2 className='text-xl text-gray-400 mb-4'>Known For</h2>
								<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
									{sortedMovies.map((movie) => (
										<PersonMovieCard
											key={movie.id}
											movie={movie}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PersonPage;
