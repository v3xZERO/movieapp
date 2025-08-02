import { Box } from "@mui/material";

import MoviesList from "./MoviesList";
import SaveButton from "./components/SaveButton";
import PageTitle from "../components/PageTitle";
import { useSelector } from "react-redux";
import { selectAreMoviesLoading } from "../../store/selectors";

const Movies = () => {
	const isLoading = useSelector(selectAreMoviesLoading);

	return (
		<Box class="page-wrapper">
			<PageTitle title="Movies to Save" />
			{isLoading ? 'Loading... ' : <MoviesList />}
			<SaveButton />
		</Box>
	);
}

export default Movies;
