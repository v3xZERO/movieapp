import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import PageTitle from "../components/PageTitle";
import { selectAreMoviesLoading } from "../../store/selectors";

import MoviesList from "./components/MoviesList";
import MoviesMenu from "./components/MoviesMenu";

const Movies = () => {
	const isLoading = useSelector(selectAreMoviesLoading);

	return (
		<Box class="page-wrapper">
			<PageTitle title="Movies to Save" />
			{isLoading ? 'Loading... ' : <MoviesList />}
			<MoviesMenu />
		</Box>
	);
}

export default Movies;
