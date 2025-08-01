export const selectTitlesList = (state) => state.titles.list;
export const selectHasTitlesList = (state) => state.titles.list.length;
export const selectSelectedTitlesList = (state) => {
    const list = state.titles.list;
    const selectedList = list.filter((t) => t.checked).map((t) => t.text)

    return selectedList;
}

export const selectMovieIds = (state) => state.movies.ids;
export const selectMoviesList = (state) => state.movies.list;
export const selectHasMoviesList = (state) => state.movies.ids.length;