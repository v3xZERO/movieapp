import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { exportMovies } from "../../../../store/moviesSlice";

const MoviesMenu = () => {
	const dispatch = useDispatch();

	const handleSave = () => {
		dispatch(exportMovies());
	}

	return (
			<Button
				variant="contained"
				onClick={handleSave}
			>
				Save
			</Button>
	);
};

export default MoviesMenu;