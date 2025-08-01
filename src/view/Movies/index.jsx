import { Box } from "@mui/material";

import MoviesList from "./MoviesList";
import SaveButton from "./components/SaveButton";
import PageTitle from "../components/PageTitle";

const Movies = () => {
	return (
		<Box class="page-wrapper">
			<PageTitle title="Movies to Save" />
			<MoviesList />
			<SaveButton />
		</Box>
	);
}

export default Movies;
