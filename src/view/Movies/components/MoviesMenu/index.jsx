import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";

import { exportMovies } from "../../../../store/moviesSlice";
import GenreSelect from "./components/GenreSelect";

import './styles.css';

const MoviesMenu = () => {
	const dispatch = useDispatch();

	const handleSave = () => {
		dispatch(exportMovies());
	}

	return (
		<Box class="movies-menu">
			<GenreSelect />
			<Button
				variant="contained"
				onClick={handleSave}
			>
				Save
			</Button>
		</Box>
	);
};

export default MoviesMenu;