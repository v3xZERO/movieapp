export const selectTitlesList = (state) => state.titles.list;
export const selectHasTitlesList = (state) => state.titles.list.length;
export const selectSelectedTitlesList = (state) => {
	const list = state.titles.list;
	const selectedList = list.filter((t) => t.checked).map((t) => t.text);

	return selectedList;
}

export const selectMovieIds = (state) => state.movies.ids;
export const selectMoviesList = (state) => state.movies.list;
export const selectAreMoviesLoading = (state) => state.movies.isLoading;
export const selectHasMoviesList = (state) => state.movies.ids.length;

export const selectGenres = (state) => state.movies.genres;
export const selectSelectedGenre = (state) => state.movies.selectedGenre;
export const selectMoviesFilteredByGenre = (state) => {
	const selectedGenre = state.movies.selectedGenre;

	if (selectedGenre.length === 0) return state.movies.list;

	const filteredMovies = state.movies.list.filter((m) => m.genres.includes(selectedGenre));

	return filteredMovies;
}

export const selectSearchQuery = (state) => state.movies.searchQuery;
export const selectSearchResults = (state) => state.movies.searchResults;

export const selectLanguages = (state) => state.meta.languages;
export const selectSelectedLanguage = (state) => state.meta.selectedLanguage;