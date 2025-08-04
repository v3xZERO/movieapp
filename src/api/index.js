import axios from "axios";

const API_KEY = "0fa6e86d60cd3139cc696fe9bd163838";
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovie = async (query, language) => {
	try {
		const response = await axios.get(`${BASE_URL}/search/movie?language=${language}`, {
			params: {
				api_key: API_KEY,
				query,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error('TMDB API Error:', error);
		throw error;
	}
};

export const fetchMovieDetails = async (movieId, language) => {
	const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${language}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch movie details for ID ${movieId}`);
	}
	const data = await response.json();

	const {
		id,
		title,
		overview,
		poster_path,
		genres,
		release_date,
		runtime,
		vote_average,
	} = data;

	const parsedGenres = genres.map((g) => g.name);

	return {
		id,
		title,
		overview,
		poster_path,
		genres: parsedGenres,
		release_date,
		runtime,
		rating: vote_average,
	};
}

export const fetchMovieCredits = async (movieId, language) => {
	const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=${language}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch movie credits for ID ${movieId}`);
	}
	const data = await response.json();

	// get first 3 actors
	const actors = data.cast
		.filter((person) => person.known_for_department === 'Acting')
		.slice(0, 3)
		.map((actor) => actor.name);

	// get all directors even if more than one
	const directors = data.crew
		.filter((person) => person.job === 'Director')
		.map((director) => director.name);

	return {
		actors,
		directors,
	};
}

export const fetchMovieVideos = async (movieId, language) => {
	const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${language}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch movie videos for ID ${movieId}`);
	}
	const data = await response.json();

	// get first trailer or null
	const firstVideo = data.results && data.results.length > 0 ? data.results[0] : null;

	return {
		trailer_key: firstVideo ? firstVideo.key : null,
	};
}

export const fetchLanguages = async () => {
	const url = `${BASE_URL}/configuration/languages?api_key=${API_KEY}`

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch languages');
	}

	const data = await response.json();
	
	const languages = data.map((l) => ({ iso: l.iso_639_1, name: `${l.english_name}${l.name.length ? ` (${l.name})` : ''}`}))
	const sortedLanguages = [...languages].sort((a, b) => (a.iso.localeCompare(b.iso)));

	return sortedLanguages;
}

export const sendMoviesToApi = async (moviesJson) => {
	console.log('Sending movies to API...');
	console.log('Payload:', moviesJson); // console logging so we can se what we're about to send

	try {
		const response = await fetch('https://example.com/api/movies', { // sending to a nonexistent endpoint
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(moviesJson)
		});

		if (!response.ok) {
			throw new Error(`Failed to send movies. Status: ${response.status}`);
		}

		const result = await response.json();
		console.log('API Response:', result);
		return result;
	} catch (error) {
		console.error('Error sending movies:', error);
		return {
			status: 'error',
			message: error.message
		};
	}
};